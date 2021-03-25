import React, { useState } from 'react';
import { FlatList } from 'react-native';
import _ from 'underscore';

import { SubjectCard } from './SubjectCard';

export const SubjectList = ({ allSubjects, followed, refresh }) => {
  const [subjects, setSubjects] = useState([]);
  React.useEffect(() => {
    const checkFollowed = () => {
      let replaceArray = [];
      allSubjects.forEach((subject) => {
        let replaceSubject = {};
        let follows = false;
        followed.forEach((userSubject) => {
          if (_.isEqual(subject, userSubject)) {
            follows = true;
          }
        });
        replaceSubject = { ...subject, follows };
        replaceArray.push(replaceSubject);
      });
      setSubjects(replaceArray);
    };

    if (allSubjects && followed) {
      checkFollowed();
    }
  }, [allSubjects, followed]);

  const renderItem = ({ item, index }) => {
    return <SubjectCard subject={item} refresh={refresh} />;
  };
  return (
    <FlatList
      data={subjects.sort((a,b)=>{
        //FIXME: mas lindo
          if(a.name < b.name) {return -1}
          if(a.name > b.name) {return 1}
          return 0
      })}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name}
      contentContainerStyle={{ paddingBottom: 360 }}
    />
  );
};
