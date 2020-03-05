import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';

const ShowScreen = ({navigation}) => {
  const {state} = useContext(BlogContext);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id'),
  );

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', {id: navigation.getParam('id')})
          }>
          <Text>Edit</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;
