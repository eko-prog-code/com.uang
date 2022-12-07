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

const DrugCard = ({item, type, onRemove, onPress, uid, produk, onAdd}) => {
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
    <View  style={{
        paddingRight: 20,
      }}>
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
      </View>
    </View>
  );
};

export default DrugCard;

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