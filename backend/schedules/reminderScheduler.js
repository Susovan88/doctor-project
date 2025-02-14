import cron from 'node-cron';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Medication from '../models/medicationModel.js';

// Create transport for email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create Twilio client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 
// voice call alert
const makeCall = async (to, medicationName) => {
  try {
    const call = await twilioClient.calls.create({
      url: process.env.TWIML_BIN_URL,  // Replace with your TwiML Bin URL
      to,
      from: process.env.TWILIO_PHONE_NUMBER
    });
    console.log('Call initiated:', call.sid);
  } catch (err) {
    console.error('Error making call:', err);
  }
};

const scheduleReminders = async () => {
  try {
    console.log("Starting Medication Reminder Scheduler...");

    // Schedule a cron job to run every minute
    cron.schedule('* * * * *', async () => {
      const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0,5);
      console.log(`Checking for reminders at ${currentTime}...`);

      // Fetch medications that are active and match the current time
      const medications = await Medication.find({ isActive: true, reminderTime: currentTime }).populate('userId');

      medications.forEach(async (med) => {
        console.log(`Sending reminder for medication: ${med.medicationName}`);

        // Send email reminder
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: med.userId.email,  // Assuming User model has email
          subject: 'Medication Reminder',
          text: `Hello, it's time to take your medication: ${med.medicationName}. Please take it on time!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) console.error('Error sending email:', error);
          else console.log('Email sent:', info.response);
        });

        // Send SMS reminder
        twilioClient.messages
          .create({
            body: `Reminder: Time to take your medication: ${med.medicationName}.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: med.userId.phone  // Assuming User model has phone
          })
          .then(message => console.log('SMS sent:', message.sid))
          .catch(err => console.error('Error sending SMS:', err));

          makeCall(med.userId.phone, med.medicationName);
      });
    });

  } catch (error) {
    console.error("Error scheduling reminders:", error);
  }
};

export default scheduleReminders;
