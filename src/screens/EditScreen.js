import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({navigation}) => {
  const {state} = useContext(BlogContext);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id'),
  );

  return <BlogPostForm />;
};

const styles = StyleSheet.create({});

export default EditScreen;
