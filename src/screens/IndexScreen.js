import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import ModalLock from '../components/ModalLock';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost, readBlogPost} = useContext(BlogContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressedId, setPressedId] = useState('');

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
    modalVisible === false ? null : setPressedId('');
    setModalVisible(!modalVisible);
    // setIsWarning(false);
  };

  return (
    <View style={{flex: 1, margin: 15}}>
      {modalVisible ? (
        <ModalLock
          lock={true}
          handleModal={() => handleModal()}
          handleLock={() => {
            handleModal();
            navigation.navigate('Edit', {id: pressedId});
          }}
        />
      ) : null}
      {state.length <= 0 ? (
        <Button
          title="Start Adding Post.. You can touch here or add icon on the right"
          onPress={() => navigation.navigate('Create')}
        />
      ) : null}
      <FlatList
        data={[...state].reverse()}
        keyExtractor={blogPost => blogPost.id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                style={pressedId === item.id ? styles.pressedItem : null}
                onPress={() => {
                  if (item.lock) {
                    setPressedId(item.id);
                    handleModal();
                  } else {
                    navigation.navigate('Edit', {id: item.id});
                  }
                }}>
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {item.title}
                    {item.lock}
                  </Text>
                  <TouchableOpacity
                    disabled={item.lock}
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
                    {!item.lock ? (
                      <Icon name="trash" style={styles.deleteIcon} />
                    ) : (
                      <Icon name="trash" style={styles.deleteIconDisabled} />
                    )}
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
  pressedItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
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
  deleteIconDisabled: {
    fontSize: 32,
    justifyContent: 'center',
    paddingHorizontal: 2,
    color: 'rgba(220,20,60,0.5)',
  },
});

export default IndexScreen;
