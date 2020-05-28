import React, {useState, useEffect} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  BackHandler,
} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  useEffect(() => {
    const backAction = () => {
      onSubmit(title, content);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [title, content, onSubmit]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.textContainer}>
        <TextInput
          testID="input_title"
          style={styles.title}
          multiline={true}
          placeholder="Title here"
          value={title}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <TextInput
          testID="input_content"
          style={styles.content}
          multiline={true}
          placeholder="Write here ..."
          value={content}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => {
            setContent(text);
          }}
        />
      </ScrollView>
      <TouchableOpacity
        testID="btn_save"
        style={styles.saveBtn}
        title="Save blog post"
        onPress={() => {
          title === '' ? null : onSubmit(title, content);
        }}>
        <Text style={styles.saveBtnText}>Save Blog Post</Text>
      </TouchableOpacity>
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  textContainer: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
  },
  content: {
    margin: 5,
    fontSize: 18,
    alignItems: 'flex-start',
  },
  saveBtn: {
    justifyContent: 'flex-end',
    fontSize: 24,
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 5,
    backgroundColor: 'orange',
  },
  saveBtnText: {
    justifyContent: 'flex-end',
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    padding: 5,
  },
});

export default BlogPostForm;
