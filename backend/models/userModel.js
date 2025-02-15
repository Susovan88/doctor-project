import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    },
    address: {
        type: Object,
        default: {
            line1: "",
            line2: ""
        }
    },
    slots_booked: {
        type: Object,
        default: {}
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Not Selected"],
        default: "Not Selected",
    },
    dob: {
        type: String,
        default: "Not Selected",
    },
    phone: {
        type: String,
        default: "+00 000000000",
    },
    symptoms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptoms"
    }],
    medications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medication"
    }]

},{minimize:false});

// Middleware to validate emergency contacts
userSchema.pre('save', function(next) {
    if (!this.isModified('emergencyContacts')) {
        return next();
    }
    
    if (this.emergencyContacts.length > 3) {
        return next(new Error('Maximum 3 emergency contacts allowed'));
    }
    
    const phoneNumbers = new Set();
    const emails = new Set();
    
    for (const contact of this.emergencyContacts) {
        const normalizedPhone = contact.phone.replace(/[\s\-\(\)]/g, '');
        const normalizedEmail = contact.email.toLowerCase();
        
        if (phoneNumbers.has(normalizedPhone)) {
            return next(new Error('Duplicate phone numbers in emergency contacts are not allowed'));
        }
        
        if (emails.has(normalizedEmail)) {
            return next(new Error('Duplicate email addresses in emergency contacts are not allowed'));
        }
        
        phoneNumbers.add(normalizedPhone);
        emails.add(normalizedEmail);
    }
    next();
});

// Method to check emergency trigger cooldown
userSchema.methods.canTriggerEmergency = function() {
    if (!this.lastEmergencyTrigger) return true;
    const cooldownPeriod = 5 * 60 * 1000; // 5 minutes
    return (Date.now() - this.lastEmergencyTrigger.getTime()) >= cooldownPeriod;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;