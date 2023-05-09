import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    return (
        cookie ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes;