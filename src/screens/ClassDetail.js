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
import { TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';

import { getToken } from '../utils/authHelper';
import { getHora } from '../utils/functions';
import { CustomSpinner } from '../components/CustomSpinner';
import { ClassSummary } from '../components/ClassSummary';
import { SimpleBookClass } from '../components/SimpleBookClass';
import { TurnosTable } from '../components/TurnosTable';

export const ClassDetail = ({ route, navigation }) => {
  const {
    status,
    hasSingleTurnos,
    id,
    initTime,
    professor,
  } = route.params.clase;
  const isLive = status === 'En Consulta';

  const [comments, setComments] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const [bookingFlag, setBookingFlag] = React.useState(false); // default no esta inscripto

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurnos && turnos.length > 1; // doble innecesario

  const checkInscription = (userInscriptions) => {
    userInscriptions.forEach((userInsc) => {
      if (_.isEqual(id, userInsc.classId)) {
        setBookingFlag(true); // esta inscripto
      }
    });
  };
  React.useEffect(() => {
    const fetchClassData = async () => {
      const token = await getToken();

      //WIP : Comments + Turnos + inscripcioness del alum
      // fetch(`http://www.mocky.io/v2/5ea4cb993000005900ce2dcf`, {
      fetch(`http://181.164.121.14:25565/clases/findClassData/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTurnos(json.turnos);
          setComments(json.comments);
          setLoading(false);
          checkInscription(json.studentBookings);
        })
        .catch((error) => {
          console.log('[ FAILED ]', error);
        });
    };
    fetchClassData();
  }, []);

  const handleConfirm = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    if (bookingFlag) {
      //desinscribir unsubscribeTurno(clase.id, turnos[selectedIndex - 1].turnoPk.startTime);
    } else {
      subscribeTurno(id, turnos[selectedIndex - 1].turnoPk.startTime);
    }
    setShowConfirm(true);
  };

  const getFecha = () => {
    return moment(initTime).locale('es').format('ll');
  };

  const getCount = () => {
    return moment(initTime).fromNow();
  };

  return (
    <>
      <Layout level="1" style={{ flex: 1 }}>
        {!loading ? (
          <>
            <ClassSummary
              fecha={getFecha()}
              hora={getHora(initTime)}
              count={getCount()}
              notes={comments}
              professor={professor}
            />
            {/* canShowTurnos */}
            {true ? (
              <TurnosTable
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                turnos={[
                  { startTime: '2020-04-30T10:00:00', isTaken: true },
                  { startTime: '2020-04-30T10:15:00' },
                  { startTime: '2020-04-30T10:30:00' },
                ]}
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                handleConfirm={handleConfirm}
                bookingFlag={bookingFlag}
                onSubmit={onSubmit}
              />
            ) : (
              <SimpleBookClass
                bookingFlag={bookingFlag}
                onSubmit={onSubmit}
                hora={initTime}
              />
            )}
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
