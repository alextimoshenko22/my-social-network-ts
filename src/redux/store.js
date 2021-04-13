//ФАЙЛ ДЛЯ ПРИМЕРА ПО СОЗДАНИЮ СВОЕГО STORE В REDUX

import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import dialogsReducer  from './dialogs-reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hello World!", likesCount: 2 },
                { id: 2, message: "Nice Day!", likesCount: 21 },
                { id: 3, message: "WTF", likesCount: 21 }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: "Sasha" },
                { id: 2, name: "Alex" },
                { id: 3, name: "Sergei" }
            ],
            messages: [
                { id: 1, message: "Hello!" },
                { id: 2, message: "Goodluck!" },
                { id: 3, message: "Yooo!" }
            ],
            newMessageBody: ''
        },
        sidebar: {
            friends: [
                { id: 1, name: "Sasha" },
                { id: 2, name: "Alex" },
                { id: 3, name: "Sergei" }
            ]
        }
    },

    _callSubscriber() { 
        console.log('State changed');
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    getState () {
        return this._state;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}

export default store;
