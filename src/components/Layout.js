import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
import sun from '../images/icon-sun.svg';
import moon from '../images/icon-moon.svg';

const Layout = () => {
    const initialMode = JSON.parse(localStorage.getItem('darkMode')) || false
    const [darkMode, setDarkMode] = useState(initialMode);
    useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(darkMode)) }, [darkMode])
    useEffect(() => {
        console.clear()
    })
    return (
        <main className={`${darkMode ? 'dark' : ''} font-josefin w-screen min-h-screen grid place-items-center overflow-x-hidden`}>
            <section className="fixed left-0 right-0 top-0 bottom-0 w-full min-h-screen grid grid-rows-[1fr_2fr]">
                <div className="w-full bg-mobileLight bg-norepeat bg-center bg-cover dark:bg-mobileDark md:bg-deskLight dark:md:bg-deskDark"></div>
                <div className="w-full bg-lightBg dark:bg-darkBg"></div>
            </section>
            <section className="absolute left-0 right-0 mt-16 mx-auto h-5/6 w-[90vw] md:w-[40rem]">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-3xl text-white uppercase font-bold tracking-[5px]">todo</h1>
                    <button aria-label='dark mode toggle' onClick={() => setDarkMode(!darkMode)}><img src={darkMode ? moon : sun} alt="sun" /></button>
                </div>
                <Outlet />
                <div className="w-full h-1"></div>
            </section>
        </main>
    )
}

export default Layout