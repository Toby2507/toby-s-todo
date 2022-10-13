import { useState, useEffect } from "react"
import TodoList from "./TodoList"
import FilterBtns from "./FilterBtns"
import { useSelector } from "react-redux"
import { selectAllTodos } from "./todoSlice"
import { useDeleteManyTodosMutation } from "./todoSlice"

const TodoInterface = () => {
    let todos = useSelector(selectAllTodos)
    let entities = useSelector(selectAllTodos)
    const [active, setActive] = useState(0)
    const [deleteManyTodos] = useDeleteManyTodosMutation()

    const handleDeletes = async () => {
        let toBeDeleted = entities.filter(todo => todo.isCompleted).map(todo => todo._id)
        await deleteManyTodos({ ids: toBeDeleted })
    }

    useEffect(() => {
        const actives = todos.filter(todo => todo.isCompleted === false).length
        setActive(actives)
        console.clear()
    }, [todos])
    return (
        <>
            <div className="flex flex-col bg-white rounded-md shadow-lg shadow-lightTextDark/20 dark:bg-darkSecBg dark:shadow-black/30">
                <TodoList />
                <div className="flex items-center justify-between px-5 py-4">
                    <h4 className="text-xs text-lightAccent dark:text-darkAccent">{active} items left to do.</h4>
                    <FilterBtns isMobile={false} />
                    <button onClick={handleDeletes} className="text-sm text-lightAccent capitalize hover:text-lightTextLight dark:text-darkAccent dark:hover:text-darkFilterText">clear completed</button>
                </div>
            </div>
            <div className="grid place-items-center bg-white rounded-md py-4 mt-6 shadow-lg shadow-lightTextDark/20 dark:bg-darkSecBg dark:shadow-black/30 md:hidden">
                <FilterBtns isMobile={true} />
            </div>
            <p className="text-xs text-lightTextLight text-center mt-8 dark:text-darkInfo">Drag and drop to reorder list</p>
        </>
    )
}

export default TodoInterface