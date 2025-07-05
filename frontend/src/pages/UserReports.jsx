import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    liveLocationLink: '',
    reportType: '',  // Added field for report type
  });

  // Get user current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Location error:', err);
        setUserLocation(null);
      }
    );
  };

  // Haversine formula to calculate distance
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Fetch all user reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://rescue-route.onrender.com/api/reports');
      let data = response.data;

      if (userLocation) {
        data = data
          .map((report) => ({
            ...report,
            distance: calculateDistance(
              userLocation.lat,
              userLocation.lng,
              report.location?.lat || 0,
              report.location?.lng || 0
            ),
          }))
          .sort((a, b) => {
            const timeDiff = new Date(b.timestamp) - new Date(a.timestamp);
            return timeDiff !== 0 ? timeDiff : a.distance - b.distance;
          });
      } else {
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      }

      setReports(data);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.reportType) {
      alert('Please enter title, description, and select a report type.');
      return;
    }

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      location: userLocation
        ? {
            lat: userLocation.lat,
            lng: userLocation.lng,
            address: 'Auto-Fetched Location',
          }
        : null,
    };

    try {
      await axios.post('https://rescue-route.onrender.com/api/reports', payload);
      fetchReports();
      setFormData({
        title: '',
        description: '',
        mediaUrl: '',
        liveLocationLink: '',
        reportType: '',  // Reset the report type
      });
    } catch (err) {
      console.error('Submit Error:', err);
      alert('Failed to submit report.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (userLocation) fetchReports();
  }, [userLocation]);

  // WhatsApp SOS link
  const generateWhatsAppLink = () => {
    if (!userLocation) return '#';
    const { lat, lng } = userLocation;
    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    const message = `🚨 EMERGENCY!\nI need immediate help. Here's my location:\n${mapsLink}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-6 min-h-screen bg-black text-white relative">
      {/* 🚨 SOS Floating Button */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 bg-red-700 hover:bg-red-800 text-white font-bold px-5 py-2 rounded-full shadow-lg animate-pulse"
      >
        🚨 SOS
      </a>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-4">🚨 User Reports</h1>

        {/* Report Form */}
        <form
          onSubmit={handleFormSubmit}
          className="mb-8 bg-gray-900 p-6 rounded-lg shadow-lg border border-red-700"
        >
          <h2 className="text-xl font-semibold mb-4 text-red-400">Report an Incident</h2>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 rounded bg-black text-white border border-red-600"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="w-full mb-3 p-2 rounded bg-black text-white border border-red-600"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            className="w-full mb-3 p-2 rounded bg-black text-white border border-red-600"
            value={formData.mediaUrl}
            onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
          />

          {/* Select report type */}
          <select
            value={formData.reportType}
            onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
            className="w-full mb-3 p-2 rounded bg-black text-white border border-red-600"
          >
            <option value="">Select Report Type</option>
            <option value="Weather">Weather</option>
            <option value="Fire">Fire</option>
            <option value="Accident">Accident</option>
            <option value="Missing">Missing</option>
          </select>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded mb-3"
          >
            📍 Get Live Location
          </button>

          {userLocation && (
            <p className="text-sm text-green-400 mb-3">
              📌 Location fetched: Lat {userLocation.lat.toFixed(4)}, Lng {userLocation.lng.toFixed(4)}
            </p>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🚨 Submit Report
          </button>
        </form>

        {/* Report List Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">📋 Recent Reports</h2>
          <button
            onClick={fetchReports}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Report Cards */}
        {loading ? (
          <p className="text-gray-400">Loading reports...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-400">No reports found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-gray-900 text-white border border-red-700 rounded-lg shadow-lg p-4"
              >
                <h3 className="text-xl font-semibold text-red-400 mb-1">{report.title}</h3>
                <p className="text-gray-300 mb-2">{report.description}</p>

                {report.location?.lat && report.location?.lng && (
                  <p className="text-sm text-blue-400 mb-2">
                    📍 <strong>Live Location:</strong>{' '}
                    <a
                      href={`https://www.google.com/maps?q=${report.location.lat},${report.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Open in Maps
                    </a>
                  </p>
                )}

                {report.location?.address && (
                  <p className="text-sm text-gray-400">
                    📌 <strong>Location:</strong> {report.location.address}
                  </p>
                )}

                {report.distance && (
                  <p className="text-sm text-gray-400">
                    📏 <strong>Distance:</strong> {report.distance.toFixed(2)} km
                  </p>
                )}

                <p className="text-sm text-gray-400 mb-2">
                  🕒 <strong>Reported:</strong>{' '}
                  {new Date(report.timestamp).toLocaleString()}
                </p>

                {report.mediaUrl && (
                  <img
                    src={report.mediaUrl}
                    alt="Media"
                    className="w-full h-48 object-cover rounded border border-red-600 mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReports;
