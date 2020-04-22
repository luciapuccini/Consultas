import React from 'react';
import {
  Layout,
  Text,
  Menu,
  MenuItem,
  IndexPath,
  Button,
  Modal,
  Card,
  Icon,
} from '@ui-kitten/components';
import { TouchableOpacity, Linking } from 'react-native';
import moment from 'moment';
import { View } from 'native-base';

export const ClassDetail = ({ route, navigation }) => {
  const { clase, hasSingleTurno, id } = route.params;
  const isLive = clase.status === 'En Consulta';

  const { turnos } = [];
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [showConfirm, setShowConfirm] = React.useState(false);

  React.useEffect(() => {
    console.log(id, 'id de class');
    try {
      fetch(`http://181.164.121.14:25565/clases/findClassData/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          // setTurnos(json);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // fetch notas
  //fetch turnos

  const handleConfirm = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const showSelected = () => {
    // return turnos[selectedIndex - 1].hora;
  };

  const getFecha = () => {
    return moment(clase.initTime).locale('es').format('ll');
  };

  const getHora = () => {
    return moment(clase.initTime).locale('es').format('HH:MM');
  };
  const openChat = () => {
    const temp = '+5493364647796';
    if (temp !== '') {
      Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
    }
  };

  return (
    <>
      <Layout level="1" style={{ flex: 1 }}>
        <Layout style={{ margin: 10 }}>
          <Text category="h6">Fecha: {getFecha()}</Text>
          <Text category="h6">Hora: {getHora()}</Text>
        </Layout>

        <Card
          header={() => (
            <Text style={styles.notesCard} category="h6">
              Notas
            </Text>
          )}>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Text>
        </Card>

        <Layout style={styles.selectionRow}>
          {!clase.hasSingleTurno ? (
            <Text style={{ alignSelf: 'center' }} category="h6">
              {/* Seleccione Turno: {showSelected()} */}
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
          <>
            <Menu
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}>
              {/* {turnos.map((turno) => (
                <MenuItem title={turno.hora} disabled={turno.isTaken} />
              ))} */}
            </Menu>
            <Modal
              visible={showConfirm}
              backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onBackdropPress={() => setShowConfirm(false)}>
              <Card disabled={true}>
                <TouchableOpacity onPress={() => handleConfirm()}>
                  <Icon
                    style={{ height: 20, width: 20 }}
                    name="close"
                    fill="#8F9BB3"
                  />
                </TouchableOpacity>

                <Text>
                  {/* Inscipto a: {turnos[selectedIndex - 1].hora }😻 */}
                </Text>
              </Card>
            </Modal>
          </>
        ) : null}
      </Layout>

      <Modal visible={isLive} backdropStyle={styles.disabled}>
        <View style={{ height: 400 }} />

        <TouchableOpacity
          style={{ marginLeft: 150 }}
          onPress={() => openChat()}>
          <Icon
            style={styles.chatStyle}
            fill="#fff"
            name="message-circle-outline"
          />
        </TouchableOpacity>
      </Modal>
    </>
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
  disabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  chatStyle: {
    height: 80,
    width: 80,
    backgroundColor: '#00C853',
    borderRadius: 50,
  },
};
