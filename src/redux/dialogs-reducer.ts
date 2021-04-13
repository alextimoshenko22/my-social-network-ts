import { InferActionsTypes } from "./redux-store"

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Sergei" }
    ] as Array <DialogType>,
    messages: [
        { id: 1, message: "Hello!" },
        { id: 2, message: "Goodluck!" },
        { id: 3, message: "Yooo!" }
    ] as Array<MessageType>,
}

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: action.newMessageBody }],
            }
        }
        default:
            return state
    }
}

export const actions = {
    sendMessageActionCreator: (newMessageBody: string) => ({type: 'SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions> 