import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import CloseIcon from '../../../assets/svgs/close.svg';
import CameraIcon from '../../../assets/svgs/camera.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import Video from 'react-native-video';

type RecordScreenProps = NativeStackScreenProps<AppStackParamList, 'Record'>;

export default function RecordScreen({ navigation }: RecordScreenProps) {
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
  const [lastVideo, setLastVideo] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (!hasPermission) requestPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

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

  const startVideo = () => {
    if (camera.current == null) return;
    setRecording(true);

    camera.current.startRecording({
      flash: 'off',
      onRecordingFinished: video => {
        setLastVideo('file://' + video.path);
        setRecording(false);
      },
      onRecordingError: () => {
        setRecording(false);
      },
    });
  };

  const stopVideo = async () => {
    if (camera.current == null) return;
    try {
      await camera.current.stopRecording();
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeCamera}
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
      />

      <View style={styles.controls}>
        {!recording ? (
          <TouchableOpacity onPress={startVideo} style={styles.button}>
            <View style={styles.startButton} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={stopVideo} style={styles.buttonStop}>
            <View style={styles.stopButton} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          style={styles.cameraButton}
        >
          <CameraIcon width={28} height={28} />
        </TouchableOpacity>
      </View>

      {/* Thumbnail preview */}
      {lastVideo && (
        <Pressable
          style={styles.previewContainer}
          onPress={() => setPreviewVisible(true)}
        >
          <Image
            source={{
              uri: 'https://img.icons8.com/ios-filled/100/ffffff/video.png',
            }}
            style={styles.previewImage}
          />
        </Pressable>
      )}

      {/* Fullscreen modal preview */}
      <Modal visible={previewVisible} transparent={true}>
        <View style={styles.modalContainer}>
          {lastVideo && (
            <Video
              source={{ uri: lastVideo }}
              style={styles.fullVideo}
              controls={true}
              resizeMode="contain"
            />
          )}
          <Pressable
            style={styles.closeButton}
            onPress={() => setPreviewVisible(false)}
          >
            <CloseIcon width={24} height={24} />
          </Pressable>
        </View>
      </Modal>
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
    justifyContent: 'center',
  },
  button: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
    padding: 3,
    borderRadius: 50,
  },
  buttonStop: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
    padding: 15,
    borderRadius: 50,
  },
  startButton: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  stopButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  cameraButton: {
    padding: 10,
    position: 'absolute',
    right: '20%',
    top: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
  },
  previewContainer: {
    position: 'absolute',
    bottom: 45,
    left: 40,
    alignItems: 'center',
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullVideo: {
    width: '100%',
    height: '70%',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 32,
  },
  closeCamera: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
});
