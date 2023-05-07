import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userId="))
    ?.split("=")[1];
    console.log(cookie)
    return (
        cookie ? <Navigate to='/dashboard'/> : <Outlet/>
    )
}

export default PublicRoutes;