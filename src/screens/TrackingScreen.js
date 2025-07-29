import React from 'https://esm.sh/react@18';
import BackButton from '../components/BackButton.js';

export default function TrackingScreen({ onBack }) {
  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  React.useEffect(() => {
    if (!mapRef.current && window.L) {
      const start = [1.29, 103.85];
      const map = L.map('map').setView(start, 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      markerRef.current = L.marker(start).addTo(map);
      mapRef.current = map;
    }

    const id = setInterval(async () => {
      try {
        const res = await fetch('/api/driver');
        if (res.ok) {
          const { lat, lng } = await res.json();
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
            mapRef.current.setView([lat, lng]);
          }
        }
      } catch (e) {
        console.error('Failed to fetch driver location', e);
      }
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return React.createElement('div', null,
    BackButton({ onBack }),
    React.createElement('h2', null, 'Driver Tracking'),
    React.createElement('div', {
      id: 'map',
      style: { width: '100%', height: '300px' }
    })
  );
}
