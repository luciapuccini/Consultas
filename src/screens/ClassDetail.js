import React from 'react';
import { View } from 'react-native';
import { Layout } from '@ui-kitten/components';

import moment from 'moment';
import _ from 'underscore';

import { getToken } from '../utils/authHelper';
import { getHora } from '../utils/functions';
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

  const [comments, setComments] = React.useState([]);
  const [turnos, setTurnos] = React.useState([]);
  const [index, setIndex] = React.useState(null);
  const [bookingFlag, setBookingFlag] = React.useState(false); // default no esta inscripto

  const [loading, setLoading] = React.useState(true);

  const canShowTurnos = !hasSingleTurnos && turnos.length > 1; // doble innecesario
  const isLive = status === 'En curso';

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

  const handleConfirm = (index) => {
    setIndex(index);
    // onSubmit();
  };

  const onSubmit = () => {
    console.log(index, turnos);
    const sendTurno = hasSingleTurnos ? turnos[0] : turnos[index];

    if (bookingFlag) {
      console.log('dessubscribe', sendTurno);
      unsubscribeTurno(id, sendTurno.turnoPk.startTime);
    } else {
      console.log('subscribe', sendTurno);
      subscribeTurno(id, sendTurno.turnoPk.startTime);
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
            />
          ) : (
            <SimpleBookClass
              bookingFlag={bookingFlag}
              onSubmit={onSubmit}
              hora={initTime}
              handleConfirm={handleConfirm}
              disabled={isLive}
            />
          )}
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
