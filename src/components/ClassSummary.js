import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Text, Card, Divider, Button, Icon } from '@ui-kitten/components';
import _ from 'underscore';
import { Thumbnail } from 'native-base';
import {
  getUserImage,
  getFecha,
  getHora,
  getSubjectImage,
} from '../utils/functions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const placeHolder = require('../assets/placeholder.png');

export const ClassSummary = ({
  fecha,
  subjectId,
  count,
  comments,
  professor,
  handleDeleteComment,
  manager,
}) => {
  const subjectImage = subjectId
    ? { uri: getSubjectImage(subjectId) }
    : placeHolder;

  const professorImage = professor.profileImagePath
    ? { uri: getUserImage(professor.id) }
    : placeHolder;

  return (
    <View>
      <ImageBackground
        source={subjectImage}
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
              Fecha: {getFecha(fecha)}
            </Text>
            <Text category="s1" style={{ padding: 4 }}>
              Hora: {getHora(fecha)}
            </Text>
            <Text category="s1" style={{ padding: 4 }}>
              Empieza {count}
            </Text>
          </View>
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Thumbnail
              source={professorImage}
              style={{ height: 80, width: 80, borderRadius: 4 }}
            />
            <Text appearance="hint">
              {professor.name} {professor.surname}
            </Text>
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                borderBottomColor: '#CFD8DC',
                borderBottomWidth: 1,
                marginTop: 2,
              }}>
              <Text>{comment.comment}</Text>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 5,
                  marginRight: 20,
                }}>
                {/* TODO: check que no se vea en alumnos */}
                {manager && (
                  <TrashIcon
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                  />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </Card>
      )}
    </View>
  );
};
const TrashIcon = ({ props, comment, handleDeleteComment }) => {
  return (
    <Icon
      {...props}
      name="close"
      fill="#E53935"
      onPress={() => handleDeleteComment(comment)}
    />
  );
};

const styles = {
  notesCard: { margin: 10, alignSelf: 'flex-start' },
  subjectImageStyle: {
    height: 200,
    width: null,
    marginVertical: -16,
    marginHorizontal: -24,
  },
};
