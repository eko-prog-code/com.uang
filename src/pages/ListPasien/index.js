import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Fire } from '../../config'
import { Gap } from '../../components'
import { connect } from 'react-redux'

class ListPasien extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pasien: {},
    }
  }

  componentDidMount() {
    // Fire.database()
    //   .ref('pasien/' + this.props.route.params.id)
    //   .once('value', (querySnapShot) => {
    //     let data = querySnapShot.val() ? querySnapShot.val() : {}
    //     let pasienItem = { ...data }

    //     this.setState({
    //       pasien: pasienItem,
    //     })
    //   })

    const pasienItem = this.props.pasienList.filter(
      (item) => item.id === this.props.route.params.id
    )[0]

    this.setState({
      pasien: pasienItem,
    })
  }

  render() {
    const { pasien } = this.state
    return (
      <View style={styles.container}>
        <Gap height={20} />
        <ScrollView style={styles.pages}>
          <Text>Tanggal Berobat: </Text>
          <Text style={styles.text}>{pasien.tanggal} </Text>

          <Text>Nama Lengkap Pasien : </Text>
          <Text style={styles.text}>{pasien.nama} </Text>

          <Text>Keluhan : </Text>
          <Text style={styles.text}>{pasien.Keluhan} </Text>

          <Text>TTV & Temuan Pemeriksaan Fisik </Text>
          <Text style={styles.text}>{pasien.TTV} </Text>

          <Text>Penunjang Medis: </Text>
          <Text style={styles.text}>{pasien.Penunjang} </Text>

          <Text>Dx Medis: </Text>
          <Text style={styles.text}>{pasien.DxMedis} </Text>

          <Text>Terapi Obat : </Text>
          <Text style={styles.text}>{pasien.TerapiObat} </Text>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  const pasienList = state.pasienReducer.pasienList

  return {
    pasienList,
  }
}

export default connect(mapStateToProps)(ListPasien)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#34495E',
    flex: 1,
  },
  pages: {
    margin: 30,
    padding: 20,
    backgroundColor: '#F8C471',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})
