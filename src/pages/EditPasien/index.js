import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import {InputOs, Gap} from '../../components';
import { Fire } from "../../config";

export default class EditPasien extends Component {
  constructor(props) {
    super(props);

    this.state = {
        tanggal: '',  
        nama: '',
        Keluhan: '',
        TTV: '',
        Penunjang: '',
        DxMedis: '',
        TerapiObat: '',
    };
  }

  componentDidMount() {
    Fire.database()
      .ref('pasien/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let pasienItem = {...data};

        this.setState({
          tanggal: pasienItem.tanggal,
          nama: pasienItem.nama,
          Keluhan: pasienItem.Keluhan,
          TTV: pasienItem.TTV,
          Penunjang: pasienItem.Penunjang,
          DxMedis: pasienItem.DxMedis,
          TerapiObat: pasienItem.TerapiObat
        });
      });
  }

  onChangeText = (namaState, value) => {
    this.setState({
      [namaState]: value,
    });
  };

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
      const pasienReferensi = Fire.database().ref(
        'pasien/' + this.props.route.params.id,
      );

      const pasien = {
        tanggal: this.state.tanggal,
        nama: this.state.nama,
        Keluhan: this.state.Keluhan,
        TTV: this.state.TTV,
        Penunjang: this.state.Penunjang,
        DxMedis: this.state.DxMedis,
        TerapiObat: this.state.TerapiObat
      };

      pasienReferensi
        .update(pasien)
        .then((data) => {
          Alert.alert('Sukses', 'Terupdate');
          this.props.navigation.replace('MainApp');
        })
        .catch((error) => {
          console.log('Error : ', error);
        });
    } else {
      Alert.alert(
        'Error',
        'Tanggal Berobat, Nama, Nomor Ruang, TTV, Penunjang, dan DxMedis, Terapi Obat wajib diisi',
      );
    }
  };

  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={20}/>          
            <View style={styles.container}>
            <ScrollView style={styles.pages}>
            <InputOs
                label="Tanggal Berobat"
                placeholder="Masukkan Tanggal Berobat"
                placeholderTextColor={"#000"}
                onChangeText={this.onChangeText}
                value={this.state.tanggal}
                namaState="tanggal"
              />
              <InputOs
                label="Nama Pasien"
                placeholder="Masukkan Nama Pasien"
                placeholderTextColor={"#000"}
                onChangeText={this.onChangeText}
                value={this.state.nama}
                namaState="nama"
              />
              <InputOs
                label="Keluhan"
                placeholder="Masukkan Keluhan"
                placeholderTextColor={"#000"}
                onChangeText={this.onChangeText}
                value={this.state.Keluhan}
                namaState="Keluhan"
              />

              <InputOs
                label="TTV Medis & Pemeriksaan Fisik"
                placeholder="Masukkan TTV Medis & Temuan Pemeriksaan Fisik"
                placeholderTextColor={"#000"}
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.TTV}
                namaState="TTV"
              />

              <InputOs
                label="Penunjang Medis"
                placeholder="Penunjang Medis"
                placeholderTextColor={"#000"}
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.Penunjang}
                namaState="Penunjang"
              />

              <InputOs
                label="Diagnosa Medis"
                placeholder="Masukkan Diagnosa Medis"
                placeholderTextColor={"#000"}
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.DxMedis}
                namaState="DxMedis"
              />

            <InputOs
                label="Terapi Obat"
                placeholder="Masukkan Terapi Obat"
                placeholderTextColor={"#000"}
                isTextArea={true}
                onChangeText={this.onChangeText}
                value={this.state.TerapiObat}
                namaState="TerapiObat"
              />

              <TouchableOpacity
                style={styles.tombol}
                onPress={() => this.onSubmit()}>
                <Text style={styles.textTombol}>SIMPAN</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E',
    flex: 1,
  },
  pages: {
    margin: 10,
    backgroundColor: '#F8C471',
    padding: 30,
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
});
