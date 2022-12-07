import firebase from 'firebase'
import React, { useState, useEffect } from 'react'
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native'
import { Button, Gap, Input } from '../..'
import { Fire } from '../../../config'
import { colors } from '../../../utils'
import IcEye from '../../../assets/icon/eye-slash.svg'
import IcEyeSlash from '../../../assets/icon/eye.svg'
import { useNavigation } from '@react-navigation/native'

const ModalDrug = ({ visible, onSubmit, onClose, type, profile }) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [textBayar, setTextBayar] = useState([])

  useEffect(() => {
    getTextPembayaran()
  }, [])

  const getTextPembayaran = () => {
    Fire.database()
      .ref('textBayar')
      .once('value')
      .then((res) => {
        setTextBayar(res?.val())
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const navigation = useNavigation()

  const handleSubmit = () => {
    setLoading(true)
    if (password === String(profile?.dp)) {
      const isExpired = new Date() > new Date(profile.premiumExpired)

      if (isExpired) {
        Alert.alert('Akses berlangganan anda telah kadaluarsa!')
      } else {
        navigation.navigate('DrugBerbayar', {
          profile,
        })
        onSubmit && onSubmit(password)
        setPassword('')
      }
    } else {
      Alert.alert('Salah password')
    }
    setLoading(false)
  }

  return (
    <Modal visible={visible} animationType='fade' transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Input
            onChangeText={(val) => setPassword(val)}
            value={password}
            label='Password Akses'
            secureTextEntry={!showPassword}
            right={!showPassword ? <IcEye /> : <IcEyeSlash />}
            onPressRight={() => setShowPassword(!showPassword)}
            placeholder='Masukkan password'
          />
          <Gap height={24} />
          <Button onPress={handleSubmit} disable={loading} title='Submit' />
          <Gap height={20} />
          <Text>{textBayar}</Text>
          <Text selectable={true}>Pembayaran: BNI 0983620094</Text>
          <Text selectable={true}>a.n (EKO SETIAJI)</Text>

          <Gap height={20} />
          <Button
            onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
            title='Hubungi Admin'
          />
          <Text>Kirim Bukti Pembayaran, tekan Button Hub. Admin</Text>

          <Gap height={20} />
          <Button
            type='secondary'
            onPress={() => onClose && onClose()}
            disable={loading}
            title='Tutup'
          />
          <Text>Resource: Resep dokter Spesialis</Text>
        </View>
      </View>
    </Modal>
  )
}

export default ModalDrug

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.loadingBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    width: Dimensions.get('screen').width - 40,
    padding: 20,
    borderRadius: 10,
  },
<<<<<<< HEAD
})
=======
})
>>>>>>> 2fc9df1e684174e35146c2eac8c70950a0e23c36
