import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
    return (
        cookie ? <Navigate to='/dashboard'/> : <Outlet/>
    )
}

export default PublicRoutes;