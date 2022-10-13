import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const todosAdapter = createEntityAdapter({
    selectId: todo => todo._id,
    sortComparer: (a, b) => b._id.localeCompare(a._id)
});
const initialState = todosAdapter.getInitialState()

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => `/todos`,
            transformResponse: res => {
                return todosAdapter.setAll(initialState, res)
            },
            providesTags: (result, error, arg) => [{ type: 'Todos', id: 'LIST' }, ...result.ids.map(id => ({ type: 'Todos', id }))]
        }),
        addTodo: builder.mutation({
            query: ({ todo }) => ({
                url: `/todos`,
                method: 'POST',
                body: { todo }
            }),
            transformResponse: res => {
                return todosAdapter.setAll(initialState, res)
            },
            invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
        }),
        deleteManyTodos: builder.mutation({
            query: ({ ids: todoIds }) => ({
                url: `/todos`,
                method: 'DELETE',
                body: { todoIds }
            }),
            invalidatesTags: (result, error, arg) => arg.ids.map(id => ({ type: 'Todos', id }))
        }),
        updateTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'PATCH'
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchresult = dispatch(
                    todoApiSlice.util.updateQueryData('getTodos', undefined, draft => {
                        const todo = draft.entities[id];
                        todo.completed = !todo.completed;
                    })
                )
                try { await queryFulfilled; } catch { patchresult.undo(); }
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg.id }]
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg.id }]
        })
    })
})

export const selectTodoResult = todoApiSlice.endpoints.getTodos.select();
const selectTodosData = createSelector(selectTodoResult, result => result.data);
export const {
    selectAll: selectAllTodos,
    selectById: selectTodoById,
    selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => selectTodosData(state) ?? initialState);
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation, useDeleteManyTodosMutation } = todoApiSlice