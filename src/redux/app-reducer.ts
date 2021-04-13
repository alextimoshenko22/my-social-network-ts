//Редьюсер APP
import { getAuthUserData } from "./auth-reducer"
import { InferActionsTypes } from "./redux-store"

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "INIT_SUCCESS":
      return {
        ...state,
        initialized: true
      }
    default:
      return state
  }
}

export const actions = {
  initSuccess: () => ({ type: 'INIT_SUCCESS' } as const)
}
type ActionsTypes = InferActionsTypes<typeof actions>

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData()) //задиспатчил и забыл (с)
  Promise.all([promise])
    .then(() => {
      dispatch(actions.initSuccess())
    })
}

export default appReducer
