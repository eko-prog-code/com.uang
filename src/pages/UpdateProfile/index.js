import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { ILNullPhoto } from "../../assets";
import { Button, Gap, Header, Input, Profile } from "../../components";
import { Fire } from "../../config";
import { colors, getData, showError, storeData } from "../../utils";

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    profession: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState("");

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      setPhotoForDB(res?.photo?.length > 1 ? res.photo : ILNullPhoto);
      const tempPhoto =
        res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError("Password kurang dari 6 karater");
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };

  const updatePassword = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password).catch((err) => {
          showError(err.message);
        });
      }
    });
  };

  const updateProfileData = () => {
    let data = profile;
    data.photo = photoForDB;
    Fire.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData("user", data)
          .then(() => {
            navigation.replace("MainApp");
          })
          .catch(() => {
            showError("Terjadi Masalah");
          });
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    }) 
    .then(image => {
      const source = {uri: image.path};

      setPhotoForDB(`data:${image.mime};base64,${image.data}`);
      setPhoto(source);
      setHasPhoto(true);
    })
    .catch(err => {
      console.log(err);
    });
};

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Nama Lengkap"
            value={profile.fullName}
            onChangeText={(value) => changeText("fullName", value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText("profession", value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Simpan Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 },
});
