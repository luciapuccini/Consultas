import React from 'react';
import {
  Alert,
  View,
  Linking,
  TouchableOpacity,
  Image,
  SectionList,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Layout,
  ListItem,
  Divider,
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
      <Card style={{ marginTop: 20, marginHorizontal: 5 }}>
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
      <Layout level="1">
        <SectionList
          sections={[
            {
              title: 'Subjects',
              data: ['Algoritmos', 'Mineria', 'Artificial', 'Agiles'],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <SubjectItem item={item} />}
          renderSectionHeader={({ section }) => (
            <Header title={section.title} />
          )}
        />
      </Layout>

      {mobile ? (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ flex: 1, width: '70%' }} />
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
      style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
      <Text category="h5">{title}</Text>
    </Layout>
  );
};

const SubjectItem = ({ item }) => {
  console.log(item);
  return (
    <ListItem
      title={() => (
        <>
          <Text style={{ marginBottom: 10 }} category="s1">
            {item}
          </Text>
          <Divider />
        </>
      )}
    />
  );
};
