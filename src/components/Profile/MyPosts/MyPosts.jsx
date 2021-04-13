import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import { required, maxLengthCreator, composeValidators } from "../../../utils/validators/validators";
import Textarea from "../../common/formsControls/FormsControls";
import { Form, Field } from "react-final-form";

const maxLength = maxLengthCreator(50);

const MyPosts = React.memo((props) => {
  //memo для оптимизации, то же что и shouldComponentUpdate
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} key={p.id} />
  ));
  let addNewPost = (value) => {
    props.addPost(value.newPostText);
  };
  return (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      <AddPostForm onSubmit={addNewPost} />
      <div className={style.posts}>{postsElements}</div>
    </div>
  );
});

const AddPostForm = (props) => {
  return <Form onSubmit={props.onSubmit}>
    {
        ({ handleSubmit, form }) => {
            const resetForm = async (event) => {
                await handleSubmit(event);
                form.reset();
                form.resetFieldState('newPostText');
            }
            return <form onSubmit={resetForm}>
                <Field component={Textarea} name={"newPostText"} validate={composeValidators(required, maxLength)} />
                <div>
                    <button>Add post</button>
                </div>
            </form>
        }
    }
    </Form>
};

export default MyPosts;
