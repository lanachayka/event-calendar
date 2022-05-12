import { AppDispatch } from './../../index';
import { IUser } from './../../../models/IUser';
import { AuthActionsEnum, SetAuthAction, SetUserAction, SetLoadingAction, SetErrorAction } from './types';
import UserService from '../../../api/UserService';

export const AuthActionCreators = {
    setAuth: (payload: boolean): SetAuthAction => ({
        type: AuthActionsEnum.SET_AUTH,
        payload
    }),
    setUser: (payload: IUser): SetUserAction => ({
        type: AuthActionsEnum.SET_USER,
        payload
    }),
    setLoading: (payload: boolean): SetLoadingAction => ({
        type: AuthActionsEnum.SET_LOADING,
        payload
    }),
    setError: (payload: string): SetErrorAction => ({
        type: AuthActionsEnum.SET_ERROR,
        payload
    }),
    login: (username: string, password: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Inccorect username or password'))
                }
                dispatch(AuthActionCreators.setLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Some error occured!'))
        }
    },
    logout: (): any => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setAuth(false))
    }
}