import React, {useContext} from 'react';
import {Button, FlatList, View, Text, StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost} = useContext(BlogContext);

  return (
    <View style={{flex: 1}}>
      <Button title="Add Post" onPress={() => navigation.navigate('Create')} />
      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                {/* <Icon name="trash" style={styles.icon} /> */}
                <TouchableOpacity
                  onPress={() => {
                    deleteBlogPost(item.id);
                  }}>
                  <Text>Delete Icon</Text>
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
          <Text>Add Icon</Text>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
