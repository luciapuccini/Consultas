import React, { useState, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { ListItem } from 'native-base';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { _ } from 'underscore';


import { ThemeContext } from '../../context/ThemeContext';
import { ErrorMessage } from '../ErrorMessage';

export const SortedList = ({ items }) => {
  const navigation = useNavigation();
  const [sorted, setSorted] = useState([]);
  const themeContext = React.useContext(ThemeContext);
  const isDark = themeContext.theme !== 'light' ? true : false;
  const headerListStyle = { backgroundColor: isDark ? '#1a2238' : '#E3F2FD' };
  const textStyle = { color: isDark ? '#fff' : '#000' };

  useEffect(() => {
    setSorted(items.sort());
  }, [items]);

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

    const list = [];

    sorted.forEach((element) => {
      if (element.name && element.surname) {
        // is a name - professor or alumn
        const text = `${element.surname} ${element.name}`;
        const profeEntero = { text, ...element };
        if (profeEntero.role !== 'ROLE_ADMIN') {
          list.push(profeEntero);
        }
      } else {
        // is subject
        console.log(element.name);
        list.push({ text: element.name });
      }
    });

    return leters.map((l) => {
      const sublista = [];
      items.forEach((element) => {
        const pertenece = element.text.toUpperCase().startsWith(l);
        if (pertenece) {
          sublista.push(element);
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
                  onPress={() => {
                    if (subProfe.surname) {
                      navigation.navigate('Professor', {
                        professor: subProfe,
                      });
                    } else {
                      console.log('something thats not a profe');
                    }
                  }}>
                  <Text style={{ ...textStyle }}>
                    {subProfe.nombreCompleto}
                  </Text>
                </ListItem>
              ))}
            </>
          ) : (
            <ErrorMessage message="No hay elementos para mostrar" />
          )}
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
