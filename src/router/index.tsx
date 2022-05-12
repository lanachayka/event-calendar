import Login from "../pages/Login"
import Event from "../pages/Event"
import { RouteObject } from "react-router-dom"

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}

export const publicRoutes: RouteObject[] = [
    {
        path: RouteNames.LOGIN,
        element: <Login />,
    },
]

export const privateRoutes: RouteObject[] = [
    {
        path: RouteNames.EVENT,
        element: <Event />,
    },
]