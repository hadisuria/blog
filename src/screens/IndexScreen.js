import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost, readBlogPost} = useContext(BlogContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [pressedId, setPressedId] = useState('');
  const [uPwd, setUPwd] = useState('');

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

  useEffect(() => {
    async function getData() {
      try {
        const jsonValue = await AsyncStorage.getItem('@post');
        let post = [];
        post = jsonValue != null ? post.concat(JSON.parse(jsonValue)) : post;
        readBlogPost(post);
      } catch (e) {
        // error reading value
        console.log('error', e);
      }
    }
    getData();
  }, []);

  const handleModal = () => {
    setModalVisible(!modalVisible);
    setIsWarning(false);
  };

  return (
    <View style={{flex: 1, margin: 15}}>
      {state.length <= 0 ? (
        <Button
          title="Start Adding Post.. You can touch here or add icon on the right"
          onPress={() => navigation.navigate('Create')}
        />
      ) : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setTextInput('');
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
              <Text style={styles.modalHeaderTitle}>Enter Password</Text>
              <Icon
                name="close"
                style={styles.modalIconClose}
                onPress={() => handleModal()}
              />
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.contentText}>Enter password to unlock</Text>
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
                onPress={item => {
                  if (textInput === uPwd) {
                    setTextInput('');
                    handleModal();
                    navigation.navigate('Edit', {id: pressedId});
                  } else {
                    setIsWarning(true);
                    setTextInput('');
                  }
                }}>
                <View style={styles.lockButton}>
                  <Text style={styles.lockButtonText}>Unlock</Text>
                  <Icon name="unlock" style={styles.lockButtonIcon} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={[...state].reverse()}
        keyExtractor={blogPost => blogPost.id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (item.lock) {
                    setPressedId(item.id);
                    handleModal();
                  } else {
                    navigation.navigate('Edit', {id: item.id});
                  }
                }}>
                <View style={styles.row}>
                  <Text style={styles.title}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => {
                      Alert.alert(
                        'Attention',
                        'Are you sure want to delete this ?',
                        [
                          {
                            text: 'NO',
                            style: 'cancel',
                          },
                          {
                            text: 'YES',
                            onPress: () => {
                              deleteBlogPost(item.id);
                            },
                          },
                        ],
                      );
                    }}>
                    <Icon name="trash" style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Icon name="plus" style={styles.addIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Pwd');
            }}>
            <Icon name="bars" style={styles.optionIcon} />
          </TouchableOpacity>
        </View>
      );
    },
  };
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  addIcon: {
    fontSize: 32,
    marginHorizontal: 20,
  },
  optionIcon: {
    fontSize: 32,
    color: 'black',
    justifyContent: 'center',
    marginRight: 16,
  },
  deleteIcon: {
    fontSize: 32,
    justifyContent: 'center',
    paddingHorizontal: 2,
    color: 'crimson',
  },

  //modal style
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

export default IndexScreen;
