import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: 13.0827, // Chennai, change if needed
  lng: 80.2707,
};

const emergencyTypes = {
  FIRE: { color: 'red', label: 'F' },
  MEDICAL: { color: 'blue', label: 'M' },
  POLICE: { color: 'green', label: 'P' },
};

const MapComponent = ({ reports }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const filteredReports = reports.filter(
    (report) => filter === 'ALL' || report.type === filter
  );

  return (
    <LoadScript googleMapsApiKey="AIzaSyCwrYqeYzSxR8s3OYbO3wwK9boZ_MaoKcw">
      <div>
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 100 }}>
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              outline: 'none',
              background: '#fff',
            }}
          >
            <option value="ALL">All Emergencies</option>
            {Object.keys(emergencyTypes).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
          {filteredReports.map((report) => (
            <Marker
              key={report.id}
              position={{
                lat: report.location.lat,
                lng: report.location.lng,
              }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: emergencyTypes[report.type]?.color || 'gray',
                fillOpacity: 1,
                strokeWeight: 2,
              }}
              onClick={() => setSelectedReport(report)}
            />
          ))}

          {selectedReport && (
            <InfoWindow
              position={{
                lat: selectedReport.location.lat,
                lng: selectedReport.location.lng,
              }}
              onCloseClick={() => setSelectedReport(null)}
            >
              <div>
                <h2>{selectedReport.title}</h2>
                <p>{selectedReport.description}</p>
                <p>
                  <strong>Type:</strong> {selectedReport.type}
                </p>
                <p>
                  <strong>Time:</strong>{' '}
                  {new Date(selectedReport.timestamp).toLocaleString()}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
