import React, { useState, useEffect } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { ListItem } from 'native-base';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { _ } from 'underscore';
import { SortedList } from './shared/SortedList';

export const ProfessorList = ({ professors }) => (
  <View />
  //<SortedList items={professors} />
);
