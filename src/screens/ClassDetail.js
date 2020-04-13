import React from 'react';
import { View } from 'react-native';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Card,
  Icon,
  Divider,
} from '@ui-kitten/components';

const turnos = [
  { id: 1, hora: '10:10', isTaken: false },
  { id: 2, hora: '10:20', isTaken: true },
  { id: 3, hora: '10:30', isTaken: false },
  { id: 4, hora: '10:40', isTaken: false },
  { id: 5, hora: '10:50', isTaken: true },
  { id: 6, hora: '11:00', isTaken: true },
];

export const ClassDetail = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const clase = route.params.class;

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <Layout style={{ margin: 20 }}>
        <Text category="h6">Fecha: ....</Text>
        <Text category="h6">Hora: ....</Text>
      </Layout>

      <Card
        header={() => (
          <Text style={{ margin: 10, alignSelf: 'flex-start' }} category="h6">
            Notas
          </Text>
        )}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
        <Divider style={{ marginVertical: 10 }} />
      </Card>
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        {turnos.map((turno) => (
          <MenuItem title={turno.hora} disabled={turno.isTaken} />
        ))}
      </Menu>
    </Layout>
  );
};
