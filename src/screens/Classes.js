import React from 'react';

import { ClassList } from '../components/ClassList';
import { Layout, Spinner } from '@ui-kitten/components';
import { SearchBox } from '../components/SearchBox';

export const Classes = ({ navigation, route }) => {
  const [classes, setClasses] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('http://www.mocky.io/v2/5e9108643300008c00e9cd5a')
      .then((response) => response.json())
      .then((json) => {
        setClasses(json);
      });
    if (route.params?.subject) {
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
      {!results ? <Spinner /> : <ClassList />}
    </Layout>
  );
};
