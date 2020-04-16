import React from 'react';
import { View } from 'react-native';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Card,
  Button,
  Divider,
} from '@ui-kitten/components';

const turnos = [
  { id: 1, hora: '10:10', isTaken: false },
  { id: 2, hora: '10:20', isTaken: true },
  { id: 3, hora: '10:30', isTaken: false },
  { id: 4, hora: '10:40', isTaken: false },
  { id: 5, hora: '10:50', isTaken: true },
  { id: 6, hora: '11:00', isTaken: true },
  { id: 4, hora: '10:40', isTaken: false },
  { id: 5, hora: '10:50', isTaken: true },
  { id: 6, hora: '11:00', isTaken: true },
];

export const ClassDetail = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  // const [turno, setTurno] = React.useState(null);
  const clase = route.params.class;
  const onSubmit = () => {
    console.log('SUBMIT');
  };
  const showSelected = () => {
    return turnos[selectedIndex - 1].hora;
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <Layout style={{ margin: 10 }}>
        <Text category="h6">Fecha: ....</Text>
        <Text category="h6">Hora: ....</Text>
      </Layout>

      <Card
        header={() => (
          <Text style={styles.notesCard} category="h6">
            Notas
          </Text>
        )}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
      </Card>
      <Layout style={styles.selectionRow}>
        <Text style={{ alignSelf: 'center' }} category="h6">
          Seleccione Turno: {showSelected()}
        </Text>
        <Button
          appearance="outline"
          style={styles.inscriptionBtn}
          onPress={onSubmit}>
          Inscribirme
        </Button>
      </Layout>

      {!clase.hasSingleTurno ? (
        <Menu
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          {turnos.map((turno) => (
            <MenuItem title={turno.hora} disabled={turno.isTaken} />
          ))}
        </Menu>
      ) : null}
    </Layout>
  );
};

const styles = {
  inscriptionBtn: {
    height: 20,
    alignSelf: 'flex-end',
  },
  selectionRow: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  notesCard: { margin: 10, alignSelf: 'flex-start' },
};
