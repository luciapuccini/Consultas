import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { SimpleClassCard } from './SimpleClassCard';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { ErrorMessage } from './ErrorMessage';
import { getToken } from '../utils/authHelper';

const SimpleClasessList = ({ simpleClasses, subject, manager, refresh }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (simpleClasses.length > 0) {
      setLoading(false);
      setError(false);
    }
    if (simpleClasses.length === 0) {
      setLoading(true);
    }
  }, [simpleClasses]);

  const deleteClasses = async (refresh) => {
    const token = await getToken();
    try {
      fetch('http://181.164.121.14:25565/clases/cancelClass', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classesToRemove: toDelete }),
      })
        .then((res) => res.json())
        .then((data) => {
          refresh();
        });
    } catch (error) {
      console.log('Upss', error);
    }
  };

  const DeleteClass = ({ refresh }) => {
    return (
      <TouchableOpacity
        style={style.touchableDeleteStyle}
        onPress={() => deleteClasses(refresh)}>
        <Icon name="close" fill="#fff" style={style.FABDeleteStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {loading ? (
        <CustomSpinner />
      ) : (
          <ScrollView>
            {simpleClasses.map((clase) => {
              return (
                <SimpleClassCard
                  clase={clase}
                  subject={subject}
                  manager={manager}
                  toDelete={toDelete}
                  setToDelete={setToDelete}
                />
              );
            })}
          </ScrollView>
        )}
      {error && <ErrorMessage message={error} />}

      <AddClass subjectId={subject.subjectId} refresh={refresh} />
      <DeleteClass subjectId={subject.subjectId} refresh={refresh} />
    </Layout>
  );
};

const AddClass = ({ subjectId, refresh }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Add Class', { subjectId, refresh })}
      style={style.touchableStyle}>
      <Icon name="plus" fill="#fff" style={style.FloatingButtonStyle} />
    </TouchableOpacity>
  );
};

const style = {
  touchableStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  touchableDeleteStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
  FABDeleteStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#E53935',
    borderRadius: 25,
  },
};
export default SimpleClasessList;
