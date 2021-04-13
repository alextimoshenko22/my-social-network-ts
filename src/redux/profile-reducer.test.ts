//TEST of profileReducer

import profileReducer, { actions } from "./profile-reducer";
import { ProfileType, PostType } from "../types/types";

let state = {
  posts: [
    { id: 1, message: "Hello World!", likesCount: 2 },
    { id: 2, message: "Nice Day!", likesCount: 21 },
    { id: 3, message: "WTF", likesCount: 21 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ""
};

it('length of posts should be incremented', () => {
  //1. test data
  let action = actions.addPostActionCreator("Okey");
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(4);
});

it('message of new post should be correct', () => {
  //1. test data
  let action = actions.addPostActionCreator("Okey");
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts[3].message).toBe("Okey");
});

it('after deleting length of message should be decrement', () => {
  //1. test data
  let action = actions.deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(2);
});

it("after deleting length of message shouldn't be decrement if id isn't correct", () => {
  //1. test data
  let action = actions.deletePost(1000);
  // 2. action
  let newState = profileReducer(state, action);
  //3. expectation
  expect(newState.posts.length).toBe(3);
});