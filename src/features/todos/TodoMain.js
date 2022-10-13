import CreateTodo from "./CreateTodo"
import TodoInterface from "./TodoInterface"
import LogoutButton from "../auth/LogoutButton"

const TodoMain = () => {
    return (
        <>
            <CreateTodo />
            <TodoInterface />
            <LogoutButton />
        </>
    )
}

export default TodoMain