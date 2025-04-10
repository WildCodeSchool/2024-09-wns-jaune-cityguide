import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

import { useCitiesStore } from "../store/citiesStore";
import { useInterestPointsStore } from "../store/interestPointsStore";

import type { InterestPoint } from "../@types/types";

// About custom icons: https://leafletjs.com/examples/custom-icons/
const customIcon = new L.Icon({
	iconUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
});

export default function MapComponent({
	onSelectPoint,
}: { onSelectPoint: (pointOfInterest: InterestPoint) => void }) {
	const [interestPoints, setInterestPoints] = useState<InterestPoint[]>([]);
	const { selectedCity } = useCitiesStore();
	const { interestPointsByCity } = useInterestPointsStore();

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
		<div className="w-full h-[700px] z-0">
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
						icon={customIcon as L.Icon}
						eventHandlers={{
							click: () => onSelectPoint(point),
						}}
					>
						<Popup>
							<div className="text-center">
								<h2 className="font-bold text-lg">{point.name}</h2>
								<p className="text-sm text-gray-600">{point.address}</p>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
