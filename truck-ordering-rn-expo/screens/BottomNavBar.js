import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose another icon set if you prefer

const BottomNavBar = ({ navigation }) => {
    const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('AdminDashboard')}
      >
        <Icon name="home" size={30} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Icon name="notifications" size={30} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    // width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavBar;
