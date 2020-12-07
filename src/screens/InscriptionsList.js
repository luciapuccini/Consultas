import React, { useEffect, useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { ScrollView } from 'react-native-gesture-handler';
import { ErrorMessage } from '../components/ErrorMessage';
import { getToken } from '../utils/authHelper';
import { InscriptionCard } from '../components/InscriptionCard';
// import { SERVER_URL } from '../utils/config';

const InscriptionsList = ({ route: { params } }) => {
  const { inscriptions } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (inscriptions.length > 0) {
      setLoading(false);
      setError(false);
    }
    if (inscriptions.length === 0) {
      setLoading(false);
      setError('No hay Inscriptos');
    }
  }, [inscriptions]);

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
          {inscriptions.map((student) => (
            <InscriptionCard student={student} />
          ))}
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
