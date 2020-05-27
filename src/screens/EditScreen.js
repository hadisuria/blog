import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const EditScreen = ({navigation}) => {
  const {state, editBlogPost, deleteBlogPost} = useContext(BlogContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [uPwd, setUPwd] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  const id = navigation.getParam('id');
  const blogPost = state.find(blogPost => blogPost.id === id);
  const handleDeletePost = () => {
    console.log('deleteData');
    deleteBlogPost(id);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
    setIsWarning(false);
  };

  useEffect(() => {
    async function getPwd() {
      try {
        const pwd = await AsyncStorage.getItem('@pwd');
        setUPwd(pwd);
        return pwd;
      } catch (e) {
        // error reading value
        console.log('error', e);
      }
    }
    getPwd();
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsWarning(false);
        }}>
        <View style={styles.modal}>
          <View style={{flex: 3}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                handleModal();
              }}
            />
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{flex: 1}} />
              {blogPost.lock ? (
                <Text style={styles.modalHeaderTitle}>Note Locked</Text>
              ) : (
                <Text style={styles.modalHeaderTitle}>Note Lock Disabled</Text>
              )}
              <Icon
                name="close"
                style={styles.modalIconClose}
                onPress={() => handleModal()}
              />
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.contentText}>
                Enter password to lock/unlock
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                value={textInput}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={text => setTextInput(text)}
              />
              {isWarning && (
                <Text style={styles.warningText}>
                  *Incorrect password, please enter again
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (textInput === uPwd) {
                    setTextInput('');
                    console.log('BlogPost', blogPost);
                    {
                      blogPost.Lock
                        ? Toast.show('Lock Disabled', Toast.SHORT)
                        : Toast.show('Note Locked', Toast.SHORT);
                    }
                    editBlogPost(
                      blogPost.title,
                      blogPost.content,
                      blogPost.id,
                      !blogPost.lock,
                      handleModal(),
                    );
                  } else {
                    setIsWarning(true);
                    setTextInput('');
                  }
                }}>
                {blogPost.lock ? (
                  <View style={styles.lockButton}>
                    <Text style={styles.lockButtonText}>Unlock</Text>
                    <Icon name="unlock" style={styles.lockButtonIcon} />
                  </View>
                ) : (
                  <View style={styles.lockButton}>
                    <Text style={styles.lockButtonText}>Lock</Text>
                    <Icon name="lock" style={styles.lockButtonIcon} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BlogPostForm
        style={{flex: 1}}
        initialValues={{title: blogPost.title, content: blogPost.content}}
        onSubmit={(title, content) => {
          editBlogPost(title, content, id, state.lock, () => navigation.pop());
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
  // modal styling
  modal: {
    flex: 1,
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalHeader: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'orange',
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 14,
  },
  modalHeaderTitle: {
    flex: 16,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modalIconClose: {
    flex: 1,
    color: 'crimson',
    fontSize: 28,
  },
  modalContent: {
    flex: 1,
    // alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 32,
  },
  contentText: {
    paddingVertical: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'lightgrey',
    padding: 4,
  },
  warningText: {
    color: 'red',
  },
  lockButton: {
    marginVertical: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  lockButtonText: {
    fontSize: 18,
  },
  lockButtonIcon: {
    fontSize: 18,
    paddingHorizontal: 4,
  },
});

export default EditScreen;
