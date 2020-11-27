import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { ScrollView } from 'react-native-gesture-handler';
import { ErrorMessage } from '../components/ErrorMessage';
import { getToken } from '../utils/authHelper';
import { InscriptionCard } from '../components/InscriptionCard';
// import { SERVER_URL } from '../utils/config';

const InscriptionsList = ({ subject, manager, refresh }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const fetchInscriptions = async () => {
    const token = await getToken();
    setList([
      {
        student: {
          name: 'test student',
          surname: 'pedo',
          phone: '5493364347796',
        },
      },
    ]);
    // fetch(`${SERVER_URL}/clases/findClassData/${id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then((response) => response.json());
  };
  useEffect(() => {
    setLoading(true);
    fetchInscriptions();
    if (list.length > 0) {
      setLoading(false);
      setError(false);
    }
    if (list.length === 0) {
      setLoading(false);
      setError('No hay Inscriptos');
    }
  }, [list]);

  if (error) {
    return (
      <Layout level="1" style={{ flex: 1 }}>
        <ErrorMessage message={error} />
      </Layout>
    );
  }

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {loading ? (
        <CustomSpinner />
      ) : (
        <ScrollView>
          {list.map((object) => {
            return <InscriptionCard student={object.student} />;
          })}
        </ScrollView>
      )}
    </Layout>
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
};
export default InscriptionsList;
