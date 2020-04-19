import React from 'react';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Card,
  Button,
  Modal,
  Icon,
} from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

export const ClassDetail = ({ route }) => {
  const { clase } = route.params;
  const { turnos } = clase;
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [showConfirm, setShowConfirm] = React.useState(false);

  const onSubmit = () => {
    setShowConfirm(true);
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
        {!clase.hasSingleTurno ? (
          <Text style={{ alignSelf: 'center' }} category="h6">
            Seleccione Turno: {showSelected()}
          </Text>
        ) : null}
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
      <Modal
        visible={showConfirm}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setShowConfirm(false)}>
        <Card disabled={true}>
          <TouchableOpacity onPress={() => setShowConfirm(false)}>
            <Icon
              style={{ height: 20, width: 20 }}
              name="close"
              fill="#8F9BB3"
            />
          </TouchableOpacity>

          <Text>Inscipto a: {turnos[selectedIndex - 1].hora}😻</Text>
        </Card>
      </Modal>
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
