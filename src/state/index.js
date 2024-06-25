// Redux slice that manages the state of an application's authentication and user information
import { createSlice } from "@reduxjs/toolkit";

// it defines an initial state object that has properties for the current mode (light or dark), the currently logged-in user, the user's token, and an array of posts.
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth", //the name of the slice
  initialState, //the initial state object defined earlier.

  //  an object that defines the actions that can be dispatched to change the state and the corresponding state updates for each action.
  // The actions are
  reducers: {

    // changes the current mode between light and dark.
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    // sets the user and token properties of the state to the values passed in the action payload.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    //  sets the user and token properties of the state to null.
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    // sets the friends property of the user object to the value passed in the action payload.
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    // sets the posts property of the state to the value passed in the action payload.
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    // updates a specific post in the posts array by finding the post with the id passed in the action payload and replacing it with the post object also passed in the action payload.
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
