import { useLocation, Navigate, Outlet } from "react-router-dom"
import { selectUser } from "./authSlice"
import { useSelector } from "react-redux"

const RequireAuth = () => {
    const auth = useSelector(selectUser)
    const location = useLocation()
    return (
        auth?.userId ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth