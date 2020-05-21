import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

const blogReducer = (state, action) => {
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

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@post');
      const post = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(post);

      return post;
    } catch (e) {
      // error reading value
      console.log(e);
    }
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

  // reducer
  switch (action.type) {
    case 'add_blogpost': {
      const id = Math.floor(Math.random() * 999999);
      saveData(state, id, action.payload.title, action.payload.content);
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
      return state.filter(blogPost => blogPost.id !== action.payload);
    }
    case 'edit_blogpost': {
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
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

export const {Context, Provider} = createDataContext(
  blogReducer,
  {addBlogPost, deleteBlogPost, editBlogPost},
  [
    {title: 'TEST POST', content: 'TEST CONTENT', id: 1},
    {title: 'TEST POST 2', content: 'TEST CONTENT 2', id: 2},
  ],
  // [],
);
