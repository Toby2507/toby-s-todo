import React from 'react'
import { ImSpinner9 } from "react-icons/im";
import { useLogoutMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate()
    const [logout, { isLoading }] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/login', { replace: true });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="grid place-items-center w-full my-10">
            <button onClick={handleLogout} className='flex justify-center bg-transparent border border-brightBlue rounded-xl py-2 px-20 text-base text-brightBlue font-medium tracking-wide capitalize shadow-md'>
                {isLoading ? <ImSpinner9 className='animate-spin' /> : 'log out'}
            </button>
        </div>
    )
}

export default LogoutButton