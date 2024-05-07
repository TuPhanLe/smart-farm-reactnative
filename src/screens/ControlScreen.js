/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
StyleSheet,
View,
Text,
Pressable,
Switch,
TextInput,
Image,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';


export default function ControlScreen({navigation, route}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const HandleAlarm = () => {

        navigation.navigate('HẸN GIỜ')
    }
return (
<View style={styles.body}>
    <View style={styles.directPress}>
    <View style={styles.blockPump}>
        <Text style={styles.text}>BƠM NƯỚC </Text>
        <Text style={styles.text}>{isEnabled ? 'Bật' : 'Tắt'}</Text>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5ad4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style= {styles.switch}
    />
    </View>
    <Pressable
        margin={10}
        onPress={HandleAlarm}
        style={({pressed}) => [
        styles.pressedStyle,
        pressed && {opacity: 0.5},
        ]}>
        <Text style={[styles.text, GlobalStyle.CustomFont]}> HẸN GIỜ</Text>
        <Image
        source={require('../../assets/pic/alarm.jpg')}
        style={styles.image} />
    </Pressable>
    </View>
    <View style={[styles.statusConnetion]}>
    <Text style={styles.textConnect}>TRẠNG THÁI VAN</Text>
    <View style={styles.block}>
        <Text style={styles.text}>VAN NƯỚC </Text>
        <Text style={styles.text}>{isEnabled ? 'Bật' : 'Tắt'}</Text>
        <Image
        source={isEnabled ? require('../../assets/pic/on.jpg') : require('../../assets/pic/off.jpg') }
        style={styles.image} />
    </View>
    </View>
</View>
);
}

const styles = StyleSheet.create({
body: {
flex: 1,
justifyContent: 'flex-start',
},
pressedStyle: {
    position: 'relative',
alignItems: 'flex-start',
justifyContent: 'flex-start',
width: 180,
height: 100,
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
backgroundColor: '#ffffff',
},
directPress: {
flex: 2,
flexDirection: 'row',
justifyContent: 'center',
paddingTop: 35,
},
text: {
fontSize: 17,
fontWeight: 'bold',
margin: 10,
},
block: {
alignItems: 'flex-start',
backgroundColor: '#ffffff',
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
margin: 10,
width: 350,
height: 100,
},
blockPump: {
    position: 'relative',
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    width: 100,
    height: 100,
},
blockData: {
flexDirection: 'row',
alignItems: 'center',
},
blockInput: {
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
margin: 10,
width: 400,
height: 120,
},
input: {
height: 40,
margin: 12,
borderWidth: 1,
padding: 10,
},
status: {
alignItems: 'flex-start',
justifyContent: 'flex-start',
},
statusConnetion: {
marginLeft: 20,
flex: 8,
fontSize: 26,
},
textConnect: {
color: '#333333',
margin: 10,
fontSize: 20,
fontWeight: 'bold',
},
switch : {
    position: 'absolute',
    bottom: 15,
    right: 20,
},
image: {
    position: 'absolute',
    width: 100,
    height: 50,
    resizeMode: 'contain',
    bottom: 10,
    right: 2,
    },
});
