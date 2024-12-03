import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import notifee from '@notifee/react-native'

const App = () => {

  async function onDisplayNotification() {

    await notifee.requestPermission();


    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })


    await notifee.displayNotification({
      title: 'Keep Moving!',
      body: 'You are just 2,000 steps away from reaching your daily goal. Let\'s go!',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    })
  }


  useEffect(() => {
    const triggerNotification = () => {

      const stepsReached = 8000
      const targetSteps = 10000

      if (stepsReached < targetSteps) {
        onDisplayNotification()
      }
    }

    const timeout = setTimeout(triggerNotification, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fitness Tracker</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default App
