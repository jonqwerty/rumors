import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
  posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: "It's my first post", likesCount: 45},  
      {id: 2, message: "blabla", likesCount: 45},  
      {id: 4, message: "dada", likesCount: 45}  
  ]
}

  test ('length of post should be incremented', () => {
    let action = addPostActionCreator('it-guru')
    
    let newState = profileReducer (state, action)
    
    expect(newState.posts[4].message).toBe('it-guru')
  })

  test ('message of new post should be correct ', () => {
    let action = addPostActionCreator(5)
    
    let newState = profileReducer (state, action)

    expect(newState.posts.length).toBe('it-guru')
    
  })

  test ('after deleting length of messages should be decrement', () => {
    let action = deletePost(1)
    
    let newState = profileReducer (state, action)

    expect(newState.posts.length).toBe(3)
    
  })

  test ('after deleting length should not be decrement if id is incorrect', () => {
    let action = deletePost(1000)
    
    let newState = profileReducer (state, action)

    expect(newState.posts.length).toBe(4)
    
  })


