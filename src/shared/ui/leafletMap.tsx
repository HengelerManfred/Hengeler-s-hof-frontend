"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLng } from "leaflet";
import Image from "next/image";

function LocationMarker() {
  const markerPosition = new LatLng(47.7747, 10.2375995);
  return (
    <Marker position={markerPosition} interactive={true}>
      <Popup>
        <div className="flex flex-col gap-[12px] items-center">
          <h2 className="text-[24px] font-bold">Hengeler&apos;s Hof</h2>
          <Image src="/images/cow.png" alt="map" width={100} height={100} />
          <p className="text-[14px] !m-0">
            Frohnhofen 3, 87452 Altusried, Deutschland
          </p>
        </div>
      </Popup>
      <Tooltip direction="bottom" offset={[-15, 35]} permanent>
        <div className="text-sm font-medium text-black">
          Frohnhofen 3, 87452 Altusried, Deutschland
        </div>
      </Tooltip>
    </Marker>
  );
}
const LeafletMap = ({zoomControl = true}: {zoomControl?: boolean}) => {
  return (
    <div className="px-[2.5%] lg:p-0">
      <MapContainer
        center={[47.7747, 10.2375995]}
        zoom={15}
        zoomControl={zoomControl}
        scrollWheelZoom={false}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "8px",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
