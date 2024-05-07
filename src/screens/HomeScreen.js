/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MqttService from '../helpers/MqttService';

const topic = 'data_gateway/to/server'


export default function HomeScreen({navigation, route}) {
    const [connectionState, setConnectionState] = useState(false)


useEffect(() => {
    MqttProcess()

}, []);


const MqttProcess = () => {
    const service = new MqttService()
    const success = () => {
        console.log('Connected to server');
        console.log('topic: ', topic);
        service.subscribeTopic(`${topic}`)
    }
    service.connect(success)
    const client = service.getCLient()

    client.onMessageArrived = (message) => {
        const payload = message.payloadString
        console.log("Message received on topic: " + message.destinationName);
        console.log("Message content: " + payload);
    }
}

const HandleFeatureScreen = () => {
navigation.navigate('TÍNH NĂNG');
};
const HandleTest = () => {
navigation.navigate('HẸN GIỜ')
}
return (
<View style={styles.body}>
    <View style={styles.directPress}>
    <Pressable
        onPress={HandleTest}
        style={({pressed}) => [
        styles.pressedStyle,
        pressed && {opacity: 0.6, backgroundColor: '#ddd'},
        ]}>
        <Text style={[styles.text, GlobalStyle.CustomFont]}>
        KIỂM TRA KẾT NỐI
        </Text>
    </Pressable>
    <Pressable
        onPress={HandleFeatureScreen}
        style={({pressed}) => [
        styles.pressedStyle,
        pressed && {opacity: 0.6, backgroundColor: '#ddd'},
        ]}>
        <Text style={[styles.text, GlobalStyle.CustomFont]}>TÍNH NĂNG</Text>
    </Pressable>
    </View>
    <View style={[styles.statusConnetion]}>
    <Text style={styles.textConnect}>TRẠNG THÁI KẾT NỐI</Text>
    <View style={styles.block}>
        <Text style={styles.text}>Khối trung tâm </Text>
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối điều khiển</Text>
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối cảm biến 1</Text>
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối cảm biến 2</Text>
    </View>
    </View>
</View>
);
}

const styles = StyleSheet.create({
body: {
flex: 1,
flexDirection: 'column',
},
directPress: {
flex: 1,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
},
pressedStyle: {
alignItems: 'center',
justifyContent: 'center',
width: 180,
height: 60,
padding: 10,
margin: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
backgroundColor: '#ffffff',
},
statusConnetion: {
marginLeft: 20,
flex: 4,
fontSize: 26,
},
text: {
color: '#333333',
margin: 10,
fontSize: 16,
fontWeight: 'bold',
},
textConnect: {
color: '#333333',
margin: 10,
fontSize: 20,
fontWeight: 'bold',
},
block: {
alignItems: 'flex-start',
justifyContent: 'center',
width: 350,
height: 60,
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
margin: 10,
backgroundColor: '#ffffff',
},
});
