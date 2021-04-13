import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api"
import { securityAPI } from "../api/security-api"
import { authAPI } from "../api/auth-api"
import { InferActionsTypes, BaseThunkType } from "./redux-store"

//Редьюсер авторизации
let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
  error: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
    case "GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload
      };
    case "SET_SERVER_AUTH_ERROR":
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA', payload: {userId, email, login, isAuth} } as const),
  getCaptchaUrlSuccess: (capthaUrl: string) => ({ type: 'GET_CAPTCHA_URL_SUCCESS', payload: { capthaUrl } } as const),
  setServerError: (error: string) => ({ type: 'SET_SERVER_AUTH_ERROR', error } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const data = await authAPI.authMe()
  if (data.resultCode === ResultCodeEnum.Success) {
    let { id, email, login } = data.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha)
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(getAuthUserData())
  }
  else {
    if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    console.log(data.messages[0])
    dispatch(actions.setServerError(data.messages[0]))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  dispatch(actions.getCaptchaUrlSuccess(data.url))
}

export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout()
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}

export default authReducer


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>