import React from 'react';
import { View } from 'react-native';

import { Input, Icon } from '@ui-kitten/components';

const renderSearchIcon = (props) => <Icon {...props} name={'search-outline'} />;

export const SearchBox = ({ setSearchTerm, placeholder, style = {} }) => {
  const searchStyle = { marginLeft: 20, marginTop: 10, width: '90%', ...style };
  return (
    <View style={searchStyle}>
      <Input
        placeholder={placeholder || 'Place your Text'}
        accessoryLeft={renderSearchIcon}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};
