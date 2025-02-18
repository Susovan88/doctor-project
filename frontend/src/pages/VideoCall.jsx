
// src/components/JitsiMeet.js
import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams } from 'react-router-dom';


const VideoCall = () => {
  const { id } = useParams(); 
  return (
    <div style={{ height: '700px', width: '100%' }}>
      <JitsiMeeting
        roomName={id}
        configOverwrite={{
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: false,
        }}
        userInfo={{
          displayName: 'Your Name'
        }}
      />
    </div>
  );
};



export default VideoCall;
