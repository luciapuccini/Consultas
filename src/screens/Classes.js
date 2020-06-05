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
  const [loading, setloading] = React.useState(false);

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
          if (json.error) {
            console.log(json.message);
          }
          if (isEmpty(json)) {
            setError('No hay clases para esta materia');
          }
          setClasses(json);
          setloading(false);
        });
    };

    const fetchStudentSubscriptions = async () => {
      const token = await getToken();
      fetch('http://181.164.121.14:25565/users/getStudentInscriptions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (isEmpty(json)) {
            setError('No hay clases para esta materia');
          } else if (json.error) {
            setError(json.message);
          }
          setClasses(json);
          setloading(false);
        });
    };

    if (route.params.subject) {
      setloading(true);
      fetchClasses();
    } else if (route.params.studentSubscriptions) {
      setloading(true);
      fetchStudentSubscriptions();
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

  const renderItem = ({ item }) => {
    return <ClassCard clase={item} manager={manager} />;
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!manager && (
        <SearchBox setSearchTerm={setSearchTerm} placeholder="Profesor" />
      )}

      {error ? (
        <ErrorMessage message={error} />
      ) : loading ? (
        <CustomSpinner />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyExtractor={(item) => item.id}
        />
      )}
    </Layout>
  );
};
