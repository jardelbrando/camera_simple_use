import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function Camera(){
    const [pickedImagePath, setPickedImagePath] = useState('');

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("You've refused to allow this app to access tou photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if(!result.canceled){
            setPickedImagePath(result.assets[0].uri);
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted === false){
            alert("You've refused to allow this app to access tou photos!")
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if(!result.canceled){
            setPickedImagePath(result.assets[0].uri);
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title='Select an Image'></Button>
                <Button onPress={openCamera} title='Open Camera'></Button>
            </View>
            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{uri : pickedImagePath}}
                        style={styles.image}/>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageContainer: {
        padding: 30
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'cover'
    }
});