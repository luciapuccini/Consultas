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
  Divider,
} from '@ui-kitten/components';
import { Image, TouchableOpacity, Linking, Alert, View } from 'react-native';
import moment from 'moment';
import _ from 'underscore';
import { CustomSpinner } from '../components/CustomSpinner';
import AsyncStorage from '@react-native-community/async-storage';
import { getToken } from '../utils/authHelper';

const getHora = (fecha) => {
  return moment(fecha).locale('es').format('HH:MM');
};

export const ClassDetail = ({ route, navigation }) => {
  const { clase, hasSingleTurno } = route.params;
  const isLive = clase.status === 'En Consulta';

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [notes, setNotes] = React.useState('');
  const [turnos, setTurnos] = React.useState([]);
  const [inscriptionFlag, setInscriptionFlag] = React.useState(false); // default no esta inscripto
  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurno && turnos.length > 1;

  const checkInscription = (userInscriptions) => {
    userInscriptions.forEach((userInsc) => {
      if (_.isEqual(clase.id, userInsc.classId)) {
        setInscriptionFlag(true); // esta inscripto
      }
    });
  };

  React.useEffect(() => {
    const fetchClassData = async () => {
      const token = getToken();
      console.log('CLASE:', clase);
      try {
        //WIP : Comments + Turnos + inscripcioness del alum
        fetch(`http://181.164.121.14:25565/clases/findClassData/${clase.id}`, {
          // fetch(`http://www.mocky.io/v2/5ea4cb993000005900ce2dcf`, {
          headers: { 'Content-Type': 'application/json' },
          Authorization: `Bearer ${token}`,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            setTurnos(json.turnos);
            setNotes(json.comments);
            setLoading(false);
            checkInscription(json.inscripciones);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchClassData();
  }, []);

  const handleConfirm = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (inscriptionFlag) {
      //desinscribir unsubscribeTurno(clase.id, turnos[selectedIndex - 1].turnoPk.startTime);
    } else {
      subscribeTurno(clase.id, turnos[selectedIndex - 1].turnoPk.startTime);
    }
    setShowConfirm(true);
  };

  const showSelected = () => {
    return moment(turnos[selectedIndex - 1].turnoPk.startTime)
      .locale('es')
      .format('HH:MM');
  };

  const getFecha = () => {
    return moment(clase.initTime).locale('es').format('ll');
  };

  const getCount = () => {
    return moment(clase.initTime).fromNow();
  };

  return (
    <>
      <Layout level="1" style={{ flex: 1 }}>
        {!loading ? (
          <>
            <ResumenClass
              fecha={getFecha()}
              hora={getHora(clase.initTime)}
              count={getCount()}
              notes={notes}
            />
            <Inscripcion
              canShowTurnos={canShowTurnos}
              showSelected={showSelected}
              inscriptionFlag={inscriptionFlag}
              onSubmit={onSubmit}
            />
            {turnos.length > 1 ? (
              <TurnosTable
                canShowTurnos={canShowTurnos}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                turnos={turnos}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                handleConfirm={handleConfirm}
              />
            ) : null}
          </>
        ) : (
          <CustomSpinner />
        )}
      </Layout>

      <Modal visible={isLive} backdropStyle={styles.disabled}>
        <View style={{ height: 400 }} />
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
    <Text>{notes[0].message}</Text>
  </Card>
);

const Inscripcion = ({
  canShowTurnos,
  showSelected,
  onSubmit,
  inscriptionFlag,
}) => (
  <Layout style={styles.selectionRow}>
    {canShowTurnos ? (
      <Text style={{ alignSelf: 'center' }} category="h6">
        Turno Disponible: {showSelected()}
      </Text>
    ) : null}
    <Button
      appearance="outline"
      status={inscriptionFlag ? 'danger' : 'primary'}
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
            <MenuItem
              title={getHora(turno.startTime)}
              disabled={turno.isTaken}
            />
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

            <Text>Inscipto a: {turnos[selectedIndex - 1].startTime}</Text>
          </Card>
        </Modal>
      </>
    ) : null}
  </>
);

const ResumenClass = ({ fecha, hora, count, notes }) => (
  <>
    <Layout style={{ margin: 10 }}>
      <Text category="h6" style={{ padding: 4 }}>
        Fecha: {fecha}
      </Text>
      <Text category="h6" style={{ padding: 4 }}>
        Hora: {hora}
      </Text>
      <Text category="h6" style={{ padding: 4 }}>
        Empieza {count}
      </Text>
    </Layout>
    <Divider />
    {!_.isEmpty(notes) ? <NotesCard notes={notes} /> : null}
  </>
);

const subscribeTurno = async (idClass, startTimeTurno) => {
  const userId = await AsyncStorage.getItem('USER_ID');
  const turno = { consultaId: idClass, initTime: startTimeTurno, userId };
  console.log('SUBSCRIBITEE', turno);

  try {
    fetch(`http://181.164.121.14:25565/clases/subscribe`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turno),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.message);
      });
  } catch (error) {
    console.log(error);
  }
};
