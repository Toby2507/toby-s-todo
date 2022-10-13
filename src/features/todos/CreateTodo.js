import { useState, useRef, useEffect } from 'react'
import { useAddTodoMutation } from './todoSlice'
import { ImSpinner9 } from "react-icons/im";

const inputClasses = "h-full w-full bg-white rounded-md px-6 text-lightTextDark caret-brightBlue focus:outline-none placeholder:align-bottom placeholder:text-sm placeholder:text-lightTextLight dark:text-darkSecText dark:bg-darkSecBg dark:placeholder:text-darkFilterText"

const CreateTodo = () => {
    const todoRef = useRef()
    const [todo, setTodo] = useState('')
    const [addTodo, { isLoading }] = useAddTodoMutation()

    const handleSubmit = async e => {
        e.preventDefault()
        const newTodo = { item: todo, isCompleted: false }
        try {
            await addTodo({ todo: newTodo }).unwrap()
            setTodo('')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { todoRef.current.focus() }, [])

    return (
        <form className="create-todo mb-6" onSubmit={handleSubmit}>
            <div className="relative w-full h-14">
                <input
                    type="text"
                    id="todo"
                    ref={todoRef}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className={inputClasses}
                    placeholder="Create a new todo..."
                    autoComplete="off"
                    aria-label='Create a new todo'
                />
                <button className="absolute top-[0.9rem] right-6 w-6 h-6 grid place-items-center hover:bg-lightAccent border-2 border-lightAccent rounded-full dark:border-darkAccent dark:hover:bg-darkAccent" aria-label='Submit new todo'>{isLoading && <ImSpinner9 className='animate-spin' />}</button>
            </div>
        </form>
    )
}

export default CreateTodo