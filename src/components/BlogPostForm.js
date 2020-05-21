import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextInput
          testID="input_title"
          style={styles.title}
          multiline={true}
          placeholder="Title here"
          value={title}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          testID="input_content"
          style={styles.content}
          multiline={true}
          placeholder="Write here ..."
          value={content}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setContent(text)}
        />
      </View>
      <Button
        testID="btn_save"
        style={styles.saveBtn}
        title="Save blog post"
        onPress={() => {
          title === '' ? null : onSubmit(title, content);
        }}
      />
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
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'flex-end',
    fontSize: 24,
    alignItems: 'center',
    marginBottom: 5,
  },
  saveBtnText: {
    justifyContent: 'flex-end',
    fontSize: 24,
    alignItems: 'center',
    padding: 5,
  },
});

export default BlogPostForm;
