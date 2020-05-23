import React from 'react';
import { FlatList } from 'react-native';
import { isEmpty } from 'underscore';
import { ClassCard } from '../components/ClassCard';
import { Layout } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';
import { ErrorMessage } from '../components/ErrorMessage';

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, setError] = React.useState(false);
  const { manager } = route.params;

  React.useEffect(() => {
    const fetchClasses = async () => {
      const { subjectId } = route.params?.subject;
      const token = await getToken();
      fetch(`http://181.164.121.14:25565/subjects/findClasses/${subjectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setClasses(json);
        });
    };

    if (route.params.subject) {
      console.log('Classes -> route.params?.subject', route.params?.subject);
      fetchClasses();
    } else if (route.params.bookings) {
      setClasses(route.params.bookings);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  React.useEffect(() => {
    setError(isEmpty(classes) ? 'No tienes inscripciones' : false);
  }, [classes]);

  const results = !searchTerm
    ? classes
    : classes.filter((clase) =>
        clase.professor.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );

  const renderItem = ({ item }) => {
    return <ClassCard clase={item} manager={manager} />;
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!manager && (
        <SearchBox setSearchTerm={setSearchTerm} placeholder="Profesor" />
      )}
      {!results ? (
        <CustomSpinner />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.id}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </Layout>
  );
};
