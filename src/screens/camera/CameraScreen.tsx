import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import CloseIcon from '../../../assets/svgs/close.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';

type CameraScreenProps = NativeStackScreenProps<AppStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: CameraScreenProps) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const { hasPermission, requestPermission } = useCameraPermission();
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>Camera permission is required.</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.center}>
        <Text>No camera device found.</Text>
      </View>
    );
  }

  const takePhoto = async () => {
    if (camera.current == null) return;
    try {
      const photo = await camera.current.takePhoto({
        flash: 'off',
      });
      console.log('📷 Photo saved at:', photo.path);
    } catch (e) {
      console.error('Failed to take photo:', e);
    }
  };

  const startVideo = async () => {
    if (camera.current == null) return;
    try {
      setRecording(true);
      await camera.current.startRecording({
        flash: 'off',
        onRecordingFinished: video => {
          console.log('🎥 Video saved at:', video.path);
          setRecording(false);
        },
        onRecordingError: error => {
          console.error('Recording error:', error);
          setRecording(false);
        },
      });
    } catch (e) {
      console.error('Failed to start recording:', e);
      setRecording(false);
    }
  };

  const stopVideo = async () => {
    if (camera.current == null) return;
    try {
      await camera.current.stopRecording();
    } catch (e) {
      console.error('Failed to stop recording:', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <CloseIcon width={24} height={24} />
      </TouchableOpacity>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={true}
        audio={true}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.text}>📸</Text>
        </TouchableOpacity>

        {!recording ? (
          <TouchableOpacity onPress={startVideo} style={styles.button}>
            <Text style={styles.text}>⏺</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={stopVideo} style={styles.button}>
            <Text style={styles.text}>⏹</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
});
