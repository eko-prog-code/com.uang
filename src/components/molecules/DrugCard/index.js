import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

const DrugCard = ({ item, type, onRemove, onPress, uid, produk, onAdd }) => {
  const [isLoading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [showImage, setShowImage] = React.useState(false)

  useEffect(() => {
    changeTitle()
  }, [])

  const changeTitle = () => {
    let title = item?.title
    let arr = title.split('(')
    arr = arr.join('\n(')
    setName(arr)
  }

  return (
    <View
      style={{
        paddingRight: 20,
      }}
    >
      <Pressable onPress={() => setShowImage(true)}>
        <Image
          source={{
            uri: item?.image || '',
          }}
          style={{
            width: 420,
            height: 320,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </Pressable>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2d3436',
            marginTop: 8,
          }}
        >
          {name}
        </Text>
      </View>

      <Modal
        visible={showImage}
        transparent={true}
        onRequestClose={() => setShowImage(false)}
      >
        <ImageViewer
          imageUrls={[
            {
              url: item?.image ?? '',
            },
          ]}
        />
      </Modal>
    </View>
  )
}

export default DrugCard

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  rowBetweenCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
