import React from "react";
import { useEffect,  useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Header, Input } from "../../components";
import { Fire } from "../../config";
import { colors, showError, storeData, useForm } from "../../utils";
import IcEye from '../../assets/icon/eye.svg';
import IcEyeSlash from '../../assets/icon/eye-slash.svg';

const Register = ({ navigation }) => {
  const { token } = useSelector((state) => state.fcm);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullName: "",
    profession: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onContinue = () => {
    dispatch({ type: "SET_LOADING", value: true });
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        dispatch({ type: "SET_LOADING", value: false });
        setForm("reset");
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          dateOfBirth: form.dateOfBirth,
          phoneNumber: form.phoneNumber,
          email: form.email,
          uid: success.user.uid,
          token: token,
        };

        Fire.database()
          .ref("users/" + success.user.uid + "/")
          .set(data);

        storeData("user", data);
        navigation.navigate("UploadPhoto", data);
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", value: false });
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
       <Gap height={20} />
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label="Nama Lengkap"
            value={form.fullName}
            onChangeText={(value) => setForm("fullName", value)}
          />
          <Gap height={16} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={(value) => setForm("profession", value)}
          />
          <Gap height={16} />
          <Input
            label="Tanggal Lahir"
            value={form.dateOfBirth}
            onChangeText={(value) => setForm("dateOfBirth", value)}
          />
          <Gap height={16} />
          <Input
            label="Nomor Handphone"
            value={form.phoneNumber}
            keyboardType="numeric"
            onChangeText={(value) => setForm("phoneNumber", value)}
            keyboardType="numeric"
          />
          <Gap height={16} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(value) => setForm("email", value)}
          />
          <Gap height={16} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry={!showPassword}
            right={!showPassword ? <IcEye /> : <IcEyeSlash />}
            onPressRight={() => setShowPassword(!showPassword)}
          />
          <Gap height={30} />
          <Button title="Selanjutnya" onPress={onContinue} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 },
});
