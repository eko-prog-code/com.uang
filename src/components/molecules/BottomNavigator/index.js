import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, getData } from '../../../utils'
import { TabItem } from '../../atoms'

const BottomNavigator = ({ state, descriptors, navigation }) => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)

  const getUser = async () => {
    const user = await getData('user')

    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }

    setLoading(false)
  }

  React.useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented && !loading) {
            if (route.name === 'Pesan' || route.name === 'Daftar Transaksi') {
              if (!user) {
                navigation.navigate('Login')
              } else {
                navigation.navigate(route.name)
              }
            } else {
              navigation.navigate(route.name)
            }
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabItem
            key={index}
            title={label}
            active={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        )
      })}
    </View>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 12,
    backgroundColor: colors.secondary,
  },
<<<<<<< HEAD
})
=======
})
>>>>>>> 2fc9df1e684174e35146c2eac8c70950a0e23c36
