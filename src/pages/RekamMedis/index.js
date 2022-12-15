import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faPlus,
  faUser,
  faDownload,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons'
import DaftarPasien from '../../components/molecules/DaftarPasien'
import InputData from '../../components/atoms/InputData'
import { Fire } from '../../config'
import { connect } from 'react-redux'
import { Button } from '../../components'
const RNFS = require('react-native-fs')
import XLSX from 'xlsx'

class RekamMedis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pasiens: [],
      originalPasiens: [],
    }
  }

  componentDidMount() {
    // this.ambilData()

    setTimeout(() => {
      this.setState({
        pasiens: this.props.pasienList,
        originalPasiens: this.props.pasienList,
      })
    }, 2000)
  }

  ambilData = () => {
    Fire.database()
      .ref('pasien')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {}
        let arr = []

        Object.entries(data).map((val) => {
          arr.push({
            id: val[0],
            tanggal: val[1]?.tanggal,
            nama: val[1]?.nama,
            Keluhan: val[1]?.Keluhan,
            TTV: val[1]?.TTV,
            Penunjang: val[1]?.Penunjang,
            DxMedis: val[1]?.DxMedis,
            TerapiObat: val[1]?.TerapiObat,
          })
        })

        this.setState({
          pasiens: arr,
          originalPasiens: arr,
        })
      })
  }

  onSearchPatient = (_, searchValue) => {
    let arr = [...this.state.originalPasiens]
    var searchRegex = new RegExp(searchValue, 'i')
    arr = arr.filter((item) => searchRegex?.test(item?.nama?.toLowerCase()))
    console.log(arr)
    this.setState({
      pasiens: arr,
    })
  }

  removeData = (id) => {
    Alert.alert(
      'Info',
      'Anda yakin akan menghapus Data Pasien ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Fire.database()
            //   .ref('pasien/' + id)
            //   .remove()
            // this.ambilData()
            const currentData = this.props.pasienList.filter(
              (item) => item.id !== id
            )
            this.props.updatePasien(currentData)
            this.setState({
              pasiens: currentData,
              originalPasiens: currentData,
            })
            Alert.alert('Hapus', 'Sukses Hapus Data')
          },
        },
      ],
      { cancelable: false }
    )
  }

  handleAddPasien = () => {
    const profile = this.props.profile
    const pasienList = this.props.pasienList
    if (pasienList.length === 5 && !profile?.premiumExpired) {
      Alert.alert('Upgrade akun anda!')
    } else if (
      pasienList.length === 5 &&
      profile?.premiumExpired &&
      new Date() > new Date(profile.premiumExpired)
    ) {
      Alert.alert('Akses berlangganan anda telah kadaluarsa!')
    } else {
      this.props.navigation.navigate('TambahOs')
    }
  }

  exportDataToExcel = () => {
    // Created Sample data
    let sample_data_to_export = [...this.props.pasienList]
    sample_data_to_export.map((item, key) => {
      sample_data_to_export[key].image = ''
      sample_data_to_export[key].signature = ''
      sample_data_to_export[key].id = key + 1
    })

    let wb = XLSX.utils.book_new()
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export)
    XLSX.utils.book_append_sheet(wb, ws, 'Pasien')
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' })

    const fileStorage =
      RNFS.ExternalStorageDirectoryPath +
      `/Download/pasien-${new Date().valueOf()}.xlsx`
    RNFS.writeFile(fileStorage, wbout, 'ascii')
      .then((r) => {
        console.log('Success')
        Alert.alert(
          'Unduh Berhasil',
          `File berhasil terunduh ke ${fileStorage}`,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        )
      })
      .catch((e) => {
        console.log('Error', e)
        Alert.alert(
          'Download Gagal',
          'Terjadi kesalahan saat mengunduh file anda.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        )
      })
  }

  handleExport = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        )

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.exportDataToExcel()
          console.log('Permission granted')
        } else {
          // Permission denied
          console.log('Permission denied')
        }
      } else {
        this.exportDataToExcel()
      }
    } catch (e) {
      console.log('Error while checking permission')
      console.log(e)
      return
    }
  }

  render() {
    const { pasiens } = this.state
    const { profile, pasienList } = this.props

    return (
      <View style={styles.page}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor={'rgba(0,0,0,0.5)'}
          hidden={false}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Rekam Medis</Text>

          <InputData
            placeholder={'Cari Pasien'}
            placeholderColor={'#FFFFFF'}
            onChangeText={this.onSearchPatient}
          />

          <View>
            <View style={styles.wrapperUser}>
              <TouchableOpacity
                style={styles.btnTambah}
                onPress={this.handleAddPasien}
              >
                <FontAwesomeIcon icon={faUser} size={20} color={'white'} />
                <View>
                  <FontAwesomeIcon
                    style={styles.plus}
                    icon={faPlus}
                    size={18}
                    color={'white'}
                  />
                  <Text style={styles.text}>TAMBAH PASIEN</Text>
                </View>
              </TouchableOpacity>

              {pasienList.length > 0 &&
                profile?.premiumExpired &&
                new Date() < new Date(profile?.premiumExpired) && (
                  <TouchableOpacity
                    style={styles.btnTambah}
                    onPress={this.handleExport}
                  >
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      size={20}
                      color={'white'}
                    />
                    <View>
                      <FontAwesomeIcon
                        style={styles.plus}
                        icon={faDownload}
                        size={18}
                        color={'white'}
                      />
                      <Text style={styles.text}>EKSPOR EXCEL</Text>
                    </View>
                  </TouchableOpacity>
                )}
            </View>

            <View style={styles.wrapperScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.category}>
                  {pasiens.length > 0 ? (
                    pasiens.map((item, key) => (
                      <DaftarPasien
                        key={key}
                        pasienItem={item}
                        id={item?.id}
                        {...this.props}
                        removeData={() => this.removeData(item?.id)}
                      />
                    ))
                  ) : (
                    <Text style={styles.zero}>Daftar Kosong</Text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RekamMedis)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 8,
    marginBottom: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 0,
    color: '#FBFCFC',
  },
  listPasien: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  plus: {
    marginTop: -20,
    marginLeft: 26,
  },
  zero: {
    marginLeft: 14,
    color: '#FFFFFF',
  },
  text: {
    marginTop: -20,
    marginLeft: 80,
    color: 'white',
    fontSize: 16,
  },
  wrapperScroll: {
    marginHorizontal: -16,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 6,
  },
  category: { flexDirection: 'row' },
  btnTambah: {
    marginTop: 8,
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
