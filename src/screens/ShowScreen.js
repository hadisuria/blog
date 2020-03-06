import React, {useContext} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShowScreen = ({navigation}) => {
  const {state} = useContext(BlogContext);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id'),
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.title}>{blogPost.title}</Text>
      </View>
      <Text style={styles.content}>{blogPost.content}</Text>
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
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Icon name="edit" style={styles.editIcon} />
          </View>
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  content: {
    marginVertical: 5,
    fontSize: 18,
  },
  editIcon: {
    fontSize: 28,
    justifyContent: 'center',
    marginRight: 20,
  },
});

export default ShowScreen;
