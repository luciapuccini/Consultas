import React from 'react';
import { View } from 'react-native';

import { Input, Icon } from '@ui-kitten/components';

const renderSearchIcon = (props) => <Icon {...props} name={'search-outline'} />;

export const SearchBox = ({ setSearchTerm, placeholder }) => {
  return (
    <View style={{ marginLeft: 20, marginTop: 10, width: '90%' }}>
      <Input
        placeholder={placeholder || 'Place your Text'}
        accessoryLeft={renderSearchIcon}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};
