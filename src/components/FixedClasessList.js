import React, { useState, useEffect } from 'react';
import { Text, Layout } from '@ui-kitten/components';
import _ from 'underscore';
import { CustomSpinner } from './CustomSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const FixedClasessList = ({ regularClasses }) => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('FIXED', regularClasses);
    if (_.isEmpty(regularClasses)) {
      setError('No regulars to show');
    } else {
      setError(false);
      setloading(false);
    }
  }, [regularClasses]);

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        regularClasses.map((c) => <Text>{c.classId}</Text>)
      )}
    </Layout>
  );
};

export default FixedClasessList;
