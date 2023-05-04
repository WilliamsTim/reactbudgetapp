import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    let auth = {'token': false}
    return (
        !auth.token ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PublicRoutes;