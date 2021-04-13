import React from 'react';
import { Field, reduxForm } from 'redux-form';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import Textarea from '../../common/formsControls/FormsControls';

const maxLength = maxLengthCreator(50);

class MyPosts extends React.Component {//вместо shouldComponentUpdate можно наследовать класс React.PureComponent
    //Реакт спрашивает: а нужно ли перерисовать? shouldComponentUpdate отвечает
    shouldComponentUpdate(nextProps, nextState) { //если новые пропсы или стэйт не пришли => компоненту не надо перерисовывать
        return nextProps !== this.props || nextState !== this.state;
    }
    render() {
        let postsElements = this.props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);
        let addNewPost = (value) => {
            this.props.addPost(value.newPostText);
        }
        return (
            <div className={style.postsBlock}>
                <h3>My posts</h3>
                <AddPostFormRedux onSubmit={addNewPost} />
                <div className={style.posts}>
                    { postsElements }
                </div>
            </div>
        );
    }
}

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={"newPostText"} validate={[required, maxLength]} />
            <div><button>Add post</button></div>
        </form>
    )
}

const AddPostFormRedux = reduxForm({form: "ProfilePostForm"})(AddPostForm);

export default MyPosts;
