import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout, Tab, TabView, Icon, Text } from '@ui-kitten/components';
import SimpleClassesList from '../components/SimpleClasessList';
import FixedClassesList from '../components/FixedClasessList';

export const ClassesManager = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { subject, manager } = route.params;
  return (
    <Layout level="1" style={{ flex: 1 }}>
      <TabView
        style={{ marginTop: 10, flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="Simples">
          <SimpleClassesList subject={subject} manager={manager} />
        </Tab>
        <Tab title="Regulares">
          <FixedClassesList />
        </Tab>
      </TabView>
    </Layout>
  );
};
