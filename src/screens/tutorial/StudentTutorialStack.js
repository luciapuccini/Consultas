import React from 'react';
import { Button } from '@ui-kitten/components';
import { ImageBackground, View } from 'react-native';
import { getIsFirstLogin, setIsFirstLogin } from '../../utils/authHelper';
import { windowWidth, windowHeight } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';

const endTutorialScreen = 3;
const stepImg0 = require('../../assets/tutorial/A-Tutorial-0.png');
const stepImg1 = require('../../assets/tutorial/A-Tutorial-1.png');
const stepImg2 = require('../../assets/tutorial/A-Tutorial-2.png');
const stepImg3 = require('../../assets/tutorial/A-Tutorial-3.png');

export const StudentTutorialStack = () => {
  const [step, setStep] = React.useState(0);
  const navigator = useNavigation();

  const getStepImage = () => {
    switch (step) {
      case 0:
        return stepImg0;
      case 1:
        return stepImg1;
      case 2:
        return stepImg2;
      case 3:
        return stepImg3;
      default:
        return stepImg0;
    }
  };

  const handleEndTutorial = () => {
    setIsFirstLogin(false).then(() => {
      console.log('handleEndTutorial -> ');
      navigator.navigate('Home');
    });
  };
  return (
    <ImageBackground
      source={getStepImage()}
      style={style.backgroundContainer}
      imageStyle={{
        resizeMode: 'stretch',
      }}>
      <View style={style.dummyContainer} />
      <View style={style.bottomRow}>
        {step === 0 && (
          <Button appearance="ghost" status="basic" onPress={handleEndTutorial}>
            Saltear
          </Button>
        )}
        {endTutorialScreen !== step ? (
          <Button
            appearance="outline"
            status="basic"
            onPress={() => setStep(step + 1)}>
            Siguiente
          </Button>
        ) : (
          <Button
            appearance="outline"
            status="info"
            onPress={handleEndTutorial}>
            Terminar
          </Button>
        )}
      </View>
    </ImageBackground>
  );
};

const style = {
  container: {
    flex: 1,
  },
  dummyContainer: {
    display: 'flex',
    height: '80%',
  },
  bottomRow: {
    display: 'flex',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  backgroundContainer: {
    //btns
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7ECF7',
  },
};
