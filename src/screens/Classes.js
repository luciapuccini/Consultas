import React from 'react';
import { View } from 'react-native';
import { Item, Icon, Input } from 'native-base';

import { ClassList } from '../components/ClassList';
import { Layout } from '@ui-kitten/components';

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9108643300008c00e9cd5a')
      .then((response) => response.json())
      .then((json) => {
        setClasses(json);
      });
    if (route.params?.subject) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const results = !searchTerm
    ? classes
    : classes.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <>
      <View style={{ marginLeft: 20, marginTop: 10, width: '90%' }}>
        <Item>
          <Icon active name="search" />
          <Input placeholder="Clases" onChangeText={setSearchTerm} />
        </Item>
        <ClassList />
      </View>
    </>
  );
};
