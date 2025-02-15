import Push from 'push.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showPushNotification = (title, body) => {
  console.log("Push.js Permission:", Push.Permission.has());
  if (Push.Permission.has()) {
    Push.create(title, {
      body,
      timeout: 4000,
      onClick: () => window.focus(),
      onError: (err) => console.error("Push notification error:", err)
    });
  } else {
    console.error("Push notifications not allowed by the user.");
  }
};

export const showToastNotification = (message) => {
  console.log("toast notification.");
  toast.info(message, {
      position: "top-right", // Corrected position
      autoClose: 7000,       
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
};
