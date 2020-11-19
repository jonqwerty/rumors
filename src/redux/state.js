import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";



let store = {
  _state:{
    profilePage:{
      posts: [
          {id: 1, message: 'Hi, how are you?', likesCount: 12},
          {id: 2, message: "It's my first post", likesCount: 45},  
          {id: 2, message: "blabla", likesCount: 45},  
          {id: 4, message: "dada", likesCount: 45}  
      ],
      newPostText: 'it-kamasutra.com',
    },
    dialogsPage:{
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
        ],
        newMessageBody: ""
    },
    sidebar:{},
  },
  _callSubscriber()  {
    console.log('State is changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer)  {
    this._callSubscriber = observer;
  },

  
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state);

  }
}

      
  export default store;
  window.state = store;