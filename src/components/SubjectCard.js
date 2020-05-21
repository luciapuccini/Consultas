import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { getToken } from '../utils/authHelper';
import { isEmpty } from 'underscore';

const findSubjectImage = (subjectName) => {
  return subjectPlaceholder;
};

export const SubjectCard = ({ subject, professor, admin }) => {
  const [notification, setNotification] = React.useState(subject.follows);
  const themeContext = React.useContext(ThemeContext);
  const navigation = useNavigation();

  const isDark = themeContext.theme !== 'light' ? true : false;
  const headerCardStyle = { backgroundColor: isDark ? '#1a2238' : '#E3F2FD' };
  const notificationIcon = notification ? 'bell-outline' : 'bell-off-outline';
  const { subjectId, name, imagePath } = subject;
  const onNotificationChange = async () => {
    const token = await getToken();
    setNotification(!notification);
    const body = {
      id: subjectId,
    };
    if (notification !== true) {
      try {
        fetch('http://181.164.121.14:25565/subjects/followSubject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.message));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        fetch('http://181.164.121.14:25565/subjects/unfollowSubject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => console.log(data.message));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goToClasses = () => {
    const path = professor ? 'Classes Manager' : 'Classes';
    navigation.navigate(path, { subject, manager: professor });
  };

  const getImage = () => {
    const subjectPlaceholder = require('../assets/java.png');
    const image = `http://181.164.121.14:25565/subjects/images/${subjectId}`;
    if (!isEmpty(imagePath)) {
      return { uri: image };
    } else {
      return subjectPlaceholder;
    }
  };

  const Header = () => {
    return (
      <View style={[styles.subjectCardHeaderStyle, headerCardStyle]}>
        <View style={{ width: '80%' }}>
          <Text category="h6">{name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={onNotificationChange}>
            {!professor && !admin && (
              <Icon
                style={styles.bellSize}
                name={notificationIcon}
                fill="#8F9BB3"
              />
            )}
            {admin && (
              <Icon
                style={styles.bellSize}
                name="trash"
                fill="#8F9BB3"
                onPress={() => console.log('TODO: DELETE SUBJECT')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Card header={Header} style={[styles.subjectCardStyle, headerCardStyle]}>
      <TouchableOpacity onPress={goToClasses}>
        <Image source={getImage()} style={styles.subjectImageStyle} />
      </TouchableOpacity>
    </Card>
  );
};

const styles = {
  bellSize: { width: 22, height: 22 },
  subjectCardStyle: {
    marginHorizontal: 30,
    marginVertical: 14,
    flex: 1,
  },
  subjectImageStyle: {
    height: 200,
    width: null,
    flex: 1,
    marginVertical: -16,
    marginHorizontal: -24,
  },
  subjectCardHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
};
