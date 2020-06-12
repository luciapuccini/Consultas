import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'native-base';
import { Text, Layout, Icon, CheckBox } from '@ui-kitten/components';
import { isEmpty } from 'underscore';
import { CustomSpinner } from './CustomSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { getHora, getDia, getFecha, getClassColor } from '../utils/functions';
import { useNavigation } from '@react-navigation/native';

const FixedClasessList = ({ regularClasses, manager, subject }) => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState([]);

  useEffect(() => {
    setloading(false);
    if (regularClasses.leght > 0) {
      setError('No Hay clases para mostrar');
      setloading(false);
    }
  }, [regularClasses]);

  return (
    <Layout level="1" style={{ flex: 1 }}>
      {loading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        regularClasses.map((c) => (
          <>
            <ListItem onPress={() => setOpen(!open)}>
              <View style={{ flexDirection: 'row' }}>
                <Arrow direction={open} />
                <Text>
                  Clase de los {getDia(c[0].initTime)} {getHora(c[0].initTime)}
                </Text>
              </View>
            </ListItem>
            {open && (
              <ScrollView>
                {c.map((cl) => (
                  <TouchableOpacity
                    style={styles.rowContainer}
                    onPress={() =>
                      navigation.navigate('Class Detail', {
                        clase: cl,
                        manager,
                        subject,
                      })
                    }>
                    <View style={styles.classRowStyle}>
                      <CheckIcon color={getClassColor(cl.status)} />
                      <Text
                        style={{
                          marginVertical: 10,
                          marginLeft: 20,
                          color: getClassColor(cl.status),
                        }}>
                        {getFecha(cl.initTime)}
                      </Text>
                    </View>
                    <Arrow direction={false} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        ))
      )}
    </Layout>
  );
};

const Arrow = ({ direction, style }) => (
  <Icon
    style={[styles.arrowStyle, style]}
    fill="#4169E1"
    name={direction ? 'arrow-down-outline' : 'arrow-right-outline'}
  />
);
const CheckIcon = ({ color }) => (
  <Icon
    name="checkmark-circle-outline"
    style={styles.checkStyle}
    fill={color}
  />
);

const styles = {
  checkStyle: { width: 15, height: 15, marginTop: 2 },
  arrowStyle: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  classRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export default FixedClasessList;
