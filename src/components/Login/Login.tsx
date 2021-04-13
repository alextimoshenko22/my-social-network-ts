import React from "react"
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
import { Form, Field } from "react-final-form"
import { login } from "../../redux/auth-reducer"
import { required } from "../../utils/validators/validators"
import Input  from "../common/formsControls/FormsControls"
import { AppStateType } from "../../redux/redux-store"
//import { FORM_ERROR } from "final-form";

type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValueType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValueType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    // if (!props.error)
    //   return { [FORM_ERROR]: props.error }
  }
  if (props.isAuth)
    return <Redirect to={"/profile"} />;
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxFinalForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>);
}

type LoginFormOwnProps = {
  captchaUrl: string | null
  onSubmit: (formData: LoginFormValueType) => void
}

const LoginReduxFinalForm: React.FC<LoginFormOwnProps> = (props) => {
  return (<Form onSubmit={props.onSubmit}
    render={({ handleSubmit, submitError, submitFailed }) => (
      <form onSubmit={handleSubmit}>
        {submitFailed && <span>{submitError}</span>}
        <div>
          <Field component={Input} name={"email"} validate={required} placeholder={"email"} />
        </div>
        <div>
          <Field component={Input} name={"password"} validate={required} placeholder={"password"} type={"password"} />
        </div>
        <div>
          <Field component={Input} name={"rememberMe"} type={"checkbox"} />{" "}Remember me
        </div>
        {props.captchaUrl && <img src={props.captchaUrl} alt="" />}
        {props.captchaUrl && <Field component={Input} name={"captcha"} validate={required} placeholder={"Symbols from image"} />}
        <div>
          <button type={"submit"}>login</button>
        </div>
      </form>)
    } />)
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
    //error: state.auth.error
  }
}

export default connect(mapStateToProps, { login })(Login)
