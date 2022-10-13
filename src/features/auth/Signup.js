import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupMutation } from './authApiSlice';
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

// REGEX TESTS
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/
// OPTIONAL CLASSES
const offscreen = 'absolute -left-[9999px]'
const onscreen = 'bg-errorRed text-errorRedText text-center rounded-md font-bold p-2 mb-2'
const input = 'h-full w-full border border-lightTextLight bg-transparent rounded-xl px-4 py-3 text-base text-lightTextDark caret-brightBlue focus:outline-none dark:text-darkSecText dark:border-darkFilterText'
const instructions = 'flex items-start gap-2 bg-lightBg dark:bg-darkBg rounded-xl p-2 pl-3'
const instructionsText = 'tracking-tight leading-tight text-base text-lightTextLight dark:text-darkFilterText'

const Signup = () => {
    const navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [signup, { isLoading }] = useSignupMutation();
    const [username, setUsername] = useState({ value: '', isValid: false, isFocused: false })
    const [password, setPassword] = useState({ value: '', isValid: false, isFocused: false })
    const [matchPwd, setMatchPwd] = useState({ value: '', isValid: false, isFocused: false })
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await signup({ username: username.value, password: password.value }).unwrap()
            setUsername({ value: '', isValid: false, isFocused: false })
            setPassword({ value: '', isValid: false, isFocused: false })
            setErrMsg('')
            navigate('/login', { replace: true })
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Incomplete Credentials')
            } else if (err.originalStatus === 409) {
                setErrMsg('User Exists')
            } else {
                setErrMsg('SignUp Failed')
            }
            errRef.current.focus()
        }
    }

    useEffect(() => { userRef.current.focus() }, [])
    useEffect(() => { setUsername({ ...username, isValid: USER_REGEX.test(username.value) }) }, [username.value])
    useEffect(() => {
        setPassword({ ...password, isValid: PWD_REGEX.test(password.value) })
        setMatchPwd({ ...matchPwd, isValid: password.value === matchPwd.value })
    }, [password.value, matchPwd.value])
    useEffect(() => { setErrMsg('') }, [username.value, password.value, matchPwd.value])
    return (
        <section className="flex flex-col bg-white rounded-md p-8 shadow-lg shadow-lightTextDark/20 dark:bg-darkSecBg dark:shadow-black/30">
            <p ref={errRef} className={errMsg ? onscreen : offscreen} aria-live='assertive'>{errMsg}</p>
            <h1 className='text-2xl text-center capitalize font-bold tracking-wide drop-shadow-md text-lightTextDark dark:text-darkSecText'>sign up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className='flex items-center gap-2 text-lg text-lightTextLight capitalize dark:text-darkFilterText'>
                        username:
                        <span className={`${username.isValid ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${username.isValid || !username.value ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        value={username.value}
                        onChange={e => setUsername({ ...username, value: e.target.value })}
                        className={input}
                        required
                        aria-invalid={username.isValid ? 'false' : 'true'}
                        aria-describedby='userNote'
                        onFocus={() => setUsername({ ...username, isFocused: true })}
                        onBlur={() => setUsername({ ...username, isFocused: false })}
                    />
                    <div id='userNote' className={username.isFocused && username.value && !username.isValid ? instructions : offscreen}>
                        <FaInfoCircle className='mt-[1px] text-lightTextLight dark:text-darkFilterText' />
                        <p className={instructionsText}>4 to 24 characters. Must begin with a letter. Letters, numbers, underscores and hyphens allowed.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className='flex items-center gap-2 text-lg text-lightTextLight capitalize dark:text-darkFilterText'>
                        password:
                        <span className={`${password.isValid ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${password.isValid || !password.value ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password.value}
                        onChange={e => setPassword({ ...password, value: e.target.value })}
                        className={input}
                        required
                        aria-invalid={password.isValid ? 'false' : 'true'}
                        aria-describedby='pwdNote'
                        onFocus={() => setPassword({ ...password, isFocused: true })}
                        onBlur={() => setPassword({ ...password, isFocused: false })}
                    />
                    <div id='pwdNote' className={password.isFocused && password.value && !password.isValid ? instructions : offscreen}>
                        <FaInfoCircle className='mt-[1px] text-lightTextLight dark:text-darkFilterText' />
                        <p className={instructionsText}>8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters:
                            <span className='pl-1' aria-label='exclamation mark'>!</span>
                            <span className='pl-1' aria-label='at sign'>@</span>
                            <span className='pl-1' aria-label='number sign'>#</span>
                            <span className='pl-1' aria-label='dollar sign'>$</span>
                            <span className='pl-1' aria-label='percent sign'>%</span>
                            <span className='pl-1' aria-label='caret'>^</span>
                            <span className='pl-1' aria-label='ampersand'>&</span>
                            <span className='pl-1' aria-label='asterisk'>*</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className='flex items-center gap-2 text-lg text-lightTextLight capitalize dark:text-darkFilterText'>
                        confirm password:
                        <span className={`${matchPwd.isValid && matchPwd.value ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${matchPwd.isValid || !matchPwd.value ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={matchPwd.value}
                        onChange={e => setMatchPwd({ ...matchPwd, value: e.target.value })}
                        className={input}
                        required
                        aria-invalid={matchPwd.isValid ? 'false' : 'true'}
                        aria-describedby='confirmNote'
                        onFocus={() => setMatchPwd({ ...matchPwd, isFocused: true })}
                        onBlur={() => setMatchPwd({ ...matchPwd, isFocused: false })}
                    />
                    <div id='confirmNote' className={matchPwd.isFocused && !matchPwd.value ? instructions : offscreen}>
                        <FaInfoCircle className='mt-[1px] text-lightTextLight dark:text-darkFilterText' />
                        <p className={instructionsText}>Must match the first password input field</p>
                    </div>
                </div>
                <button
                    disabled={!username.isValid && !password.isValid && !matchPwd.isValid}
                    className='flex justify-center bg-transparent border border-brightBlue rounded-xl py-2 text-lg text-brightBlue font-medium tracking-wide capitalize shadow-md'
                >{isLoading ? <ImSpinner9 className='animate-spin' /> : 'sign up'}</button>
                <p className='text-lightTextLight capitalize dark:text-darkFilterText'>Already registered? <Link to='/login' className='underline'>sign in</Link></p>
            </form>
        </section>
    )
}

export default Signup