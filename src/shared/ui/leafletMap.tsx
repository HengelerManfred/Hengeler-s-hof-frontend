"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLng } from "leaflet";
import Image from "next/image";

function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(
    new LatLng(47.7747, 10.2375995)
  );
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        <div className="flex flex-col gap-[12px] items-center">
          <h2 className="text-[24px] font-bold">Hengeler&apos;s Hof</h2>
          <Image src="/images/cow.png" alt="map" width={100} height={100} />
          <p className="text-[14px] !m-0">Frohnhofen 3, 87452 Altusried, Deutschland </p>
        </div>
      </Popup>
    </Marker>
  ) : null;
}

const LeafletMap = () => {
  let isDragging = false;
  if (window.innerWidth > 1024) {
    isDragging = true;
  }
  return (
    <MapContainer
      center={[47.7747, 10.2375995]}
      zoom={15}
      dragging={isDragging}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default LeafletMap;
