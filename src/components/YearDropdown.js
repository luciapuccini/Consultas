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

export const YearDropdown = ({
  selectedIndex,
  setSelectedIndex,
  multi = true,
}) => {
  const displayValue = () => {
    let display = null;
    if (selectedIndex.length === 0) {
      return null;
    }
    if (multi) {
      display = selectedIndex.map((index) => {
        return yearsObj[index.row];
      });
    } else {
      display = yearsObj[selectedIndex.row];
    }
    return display || null;
  };

  return (
    <Select
      label="Año"
      placeholder="Elija Año"
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      value={displayValue()}
      multiSelect={multi}>
      <ScrollView style={{ height: 200 }}>
        {yearsObj.map((title) => (
          <SelectItem title={title} />
        ))}
      </ScrollView>
    </Select>
  );
};
