import { instance, ResultCodeEnum, ResultCodeForCaptchaEnum, ResponseType } from "./api"

type AuthMeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<AuthMeResponseDataType>>(`auth/me`).then((response) => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('/auth/login', { email, password, rememberMe, captcha }).then((response) => response.data)
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login').then((response) => response.data)
    }
}
