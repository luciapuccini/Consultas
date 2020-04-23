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
import { Image, TouchableOpacity, Linking, Alert, View } from 'react-native';
import moment from 'moment';
import _ from 'underscore';
import { CustomSpinner } from '../components/CustomSpinner';

const chatImage = require('../assets/chat.png');
export const ClassDetail = ({ route, navigation }) => {
  const { clase, hasSingleTurno, id } = route.params;
  const isLive = clase.status === 'En Consulta';

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [notes, setNotes] = React.useState('');
  const [turnos, setTurnos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurno && !_.isEmpty(turnos);

  React.useEffect(() => {
    try {
      // http://www.mocky.io/v2/5ea1039c320000204394b1e9
      //`http://181.164.121.14:25565/clases/findClassData/${id}`
      fetch(`http://www.mocky.io/v2/5ea1039c320000204394b1e9`, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setTurnos(json.turnos);
          setNotes(json.notes);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleConfirm = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const showSelected = () => {
    return turnos[selectedIndex - 1].horario;
  };

  const getFecha = () => {
    return moment(clase.initTime).locale('es').format('ll');
  };

  const getHora = () => {
    return moment(clase.initTime).locale('es').format('HH:MM');
  };
  const openChat = () => {
    const temp = clase.professor.mobile;
    Linking.canOpenURL(`whatsapp://send?text=hola!&phone=${temp}`).then(
      (res) => {
        if (res) {
          Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
        } else {
          Alert.alert(`Can't open Whatsapp, please Install de App`);
        }
      },
    );
  };

  return (
    <>
      <Layout level="1" style={{ flex: 1 }}>
        {!loading ? (
          <>
            <Layout style={{ margin: 10 }}>
              <Text category="h6">Fecha: {getFecha()}</Text>
              <Text category="h6">Hora: {getHora()}</Text>
            </Layout>

            <NotesCard notes={notes} />

            <Inscipcion
              canShowTurnos={canShowTurnos}
              showSelected={showSelected}
              onSubmit={onSubmit}
            />

            <TurnosTable
              canShowTurnos={canShowTurnos}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              turnos={turnos}
              showConfirm={showConfirm}
              setShowConfirm={setShowConfirm}
              handleConfirm={handleConfirm}
            />
          </>
        ) : (
          <CustomSpinner />
        )}
      </Layout>

      <Modal visible={isLive} backdropStyle={styles.disabled}>
        <View style={{ height: 400 }} />

        <TouchableOpacity
          style={{ marginLeft: 150 }}
          onPress={() => openChat()}>
          <Image source={chatImage} style={{ height: 80, width: 80 }} />
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

const NotesCard = ({ notes }) => (
  <Card
    header={() => (
      <Text style={styles.notesCard} category="h6">
        Notas
      </Text>
    )}>
    <Text>{notes}</Text>
  </Card>
);

const Inscipcion = ({ canShowTurnos, showSelected, onSubmit }) => (
  <Layout style={styles.selectionRow}>
    {canShowTurnos ? (
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
);
const TurnosTable = ({
  canShowTurnos,
  selectedIndex,
  setSelectedIndex,
  turnos,
  showConfirm,
  setShowConfirm,
  handleConfirm,
}) => (
  <>
    {canShowTurnos ? (
      <>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          {turnos.map((turno) => (
            <MenuItem title={turno.horario} disabled={turno.isTaken} />
          ))}
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

            <Text>Inscipto a: {turnos[selectedIndex - 1].horario}</Text>
          </Card>
        </Modal>
      </>
    ) : null}
  </>
);
