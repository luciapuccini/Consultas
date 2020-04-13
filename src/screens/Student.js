import React from 'react';
import { SubjectList } from '../components/SubjectList';
import { SearchBox } from '../components/SearchBox';
export const Student = () => {
  const [subjects, setSubjects] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    //http://www.mocky.io/v2/5e9108643300008c00e9cd5a
    fetch('http://181.164.121.14:25565/subjects/findAll')
      .then((response) => response.json())
      .then((json) => {
        setSubjects(json);
      });
  }, [searchTerm]);

  const results = !searchTerm
    ? subjects
    : subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );

  return (
    <>
      <SearchBox setSearchTerm={setSearchTerm} placeholder="Materia" />
      <SubjectList subjects={results} />
    </>
  );
};
