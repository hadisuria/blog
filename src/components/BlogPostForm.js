import React, {useState} from 'react';
import {TextInput, Button, View, Text, StyleSheet} from 'react-native';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View>
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
        style={styles.input}
        value={content}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setContent(text)}
      />

      <Button title="Add blog post" onPress={() => {}} />
    </View>
  );
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
