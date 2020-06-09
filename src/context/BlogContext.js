import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const moment = require('moment');

// asyncstorage function
const saveData = async (state, id, title, content, lock) => {
  const jsonValue = JSON.stringify([
    ...state,
    {
      id: id,
      title: title,
      content: content,
      lock: lock,
    },
  ]);
  try {
    await AsyncStorage.setItem('@post', jsonValue);
  } catch (e) {
    console.log('Data save failed');
    console.log(e);
  }
  return state;
};

const saveEditData = async (state, editValue) => {
  const jsonValue = JSON.stringify(
    state.map(blogPost => {
      return blogPost.id === editValue.id ? editValue : blogPost;
    }),
  );
  try {
    await AsyncStorage.setItem('@post', jsonValue);
  } catch (e) {
    console.log('Data save failed');
    console.log(e);
  }
  return state;
};

const removeData = async (state, id) => {
  try {
    AsyncStorage.setItem(
      '@post',
      JSON.stringify(state.filter(blogPost => blogPost.id !== id)),
    );
  } catch (error) {
    console.log(error);
  }
};

const blogReducer = (state, action) => {
  // reducer
  switch (action.type) {
    case 'add_blogpost': {
      const id = moment(new Date()).format('DD/MM/YYYY-hh:mm:ss');
      saveData(
        state,
        id,
        action.payload.title,
        action.payload.content,
        action.payload.lock,
      );
      Toast.show('Data saved...', Toast.SHORT);
      return [
        ...state,
        {
          id: id,
          title: action.payload.title,
          content: action.payload.content,
          lock: action.payload.lock,
        },
      ];
    }
    case 'delete_blogpost': {
      removeData(state, action.payload);
      Toast.show('Data deleted...', Toast.SHORT);
      return state.filter(blogPost => blogPost.id !== action.payload);
    }
    case 'edit_blogpost': {
      saveEditData(state, action.payload);
      Toast.show('Data saved...', Toast.SHORT);
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    }
    case 'read_blogpost': {
      return [...state, ...action.payload];
    }
    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return (title, content, lock, callback) => {
    dispatch({type: 'add_blogpost', payload: {title, content, lock}});
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({type: 'delete_blogpost', payload: id});
  };
};

const editBlogPost = dispatch => {
  return (title, content, id, lock, callback) => {
    dispatch({type: 'edit_blogpost', payload: {title, content, id, lock}});
    if (callback) {
      callback();
    }
  };
};

const readBlogPost = dispatch => {
  return id => {
    dispatch({type: 'read_blogpost', payload: id});
  };
};

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost, readBlogPost},
  [],
);
