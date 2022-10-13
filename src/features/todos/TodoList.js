import { Reorder } from "framer-motion"
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { selectTodoIds, useGetTodosQuery } from "./todoSlice";
import { ImSpinner9 } from "react-icons/im";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { isLoading, isSuccess, isError, error } = useGetTodosQuery();
    const todoIds = useSelector(selectTodoIds)
    const [ids, setIds] = useState([])

    useEffect(() => { isSuccess && setIds(todoIds) }, [todoIds, isSuccess])

    let content;
    if (isLoading) {
        content = (
            <div className='w-full h-20 grid place-items-center bg-transparent rounded-md text-base text-brightBlue'>
                <ImSpinner9 className='animate-spin' />
            </div>
        )
    } else if (isSuccess) {
        content = (
            <Reorder.Group values={ids} onReorder={setIds} className="flex flex-col">
                {ids.map(id => {
                    return <TodoItem key={id} todo={id} />
                })}
            </Reorder.Group>
        )
    } else if (isError) {
        content = <p>{error.message}</p>
    }

    return content
}

export default TodoList