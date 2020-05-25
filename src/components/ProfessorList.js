import React, { useState, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { ListItem } from 'native-base';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { _ } from 'underscore';

export const ProfessorList = ({ professors }) => {
  const navigation = useNavigation();
  const [sortedProfes, setSortedProfes] = useState([]);
  const themeContext = React.useContext(ThemeContext);
  const isDark = themeContext.theme !== 'light' ? true : false;
  const headerListStyle = { backgroundColor: isDark ? '#1a2238' : '#E3F2FD' };
  const textStyle = { color: isDark ? '#fff' : '#000' };
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
      const nombreCompleto = `${profe.surname} ${profe.name}`;
      const profeEntero = { nombreCompleto, ...profe };
      if (profeEntero.role !== 'ROLE_ADMIN') {
        profes.push(profeEntero);
      }
    });

    return leters.map((l) => {
      const sublista = [];
      profes.forEach((profe) => {
        const pertenece = profe.nombreCompleto.toUpperCase().startsWith(l);
        if (pertenece) {
          sublista.push(profe);
        }
      });
      return (
        <View>
          {!_.isEmpty(sublista) ? (
            <>
              <ListItem itemDivider style={{ ...headerListStyle }}>
                <Text style={{ ...textStyle }}>{l}</Text>
              </ListItem>
              {sublista.map((subProfe) => (
                <ListItem
                  onPress={() =>
                    navigation.navigate('Professor', {
                      professor: subProfe,
                    })
                  }>
                  <Text style={{ ...textStyle }}>
                    {subProfe.nombreCompleto}
                  </Text>
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
