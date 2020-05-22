import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

// asyncstorage function
const saveData = async (state, id, title, content) => {
  const jsonValue = JSON.stringify([
    ...state,
    {
      id: id,
      title: title,
      content: content,
    },
  ]);
  try {
    await AsyncStorage.setItem('@post', jsonValue);
    alert('Data saved');
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
      const id = Math.floor(Math.random() * 999999);
      saveData(state, id, action.payload.title, action.payload.content);
      console.log('state', state);
      return [
        ...state,
        {
          id: id,
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    }
    case 'delete_blogpost': {
      removeData(state, action.payload);
      console.log(action.payload);
      return state.filter(blogPost => blogPost.id !== action.payload);
    }
    case 'edit_blogpost': {
      const post = getData();
      console.log('post', post);
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
  return (title, content, callback) => {
    dispatch({type: 'add_blogpost', payload: {title, content}});
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
  return (title, content, id, callback) => {
    dispatch({type: 'edit_blogpost', payload: {title, content, id}});
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
