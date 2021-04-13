import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/formsControls/FormsControls';

const LoginForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={"email"} validate={[required]} placeholder={"email"} />
            </div>
            <div>
                <Field component={Input} name={"password"} validate={[required]} placeholder={"password"} type={"password"} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> Remember me
            </div>
            <div>
                <button>login</button>
            </div>
        </form>
    ) 
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if(props.isAuth)
        return <Redirect to={"/profile"} />
    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {login})(Login);