
import React from 'react'
import { Redirect } from 'react-router-dom'
import { InitialStateType } from '../../redux/dialogs-reducer'
import { AddMessageFormRedux } from './AddMessageForm/AddMessageForm'
import DialogItem from './DialogItem/DialogItem'
import  s from './Dialogs.module.css'
import Message from './Message/Message'

type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id}/>) 
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
       
    let addNewMessage = (values: {newMessageBody: string}) => {
        props.sendMessage(values.newMessageBody)
    }

    //if (!props.isAuth ) return <Redirect  to={"/login"} />;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
            
                { dialogsElements }
                
            </div>
            <div className={s.messages}>

                 <div>{messagesElements }</div>
                     
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
            
        </div>
    )
}

export default Dialogs