import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import {Provider as NoteProvider} from './src/context/BlogContext';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
import ManagePwdScreen from './src/screens/ManagePwdScreen';
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Create: CreateScreen,
    Edit: EditScreen,
    Pwd: ManagePwdScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Notes',
    },
  },
);

const App = createAppContainer(navigator);

export default () => {
  return (
    <NoteProvider>
      <App />
    </NoteProvider>
  );
};
