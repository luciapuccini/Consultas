import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { SubjectsFilterModal } from './/SubjectsFilterModal';

const FilterSubjects = ({ setSelectedYear, multi }) => {
  const [showFilter, setShowFilter] = React.useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowFilter(true)}>
        <Icon
          name="funnel-outline"
          fill="#fff"
          style={style.FloatingButtonStyle}
        />
      </TouchableOpacity>
      <SubjectsFilterModal
        visible={showFilter}
        setVisible={setShowFilter}
        setSelectedYear={setSelectedYear}
        multi={multi}
      />
    </View>
  );
};

const style = {
  touchableStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  touchable2Style: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 100,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
};

export default FilterSubjects;