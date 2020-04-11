import React from 'react';
import { TextInput, ScrollView, View } from 'react-native';
import { Item, Icon, Input } from 'native-base';
import { SubjectList } from './SubjectList';

export const Student = () => {
  const [subjects, setSubjects] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9108643300008c00e9cd5a')
      .then((response) => response.json())
      .then((json) => {
        setSubjects(json);
      });
  }, [searchTerm]);

  const results = !searchTerm
    ? subjects
    : subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <>
      <View style={{ marginLeft: 20, marginTop: 10, width: '90%' }}>
        <Item>
          <Icon active name="search" />
          <Input placeholder="Materia" onChangeText={setSearchTerm} />
        </Item>
      </View>
      <SubjectList subjects={results} />
    </>
  );
};
