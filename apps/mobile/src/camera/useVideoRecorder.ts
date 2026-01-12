import { useState, useRef } from 'react';
import { CameraView } from 'expo-camera';

// When user taps record:
// Start recording, limit to 1 minute to call stopRecording or if user presses button again.
export function useVideoRecorder(onVideoRecorded?: (uri: string) => void) {
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>();
  const cameraRef = useRef<CameraView>(null);

  const stopRecording = async () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || recording) return;

    setRecording(true);

    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: 60 });

      // This runs AFTER recording stops (either manually or by timeout)
      console.log('Recording complete! Video URI:', video?.uri);
      setVideoUri(video?.uri || null);
      setRecording(false);

      // TODO: Navigate to preview screen or start upload
      if (video?.uri && onVideoRecorded) {
        onVideoRecorded(video.uri);
      }
      return video?.uri;
    } catch (error) {
      console.log('Recording error: ' + error);
      setRecording(false);
    }
  };

  return {
    cameraRef,
    recording,
    videoUri,
    startRecording,
    stopRecording,
  };
}
