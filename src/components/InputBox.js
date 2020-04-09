import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const InputBox = (props) => {
  const { containerStyle } = styles;
  return <View style={[containerStyle, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'stretch',
    borderBottomColor: '#cfd8dc',
    borderStyle: 'solid',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
InputBox.propTypes = {
  children: PropTypes.node,
};
export default InputBox;
