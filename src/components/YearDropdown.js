import React from 'react';
import { Select, SelectItem, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const yearsObj = [
  { index: 0, title: 'Primer año' },
  { index: 1, title: 'Segundo año' },
  { index: 2, title: 'Tercer año' },
  { index: 3, title: 'Cuarto año' },
  { index: 4, title: 'Quinto año' },
];

export const YearDropdown = ({ selectedIndex, setSelectedIndex }) => {
  const getCurrentYear = () => {
    let placeholder = 'Elija años';

    if (selectedIndex) {
      const flatIndexList = selectedIndex.map(({ row }) => row);
      const titles = yearsObj.filter((year) =>
        flatIndexList.includes(year.index),
      );

      placeholder = titles.map(({ title }) => title).join(' ,');
    }
    return <Text>{placeholder}</Text>;
  };
  return (
    <Select
      label="Año en curso"
      multiSelect={true}
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
      }}
      value={() => getCurrentYear()}>
      <ScrollView style={{ height: 100 }}>
        {yearsObj.map((year) => (
          <SelectItem title={year.title} />
        ))}
      </ScrollView>
    </Select>
  );
};
