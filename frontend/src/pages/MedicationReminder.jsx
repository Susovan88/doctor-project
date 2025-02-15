import React, { useEffect,useState } from 'react';
import { getMedications } from '../services/medicationService';
import { showPushNotification, showToastNotification } from '../services/NotificationService';
import { toast } from 'react-toastify';
import {UseUserContext} from "../context/UserContext";
import Push from "push.js";

const MedicationReminder = () => {
    const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getMedications();
      setMedications(meds);
    };

    fetchMedications();
  }, []);

  useEffect(() => {   // premission for notification 
    Push.Permission.request(
      () => console.log('Push Notification Permission Granted'),
      () => console.log('Push Notification Permission Denied')
    );
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5); // HH:MM format

        medications.forEach(med => {
            const medTime = med.reminderTime; // HH:MM format
            console.log(medTime, currentTime);
            
            if (medTime === currentTime) {
                console.log("Reminder for you");
                showPushNotification('Medication Reminder', `Time to take ${med.medicationName}`);
                showToastNotification(`Time to take your medication: ${med.medicationName}`);
            }
        });
    }, 60000);

    return () => clearInterval(interval);
}, [medications]);

  return <div></div>;
};

export default MedicationReminder;

