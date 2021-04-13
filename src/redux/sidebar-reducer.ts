type FriendType = {
    id: number
    name: string
}

let initialState = {
    friends: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Alex" },
        { id: 3, name: "Sergei" }
    ] as Array<FriendType>
}

type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer