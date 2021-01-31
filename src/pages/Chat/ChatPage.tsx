import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageType } from '../../api/chat-api'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { AppStateType } from '../../redux/redux-store'





const ChatPage: React.FC = () => {
    return <div>
        <Chat /> 
    </div>
}

const Chat: React.FC = () => {

    // useEffect(() => {
    //     let ws: WebSocket
    //     const closeHandler = () => {
    //         console.log('CLOSE WS')
    //         setTimeout(createChannel, 3000)
    //     }
    //     function createChannel() {
            
    //         ws?.removeEventListener('close', closeHandler )
    //         ws?.close()
            
    //         ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    //         ws.addEventListener('close', closeHandler)
    //         setWsChannel(ws)    
    //     }
    //     createChannel()
        
    //     return () => {
    //         ws.removeEventListener('close', closeHandler )
    //         ws.close()
    //     }
    // }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
   

   
    return <div>
        <Messages />
        <AddMessageForm  />
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages )
    
    // useEffect(() => {
    //     let messageHandler = (e: MessageEvent) => {
    //         let newMessages = JSON.parse(e.data)
    //         setMessages((prevMessages) => [...prevMessages, ... newMessages])
    //     }
    //     wsChannel?.addEventListener('message', messageHandler)
        
    //     return () => {
    //         wsChannel?.removeEventListener('message', messageHandler)
    //     }

    // },[wsChannel])


    return <div style={{ height: '400px', overflowY: 'auto'}}>
        {messages.map((m , index) => <Message key={index} message={m} />)}
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>

        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readStatus, setReadStatus] = useState<'pending' | 'ready'>('pending')
        
    // useEffect(() => {
    //     let openHandler = () => {
    //         setReadStatus('ready')
    //     }
    //     wsChannel?.addEventListener('open', openHandler)
    //     return () => {
    //         wsChannel?.removeEventListener('open', openHandler)
    //     }
    // }, [wsChannel])

    const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div >
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
        <button disabled={ false } onClick={sendMessageHandler}>Send</button>
        </div>
        
    </div>
}

export default ChatPage