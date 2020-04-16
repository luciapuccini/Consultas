import React from 'react';
import { View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';
import { SubjectList } from '../components/SubjectList';
//TODO: fetch consultas de ese profe
export const Professor = () => {
  const [subjects, setSubjects] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    //http://www.mocky.io/v2/5e9108643300008c00e9cd5a
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
    <View>
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Materia" />
      <SubjectList subjects={results} />
    </View>
  );
};
