/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, Pressable, TextInput} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MqttService from '../helpers/MqttService';
import {MyContext} from '../App';
import {log} from 'react-native-reanimated';
const topic = 'data_gateway/to/server';
const topicFromGW = 'gateway/to/server';
const topicToGW = 'server/to/gateway';
const checkState = ' 00 01 FF ';
let dataSensorNode1 = {
temp: 0,
humidity: 0,
light: 0,
soil: 0,
};
let dataSensorNode2 = {
temp: 0,
humidity: 0,
light: 0,
soil: 0,
};
export default function HomeScreen({navigation, route}) {
const [nodeCenter, setNodeCenter] = useState(true);
const [nodeControl, setNodeControl] = useState(false);
const [nodeSensor1, setNodeSensor1] = useState(false);
const [nodeSensor2, setNodeSensor2] = useState(false);
const dataContext = useContext(MyContext);

useEffect(() => {
MqttProcess();

}, []);


const storeDataSensor = async value => {
try {
    let data = value.split(' ');
    let node = data[3];
    if (node === '01') {
    dataSensorNode1.temp = parseInt(data[4].concat(data[5]), 16) / 100;
    dataSensorNode1.humidity = parseInt(data[6].concat(data[7]), 16) / 100;
    dataSensorNode1.soil = parseInt(data[8].concat(data[9]), 16) / 100;
    dataSensorNode1.light =
        parseInt(data[10].concat(data[11], data[12], data[13]), 16) / 100;
    dataContext.setReceiNodeSensor1(true);
    }
    if (node === '02') {
    dataSensorNode2.temp = parseInt(data[4].concat(data[5]), 16) / 100;
    dataSensorNode2.humidity = parseInt(data[6].concat(data[7]), 16) / 100;
    dataSensorNode2.soil = parseInt(data[8].concat(data[9]), 16) / 100;
    dataSensorNode2.light =
        parseInt(data[10].concat(data[11], data[12], data[13]), 16) / 100;
    dataContext.setReceiNodeSensor2(true);
    }
    const jsondataSensorNode1 = JSON.stringify(dataSensorNode1);
    const jsondataSensorNode2 = JSON.stringify(dataSensorNode2);
    await AsyncStorage.setItem('dataSensor1', jsondataSensorNode1);
    await AsyncStorage.setItem('dataSensor2', jsondataSensorNode2);
} catch (e) {
    console.log(e);
}
};
const storeCheckStatus = async value => {
try {
    if (value.charAt(2) === '0') {
    if (value.charAt(8) === '1') {
        setNodeControl(true);
    } else {
        setNodeControl(false);
    }
    if (value.charAt(11) === '1') {
        setNodeSensor1(true);
    } else {
        setNodeSensor1(false);
    }
    if (value.charAt(14) === '1') {
        setNodeSensor2(true);
    } else {
        setNodeSensor2(false);
    }
    }
    if (value.charAt(2) === '3') {
    var status = ConvertValveStatus(value);
    const valueJSON = JSON.stringify(status);
    await AsyncStorage.setItem('valve-status', valueJSON);
    dataContext.setReceiValveState(true);
    console.log(dataContext);
    }
} catch (e) {
    console.log(e);
}
};
function ConvertValveStatus (value) {
const parts = value.trim().split(' ');

if (parts.length !== 4) {
    throw new Error('Chuỗi không hợp lệ');
}
const result = {
    status: parts[2],
    alarm: parts[3],
};
return result;
};
const MqttProcess = () => {
const service = new MqttService();
const success = () => {
    console.log('Connected to server');
    console.log('topic: ', topic, 'and ', topicFromGW);
    service.subscribeTopic(`${topic}`);
    service.subscribeTopic(`${topicFromGW}`);
};
service.connect(success);
const client = service.getCLient();

client.onMessageArrived = message => {
    const payload = message.payloadString;
    if (message.destinationName === topic) {
    storeDataSensor(payload);
    }
    if (message.destinationName === topicFromGW) {
    storeCheckStatus(payload);
    }
    console.log('Message received on topic: ' + message.destinationName);
    console.log('Message content:' + payload);
};
};
const CheckState = () => {
const service = new MqttService();
const success = () => {
    console.log('Connected to server');
    console.log('topic: ', topicToGW);
    service.sendMessage(`${topicToGW}`, checkState);
};
service.connect(success);
};
const HandleFeatureScreen = () => {
navigation.navigate('TÍNH NĂNG');
};
const HandleTest = () => {
CheckState();
console.log('Pressed');
};

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
        {nodeCenter ? (
        <Text style={styles.connectedText}>Đã kết nối </Text>
        ) : (
        <Text style={styles.disconnectText}>Chưa kết nối </Text>
        )}
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối điều khiển</Text>
        {nodeControl ? (
        <Text style={styles.connectedText}>Đã kết nối </Text>
        ) : (
        <Text style={styles.disconnectText}>Chưa kết nối </Text>
        )}
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối cảm biến 1</Text>
        {nodeSensor1 ? (
        <Text style={styles.connectedText}>Đã kết nối </Text>
        ) : (
        <Text style={styles.disconnectText}>Chưa kết nối </Text>
        )}
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>Khối cảm biến 2</Text>
        {nodeSensor2 ? (
        <Text style={styles.connectedText}>Đã kết nối </Text>
        ) : (
        <Text style={styles.disconnectText}>Chưa kết nối </Text>
        )}
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
height: 80,
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
margin: 10,
backgroundColor: '#ffffff',
},
connectedText: {
color: 'green',
marginLeft: 10,
},
disconnectText: {
color: 'red',
marginLeft: 10,
},
});
