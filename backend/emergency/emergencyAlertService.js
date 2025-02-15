// import User from '../models/userModel.js';
// import cron from 'node-cron';
// import nodemailer from 'nodemailer';
// import twilio from 'twilio';


// // Create transport for email
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Create Twilio client
// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
 

// const sendEmergencyAlerts = async (userId, location, additionalInfo = '') => {
//     try {
//         // Find user and validate
//         const user = await User.findById(userId);
        
//         if (!user) {
//             throw new Error('User not found');
//         }

//         if (!user.canTriggerEmergency()) {
//             throw new Error('Please wait before triggering another emergency alert');
//         }

//         if (!user.emergencyContacts || user.emergencyContacts.length === 0) {
//             throw new Error('No emergency contacts found');
//         }

//         // Send alerts to each emergency contact
//         const results = await Promise.all(user.emergencyContacts.map(async (contact) => {
//             try {
//                 // Prepare the emergency message
//                 const messageText = `EMERGENCY ALERT: ${user.name} needs immediate medical assistance!\n\n` +
//                     `Location: ${location}\n` +
//                     `Patient Details:\n` +
//                     `- Phone: ${user.phone}\n` +
//                     `- Gender: ${user.gender}\n` +
//                     (additionalInfo ? `\nAdditional Information: ${additionalInfo}` : '');

//                 // Send SMS
//                 const message = await twilioClient.messages.create({
//                     body: messageText,
//                     from: process.env.TWILIO_PHONE_NUMBER,
//                     to: contact.phone
//                 });

//                 // Prepare and send email
//                 const emailHtml = `
//                     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                         <h1 style="color: #ff0000; text-align: center;">🚨 EMERGENCY MEDICAL ALERT 🚨</h1>
//                         <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 5px;">
//                             <h2 style="color: #721c24;">${user.name} Needs Immediate Medical Assistance!</h2>
//                             <p><strong>Location:</strong> ${location}</p>
//                             <hr style="border-top: 1px solid #f5c6cb;">
//                             <h3>Patient Details:</h3>
//                             <ul>
//                                 <li><strong>Phone:</strong> ${user.phone}</li>
//                                 <li><strong>Gender:</strong> ${user.gender}</li>
//                                 <li><strong>Date of Birth:</strong> ${user.dob}</li>
//                             </ul>
//                             ${additionalInfo ? `
//                                 <hr style="border-top: 1px solid #f5c6cb;">
//                                 <p><strong>Additional Information:</strong> ${additionalInfo}</p>
//                             ` : ''}
//                             <hr style="border-top: 1px solid #f5c6cb;">
//                             <p style="color: #721c24; font-weight: bold;">This is an emergency alert. Please respond immediately!</p>
//                         </div>
//                     </div>
//                 `;

//                 await transporter.sendMail({
//                     from: process.env.EMAIL_USER,
//                     to: contact.email,
//                     subject: '🚨 EMERGENCY MEDICAL ALERT - Immediate Assistance Required',
//                     html: emailHtml,
//                     text: messageText // Fallback plain text
//                 });

//                 return {
//                     contactName: contact.name,
//                     status: 'success',
//                     messageId: message.sid
//                 };

//             } catch (error) {
//                 return {
//                     contactName: contact.name,
//                     status: 'failed',
//                     error: error.message
//                 };
//             }
//         }));

//         // Update last trigger time
//         user.lastEmergencyTrigger = new Date();
//         await user.save();

//         return {
//             success: true,
//             alerts: results
//         };

//     } catch (error) {
//         console.error('Error sending emergency alerts:', error);
//         throw error;
//     }
// };

// export { sendEmergencyAlerts };