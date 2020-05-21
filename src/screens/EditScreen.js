import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation}) => {
  const {state, editBlogPost} = useContext(BlogContext);

  const id = navigation.getParam('id');
  const blogPost = state.find(blogPost => blogPost.id === id);

  return (
    <BlogPostForm
      style={{flex: 1}}
      initialValues={{title: blogPost.title, content: blogPost.content}}
      onSubmit={(title, content) => {
        editBlogPost(title, content, id, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
