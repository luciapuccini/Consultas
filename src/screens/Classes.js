import React from 'react';
import { FlatList, View } from 'react-native';
import { isEmpty } from 'underscore';
import { ClassCard } from '../components/ClassCard';
import { Layout, TabView, Tab,Text } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';
import { CustomSpinner } from '../components/CustomSpinner';
import { getToken } from '../utils/authHelper';
import { ErrorMessage } from '../components/ErrorMessage';
import { SERVER_URL } from '../utils/config';

export const Classes = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [classes, setClasses] = React.useState(null);
  const [inscriptions, setInscriptions] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setloading] = React.useState(false);

  const { manager, subject } = route.params;

  React.useEffect(() => {
    const fetchClasses = async () => {
      const { subjectId } = route.params?.subject;
      const token = await getToken();
      fetch(`${SERVER_URL}/subjects/findClasses/${subjectId}`, {
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
          setClasses(json);
          setloading(false);
        });
    };

    const fetchStudentSubscriptions = async () => {
      const token = await getToken();
      fetch(`${SERVER_URL}/users/getStudentInscriptions`, {
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
          setInscriptions(json);
          setloading(false);
        });
    };

    setloading(true);
    fetchClasses();
    fetchStudentSubscriptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const results = !searchTerm
    ? classes
    : classes.filter((clase) =>
        clase.professor.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );

  const inscriptionsResults = !searchTerm
    ? inscriptions
    : inscriptions.filter((i) =>
        i.professor.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  const renderItem = ({ item }) => {
    return <ClassCard clase={item} manager={manager} subject={subject} />;
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!manager && (
        <SearchBox setSearchTerm={setSearchTerm} placeholder="Profesor" />
      )}

      {loading ? (
        <CustomSpinner />
      ) : (
        <TabView
          style={{
            marginTop: 10,
          }}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <Tab title="CLASES">
           {results && results.length === 0?
           <ClassesError/>
           :
            <FlatList
              data={results}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 80 }}
              keyExtractor={(item) => item.id}
            />}
          </Tab>
          <Tab title="INSCRIPCIONES">
           {inscriptionsResults && inscriptionsResults.length === 0? 
            <ClassesError/>
           :
            <FlatList
              data={inscriptionsResults}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 80 }}
              keyExtractor={(item) => item.id}
            />}
          </Tab>
        </TabView>
      )}
    </Layout>
  );
};


const ClassesError =()=>(
  <View style={{flex:1, alignSelf:'center'}}>
  <Text style={{color:"red"}}>No hay clases</Text>
  </View>);
