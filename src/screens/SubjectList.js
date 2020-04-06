import React, { useState } from 'react';
import { SubjectCard } from '../components.js/SubjectCard';
import { Content } from 'native-base';

const javaImage = require('../assets/java.png');
const algoritmosImage = require('../assets/algoritmos.png');
const artificialImage = require('../assets/artificial.jpg');

export const SubjectList = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Java', img: javaImage },
    { name: 'Algoritmos', img: algoritmosImage },
    { name: 'Artificial', img: artificialImage },
  ]);
  return (
    <Content>
      {subjects.map((sub) => (
        <SubjectCard name={sub.name} image={sub.img} />
      ))}
    </Content>
  );
};
