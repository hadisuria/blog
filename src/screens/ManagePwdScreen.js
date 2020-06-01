import React, {useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ManagePwdScreen = () => {
  const [pwd, setPwd] = useState('');
  const [enterPwd, setEnterPwd] = useState('');
  const [c_pwd, setC_Pwd] = useState('');
  const [c_cpwd, setC_Cpwd] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const pwd = await AsyncStorage.getItem('@pwd');
        return pwd === null ? pwd : setPwd(pwd);
      } catch (e) {
        // error reading value
        console.log('error', e);
      }
    }
    getData();
  }, []);

  const savePwd = async c_pwd => {
    try {
      await AsyncStorage.setItem('@pwd', c_pwd);
      alert('Password Saved');
    } catch (e) {
      console.log('Error save password');
    }
  };

  return (
    <View style={styles.container}>
      {pwd === '' ? (
        <View>
          <Text style={styles.textTitle}>Set Password</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.textTitle}>Change Current Password</Text>
          <Text style={styles.text}>Enter Current Password to continue</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Current Password"
            value={enterPwd}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => setEnterPwd(text)}
          />
        </View>
      )}
      {pwd === enterPwd && (
        <View>
          <Text style={styles.text}>Input password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={c_pwd}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => setC_Pwd(text)}
          />
          <Text style={styles.text}>Input confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password..."
            value={c_cpwd}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => setC_Cpwd(text)}
          />
          <TouchableOpacity
            style={styles.saveBtn}
            title="Save blog post"
            onPress={() => {
              if (c_pwd === '' || c_pwd !== c_cpwd) {
                setC_Pwd('');
                setC_Cpwd('');
                alert('Password Incorect');
              } else {
                savePwd(c_pwd);
                setC_Pwd('');
                setC_Cpwd('');
                setEnterPwd('');
              }
            }}>
            <Text style={styles.saveBtnText}>Save Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 8,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 4,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 2,
    marginVertical: 2,
  },
  saveBtn: {
    justifyContent: 'flex-end',
    fontSize: 24,
    alignItems: 'center',
    marginVertical: 5,
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

export default ManagePwdScreen;
