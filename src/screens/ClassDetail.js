import React from 'react';
import {
  Animated,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Layout, Icon, Text, Button } from '@ui-kitten/components';

import moment from 'moment-timezone';

import { getToken } from '../utils/authHelper';
import { timeToStart, getUserLegajo, getTime } from '../utils/functions';
import { CustomSpinner } from '../components/CustomSpinner';
import { ClassSummary } from '../components/ClassSummary';
import { SimpleBookClass } from '../components/SimpleBookClass';
import { TurnosTable } from '../components/TurnosTable';
import { SERVER_URL } from '../utils/config';

export const ClassDetail = ({ route: { params }, navigation }) => {
  const claseProp = params?.clase;
  let hasSingleTurnos, id, initTime, professor, status;

  if (claseProp?.classe) {
    hasSingleTurnos = claseProp.classe.hasSingleTurnos;
    id = claseProp.classe.id;
    initTime = claseProp.classe.initTime;
    professor = claseProp.professor;
    status = claseProp.classe.status;
  } else {
    hasSingleTurnos = claseProp.hasSingleTurnos;
    id = claseProp.id;
    initTime = claseProp.initTime;
    professor = claseProp.professor;
    status = claseProp.status;
  }

  const manager = params?.manager;
  const subject = params?.subject || claseProp.subject;

  const [comments, setComments] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const [index, setIndex] = React.useState(null);
  const [inscriptions, setInscriptions] = React.useState([]);
  const [bookingFlag, setBookingFlag] = React.useState(false); // default no esta inscripto
  const [loading, setLoading] = React.useState(true);
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    const token = await getToken();
    fetch(`${SERVER_URL}/clases/findClassData/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTurnos(json.turnos);
        mapInscriptions(json.turnos, json.hasSingleTurnos);
        setComments(json.comments);
        setLoading(false);
        checkUserPresent(json.turnos);
        setLink(json.link);
      })
      .catch((error) => {
        console.log('[ FAILED ]', error);
      });
  };
  const canShowTurnos = !hasSingleTurnos;
  const isLive = status === 'En curso';
  const canStart = timeToStart(initTime) < 5;
  const expired = moment(initTime) < moment();

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

  const handleConfirm = (index) => {
    setIndex(index);
  };

  const mapInscriptions = (turnosArg) => {
    let inscriptionsArr = [];
    turnosArg.map((turno) => {
      inscriptionsArr.push(...turno.students);
    });

    setInscriptions(inscriptionsArr);
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
    if (leftTime < 0) {
      return `Hace: ${duration.days() * -1} Dias, ${
        duration.hours() * -1
      } Hs, ${duration.minutes() * -1} Min`;
    }

    return `Faltan: ${duration.days()} Dias, ${duration.hours()} Hs, ${duration.minutes()} Min`;
  };

  const handleDeleteComment = async (comment) => {
    const {
      commentPK: { commentTime },
    } = comment;
    const body = { id, dateTime: commentTime };
    const token = await getToken();
    fetch(`${SERVER_URL}/clases/deleteComment`, {
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
  const openVirtualClass = () => {
    console.log('link', link);
    const formattedLink = link.substr(1, link.length - 1);

    Linking.canOpenURL(formattedLink).then((res) => {
      if (res) {
        Linking.openURL(formattedLink);
      } else {
        Alert.alert(
          'Algo salio mal, revise si tiene la aplicacion correcta instalada',
        );
      }
    });
  };
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {!loading ? (
        <>
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
                disabled={isLive || expired}
                manager={manager}
                id={id}
                expired={expired}
              />
            ) : (
              <SimpleBookClass
                bookingFlag={bookingFlag}
                onSubmit={onSubmit}
                hora={initTime}
                handleConfirm={handleConfirm}
                disabled={isLive || expired}
                manager={manager}
                id={id}
                expired={expired}
              />
            )}
            <View style={style.actions}>
              {manager && (
                <Button
                  status="info"
                  appearance="outline"
                  onPress={() =>
                    navigation.navigate('Inscriptions', { inscriptions })
                  }>
                  Ver Inscriptos
                </Button>
              )}
              {link !== '' && (
                <Button
                  status="info"
                  appearance="outline"
                  onPress={openVirtualClass}>
                  Ir a la clase Virtual
                </Button>
              )}
            </View>
          </ScrollView>

          <View style={{ alignItems: 'flex-start' }}>
            {canStart && manager && <StartClass id={id} />}
          </View>
        </>
      ) : (
        <CustomSpinner />
      )}
    </Layout>
  );
};

const subscribeTurno = async (idClass, startTimeTurno) => {
  const token = await getToken();
  const turno = { consultaId: idClass, initTime: startTimeTurno };
  fetch(`${SERVER_URL}/clases/subscribe`, {
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

  fetch(`${SERVER_URL}/clases/unsubscribe`, {
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

const onstartClass = async (id) => {
  const token = await getToken();
  try {
    fetch(`${SERVER_URL}/clases/startClass/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
  return (
    <View style={style.startBtn}>
      <Button
        status="success"
        onPress={() => onstartClass(id)}
        accessoryRight={StartIcon}>
        COMENZAR
      </Button>
    </View>
  );
};
const StartIcon = (props) => {
  const shakeIconRef = React.useRef();

  return (
    <Icon
      {...props}
      name="arrow-circle-right-outline"
      ref={shakeIconRef}
      animation="shake"
    />
  );
};

const style = {
  touchableStartStyle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: '#63b76c',
  },
  textStartStyle: {
    color: 'white',
  },
  idleStyle: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 10,
  },
  startBtn: {
    alignSelf: 'flex-end',
    margin: 10,
  },
};
