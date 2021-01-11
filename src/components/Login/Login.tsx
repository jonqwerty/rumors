import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import s from './../../components/common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (            
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'}
                    validate={[required]} 
                    component={Input}/>
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} type={'password'}
                    validate={[required]} 
                     component={Input}/>
                </div>
                <div>
                    <Field component={Input} name={'rememberMe'} type={"checkbox"}/> remember me
                </div>
                <div>

                {props.captchaUrl && <img src={props.captchaUrl}/>}
                {props.captchaUrl && <Field placeholder={'Symbol from image'} name={'captcha'}
                    validate={[required]} 
                    component={Input}/>}

                {  props.error &&  <div className={s.formSummaryError}>
                        {props.error}
                    </div>
                }
                    <button>Login</button>
                </div>
            </form>
   )  
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<MapStatePropsType  & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) =>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
                <h1>Login</h1>
            
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
            </div>      
    
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login}) (Login);