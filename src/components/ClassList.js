import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Text, View } from 'native-base';
import { ClassCard } from './ClassCard';
import { ScrollView } from 'react-native-gesture-handler';
import { Spinner } from '@ui-kitten/components';

export const ClassList = () => {
  const [classes, setClasses] = useState(null);
  useEffect(() => {
    fetch('http://www.mocky.io/v2/5e92c1003000004f001566b0')
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, []);

  const renderItem = ({ item, index }) => {
    return <ClassCard data={item} />;
  };
  return (
    <ScrollView>
      {!classes ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
        </View>
      ) : (
        <FlatList
          data={classes}
          renderItem={renderItem}
          contentContainerStyle={{ marginBottom: 100 }}
          keyExtractor={(item, index) => item.name}
        />
      )}
    </ScrollView>
  );
};
