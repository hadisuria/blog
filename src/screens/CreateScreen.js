import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Context as BlogContext} from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ModalLock from '../components/ModalLock';

const CreateScreen = ({navigation}) => {
  const {addBlogPost} = useContext(BlogContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLock, setIsLock] = useState(false);

  useEffect(() => {
    navigation.setParams({navHandleModal: handleModal});
  }, []);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View
      style={[{flex: 1}, modalVisible && {backgroundColor: 'rgba(0,0,0,0.5)'}]}>
      {modalVisible ? (
        <ModalLock
          lock={isLock}
          handleModal={() => handleModal()}
          handleLock={() => {
            setIsLock(!isLock);
          }}
        />
      ) : null}
      <BlogPostForm
        onSubmit={(title, content, backHandler) => {
          title === '' && content === ''
            ? !backHandler && navigation.navigate('Index')
            : addBlogPost(
                title,
                content,
                isLock,
                () => !backHandler && navigation.navigate('Index'),
              );
        }}
      />
    </View>
  );
};

CreateScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.state.params.navHandleModal();
          }}>
          <Icon name="lock" style={styles.lockIcon} />
        </TouchableOpacity>
      );
    },
  };
};

const styles = StyleSheet.create({
  lockIcon: {
    fontSize: 30,
    color: 'black',
    justifyContent: 'center',
    marginRight: 16,
  },
});

export default CreateScreen;
