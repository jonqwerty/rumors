
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimas'},
        {id: 2, name: 'Barby'},
        {id: 3, name: 'Sindy'},
        {id: 4, name: 'Bobo'},
        {id: 5, name: 'Worm'},
        {id: 6, name: 'Saw'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'YoYoYo'}
      ]
     
  }

const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        
        case SEND_MESSAGE:
            let body = action.newMessageBody ;
            return{
                ...state,               
                messages: [ ...state.messages, {id: 6, message: body} ]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer; 