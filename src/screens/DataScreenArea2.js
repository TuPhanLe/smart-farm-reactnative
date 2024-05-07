/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {
StyleSheet,
View,
Text,
Pressable,
TextInput,
ImageBackground,
Image,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
const initData = {
temp: 0,
humidity: 0,
light: 0,
soil: 0,
};
export default function DataScreenArea2({navigation, route}) {
const [dataEnvironment, setDataEnvironment] = useState(initData);
const [timeCollectData, setTimeCollectData] = useState(1);

const HandleAreaScreen1 = () => {
    navigation.navigate('DỮ LIỆU KHU VỰC 1')
}

return (
<View style={styles.body}>
    <Image
    source={require('../../assets/pic/garden_2.png')}
    style={styles.image}
    />
    <View style={styles.directPress}>
    <Pressable
        onPress={HandleAreaScreen1}
        style={({pressed}) => [
        styles.pressedStyle,
        pressed && {opacity: 0.6, backgroundColor: '#ddd'},
        ]}>
        <Text style={[styles.text, GlobalStyle.CustomFont]}>KHU VỰC 1</Text>
    </Pressable>
    <Pressable
        // onPress={HandleFeatureScreen}
        style={({pressed}) => [
        styles.pressedStyle,
        pressed && {opacity: 0.6, backgroundColor: '#ddd'},
        ]}>
        <Text style={[styles.text, GlobalStyle.CustomFont]}>KHU VỰC 2</Text>
    </Pressable>
    </View>
    <View style={styles.blockInput}>
    <Text style={styles.text}>
        THỜI GIAN THU THẬP DỮ LIỆU ĐỊNH KÌ: {timeCollectData} PHÚT
    </Text>
    <TextInput
        placeholder="Xin mời nhập thời gian thu thập (phút)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={value => {
        setTimeCollectData(value);
        }}
    />
    </View>
    <Text style={styles.text}> Dữ liệu được cập nhật tại thời điểm: </Text>
    <View style={styles.blockData}>
    <View style={styles.block}>
        <Text style={styles.text}>NHIỆT ĐỘ</Text>
        <Text style={styles.text}>{dataEnvironment.temp} °C</Text>
        <View />
    </View>

    <View style={styles.block}>
        <Text style={styles.text}>ĐỘ ẨM</Text>
        <Text style={styles.text}>{dataEnvironment.humidity} %</Text>
    </View>
    <View />
    </View>
    <View style={styles.blockData}>
    <View style={styles.block}>
        <Text style={styles.text}>CƯỜNG ĐỘ ÁNH SÁNG</Text>
        <Text style={styles.text}>{dataEnvironment.light} LUX</Text>
        <View />
    </View>
    <View style={styles.block}>
        <Text style={styles.text}>ĐỘ ẨM ĐẤT</Text>
        <Text style={styles.text}>{dataEnvironment.soil} %</Text>
        <View />
    </View>
    </View>
</View>
);
}

const styles = StyleSheet.create({
body: {
flex: 1,
flexDirection: 'column',
alignItems: 'center',
backgroundColor: '#ffffff',
},
image: {
borderRadius: 20,
margin: 10,
width: 800,
height: 280,
resizeMode: 'stretch',
},
imageBlock: {
width: 50,
height: 50,
resizeMode: 'contain',
},
text: {
fontSize: 14,
fontWeight: 'bold',
margin: 10,
},
block: {
flex: 1,
alignItems: 'flex-start',
padding: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
margin: 10,
width: 190,
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
backgroundColor: '#ffffff',
},
input: {
height: 40,
margin: 12,
borderWidth: 1,
padding: 10,
},
pressedStyle: {
alignItems: 'center',
justifyContent: 'center',
width: 180,
height: 60,
margin: 10,
borderRadius: 10,
borderWidth: 1,
borderColor: '#ccc',
backgroundColor: '#ffffff',
},
directPress: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
},
});
