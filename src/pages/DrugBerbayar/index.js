import React, {Component, useCallback, useEffect, useState, memo} from 'react';
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
import {HeadlineItem, Gap, ProdukCard, Button} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const MemoView = memo(View);
const MemoTouchableOpacity = memo(TouchableOpacity);

const CATEGORY_DATA = [
  {
    title: 'Referensi Obat Dewasa',
    image: require('../../assets/images/adult.png'),
    page: 'AdultDrug',
  },
  {
    title: 'Referensi Obat Anak',
    image: require('../../assets/images/pediatric.png'),
    page: 'PediatricDrug',
  },
  {
    title: 'Referensi Obat Kulit',
    image: require('../../assets/images/derma.png'),
    page: 'DermaDrug',
  },
  {
    title: 'Referensi Obat Gigi',
    image: require('../../assets/images/tooth.png'),
    page: 'ToothDrug',
  },
];

const DrugBerbayar = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <View style={styles.pilihJersey}>
      <Gap height={24} />
      <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
          }}>
          (Database Doctor Spesialis)
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 14,
            textAlign: 'center',
          }}>
          @cloud computing FIREBASE
        </Text>
        <Gap height={24} />
        <Text
          style={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
          }}>
          Pilih Kategori
        </Text>
        <Gap height={24} />
        <MemoView style={styles.categoryContainer}>
          {CATEGORY_DATA.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item?.page, item.page === 'AdultDrug');
              }}
              style={styles.categoryItem}
              key={index}>
              <Image
                style={styles.imageCategory}
                source={item?.image || require('../../assets/images/adult.png')}
              />
              <Text style={styles.titleCategory}>{item?.title}</Text>
            </TouchableOpacity>
          ))}
        </MemoView>
      </View>
    </View>
  );
};
export default DrugBerbayar;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#2772E7',
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
  pilihJersey: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  sectionLabel: {
    fontSize: 16,
    marginTop: 30,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    flexBasis: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  imageCategory: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  titleCategory: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
});
