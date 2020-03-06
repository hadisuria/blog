import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues}) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  return (
    <View style={{margin: 15}}>
      <Text>Create Blog Screen</Text>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.label}>Enter Contents:</Text>
      <TextInput
        multiline={true}
        defaultValue={title}
        style={styles.input}
        value={content}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setContent(text)}
      />
      <Button
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
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default BlogPostForm;
