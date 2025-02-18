import { useState ,useEffect} from "react";
import axios from "axios";
import {UseUserContext} from "../context/UserContext";
import {toast} from "react-toastify";
import TrackAllSymptoms from "../components/TrackAllSymptoms";

export default function MySymptoms() {
  const [formData, setFormData] = useState({
    symptoms: {
      shortnessOfBreath: false,
      wheezing: false,
      chestTightness: false,
      coughing: "none",
      fever: false,
      fatigue: false,
      sputumProduction: "none",
      nighttimeSymptoms: false,
    },
    oxygenLevel: "",
    heartRate: "",
    notes: "",
  });

  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const {uToken,backendUrl}=UseUserContext();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("symptoms.")) {
      const symptomKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        symptoms: {
          ...prev.symptoms,
          [symptomKey]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ( !formData.oxygenLevel) {
      toast.error("User ID and Oxygen Level are required!");
      return;
    }
    if(alreadySubmitted) return;

    try {
      const response = await axios.post(backendUrl+"/api/user/symptoms", formData,{headers:{uToken:uToken}});
      console.log(response.data);
      setFormData({
        symptoms: {
          shortnessOfBreath: false,
          wheezing: false,
          chestTightness: false,
          coughing: "none",
          fever: false,
          fatigue: false,
          sputumProduction: "none",
          nighttimeSymptoms: false,
        },
        oxygenLevel: "",
        heartRate: "",
        notes: "",
      });
      setAlreadySubmitted(true);
      toast.success("Symptoms submitted successfully!");
    } catch (error) {
      console.log("Error submitting symptoms:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Check if the user has already recorded symptoms for today
    axios.get(backendUrl+"/api/user/symptoms/check",{headers:{uToken:uToken}}).then((res) => {
      console.log(res.data);
      if (res.data.success==true) {
        setAlreadySubmitted(true);
        toast.success(res.data.message);
      }
      else{
        setAlreadySubmitted(false);
        toast.error(res.data.message)
      }
    });
  }, []);

  return alreadySubmitted ?
   (
   <div>
    {/* <p className='mb-3 text-lg font-medium'>You have already recorded your symptoms today.</p> */}
    <TrackAllSymptoms/>
   </div>
  )
   :(
    <form onSubmit={handleSubmit} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Symptom Tracker</p>

      <div className='bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        {/* Oxygen Level */}
        <div className='mb-4'>
          <p>Oxygen Level</p>
          <input
            type="number"
            name="oxygenLevel"
            value={formData.oxygenLevel}
            onChange={handleChange}
            className='border rounded px-3 py-2 w-full'
            required
          />
        </div>

        {/* Heart Rate */}
        <div className='mb-4'>
          <p>Heart Rate (BPM)</p>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className='border rounded px-3 py-2 w-full'
          />
        </div>

        {/* Symptoms Section */}
        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>

          {/* Left Column - Checkboxes */}
          <div className='flex-1 flex flex-col gap-4'>
            <p className='font-medium'>Symptoms</p>
            {["shortnessOfBreath", "wheezing", "chestTightness", "fever", "fatigue", "nighttimeSymptoms"].map((symptom) => (
              <label key={symptom} className="flex items-center">
                <input
                  type="checkbox"
                  name={`symptoms.${symptom}`}
                  checked={formData.symptoms[symptom]}
                  onChange={handleChange}
                  className="mr-2"
                />
                {symptom.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>

          {/* Right Column - Dropdowns */}
          <div className='flex-1 flex flex-col gap-4'>
            {/* Coughing Type */}
            <div>
              <p>Coughing Type</p>
              <select
                name="symptoms.coughing"
                value={formData.symptoms.coughing}
                onChange={handleChange}
                className='border rounded px-3 py-2 w-full'
              >
                <option value="none">None</option>
                <option value="dry">Dry</option>
                <option value="wet">Wet</option>
              </select>
            </div>

            {/* Sputum Production */}
            <div>
              <p>Sputum Production</p>
              <select
                name="symptoms.sputumProduction"
                value={formData.symptoms.sputumProduction}
                onChange={handleChange}
                className='border rounded px-3 py-2 w-full'
              >
                <option value="none">None</option>
                <option value="clear">Clear</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="bloody">Bloody</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes / Additional Info */}
        <div className='mt-4'>
          <p>Additional Notes</p>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className='w-full px-4 pt-2 border rounded'
            placeholder='Describe any other symptoms or concerns...'
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full'>
          Submit Symptoms
        </button>
      </div>
    </form>
  );
}
