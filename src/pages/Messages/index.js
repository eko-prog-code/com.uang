import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CircleStory, Gap, List } from "../../components";
import { Fire } from "../../config";
import { colors, fonts, getData, showError } from "../../utils";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob-next';

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userListAll, setUserListAll] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user?.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on("value", async (snapshot) => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async (key) => {
          const urlUidOurstaff = `ourstaffs/${oldData[key].uidPartner}`;
          // const urlUidUsers = `users/${oldData[key].uidPartner}`;

          const detailOurstaff = await rootDB
            .child(urlUidOurstaff)
            .once("value");
          // const detailUsers = await rootDB.child(urlUidUsers).once("value");

          data.push({
            id: key,
            detailOurstaff: detailOurstaff.val(),
            // detailUsers: detailUsers.val(),
            ...oldData[key],
          });
        });

        await Promise.all(promises);

        setHistoryChat(data);
      }
    });
  }, [user?.uid]);

  useEffect(() => {
    getUserList();
  }, []);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  const getUserList = () => {
    Fire.database()
      .ref("ourstaffs/")
      .once("value")
      .then(async (res) => {
        if (res.val()) {
          const data = res.val();
          const realData = [];
          Object.entries(data).map((val) => {
            realData.push({ data: val[1] });
          });
          let filterData = realData?.filter((val) => val?.data?.uid);
          setUserList([...userList, ...filterData]);
          setUserListAll([...userListAll, ...filterData]);
          setLoading(false);
          // Fire.database()
          //   .ref("ourstaffs/")
          //   .once("value")
          //   .then(async (res) => {
          //     if (res.val()) {
          //       const dataStaff = res.val();
          //       const realDataStaff = [];
          //       Object.entries(dataStaff).map((val) => {
          //         realDataStaff.push({ data: val[1] });
          //       });
          //       filterData = [
          //         ...filterData,
          //         ...realDataStaff?.filter((val) => val?.data?.uid),
          //       ];
          //       setUserList([...userList, ...filterData]);
          //       setUserListAll([...userListAll, ...filterData]);
          //       setLoading(false);
          //     }
          //   })
          //   .catch((err) => {
          //     showError(err.message);
          //   });
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const handleFilter = (val) => {
    setLoading(true);
    let arr = [...userListAll];
    var searchRegex = new RegExp(val, "i");
    arr = arr.filter((item) => {
      return searchRegex?.test(item?.data?.hospital_address);
    });
    console.log("arrr", arr);
    setUserList(arr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
      <Gap height={20} />
        <ScrollView>
          <Text style={styles.title}>Pesan</Text>
          <Text style={styles.subtitle}>Daftar Akun terlebih dahulu, untuk masuk Chat Group</Text>
          <Text style={styles.subtitle}>Chat Gruop</Text>
          <View>
            <List
              icon="logo"
              name={"Komunitas UANG"}
              desc={"Partnership ~ share, inspiring & innovation"}
              onPress={() => navigation.navigate("ChattingGroup")}
            />
          </View>
          <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-5777911853365634/4841663564"
          onAdFailedToLoad={error => console.error(error)}
        />
        </ScrollView>
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.secondary, flex: 1 },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  },
});