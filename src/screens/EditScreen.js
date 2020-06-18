import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalLock from '../components/ModalLock';

const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id');
  const {state, editBlogPost, deleteBlogPost} = useContext(BlogContext);
  const blogPost = state.find(blogPost => blogPost.id === id);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLock, setIsLock] = useState(
    blogPost !== undefined ? blogPost.lock : false,
  );

  const handleDeletePost = () => {
    console.log('deleteData');
    deleteBlogPost(id);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    navigation.setParams({deletePost: handleDeletePost});
    navigation.setParams({navHandleModal: handleModal});
  }, []);

  return blogPost === undefined ? (
    navigation.pop()
  ) : (
    <View
      style={[
        {flex: 1},
        modalVisible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
      ]}>
      {modalVisible && (
        <ModalLock
          lock={isLock}
          handleModal={() => handleModal()}
          handleLock={() => {
            setIsLock(!isLock);
          }}
        />
      )}
      <BlogPostForm
        style={{flex: 1}}
        initialValues={{title: blogPost.title, content: blogPost.content}}
        onSubmit={(title, content, backHandler) => {
          blogPost.title !== title ||
          blogPost.content !== content ||
          blogPost.lock !== isLock
            ? editBlogPost(
                title,
                content,
                id,
                isLock,
                () => !backHandler && navigation.pop(),
              )
            : !backHandler && navigation.pop();
        }}
      />
    </View>
  );
};

EditScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="trash"
            style={styles.deleteIcon}
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
            }}
          />
          <Icon
            name="lock"
            style={styles.lockIcon}
            onPress={() => {
              navigation.state.params.navHandleModal();
            }}
          />
        </View>
      );
    },
  };
};

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: 28,
    color: 'crimson',
    justifyContent: 'center',
    marginRight: 16,
  },
  lockIcon: {
    fontSize: 30,
    color: 'black',
    justifyContent: 'center',
    marginRight: 16,
  },
});

export default EditScreen;
