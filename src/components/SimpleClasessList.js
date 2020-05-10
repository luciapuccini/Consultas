import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { CustomSpinner } from './CustomSpinner';
import { SimpleClassCard } from './SimpleClassCard';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import _ from 'underscore';
import { ErrorMessage } from './ErrorMessage';

const SimpleClasessList = ({ simpleClasses, subject, manager }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (_.isEmpty(simpleClasses)) {
      setError('No Simples to show');
    } else {
      setError(false);
      setLoading(false);
    }
  }, [simpleClasses]);

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <ScrollView>
          {simpleClasses.map((clase) => {
            return <SimpleClassCard clase={clase} subject={subject} />;
          })}
        </ScrollView>
      )}

      <AddClass subjectId={subject.subjectId} />
    </Layout>
  );
};

const AddClass = ({ subjectId }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Add Class', { subjectId })}
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
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
};
export default SimpleClasessList;
