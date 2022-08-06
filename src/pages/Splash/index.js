import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ILLogo } from "../../assets";
import { colors, fonts } from "../../utils";
import { Fire } from "../../config";
import PushNotification from "react-native-push-notification";

const Splash = ({ navigation }) => {
  const [pushNotification, setPushNotification] = useState(false);

  useEffect(() => {
    getPushNotification();
  }, []);

  const getPushNotification = () => {
    if (!pushNotification) {
      setPushNotification(true);
    }
  };

  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace("MainApp");
        } else {
          navigation.replace("GetStarted");
        }
      }, 3000);
      PushNotification.localNotification({
        channelId: "alocaremobile",
        message: "(Finance, Education, E-Commerce, Web Referensi", // (required)
        date: new Date(Date.now() + 1 * 1000), // in 60 secs
      });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Alo Care</Text>
      <Text style={styles.line}>Kami Peduli Anda Sukses</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
  line: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
