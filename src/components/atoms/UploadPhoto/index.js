import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

export default function UploadPhoto({ title, handlePhoto, uri }) {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera')
        return true
      } else {
        console.log('Camera permission denied')
        return false
      }
    } catch (err) {
      console.warn(err)
      return false
    }
  }

  const handleTake = async (type) => {
    let data = null

    if (type === 'camera') {
      const granted = await requestCameraPermission()
      if (!granted) return
      data = await launchCamera({ includeBase64: true, mediaType: 'photo' })
    } else if (type === 'gallery') {
      data = await launchImageLibrary({ includeBase64: true })
    }

    if (data.didCancel) return

    const image = `data:${data.assets[0].type};base64, ${data.assets[0].base64}`
    handlePhoto(image)
  }

  const handlePress = () => {
    Alert.alert('Photo', 'Ambil photo dari?', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Galeri',
        onPress: () => handleTake('gallery'),
      },
      { text: 'Kamera', onPress: () => handleTake('camera') },
    ])
  }

  return (
    <View>
      {title && <Text style={styles.text}>{title} :</Text>}

      <Pressable onPress={handlePress}>
        <Image
          source={{
            uri:
              uri ??
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdnpqB61gYpBX78f1fUmfFdrl1yOryGzCOPw&usqp=CAU',
          }}
          resizeMode='cover'
          style={styles.image}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
})
