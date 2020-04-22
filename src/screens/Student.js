import React from 'react';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
import _ from 'underscore';

import { Layout } from '@ui-kitten/components';
import { CustomSpinner } from '../components/CustomSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const Student = ({ user }) => {
  const [loading, setLoading] = React.useState(true);
  const [subjects, setSubjects] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          'http://www.mocky.io/v2/5e9b5df63300005000bf1784',
          // 'http://181.164.121.14:25565/subjects/findAll',
          { headers: { 'Content-Type': 'application/json' } },
        );
        const json = await response.json();
        setSubjects(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, [searchTerm]);

  const results = !searchTerm
    ? subjects
    : subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <Layout level="1">
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Materia" />
      {!_.isEmpty(results) ? (
        <SubjectList allSubjects={results} followed={user.followedSubjects} />
      ) : loading ? (
        <CustomSpinner />
      ) : (
        <ErrorMessage message="No Subjects" />
      )}
    </Layout>
  );
};
