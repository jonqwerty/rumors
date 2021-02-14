import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatMessageAPIType } from '../../api/chat-api'
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
    
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
   

   
    return <div>
        {status === 'error' && <div>Some error ocurred. Please refresh the page</div> }
            <>
                <Messages />
                <AddMessageForm  />
            </>
        
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages )

    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight) < 300 ) {
           !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
             
        }

    }
    

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
        
    }, [messages])
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


    return <div style={{ height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m , index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{message: ChatMessageAPIType}> = React.memo( ({message}) => {

    return <div>

        <img src={message.photo} style={{width: '30px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
})

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)
        
    // useEffect(() => {
    //     let openHandler = () => {
    //         setReadStatus('ready')
    //     }
    //     wsChannel?.addEventListener('open', openHandler)
    //     return () => {
    //         wsChannel?.removeEventListener('open', openHandler)
    //     }
    // }, [wsChannel])

    


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
            <button disabled={ status !== 'ready' } onClick={sendMessageHandler}>Send</button>
        </div>
        
    </div>
}

export default ChatPage