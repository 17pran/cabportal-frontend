// src/components/MapComponent.js
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function MapComponent({ pickup = [12.9716, 77.5946], dropoff = [12.9352, 77.6142] }) {
  return (
    <MapContainer center={pickup} zoom={13} className="w-full h-64 rounded-md">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={pickup}>
        <Popup>Pickup Location</Popup>
      </Marker>
      <Marker position={dropoff}>
        <Popup>Dropoff Location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
