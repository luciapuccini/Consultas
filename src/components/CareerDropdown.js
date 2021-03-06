import React from 'react';
import { Select, SelectItem } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const yearsObj = ['ISI', 'IQ', 'IM', 'IE'];

export const CareerDropdown = ({ selectedIndex, setSelectedIndex }) => {
  const groupDisplayValues = selectedIndex.map((index) => {
    //{"row":0,"section":0, "equals":func}
    return yearsObj[index.row];
  });

  return (
    <Select
      label="Career"
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
