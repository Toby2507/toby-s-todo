import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { ImSpinner9 } from "react-icons/im";

// OPTIONAL CLASSES
const offscreen = 'absolute -left-[9999px]'
const onscreen = 'bg-errorRed text-errorRedText text-center rounded-md font-bold p-2 mb-2'
const input = 'h-full w-full border border-lightTextLight bg-transparent rounded-xl px-4 py-3 text-base text-lightTextDark caret-brightBlue focus:outline-none dark:text-darkSecText dark:border-darkFilterText'

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch();
    const from = location.state?.from?.pathname || '/'
    const userRef = useRef()
    const errRef = useRef()

    const [login, { isLoading }] = useLoginMutation();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(JSON.parse(localStorage.getItem('rememberMe')) || false)
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await login({ username, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            setUsername('');
            setPassword('');
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Incomplete Credentials')
            } else if (err.originalStatus === 401) {
                setErrMsg('Username or Password Incorrect')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }
    }

    useEffect(() => { userRef.current.focus() }, [])
    useEffect(() => { setErrMsg('') }, [username, password])
    useEffect(() => { localStorage.setItem('rememberMe', JSON.stringify(rememberMe)) }, [rememberMe])
    useEffect(() => { console.clear() })
    return (
        <section className="flex flex-col bg-white rounded-md p-8 shadow-lg shadow-lightTextDark/20 dark:bg-darkSecBg dark:shadow-black/30">
            <p ref={errRef} className={errMsg ? onscreen : offscreen} aria-live='assertive'>{errMsg}</p>
            <h1 className='text-2xl text-center capitalize font-bold tracking-wide drop-shadow-md text-lightTextDark dark:text-darkSecText'>sign in</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className='text-lg text-lightTextLight capitalize dark:text-darkFilterText'>username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={userRef}
                        className={input}
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className='text-lg text-lightTextLight capitalize dark:text-darkFilterText'>password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={input}
                        required
                    />
                </div>
                <button className='flex justify-center bg-transparent border border-brightBlue rounded-xl py-2 text-lg text-brightBlue font-medium tracking-wide capitalize shadow-md'>
                    {isLoading ? <ImSpinner9 className='animate-spin' /> : 'log in'}
                </button>
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label htmlFor="rememberMe" className='text-lightTextLight capitalize dark:text-darkFilterText'>remember me</label>
                    </div>
                    <p className='text-lightTextLight capitalize dark:text-darkFilterText'>Already registered? <Link to='/signup' className='underline'>sign up</Link></p>
                </div>
            </form>
        </section>
    )
}

export default Login