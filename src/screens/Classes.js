import React from 'react';
import { FlatList } from 'react-native';
import { ClassCard } from '../components/ClassCard';
import { Layout, Spinner } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';
import { View } from 'native-base';
import { CustomSpinner } from '../components/CustomSpinner';

const renderItem = ({ item }) => {
  return <ClassCard clase={item} />;
};

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const { subjectId } = route.params.subject;
    // http://181.164.121.14:25565/subejcts/findClasses/id
    // http://www.mocky.io/v2/5e9d222930000022cb0a80fd
    if (route.params?.subject) {
      try {
        fetch(`http://181.164.121.14:25565/subjects/findClasses/${subjectId}`, {
          // fetch('http://www.mocky.io/v2/5e9fcd072d00005300cb7d08', {
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((json) => {
            setClasses(json);
          });
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const results = !searchTerm
    ? classes
    : classes.filter((clase) =>
        clase.professor.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Professor" />
      {!results ? (
        <CustomSpinner />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.name}
        />
      )}
    </Layout>
  );
};
