let rerenderEntireTree = () => {
  console.log('State is changed');
}
  let state = {
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
          ]
      }
       
  }

  export const addPost = () => {
    let newPost = {
      id: 5,
      message: state.profilePage.newPostText,
      likesCount: 0
      };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
  }

  export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
  }

  export const subscribe = (observer) => {
    rerenderEntireTree = observer;
  }

  export default state;