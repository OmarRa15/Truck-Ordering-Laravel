import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getUsers } from '../services/api';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersData = await getUsers();
      setUsers(usersData);
    }

    fetchData();
  }, []);

  return (
    <View>
      {users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
};

export default UsersScreen;
