import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { SubjectsFilterModal } from './/SubjectsFilterModal';

const FilterSubjects = ({ setSelectedYear, setSelectedCareer, multi }) => {
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
        setSelectedCareer={setSelectedCareer}
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
    width: 40,
    height: 40,
    margin: 8,
    backgroundColor: '#8FD4F2',
    borderRadius: 25,
  },
};

export default FilterSubjects;
