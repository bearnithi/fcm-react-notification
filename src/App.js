import { useEffect } from 'react';
import firebase from './firebase';
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import { ToastContainer, toast } from "react-toastify";
import NotificationToast from './NotificationToast';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const firebaseMessagingInit = async () => {
    if(!("Notification" in window)) {
      console.log("Browser doesn't support Notification")
    } else if (Notification.permission === "granted") {
      generateFCMToken();
    } else if (Notification.permission !== "denied") {
      try {
        const permission = await Notification.requestPermission();
        if(permission === "granted") {
          // next steps for messaging.
          generateFCMToken();
        }
        console.log("Notification request approved by user");
      } catch(error) {
        console.log(error);
      }
    }
    
  }

  const generateFCMToken = async () => {
    const messaging = getMessaging(firebase);
    
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPIDKEY"
    });

    console.log("GENERATED TOKEN", token);

    fcmForeGroundMessageListen(messaging);
  }

  const fcmForeGroundMessageListen = (messaging) => {
    onMessage(messaging, (payload) => {
      toast.info(<NotificationToast notification={payload.notification}/>)
      console.log("Notification Data", payload);
    })
  }

  useEffect(() => {
    firebaseMessagingInit();
  }, [])


  return (
    <div className="App">
      <ToastContainer />
    </div>
  );
}

export default App;
