/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAlarm, snoozeAlarm, stopAlarm} from '../utils/alarm';
import Button from '../components/Button';
import {colors, globalStyles} from '../utils/global';
import MqttService from '../helpers/MqttService';

const topic = 'data_gateway/to/server';

export default function ({route, navigation}) {
  const [alarm, setAlarm] = useState(null);

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    MqttProcess();
    console.log('Ring ring ring');
    (async function () {
      const myAlarm = await getAlarm(alarmUid);
      setAlarm(myAlarm);
    })();
  }, []);

  const MqttProcess = () => {
    const service = new MqttService();
    const success = () => {
      console.log('Connected to server');
      console.log('topic: ', topic);
      service.subscribeTopic(`${topic}`);
    };
    service.connect(success);
    const client = service.getCLient();

    client.onMessageArrived = message => {
      const payload = message.payloadString;
      console.log('Message received on topic: ' + message.destinationName);
      console.log('Message content: ' + payload);
    };
  };
  if (!alarm) {
    return <View />;
  }

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.innerContainer, styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.clockText}>
            {alarm.getTimeString().hour} : {alarm.getTimeString().minutes}
          </Text>
          <Text style={styles.title}>{alarm.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={'Dừng lại'}
            onPress={async () => {
              await stopAlarm();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clockText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.GREY,
  },
});
