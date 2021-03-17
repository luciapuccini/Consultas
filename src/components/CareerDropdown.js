import React from 'react';
import { Select, SelectItem } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

//WARNING: as a hack make this match with the database IDs until I can pass a selected  career name
const yearsObj = ['ISI', 'IM', 'IQ', 'IE'];

export const CareerDropdown = ({ selectedIndex, setSelectedIndex }) => {
  const groupDisplayValues = selectedIndex.map((index) => {
    //{"row":0,"section":0, "equals":func}
    return yearsObj[index.row];
  });

  return (
    <Select
      label="Carrera"
      placeholder="Elija Carrera"
      selectedIndex={selectedIndex}
      value={groupDisplayValues.join(', ')}
      onSelect={setSelectedIndex}
      multiSelect>
      <ScrollView style={{ height: 200 }}>
        {yearsObj.map((title) => (
          <SelectItem title={title} />
        ))}
      </ScrollView>
    </Select>
  );
};
