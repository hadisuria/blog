import React, {useContext, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditScreen = ({navigation}) => {
  const {state, editBlogPost, deleteBlogPost} = useContext(BlogContext);

  const id = navigation.getParam('id');
  const blogPost = state.find(blogPost => blogPost.id === id);
  const handleDeletePost = () => {
    console.log('deleteData');
    deleteBlogPost(id);
  };

  useEffect(() => {
    navigation.setParams({deletePost: handleDeletePost});
  }, []);

  return blogPost === undefined ? (
    navigation.pop()
  ) : (
    <BlogPostForm
      style={{flex: 1}}
      initialValues={{title: blogPost.title, content: blogPost.content}}
      onSubmit={(title, content) => {
        editBlogPost(title, content, id, () => navigation.pop());
      }}
    />
  );
};

EditScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Attention', 'Are you sure want to delete this ?', [
              {
                text: 'NO',
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: () => {
                  navigation.pop();
                  navigation.state.params.deletePost();
                },
              },
            ]);
          }}>
          <Icon name="trash" style={styles.deleteIcon} />
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: 28,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default EditScreen;
