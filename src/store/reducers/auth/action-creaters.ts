import { AppDispatch, RootState } from './../../index';
import { IUser } from './../../../models/IUser';
import { AuthActionsEnum, SetAuthAction, SetUserAction, SetLoadingAction, SetErrorAction } from './types';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

export const AuthActionCreators = {
    setAuth: (isAuth: boolean): SetAuthAction => ({
        type: AuthActionsEnum.SET_AUTH,
        payload: isAuth
    }),
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionsEnum.SET_USER,
        payload: user
    }),
    setLoading: (isLoading: boolean): SetLoadingAction => ({
        type: AuthActionsEnum.SET_LOADING,
        payload: isLoading
    }),
    setError: (error: string): SetErrorAction => ({
        type: AuthActionsEnum.SET_ERROR,
        payload: error
    }),
    login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setLoading(true))
            setTimeout(async () => {
                const response = await axios.get<IUser[]>('./user.json')
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setAuth(true))
                    dispatch(AuthActionCreators.setUser(mockUser))
                } else {
                    dispatch(AuthActionCreators.setError('Inccorect username or password'))
                }
                dispatch(AuthActionCreators.setLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Some error occured!'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {

        } catch (e) {

        }
    }
}