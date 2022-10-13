import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRefreshQuery } from './authApiSlice'
import { ImSpinner9 } from "react-icons/im";

const PersistentLogin = () => {
    const persist = JSON.parse(localStorage.getItem('rememberMe')) || false
    const [loading, setLoading] = useState(true)
    const { isSuccess, isError, error } = useRefreshQuery()

    useEffect(() => {
        if (isSuccess) {
            setLoading(false)
        } else if (isError) {
            setLoading(false)
        }
    }, [isSuccess, isError, error])
    useEffect(() => {
        console.clear()
    }, [loading])
    return (
        !persist ? <Outlet /> : loading ? (
            <div className='w-full h-60 grid place-items-center bg-transparent rounded-md text-base text-brightBlue'>
                <ImSpinner9 className='animate-spin' />
            </div>
        ) : <Outlet />
    )
}

export default PersistentLogin