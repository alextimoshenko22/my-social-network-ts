//BLL уровень - создаём STORE (хранилище данных - редьюсэры)
import { applyMiddleware, combineReducers, createStore, Action } from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
//import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    //form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer

//Тип State всего приложения
export type AppStateType = ReturnType<RootReducerType>
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//Общий тип для экшенов
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

//Общий тип для Thunk
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
window.store = store
export default store
