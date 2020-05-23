import React, {useContext, useEffect} from 'react';
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
import {ScrollView} from 'react-native-gesture-handler';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost, readBlogPost} = useContext(BlogContext);

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

  return (
    <View style={{flex: 1, margin: 15}}>
      {state.length <= 0 ? (
        <Button
          title="Start Adding Post.. You can touch here or add icon on the right"
          onPress={() => navigation.navigate('Create')}
        />
      ) : null}

      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit', {id: item.id})}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
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
    fontSize: 36,
    marginHorizontal: 20,
  },
  deleteIcon: {
    fontSize: 30,
    justifyContent: 'center',
    paddingHorizontal: 5,
    color: 'crimson',
  },
});

export default IndexScreen;
