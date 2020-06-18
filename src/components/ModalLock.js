import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalLock = ({lock, handleModal, handleLock}) => {
  const [isWarning, setIsWarning] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [uPwd, setUPwd] = useState('');

  async function getPwd() {
    try {
      const pwd = await AsyncStorage.getItem('@pwd');
      setUPwd(pwd);
      return pwd;
    } catch (e) {
      // error reading value
      console.log('error', e);
    }
  }

  async function handleInput() {
    if (textInput === uPwd) {
      setIsWarning(false);
      setTextInput('');
      handleLock();
    } else {
      setIsWarning(true);
      setTextInput('');
    }
    setUPwd('');
  }

  getPwd();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setIsWarning(false);
        handleModal();
      }}>
      <View style={styles.modal}>
        <View style={{flex: 3}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              handleModal();
            }}
          />
        </View>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={{flex: 1}} />
            <Text style={styles.modalHeaderTitle}>
              {lock === true ? 'Note Locked' : 'Note Lock Disabled'}
            </Text>
            <Icon
              name="close"
              style={styles.modalIconClose}
              onPress={() => handleModal()}
            />
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.contentText}>
              {lock === false
                ? 'Enter password to lock'
                : 'Enter password to unlock'}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              value={textInput}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={text => setTextInput(text)}
            />
            {isWarning && (
              <Text style={styles.warningText}>
                *Incorrect password, please enter again
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                handleInput();
              }}>
              {lock ? (
                <View style={styles.lockButton}>
                  <Text style={styles.lockButtonText}>Unlock</Text>
                  <Icon name="unlock" style={styles.lockButtonIcon} />
                </View>
              ) : (
                <View style={styles.lockButton}>
                  <Text style={styles.lockButtonText}>Lock</Text>
                  <Icon name="lock" style={styles.lockButtonIcon} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  // modal styling
  modal: {
    flex: 1,
  },
  modalContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 14,
  },
  modalHeader: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'orange',
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 8,
  },
  modalHeaderTitle: {
    flex: 16,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modalIconClose: {
    flex: 1,
    color: 'crimson',
    fontSize: 28,
  },
  modalContent: {
    flex: 1,
    // alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 32,
  },
  contentText: {
    paddingVertical: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'lightgrey',
    padding: 4,
  },
  warningText: {
    color: 'red',
  },
  lockButton: {
    marginVertical: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  lockButtonText: {
    fontSize: 18,
  },
  lockButtonIcon: {
    fontSize: 18,
    paddingHorizontal: 4,
  },
});

export default ModalLock;
