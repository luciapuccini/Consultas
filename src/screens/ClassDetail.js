import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';

import moment from 'moment';
import _ from 'underscore';

import { getToken } from '../utils/authHelper';
import {
  getHora,
  timeToStart,
  asArray,
  getUserLegajo,
} from '../utils/functions';
import { CustomSpinner } from '../components/CustomSpinner';
import { ClassSummary } from '../components/ClassSummary';
import { SimpleBookClass } from '../components/SimpleBookClass';
import { TurnosTable } from '../components/TurnosTable';

export const ClassDetail = ({ route, navigation }) => {
  const {
    hasSingleTurnos,
    id,
    initTime,
    professor,
    status,
  } = route.params.clase;
  const { manager } = route.params;
  const [comments, setComments] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const [index, setIndex] = React.useState(null);
  const [bookingFlag, setBookingFlag] = React.useState(false); // default no esta inscripto
  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurnos && turnos.length > 1; // doble innecesario
  const isLive = status === 'En curso';
  const canStart = timeToStart(initTime) < 5;

  const checkUserPresent = async (turnitos) => {
    // console.log('que carajo', turnitos);
    const legajo = await getUserLegajo();
    const algo = turnitos.map((turno) => {
      return turno.students;
    });
    // console.log('ALGO', algo);
    algo.forEach((student) => {
      console.log(student);
      if (parseInt(student.legajo) === legajo) setBookingFlag(true);
    });
  };

  React.useEffect(() => {
    const fetchClassData = async () => {
      const token = await getToken();
      //FIXME:  cambiar --> student en cada turno
      fetch(`http://181.164.121.14:25565/clases/findClassData/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('imprimo todo', json.turnos);
          setTurnos(json.turnos); //FIXME: starTime -> turnoTime
          setComments(json.comments);
          setLoading(false);
          checkUserPresent(json.turnos);
        })
        .catch((error) => {
          console.log('[ FAILED ]', error);
        });
    };
    fetchClassData();
  }, []);

  const handleConfirm = (index) => {
    setIndex(index);
    // onSubmit();
  };

  const onSubmit = () => {
    console.log('aca algo esta mal', hasSingleTurnos, turnos);
    const sendTurno = hasSingleTurnos ? turnos[0] : turnos[index];

    if (bookingFlag) {
      console.log('dessubscribe', sendTurno);
      unsubscribeTurno(id, sendTurno.turnoTime);
    } else {
      console.log('subscribe', sendTurno);
      subscribeTurno(id, sendTurno.turnoTime);
    }
    navigation.goBack();
  };

  const getFecha = () => {
    return moment(initTime).locale('es').format('ll');
  };

  const getCount = () => {
    return moment(initTime).fromNow();
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!loading ? (
        <View style={{ flex: 1 }}>
          <ClassSummary
            fecha={getFecha()}
            hora={getHora(initTime)}
            count={getCount()}
            notes={comments}
            professor={professor}
          />
          {canShowTurnos ? (
            <TurnosTable
              turnos={turnos}
              bookingFlag={bookingFlag}
              handleConfirm={handleConfirm}
              onSubmit={onSubmit}
              disabled={isLive}
              manager={manager}
              id={id}
            />
          ) : (
            <SimpleBookClass
              bookingFlag={bookingFlag}
              onSubmit={onSubmit}
              hora={initTime}
              handleConfirm={handleConfirm}
              disabled={isLive}
              manager={manager}
              id={id}
            />
          )}
          {canStart && manager && <StartClass id={id} />}
        </View>
      ) : (
        <CustomSpinner />
      )}
    </Layout>
  );
};

const subscribeTurno = async (idClass, startTimeTurno) => {
  const token = await getToken();
  const turno = { consultaId: idClass, initTime: startTimeTurno };
  console.log('SUBSCRIBITEE', turno);

  fetch(`http://181.164.121.14:25565/clases/subscribe`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turno),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const unsubscribeTurno = async (idClass, startTimeTurno) => {
  const token = await getToken();
  const turno = { consultaId: idClass, initTime: startTimeTurno };
  console.log('SUBSCRIBITEE', turno);

  fetch(`http://181.164.121.14:25565/clases/unsubscribe`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turno),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const onstartClass = async (id, setStarted) => {
  const token = await getToken();

  try {
    fetch(`http://181.164.121.14:25565/clases/startClass/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'success') {
          setStarted(true);
          Alert.alert(
            'Class Started',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        }
      });
  } catch (error) {
    console.log('Upss', error);
  }
};

const StartClass = (id) => {
  const [started, setStarted] = React.useState(false);
  const { idleStyle, startedStyle } = style;
  const startIcon = started ? 'play-circle' : 'play-circle-outline';

  return (
    <TouchableOpacity
      style={style.touchableStartStyle}
      onPress={() => onstartClass(id, setStarted)}>
      <Icon name={startIcon} fill="#4CAF50" style={idleStyle} />
    </TouchableOpacity>
  );
};

const style = {
  touchableStartStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
  },
  idleStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
    borderRadius: 25,
  },
};
