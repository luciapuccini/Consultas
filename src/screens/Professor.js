import React from 'react';
import {
  Alert,
  View,
  Linking,
  TouchableOpacity,
  Image,
  SectionList,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Layout,
  Menu,
  MenuItem,
  MenuGroup,
  IndexPath,
} from '@ui-kitten/components';

const chatImage = require('../assets/chat.png');
const placeHolder = require('../assets/rick.jpg');

export const Professor = ({ route }) => {
  React.useEffect(() => {}, []);
  const { professor } = route.params;
  const { name, mobile, legajo, email, profileImagePath } = professor;

  const openChat = () => {
    const temp = professor.mobile || '3364637796';
    Linking.canOpenURL(`whatsapp://send?text=hola!`).then((res) => {
      if (res) {
        Linking.openURL(`whatsapp://send?text=hola!&phone=${temp}`);
      } else {
        Alert.alert(`Can't open Whatsapp, please Install de App`);
      }
    });
  };

  return (
    <Layout
      level="1"
      style={{
        flex: 1,
      }}>
      <Card status="basic" style={{ marginTop: 5, marginHorizontal: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: 140,
          }}>
          <Avatar
            source={profileImagePath || placeHolder}
            style={{ height: 100, width: 100, alignSelf: 'center' }}
            shape="square"
          />
          <Details name={name} legajo={legajo} email={email} />
        </View>
      </Card>
      <Header title="Horarios De Consulta" />
      <FlatList
        data={['Algoritmos', 'Mineria', 'Artificial', 'Agiles']}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <SubjectItem item={item} />}
      />

      {mobile ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => openChat()}>
            <Image
              source={chatImage}
              style={{ height: 80, width: 80, margin: 20 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </Layout>
  );
};

const Details = ({ name, email, legajo }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        marginLeft: 30,
        minHeight: 120,
        justifyContent: 'space-between',
      }}>
      <Text category="h5">{name}</Text>
      <Text category="h6" appearance="hint">
        Legajo: {legajo}
      </Text>

      <Text category="h6" appearance="hint">
        Email: {email}
      </Text>
    </View>
  );
};

const Header = ({ title }) => {
  console.log(title);
  return (
    <Layout
      level="2"
      style={{ paddingVertical: 10, width: '100%', alignItems: 'center' }}>
      <Text category="h5">{title}</Text>
    </Layout>
  );
};

const SubjectItem = ({ item }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  console.log(item);
  return (
    <Layout
      style={{
        minHeight: 50,
        marginTop: 10,
      }}
      level="1">
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <MenuGroup title={item}>
          <MenuItem title="Martes 10:15" />
          <MenuItem title="Jueves 14:30" />
        </MenuGroup>
      </Menu>
    </Layout>
  );
};
