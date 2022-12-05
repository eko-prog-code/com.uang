import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import WebView from 'react-native-webview';
  import {useRoute} from '@react-navigation/native';
  import { Gap } from '../../components';

  
  const WebviewPage = ({navigation}) => {
    const routes = useRoute();
    const {link} = routes?.params || {};
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }, []);
  
    return (
      <View style={styles.pages}>
        <Gap height={40} />
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/backIcon.png')}
            style={{width: 45, height: 45, marginLeft: 10}}
            resizeMode={'contain'}
          />
          <Text style={{textAlign: "center"}}>Mohon Menunggu 10 detik setelah loading selesai</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size={40} />
          </View>
        ) : (
          <WebView style={{flex: 1}} source={{uri: link}} />
        )}
      </View>
    );
  };
  
  export default WebviewPage;
  
  const styles = StyleSheet.create({
    pages: {
      flex: 1,
      backgroundColor: 'white',
    },
    back: {
      fontSize: 24,
      color: 'black',
      margin: 20,
    },
    loading: {
      alignSelf: 'center',
      margin: 20,
    },
  });
  
  