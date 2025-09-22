import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

import { useCitiesStore } from "../store/citiesStore";
import { useInterestPointsStore } from "../store/interestPointsStore";

import type { InterestPoint } from "../libs/graphql/generated/graphql-types";

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
			className: "custom-poi-marker",
			html: pinIcon,
			iconSize: [40, 55],
			iconAnchor: [20, 52],
			popupAnchor: [0, -45],
		});
	}

	// Useful code snippet (updated to use flyTo): https://stackoverflow.com/questions/65322670/change-center-position-of-react-leaflet-map
	// About the flyTo() vs setView() methods: https://rstudio.github.io/leaflet/reference/map-methods.html

	function FlyToInterestPoint() {
		const map = useMap();
		const { selectedInterestPoint } = useInterestPointsStore();

		useEffect(() => {
			if (selectedInterestPoint) {
				map.flyTo(
					[selectedInterestPoint.latitude, selectedInterestPoint.longitude],
					map.getZoom(),
					{
						duration: 2,
						animate: true,
					},
				);
			}
		}, [selectedInterestPoint, map]);

		return null;
	}
	const [interestPoints, setInterestPoints] = useState<InterestPoint[]>([]);
	const { selectedCity } = useCitiesStore();
	const { interestPointsByCity, setSelectedInterestPoint } =
		useInterestPointsStore();

	const [mapCenter, setMapCenter] = useState<[number, number]>(
		selectedCity
			? [selectedCity.latitude, selectedCity.longitude]
			: [48.8566, 2.3522], // Paris coordinates by default
	);

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

	const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

	return (
		<div className="w-full h-screen z-0">
			<MapContainer
				center={mapCenter}
				zoom={13}
				zoomControl={!isMobile}
				className="w-full h-full"
				id="map"
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<FlyToCity coords={mapCenter} />
				<FlyToInterestPoint />
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
							<div className="p-2 space-y-1 text-sm">
								<div className="font-bold text-gray-800 text-base">
									{point.name}
								</div>
								<hr />
								<div className="text-gray-500 text-xs">
									{point.category.name}
								</div>
								<div className="text-gray-700 text-sm">
									📍&nbsp;{point.address}
								</div>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
