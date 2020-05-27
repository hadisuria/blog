import React, {useState} from 'react';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';

const ModalOption = isModalVisible => {
  const [modalVisible, setModalVisible] = useState(isModalVisible);
  console.log('modalvisible o', modalVisible);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default ModalOption;
