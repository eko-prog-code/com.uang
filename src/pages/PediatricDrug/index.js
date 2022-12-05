import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Fire } from "../../config";
import {HeadlineItem, Jarak, ProdukCard,} from '../../components';

const PediatricDrug = props => {
  const [produks, setProduks] = useState([]);
  const [produksAll, setProduksAll] = useState([]);
  const [searchProdukLoading, setSearchProdukLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getProduks();
  }, []);

  const getProduks = () => {
    Fire.database()
      .ref('PediatricDrug')
      .on('value', res => {
        setRefreshing(true);
        const arr = [...res.val()];
        setProduks(arr.filter(val => val !== null));
        setProduksAll(arr.filter(val => val !== null));
      });
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
    setSearchProdukLoading(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const handleProduksFilter = val => {
    setSearchProdukLoading(true);
    let arr = [...produksAll];
    var searchRegex = new RegExp(val, 'i');
    arr = arr.filter(item => searchRegex?.test(item?.title));
    setProduks(arr);
    setTimeout(() => {
      setSearchProdukLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProduks} />
        }>
        <View style={styles.colom}>
          <Text style={styles.row}>CARI OBAT REFERENSI</Text>
          <View style={styles.imageDok}>
            <Image
              source={require('../../assets/images/dokterChat.png')}
              style={styles.rowCenter}
            />
          </View>
        </View>

        <View style={styles.cariObat}>
          <TextInput
            onChangeText={val => handleProduksFilter(val, produks)}
            selectTextOnFocus
            style={styles.searchInput}
            placeholder="MASUKAN KELUHAN/ DIAGNOSA"
            placeholderTextColor="#27AE60"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, paddingHorizontal: 2}}>
          {searchProdukLoading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={{marginTop: 40, marginLeft: 40}}
            />
          ) : (
            produks?.map((item, index) => (
              <ProdukCard
                onRemove={() => handleRemoveFavorite(item, produks)}
                onAdd={() => handleAddFavorite(item, produks)}
                onPress={() => handleBuy(item)}
                type="produk"
                key={index}
                item={item}
              />
            ))
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};
export default PediatricDrug;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#27AE60',
    paddingLeft: 10,
    paddingTop: 12,
  },
  colom: {
    alignItems: 'stretch',
    paddingLeft: 40,
  },
  cariObat: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingLeft: 40,
    paddingRight: 10,
    width: '96%',
  },
  searchInput: {
    color: '#00A2E9',
    fontWeight: 'bold',
  },
  row: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginHorizontal: 2,
  },

  rowCenter: {
    height: 40,
    width: 40,
    marginTop: -40,
    marginBottom: 10,
    marginLeft: 200,
  },
  imageDok: {
    alignItems: 'center',
  },
});
