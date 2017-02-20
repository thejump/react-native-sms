//@flow
'use strict';

import { NativeModules, PermissionsAndroid, Platform } from 'react-native'

async function send(options: Object, callback: () => void) {
  if (Platform.OS === 'android') {
     try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          'title': 'The Jump Needs Your Permission',
          'message': 'You have requested to send a text message so we need you to grant us permission.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  NativeModules.SendSMS.send(options, callback);
}

let SendSMS = {
  send
}

module.exports = SendSMS;
