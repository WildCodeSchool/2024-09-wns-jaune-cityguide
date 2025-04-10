import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

import { useCitiesStore } from "../store/citiesStore";
import { useInterestPointsStore } from "../store/interestPointsStore";

import type { InterestPoint } from "../@types/types";

export default function MapComponent({
	onSelectPoint,
}: { onSelectPoint: (pointOfInterest: InterestPoint) => void }) {
	// Doc: https://leafletjs.com/reference.html#divicon
	function generateCustomPinIcon(color: string): L.DivIcon {
		const pinIcon = `
    <svg width="40" height="55" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0, 0, 0, 0.3)" />
        </filter>
      </defs>
      <path 
        filter="url(#shadow)"
        d="M12 2C7.8 2 4.5 5.3 4.5 9.5C4.5 14.2 12 22 12 22C12 22 19.5 14.2 19.5 9.5C19.5 5.3 16.2 2 12 2Z"
        fill="${color}" 
        stroke="white"
        stroke-width="1.2"
      />
      <circle cx="12" cy="9.5" r="2.5" fill="white" />
    </svg>
  `;

		return new L.DivIcon({
			className: "",
			html: pinIcon,
			iconSize: [40, 55],
			iconAnchor: [20, 52],
			popupAnchor: [0, -45],
		});
	}

	const [interestPoints, setInterestPoints] = useState<InterestPoint[]>([]);
	const { selectedCity } = useCitiesStore();
	const { interestPointsByCity, setSelectedInterestPoint } =
		useInterestPointsStore();

	const [mapCenter, setMapCenter] = useState<[number, number]>([
		48.8566,
		2.3522, // Paris coordinates by default
	]);

	function FlyToCity({ coords }: { coords: [number, number] }) {
		const map = useMap();

		useEffect(() => {
			const [lat, lng] = coords;
			if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
				map.flyTo(coords, map.getZoom(), {
					duration: 3,
					animate: true,
				});
			}
		}, [coords, map]);

		return null;
	}

	useEffect(() => {
		if (selectedCity && interestPointsByCity) {
			setInterestPoints(interestPointsByCity);
			setMapCenter([
				Number(selectedCity.latitude),
				Number(selectedCity.longitude),
			]);
		}
	}, [selectedCity, interestPointsByCity]);

	return (
		<div className="w-full h-[800px] z-0">
			<MapContainer
				center={mapCenter}
				zoom={13}
				className="w-full h-full"
				id="map"
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<FlyToCity coords={mapCenter} />
				{interestPoints.map((point) => (
					<Marker
						key={point.id}
						position={[point.latitude, point.longitude]}
						icon={generateCustomPinIcon(point.category.color)}
						eventHandlers={{
							click: () => onSelectPoint(point),
							popupclose: () => {
								setSelectedInterestPoint(null);
							},
						}}
					>
						<Popup>
							<div className="text-center gap-0.5">
								<h2 className="font-bold text-lg">{point.name}</h2>
								<p className="text-sm text-gray-600">{point.category.name}</p>
								<p className="text-md text-gray-600">{point.address}</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
