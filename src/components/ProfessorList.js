import React, { useState, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { ListItem, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { _ } from 'underscore';

export const ProfessorList = ({ professors }) => {
  const navigation = useNavigation();
  const [sortedProfes, setSortedProfes] = useState([]);
  useEffect(() => {
    setSortedProfes(professors.sort());
  }, [professors]);

  const loopLeters = () => {
    const leters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'W',
      'X',
      'Y',
      'Z',
    ];

    const profes = [];

    sortedProfes.forEach((profe) => {
      const nombre = `${profe.surname} ${profe.name}`;
      profes.push(nombre);
    });

    return leters.map((l) => {
      const sublista = [];
      profes.forEach((profe) => {
        const pertenece = profe.startsWith(l);
        if (pertenece) {
          sublista.push(profe);
        }
      });
      return (
        <View>
          {!_.isEmpty(sublista) ? (
            <>
              <ListItem itemDivider>
                <Text>{l}</Text>
              </ListItem>
              {sublista.map((subProfe, index) => (
                <ListItem
                  onPress={() =>
                    navigation.navigate('Professor', {
                      professor: sortedProfes[index],
                    })
                  }>
                  <Text>{subProfe}</Text>
                </ListItem>
              ))}
            </>
          ) : null}
        </View>
      );
    });
  };
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
      <ScrollView
        style={{
          maxHeight: windowHeight / 1.5,
        }}>
        {loopLeters()}
      </ScrollView>
    </>
  );
};
