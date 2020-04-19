import React from 'react';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
import _ from 'underscore';

export const Student = ({ user }) => {
  const [subjects, setSubjects] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          'http://www.mocky.io/v2/5e9b5df63300005000bf1784',
        );
        const json = await response.json();
        setSubjects(json);
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
    <>
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Materia" />
      <SubjectList allSubjects={results} followed={user.followedSubjects} />
    </>
  );
};
