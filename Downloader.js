import { PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RNFetchBlob from 'rn-fetch-blob';
import { Linking } from 'react-native';

export default function Downloader() {
  const [url, setUrl] = useState('');



  // Inside your component
  const openAppSettings = () => {
    Linking.openSettings();
  };


  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      console.log(granted,'============',PermissionsAndroid.RESULTS.GRANTED)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile()
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
        openAppSettings();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = () => {
    const { config, fs } = RNFetchBlob;
    const fileDirectory = fs.dirs.DownloadDir;
    const date = new Date()

    config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fileDirectory + "/download_" + Math.floor(date.getDate() + date.getSeconds() / 2) + '.mp4',
        description: 'file download'
      }
    })
      .fetch('GET', url, {
        //some headers ..
      })
      .then((res) => {
        // the temp file path
        alert("file downloaded successfully")
        console.log('The file saved to ', res.path())
      })
  }

  return (
    <View style={styles.downloaderView}>
      <Text style={styles.heading}>Downloader</Text>
      <TextInput
        placeholder='Enter/Paste file URL'
        style={styles.textInput}
        value={url}
        onChangeText={(value) => setUrl(value)}
      />
      <TouchableOpacity style={styles.button}
        onPress={() => {
          if (url !== '') {
            requestStoragePermission()
          } else {
            alert('Please Add URL')
          }
        }}
      >
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>

    </View >
  )
}

const styles = StyleSheet.create({
  downloaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    margin: 20,
    fontSize: 32
  },
  textInput: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: 20
  },
  button: {
    width: '60%',
    height: 50,
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,

  },
  buttonText: {
    alignItems: 'center',
    fontWeight: '900'
  }
})