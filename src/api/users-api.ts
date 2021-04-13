import { instance, GetItemsType, ResponseType } from "./api"

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data) //promise: возвращаем только data из response
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then((response) => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then((response) => response.data)
    }
}
