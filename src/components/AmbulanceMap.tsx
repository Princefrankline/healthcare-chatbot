import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

const ambulanceIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [40, 40],
});

export default function AmbulanceMap() {
  const [ambulancePos, setAmbulancePos] = useState<[number, number]>([13.0827, 80.2707]);

  // simulate live movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulancePos(([lat, lng]) => [lat + 0.0001, lng + 0.0001]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={ambulancePos} zoom={15} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ambulancePos} icon={ambulanceIcon} />
    </MapContainer>
  );
}
