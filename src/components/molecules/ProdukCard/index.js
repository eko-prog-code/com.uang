import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ProdukCard = ({item, type, onRemove, onPress, uid, produk, onAdd}) => {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    changeTitle();
  }, []);

  const changeTitle = () => {
    let title = item?.title;
    let arr = title.split('(');
    arr = arr.join('\n(');
    setName(arr);
  };

  return (
    <View
      style={[
        {
          height: Dimensions.get('screen').height / 1,
          width: Dimensions.get('screen').width - 40,
          borderRadius: 10,
          marginRight: 10,
          marginBottom: 84,
          marginTop: 20,
          backgroundColor: '#FFFFFF',
        },
        styles.shadow,
      ]}>
      <Image
        source={{
          uri: item?.image || '',
        }}
        style={{
          width: Dimensions.get('screen').width - 40,
          height: 320,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2d3436',
            marginTop: 8,
          }}>
          {name}
        </Text>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.senin}
        </Text>

        <Text
          numberOfLines={3}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.selasa}
        </Text>

        <Text
          numberOfLines={4}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.rabu}
        </Text>

        <Text
          numberOfLines={5}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.kamis}
        </Text>

        <Text
          numberOfLines={6}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.jumat}
        </Text>

        <Text
          numberOfLines={7}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.sabtu}
        </Text>

        <Text
          numberOfLines={8}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.minggu}
        </Text>

        <Text
          numberOfLines={9}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.siji}
        </Text>

        <Text
          numberOfLines={10}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.loro}
        </Text>

        <Text
          numberOfLines={11}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.telu}
        </Text>

        <Text
          numberOfLines={12}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.papat}
        </Text>
        
        <Text
          numberOfLines={13}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.limo}
        </Text>

        <Text
          numberOfLines={14}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.enem}
        </Text>

        <Text
          numberOfLines={15}
          ellipsizeMode={'tail'}
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: '#27AE60',
          }}>
          {item?.pitu}
        </Text>
      </View>
    </View>
  );
};

export default ProdukCard;

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
});