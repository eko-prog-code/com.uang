import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SignatureScreen from 'react-native-signature-canvas'
import { colors } from '../../../utils'
import Modal from 'react-native-modal'

export default function Signature({ show, hide, handleSignature, handleSave }) {
  const ref = React.useRef()

  const handleOK = (signature) => {
    handleSignature(signature)
  }

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty')
  }

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!')
  }

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature()
  }

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log('get data')
  }

  return (
    <Modal
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Tanda Tangan:</Text>
        <View style={{ width: '100%', height: 150 }}>
          <SignatureScreen
            ref={ref}
            onOK={handleOK}
            onEnd={handleEnd}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            autoClear={false}
          />
        </View>

        <TouchableOpacity style={styles.tombol} onPress={handleSave}>
          <Text style={styles.textTombol}>SIMPAN</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
  tombol: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
})
