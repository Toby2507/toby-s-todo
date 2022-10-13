import { useState } from "react"
import { Reorder } from "framer-motion"
import { useSelector } from "react-redux"
import { filterBy } from "./todoFilterSlice";
import { IoClose } from "react-icons/io5";
import { selectTodoById } from "./todoSlice"
import { useDeleteTodoMutation } from "./todoSlice";
import CustomCheckbox from "./CustomCheckbox"

const completedText = 'text-base flex-1 truncate text-lightAccent line-through hover:whitespace-normal dark:text-darkFilterText'
const uncompletedText = 'text-base flex-1 truncate text-lightTextDark hover:whitespace-normal dark:text-darkSecText'

const TodoItem = ({ todo }) => {
    const todoItem = useSelector(state => selectTodoById(state, todo))
    const filter = useSelector(filterBy)
    const [deleteTodo] = useDeleteTodoMutation()
    const [checked, setChecked] = useState(todoItem?.isCompleted)

    const show = filter === 'all' ? false : filter === 'active' ? todoItem?.isCompleted : !todoItem?.isCompleted
    const handleDelete = async () => {
        try {
            await deleteTodo({ id: todoItem?._id }).unwrap()
        } catch (err) {
            console.log(err)
        }
    }
    if (show) return;
    return (
        <Reorder.Item value={todoItem?._id} className='border-b border-lightAccent px-6 py-4 flex items-center space-x-4 rounded-t-md dark:border-darkAccent dark:bg-darkSecBg dark:text-darkSecText'>
            <CustomCheckbox todoId={todoItem?._id} check={checked} setCheck={setChecked} />
            <p className={checked ? completedText : uncompletedText}>{todoItem?.item}</p>
            <button onClick={handleDelete} className="text-2xl text-lightAccent dark:text-darkAccent" aria-label='delete todo'><IoClose /></button>
        </Reorder.Item>
    )
}

export default TodoItem