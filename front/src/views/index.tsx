import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './Home/Home'
import OrderDetail from './OrderDetail/OrderDetail'
// import ShoulderFlexionExercise from './Exercises/ShoulderFlexionExercise'

const router = createBrowserRouter(
    [
        { path: '/', element: <Home /> },
        { path: '/order/:id', element: <OrderDetail /> },
    ],
    {}
)

const Router = <RouterProvider router={router} />

export default Router
