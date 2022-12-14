import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Modal,
} from 'react-native'
import { connect } from 'react-redux'
import { InputData, Gap, UploadPhoto, Signature } from '../../components'
import { Fire } from '../../config'

class TambahOs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tanggal: '',
      nama: '',
      Keluhan: '',
      TTV: '',
      Penunjang: '',
      DxMedis: '',
      TerapiObat: '',
      image: null,
      signature: null,
      showModal: false,
    }
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    })
  }

  onSubmit = () => {
    if (
      this.state.tanggal &&
      this.state.nama &&
      this.state.Keluhan &&
      this.state.TTV &&
      this.state.Penunjang &&
      this.state.DxMedis &&
      this.state.TerapiObat
    ) {
      // const pasienReferensi = Fire.database().ref('pasien')
      const pasien = {
        id: new Date().valueOf(),
        tanggal: this.state.tanggal,
        nama: this.state.nama,
        Keluhan: this.state.Keluhan,
        TTV: this.state.TTV,
        Penunjang: this.state.Penunjang,
        DxMedis: this.state.DxMedis,
        TerapiObat: this.state.TerapiObat,
        image: this.state.image ?? null,
        signature: this.state.signature,
      }

      const currentData = [...this.props.pasienList, pasien]

      this.props.updatePasien(currentData)
      this.props.navigation.replace('MainApp')
      Alert.alert('Sukses', 'Data Pasien Tersimpan')

      // pasienReferensi
      //   .push(pasien)
      //   .then((data) => {
      //     Alert.alert('Sukses', 'Data Pasien Tersimpan')
      //     this.props.navigation.replace('MainApp')
      //   })
      //   .catch((error) => {
      //     console.log('Error : ', error)
      //   })
    } else {
      Alert.alert(
        'Error',
        'Tanggal Berobat, Nama Pasien, Keluahan, TTV & Pemeriksaan Fisik, Penunjang Medis, DxMedis, dan TerapiObat wajib diisi'
      )
    }
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={20} />
          <ScrollView style={styles.pages}>
            <InputData
              label='Tanggal Berobat ke Klinik'
              placeholder='Masukkan Tanggal Berobat'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.tanggal}
              namaState='tanggal'
            />
            <InputData
              label='Nama Lengkap Pasien'
              placeholder='Masukkan Nama'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.nama}
              namaState='nama'
            />
            <InputData
              label='Keluhan'
              placeholder='Masukkan Keluhan'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.Keluhan}
              namaState='Keluhan'
            />

            <InputData
              label='TTV & Pemeriksaan Fisik'
              placeholder='Masukkan TTV & Temuan Pemeriksaan Fisik'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.TTV}
              namaState='TTV'
            />

            <InputData
              label='Penunjang Medis'
              placeholder='Masukkan Penunjang Medis, hasil Lab, Exp RO dll'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.Penunjang}
              namaState='Penunjang'
            />

            <InputData
              label='DxMedis'
              placeholder='Masukkan DxMedis saat ini'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.DxMedis}
              namaState='DxMedis'
            />

            <InputData
              label='Resep Obat/ Terapi yang di berikan'
              placeholder='Masukkan Terapi Obat yang di berikan'
              placeholderTextColor={'#000'}
              isTextArea={true}
              onChangeText={this.onChangeText}
              value={this.state.visite}
              namaState='TerapiObat'
            />

            <UploadPhoto
              title='Upload Photo'
              uri={this.state.image}
              handlePhoto={(uri) => this.setState({ image: uri })}
            />

            <Signature
              show={this.state.showModal}
              hide={() => this.setState({ showModal: false })}
              handleSignature={(uri) => this.setState({ signature: uri })}
              handleSave={() => {
                this.onSubmit()
                this.setState({ showModal: false })
              }}
            />

            <TouchableOpacity
              style={styles.tombol}
              onPress={() =>
                this.state.tanggal &&
                this.state.nama &&
                this.state.Keluhan &&
                this.state.TTV &&
                this.state.Penunjang &&
                this.state.DxMedis &&
                this.state.TerapiObat
                  ? this.setState({ showModal: true })
                  : Alert.alert(
                      'Error',
                      'Tanggal Berobat, Nama Pasien, Keluahan, TTV & Pemeriksaan Fisik, Penunjang Medis, DxMedis, dan TerapiObat wajib diisi'
                    )
              }
            >
              <Text style={styles.textTombol}>LANJUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  const pasienList = state.pasienReducer.pasienList

  return {
    pasienList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updatePasien: (data) =>
      dispatch({
        type: 'UPDATE_PASIEN',
        data,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TambahOs)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E',
    flex: 1,
  },
  pages: {
    margin: 10,
    flex: 1,
    padding: 30,
    backgroundColor: '#F8C471',
    borderRadius: 10,
  },
  tombol: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
})
