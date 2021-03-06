import React from 'react';
import { Select, SelectItem } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const yearsObj = [
  'Primer año',
  'Segundo año',
  'Tercer año',
  'Cuarto año',
  'Quinto año',
];

export const YearDropdown = ({ selectedIndex, setSelectedIndex, multi }) => {
  const displayValue = yearsObj[selectedIndex.row];

  return (
    <Select
      label="Año"
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        //TEST as array sam?
        setSelectedIndex(index);
      }}
      value={displayValue}
      multiSelect={multi}>
      <ScrollView style={{ height: 200 }}>
        {yearsObj.map((title) => (
          <SelectItem title={title} />
        ))}
      </ScrollView>
    </Select>
  );
};
