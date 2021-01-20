import { InferActionsTypes } from "./redux-store"

//const SEND_MESSAGE = 'R/DIALOGS/SEND-MESSAGE'

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimas'},
        {id: 2, name: 'Barby'},
        {id: 3, name: 'Sindy'},
        {id: 4, name: 'Bobo'},
        {id: 5, name: 'Worm'},
        {id: 6, name: 'Saw'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'YoYoYo'}
      ] as Array<MessageType>
     
  }



const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        
        case 'R/DIALOGS/SEND-MESSAGE':
            let body = action.newMessageBody ;
            return{
                ...state,               
                messages: [ ...state.messages, {id: 6, message: body} ]
            };
        default:
            return state;
    }
}


export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'R/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}


export default dialogsReducer

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>