import React, {useContext} from 'react';
import {Button, FlatList, View, Text, StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const IndexScreen = ({navigation}) => {
  const {state, deleteBlogPost} = useContext(BlogContext);

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
              onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => {
                    deleteBlogPost(item.id);
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
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  title: {
    flex: 3,
    fontSize: 20,
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 36,
    marginHorizontal: 20,
  },
  deleteIcon: {
    flex: 1,
    fontSize: 28,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default IndexScreen;
