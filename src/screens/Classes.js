import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ClassCard } from '../components/ClassCard';
import { Layout, Icon } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { subjectId } = route.params.subject;

  React.useEffect(() => {
    const fetchClasses = async () => {
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

    if (route.params?.subject) {
      fetchClasses();
    } else if (route.params.bookings) {
      setClasses(route.params.bookings);
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
    return <ClassCard clase={item} isManager={isManager} />;
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!isManager && (
        <SearchBox setSearchTerm={setSearchTerm} placeholder="Professor" />
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
    </Layout>
  );
};
