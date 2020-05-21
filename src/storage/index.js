import AsyncStorage from '@react-native-community/async-storage';

function saveData(state) {
  let data = {
    state,
  };

  AsyncStorage.setItem('@post', JSON.stringify(data));

  alert('Data saved');

  return state;
}
