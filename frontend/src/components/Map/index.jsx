import React from "react";
import {useContext, useRef} from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import {SearchContext} from "../../context/SearchContext";
import styles from "./Map.module.css";
import { EditControl } from "react-leaflet-draw";
import { For } from "@chakra-ui/react";

export default function Map() {
	const position = [12.905, 77.6]
	const {fetchPlaces, places} = useContext(SearchContext);
	const rectangleRef = useRef(null);

	const eraseCurrent = () => {
		if (rectangleRef.current){
			rectangleRef.current.remove();
		}
	}

	const handleCreated = (e) => {
		const layer = e.layer;
		
		if (layer instanceof L.Rectangle){
			const rectangleBounds = layer.getBounds();
      const minLat = rectangleBounds.getSouthWest().lat;
      const minLng = rectangleBounds.getSouthWest().lng;
      const maxLat = rectangleBounds.getNorthEast().lat;
      const maxLng = rectangleBounds.getNorthEast().lng;
			rectangleRef.current = layer;

			fetchPlaces({ minLat, minLng, maxLat, maxLng });
		}
	}
	return(
		<>
		<MapContainer className={styles.leafletContainer} center={position} zoom={13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<FeatureGroup>
				<EditControl
					position="topright"
					onCreated={handleCreated}
					onDrawStart={eraseCurrent}
					draw={{
						rectangle:true,
						polyline:false,
						circle: false,
						circlemarker: false,
						marker: false,
						polygon: false,
					}}
				/>
			</FeatureGroup>
			<For each={places}>
				{(item, idx) => (
					<Marker position={[item.latitude, item.longitude]} key={idx}>
						<Popup>
							{item.name}
						</Popup>
					</Marker>
				)}
			</For>
		</MapContainer>
		</>
	)
}