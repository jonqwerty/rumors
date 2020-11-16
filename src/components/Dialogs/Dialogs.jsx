
import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import  s from './Dialogs.module.css'
import Message from './Message/Message';



const Dialogs = (props) => {

    

    let dialogsElements = props.state.dialogs.map( d => <DialogItem name={d.name} id={d.id}/>) ;
    let messagesElements = props.state.messages.map(m => <Message message={m.message} />);

    let some = React.createRef();
    
    let add = () => {
        let text = some.current.value;
        alert(text);
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
            
                { dialogsElements }
                
            </div>
            <div className={s.messages}>

                 {messagesElements }
                
            </div>
            <div>
            <textarea ref={some}></textarea>
            <button onClick={ add }>www</button>
            </div>
        </div>
    )
}

export default Dialogs;