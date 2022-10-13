import check from '../../images/icon-check.svg';
import { useUpdateTodoMutation } from './todoSlice';

const CustomCheckbox = ({ todoId, check: isChecked, setCheck }) => {
    const [updateTodo] = useUpdateTodoMutation()
    const handleClick = () => {
        if (!isChecked) {
            updateTodo({ id: todoId })
            setCheck(true)
        }
    }
    return (
        <label className='relative h-6 w-6 grid place-items-center bg-checkBg rounded-full'>
            <input type="checkbox" className="hidden" checked={isChecked} onChange={handleClick} aria-label='Is Todo Completed' />
            <img src={check} alt="selected" />
            <div className={`${isChecked ? 'hidden' : ''} absolute w-full h-full bg-white rounded-full border-2 border-lightAccent hover:border-0 hover:w-4 hover:h-4 dark:border-darkAccent dark:bg-darkSecBg`}></div>
        </label>
    )
}

export default CustomCheckbox