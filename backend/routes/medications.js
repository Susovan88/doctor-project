// import express from "express";
// import Medication from "../models/medicationModel.js";

// const reminderRouter = express.Router();


// // Get all medications
// reminderRouter.get('/', async (req, res) => {
//   try {
//     const medications = await Medication.find({ isActive: true });
//     res.json(medications);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create new medication reminder
// reminderRouter.post('/', async (req, res) => {
//   const medication = new Medication({
//     medicationName: req.body.medicationName,
//     reminderTime: req.body.reminderTime
//   });

//   try {
//     const newMedication = await medication.save();
//     res.status(201).json(newMedication);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete medication reminder (soft delete)
// reminderRouter.delete('/:id', async (req, res) => {
//   try {
//     const medication = await Medication.findById(req.params.id);
//     if (!medication) {
//       return res.status(404).json({ message: 'Medication not found' });
//     }
//     medication.isActive = false;
//     await medication.save();
//     res.json({ message: 'Medication reminder deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default reminderRouter;