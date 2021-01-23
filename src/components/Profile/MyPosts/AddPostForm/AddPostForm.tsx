import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {createField, GetStringKeys, Input} from '../../../common/FormsControls/FormsControls'
import {required} from '../../../../utils/validators/validators'

type PropsType = {

}

export type AddPostFormValuesType = {
    newPostText: string
}

//type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={"textarea"} name="newPostText" />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'profile-add-post'})(AddPostForm)