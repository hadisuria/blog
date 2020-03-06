import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditScreen = ({navigation}) => {
  const {state, editBlogPost} = useContext(BlogContext);

  const id = navigation.getParam('id');
  const blogPost = state.find(blogPost => blogPost.id === id);

  return (
    <BlogPostForm
      initialValues={{title: blogPost.title, content: blogPost.content}}
      onSubmit={(title, content) => {
        editBlogPost(title, content, id, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
