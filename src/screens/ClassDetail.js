import React from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';

import moment from 'moment-timezone';

import { getToken } from '../utils/authHelper';
import { timeToStart, getUserLegajo, getTime } from '../utils/functions';
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

  const manager = route.params?.manager;
  const subject = route.params?.subject;
  const [comments, setComments] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]); //route.params.clase ||
  const [index, setIndex] = React.useState(null);
  const [bookingFlag, setBookingFlag] = React.useState(false); // default no esta inscripto
  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurnos && turnos.length > 1; // doble innecesario
  const isLive = status === 'En curso';
  const canStart = timeToStart(initTime) < 5;

  const checkUserPresent = async (turnitos) => {
    const legajo = await getUserLegajo();
    turnitos.forEach((turnito) => {
      turnito.students.forEach((student) => {
        if (student.legajo == legajo) {
          setBookingFlag(true);
        }
      });
    });
  };

  React.useEffect(() => {
    const fetchClassData = async () => {
      const token = await getToken();
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

  const onSubmit = async () => {
    let sendTurno = hasSingleTurnos ? turnos[0] : turnos[index];
    const userLegajo = await getUserLegajo();
    if (sendTurno === undefined) {
      turnos.forEach((turno) => {
        if (turno.students) {
          turno.students.forEach((student) => {
            if (student.legajo === userLegajo) {
              sendTurno = turno;
            }
          });
        }
      });
    }

    if (bookingFlag) {
      unsubscribeTurno(id, sendTurno.turnoTime);
    } else {
      subscribeTurno(id, sendTurno.turnoTime);
    }
    navigation.goBack();
  };

  const getCount = () => {
    const eventTime = getTime(initTime);
    const currentTime = moment();
    const leftTime = eventTime - currentTime;
    var duration = moment.duration(leftTime, 'milliseconds');
    duration = moment.duration(duration - 1000, 'milliseconds');
    const countDown = `${duration.days()} Dias, ${duration.hours()} Horas, ${duration.minutes()} Minutos`;
    return countDown;
  };

  const handleDeleteComment = async (comment) => {
    const {
      commentPK: { commentTime },
    } = comment;
    const body = { id, dateTime: commentTime };
    const token = await getToken();
    fetch('http://181.164.121.14:25565/clases/deleteComment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message === 'Suceed') {
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!loading ? (
        <ScrollView style={{ flex: 1 }}>
          <ClassSummary
            subjectId={subject.subjectId}
            fecha={initTime}
            count={getCount()}
            comments={comments}
            professor={professor}
            handleDeleteComment={handleDeleteComment}
            manager={manager}
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
        </ScrollView>
      ) : (
          <CustomSpinner />
        )}
    </Layout>
  );
};

const subscribeTurno = async (idClass, startTimeTurno) => {
  const token = await getToken();
  const turno = { consultaId: idClass, initTime: startTimeTurno };
  fetch('http://181.164.121.14:25565/clases/subscribe', {
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

  fetch('http://181.164.121.14:25565/clases/unsubscribe', {
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
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStarted(true);
        Alert.alert(
          'Empezando la clase',
          `${data.message}`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      });
  } catch (error) {
    console.log('Upss', error);
  }
};

const StartClass = ({ id }) => {
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
