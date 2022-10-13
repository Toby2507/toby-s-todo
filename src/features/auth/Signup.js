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
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [matchPwdValid, setMatchPwdValid] = useState(false);
    const [matchPwdFocused, setMatchPwdFocused] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await signup({ username, password }).unwrap()
            setUsername(''); setUsernameValid(false); setUsernameFocused(false);
            setPassword(''); setPasswordValid(false); setPasswordFocused(false);
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
    useEffect(() => { setUsernameValid(USER_REGEX.test(username)) }, [username])
    useEffect(() => {
        setPasswordValid(PWD_REGEX.test(password))
        setMatchPwdValid(password === matchPwd)
    }, [password, matchPwd])
    useEffect(() => { setErrMsg('') }, [username, password, matchPwd])
    return (
        <section className="flex flex-col bg-white rounded-md p-8 shadow-lg shadow-lightTextDark/20 dark:bg-darkSecBg dark:shadow-black/30">
            <p ref={errRef} className={errMsg ? onscreen : offscreen} aria-live='assertive'>{errMsg}</p>
            <h1 className='text-2xl text-center capitalize font-bold tracking-wide drop-shadow-md text-lightTextDark dark:text-darkSecText'>sign up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className='flex items-center gap-2 text-lg text-lightTextLight capitalize dark:text-darkFilterText'>
                        username:
                        <span className={`${usernameValid ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${usernameValid || !username ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={input}
                        required
                        aria-invalid={usernameValid ? 'false' : 'true'}
                        aria-describedby='userNote'
                        onFocus={() => setUsernameFocused(true)}
                        onBlur={() => setUsernameFocused(false)}
                    />
                    <div id='userNote' className={usernameFocused && username && !usernameValid ? instructions : offscreen}>
                        <FaInfoCircle className='mt-[1px] text-lightTextLight dark:text-darkFilterText' />
                        <p className={instructionsText}>4 to 24 characters. Must begin with a letter. Letters, numbers, underscores and hyphens allowed.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className='flex items-center gap-2 text-lg text-lightTextLight capitalize dark:text-darkFilterText'>
                        password:
                        <span className={`${passwordValid ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${passwordValid || !password ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={input}
                        required
                        aria-invalid={passwordValid ? 'false' : 'true'}
                        aria-describedby='pwdNote'
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                    <div id='pwdNote' className={passwordFocused && password && !passwordValid ? instructions : offscreen}>
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
                        <span className={`${matchPwdValid && matchPwd ? '' : 'hidden'} text-validGreen`}><FaCheck /></span>
                        <span className={`${matchPwdValid || !matchPwd ? 'hidden' : ''} text-errorRedText`}><FaTimes /></span>
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={matchPwd}
                        onChange={e => setMatchPwd(e.target.value)}
                        className={input}
                        required
                        aria-invalid={matchPwdValid ? 'false' : 'true'}
                        aria-describedby='confirmNote'
                        onFocus={() => setMatchPwdFocused(true)}
                        onBlur={() => setMatchPwdFocused(false)}
                    />
                    <div id='confirmNote' className={matchPwdFocused && !matchPwd ? instructions : offscreen}>
                        <FaInfoCircle className='mt-[1px] text-lightTextLight dark:text-darkFilterText' />
                        <p className={instructionsText}>Must match the first password input field</p>
                    </div>
                </div>
                <button
                    disabled={!usernameValid && !passwordValid && !matchPwdValid}
                    className='flex justify-center bg-transparent border border-brightBlue rounded-xl py-2 text-lg text-brightBlue font-medium tracking-wide capitalize shadow-md'
                >{isLoading ? <ImSpinner9 className='animate-spin' /> : 'sign up'}</button>
                <p className='text-lightTextLight capitalize dark:text-darkFilterText'>Already registered? <Link to='/login' className='underline'>sign in</Link></p>
            </form>
        </section>
    )
}

export default Signup