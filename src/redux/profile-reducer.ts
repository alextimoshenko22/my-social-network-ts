import { PostType, ProfileType, PhotosType } from "../types/types"
import { profileAPI } from "../api/profile-api"
import { InferActionsTypes, BaseThunkType } from "./redux-store"

let initialState = {
  posts: [
    { id: 1, message: "Hello World!", likesCount: 2 },
    { id: 2, message: "Nice Day!", likesCount: 21 },
    { id: 3, message: "WTF", likesCount: 21 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ""
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "ADD_POST": {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case "SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case "SET_STATUS": {
      return {
        ...state,
        status: action.status
      }
    }
    case "DELETE_POST": {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      }
    }
    case "SAVE_PHOTO_SUCCESS": {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const)
}

//THUNK
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status)
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status))
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    if(userId !== null) {
      dispatch(getUserProfile(userId))
    }
    else {
      throw new Error("userId can't be null")
    }
  }
  else {
    //dispatch();
    return Promise.reject()
  }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

//type DispatchType = Dispatch<ActionsTypes> - конкретный тип для диспаатчей, но он не нужен т.к. определили общий ThunkType
//type GetStateType = () => AppStateType - тип для функцуии getState, но он не нужен т.к. определили общий ThunkType