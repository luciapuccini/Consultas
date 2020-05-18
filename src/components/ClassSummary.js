import React from 'react';
import { ImageBackground, View, Image } from 'react-native';
import { Layout, Text, Card, Divider } from '@ui-kitten/components';
import _ from 'underscore';
import { Thumbnail } from 'native-base';

const placeholder = require('../assets/java.png');
const professorPlaceHolder = require('../assets/rick.jpg');

export const ClassSummary = ({ fecha, hora, count, comments, professor }) => {
  const professorImage = professor.profileImagePath || professorPlaceHolder;
  console.log('que llega', comments);
  return (
    <View>
      <ImageBackground
        source={placeholder}
        style={{ maxHeight: 200 }}
        imageStyle={{ opacity: 0.3 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 15,
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text category="s1" style={{ padding: 4 }}>
              Fecha: {fecha}
            </Text>
            <Text category="s1" style={{ padding: 4 }}>
              Hora: {hora}
            </Text>
            <Text category="s1" style={{ padding: 4 }}>
              Empieza {count}
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Thumbnail
              source={professorImage}
              style={{ height: 80, width: 80, borderRadius: 50 }}
            />
            <Text appearance="hint">{professor.name}</Text>
          </View>
        </View>
      </ImageBackground>

      <Divider />
      {!_.isEmpty(comments) && (
        <Card
          style={{ margin: 10 }}
          header={() => (
            <Text style={styles.notesCard} category="h6">
              Notas
            </Text>
          )}>
          {comments.map((comment) => (
            <Text>{comment.comment}</Text>
          ))}
        </Card>
      )}
    </View>
  );
};

const styles = {
  notesCard: { margin: 10, alignSelf: 'flex-start' },
  subjectImageStyle: {
    height: 200,
    width: null,
    // flex: 1,
    marginVertical: -16,
    marginHorizontal: -24,
  },
};
