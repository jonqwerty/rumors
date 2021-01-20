import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { NewMessageFormType as NewMessageFormValuesType } from '../Dialogs'


const maxLength50 = maxLengthCreator(50)

type  NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}


const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return ( 
        <form onSubmit={props.handleSubmit }>
            <div>
                <Field component={Textarea} 
                validate={[required, maxLength50]}
                name="newMessageBody" 
                placeholder='Enter your message'/>
                
            </div>
            <div><button >Send</button></div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: "dialogAddMessageForm"}) (AddMessageForm)