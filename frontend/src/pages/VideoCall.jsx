import React from 'react';

const VideoCall = ({ roomName, meetingPassword }) => {
  const jitsiContainerId = "jitsi-container";

  React.useEffect(() => {
    const loadJitsiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => initJitsi();
      document.body.appendChild(script);
    };

    const initJitsi = () => {
      const domain = 'meet.jit.si';
      const options = {
        roomName: roomName,
        width: '100%',
        height: 600,
        parentNode: document.getElementById(jitsiContainerId),
        interfaceConfigOverwrite: { prejoinPageEnabled: false },
        configOverwrite: { disableInviteFunctions: true },
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListener('videoConferenceJoined', () => {
        api.executeCommand('password', meetingPassword);
      });

      return () => api.dispose();
    };

    if (window.JitsiMeetExternalAPI) initJitsi();
    else loadJitsiScript();
  }, [roomName, meetingPassword]);

  return <div id={jitsiContainerId} style={{ width: '100%', height: '600px' }} />;
};

export default VideoCall;
