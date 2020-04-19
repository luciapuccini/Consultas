import React from 'react';
import { FlatList } from 'react-native';
import { ClassCard } from '../components/ClassCard';
import { Layout, Spinner } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';

const renderItem = ({ item }) => {
  return <ClassCard clase={item} />;
};

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9c0a2e30000049000a7d4d')
      .then((response) => response.json())
      .then((json) => {
        setClasses(json);
      });
    if (route.params?.subject) {
      //FIXME: fetch clases de esa subject
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const results = !searchTerm
    ? classes
    : classes.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <Layout>
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Clase" />
      {!results ? (
        <Spinner />
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
