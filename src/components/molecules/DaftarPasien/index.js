import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const DaftarPasien = ({id, pasienItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ListPasien', {id: id})}>
      <View>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={styles.edit}
            icon={faEdit}
            color={'orange'}
            size={25}
            onPress={() => navigation.navigate('EditPasien', {id: id})}
          />
        </View>
        <View>
          <FontAwesomeIcon
            style={styles.remove}
            icon={faTimes}
            color={'red'}
            size={25}
            onPress={() => removeData(id)}
          />
        </View>
        <Image source={require('./../../../assets/images/pasien.png')} />
      </View>
      <View>
        <Text style={styles.nama}>{pasienItem.tanggal}</Text>
        <Text style={styles.nama}>{pasienItem.nama.substring(0, 9)}</Text>
        <Text style={styles.noRuang}>Keluhan: {pasienItem.Keluhan.substring(0, 9)}</Text>
        <Text style={styles.task}>Dx Medis: {pasienItem.DxMedis.substring(0, 9)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DaftarPasien;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginLeft: 12,
    width: 140,
    height: 200,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nama: {
    justifyContent: 'flex-start',
    marginTop: 100,
    margin: -80,
    fontWeight: 'bold',
    fontSize: 14,
    alignItems: 'center',
  },
  noRuang: {
    position: 'absolute',
    marginTop: 2,
    margin: -80,
    marginTop: 120,
    fontSize: 12,
    color: 'gray',
    alignItems: 'center',
  },
  dpjp: {
    position: 'absolute',
    marginTop: 180,
    margin: -80,
    marginTop: 140,
    fontSize: 12,
    color: 'gray',
    alignItems: 'center',
  },
  task: {
    position: 'absolute',
    marginTop: 160,
    margin: -80,
    fontSize: 12,
    color: 'gray',
    alignItems: 'center',
  },
  edit: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 90,
    marginTop: 10,
  },
  remove: {
    position: 'absolute',
    flex: 1,
    marginLeft: 90,
    marginTop: 60,
  },
});
