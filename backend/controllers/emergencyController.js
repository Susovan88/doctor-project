import { sendEmergencyAlerts } from '../emergency/emergencyAlertService.js';

export const triggerEmergency = async (req, res) => {
    try {
        //const { location, additionalInfo } = req.body;
        const userId = req.user._id;

        const result = await sendEmergencyAlerts(userId, location, additionalInfo);

        res.json({
            success: true,
            message: 'Emergency alerts sent successfully',
            details: result
        });

    } catch (error) {
        res.status(error.message.includes('Please wait') ? 429 : 500).json({
            success: false,
            message: error.message
        });
    }
};