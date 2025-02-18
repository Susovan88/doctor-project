import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar,PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import { UseUserContext } from "../context/UserContext.jsx";
import PieChartWithCustomizedLabel from'./PieChartOfAqi.jsx';

function TrackAllSymptoms() {
  const [symptomsData, setSymptomsData] = useState([]);
  const [data, setData] = useState([]); // State to hold bar chart data
  const { uToken, backendUrl } = UseUserContext();
  const [showBarChart, setShowBarChart] = useState(false);

  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [chartData, setChartData] = useState([]);
  const [aqi, setAqi] = useState(null);

  // Fetching data for LineChart, BarChart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/symptoms/track-weekly`, {
          headers: { uToken: uToken },
        });

        console.log(data);

        if (data.success) {
          setSymptomsData(data.formattedData);
          console.log(data.formattedData);
        } else {
          console.error('There was an error fetching the symptoms data!');
        }
      } catch (error) {
        console.error('There was an error fetching the symptoms data!', error);
      }
    };

    fetchData();
  }, [uToken, backendUrl]);

  useEffect(() => {
    const TodeySymtom = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/analyse-symptom`, {
          headers: { uToken: uToken },
        });

        // Log the barChartData for validation
        console.log(data);

        if (data.success) {
          // Set the barChartData here
          setData(data); // Assuming you have a state for barChartData
        } else {
          console.log('Error fetching bar chart data!');
        }
      } catch (error) {
        console.error('Error fetching symptoms data!', error);
      }
    };
    TodeySymtom();
  }, [uToken, backendUrl]);

  const pieData = [
    { name: 'Heart Rate', value: data.heartRate || 99, fill: '#82ca9d' },
    { name: 'Oxygen Level', value: data.oxygenLevel || 83, fill: '#8884d8' },
  ];

    // Colors for the PieChart
  const COLORS = ['#82ca9d', '#8884d8'];

  // aqi ...
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoords({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const getAqiData = async () => {
      if (coords.latitude && coords.longitude) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/aqi/${coords.latitude}/${coords.longitude}`);
          console.log('aqi data-', data);
          setChartData(data.chartData);
          setAqi(data.aqi);
        } catch (error) {
          console.log('Error fetching symptoms data!', error);
        }
      }
    };
    getAqiData();
  }, [coords]);


  return (
    <>

<div className="aqi-container bg-white p-6 rounded-lg shadow-md">
  <h2 className="aqi-heading text-xl font-semibold mb-4 text-center">Current Air Quality Index (AQI)</h2>
  {aqi !== null && chartData.length > 0 ? (
    <div className="aqi-content grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="chart-container flex-1 max-w-md">
        <PieChartWithCustomizedLabel chartData={chartData} />
      </div>
      <div className="message-container flex-1 max-w-md text-center">
        <p className="text-xl mb-4">Your current location</p>
        {/* Show message based on aqi value */}
        {aqi < 1 && <p className="text-green-600 font-semibold text-lg">Air Quality is Good!</p>}
        {aqi == 1 && <p className="text-yellow-500 font-semibold text-lg">Air Quality is Moderate.</p>}
        {aqi == 2 && <p className="text-orange-500 font-semibold text-lg">Air Quality is Unhealthy for Sensitive Groups.</p>}
        {aqi == 3 && <p className="text-red-500 font-semibold text-lg">Air Quality is Unhealthy.</p>}
        {aqi == 4 && <p className="text-pink-600 font-semibold text-lg">Air Quality is Very Unhealthy.</p>}
        {aqi == 5 && <p className="text-purple-700 font-semibold text-lg">Air Quality is Hazardous!</p>}
        
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`vitals w-full p-4 shadow-md rounded-md flex justify-between items-center ${
            data.oxygenLevel < 90
            ? 'bg-red-100 border-l-4 border-red-600 text-red-600'
            : data.oxygenLevel < 93
            ? 'bg-yellow-100 border-l-4 border-yellow-600 text-yellow-600'
            : 'bg-green-100 border-l-4 border-green-600 text-green-600'
          }`}
          >
         <h3 className="font-medium text-2xl">Vital Signs</h3>
            <ul className="list-none flex space-x-6">
      <li><strong>Heart Rate:</strong> {data.heartRate} bpm</li>
      <li><strong>Oxygen Level:</strong> {data.oxygenLevel}%</li>
      <li><strong>Oxygen Status:</strong> {data.oxygenStatus}</li>
          </ul>
        </div>
      </div>


      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">Loading AQI data...</p>
  )}
</div>


      
      <div className="health-assessment">
      {/* Header */}
      <h2 className="font-medium text-3xl text-neutral-800 mt-4">Personalized Health Assessment</h2>

      {/* Message */}
      <div className="message mt-4 p-4 bg-yellow-100 rounded-md">
        <p>{data.message}</p>
    </div>



      {/* Emergency Alert Section (only show if Oxygen Level is risky) */}
      {data.oxygenLevel < 90 && (
        <div className="emergency-alert mt-6 p-4 bg-red-100 border-l-4 border-red-600 rounded-md">
          <h3 className="font-medium text-xl text-red-600">Emergency Alert</h3>
          <p className="text-sm text-red-700 mt-2">
            Your oxygen level is risky. Please take immediate action and alert emergency services.
          </p>
          <div className="mt-4 flex space-x-4">
            <input 
              type="text" 
              className="p-2 border rounded-md w-full" 
              placeholder="Enter emergency contact or email..." 
            />
            <button className="p-2 bg-red-600 text-white rounded-md">Send Alert</button>
          </div>
        </div>
      )}
    </div>

      {/* LineChart */}
      <div>
        <h2 className='font-medium text-3xl text-neutral-800 mt-4'>Track All Previous Symptoms</h2>
        <ResponsiveContainer width="100%" height={400}>
          {showBarChart ? (
            <BarChart data={symptomsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="oxygenLevel" fill="#8884d8" />
              <Bar dataKey="heartRate" fill="#82ca9d" />
            </BarChart>
          ) : (
            <LineChart data={symptomsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="oxygenLevel" stroke="#8884d8" />
              <Line type="monotone" dataKey="heartRate" stroke="#82ca9d" />
            </LineChart>
          )}
        </ResponsiveContainer>
        <button 
          className="mt-4 p-2 bg-blue-600 text-white rounded-md"
          onClick={() => setShowBarChart(!showBarChart)}
        >
          {showBarChart ? 'Show Line Chart' : 'Show Bar Chart'}
        </button>
      </div>
    </>
  );
}

export default TrackAllSymptoms;
