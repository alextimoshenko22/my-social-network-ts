import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";

type PropsType = {
  users: Array <UserType>
  totalItemsCount: number
  pageSize: number
  currentPage: number
  portionSize?: number
  followingInProgress: Array<number>

  onPageChanged: (pageNumber: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, users, followingInProgress, unfollow, follow}) => {
  return (
    <div>
      <Paginator totalItemsCount={totalItemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged} />
      <div>
        {users.map(u => (<User key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow} />
        ))}
      </div>
    </div>
  );
};

export default Users;
