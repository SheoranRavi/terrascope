import React, { useEffect, useState } from "react";
import {useContext, useRef} from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import {SearchContext} from "../../context/SearchContext";
import styles from "./Map.module.css";
import { EditControl } from "react-leaflet-draw";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import axios from "axios";
import 'leaflet-geosearch/dist/geosearch.css';

function SearchControl(){
	const map = useMap();
	useEffect(() => {
		const provider = new OpenStreetMapProvider();
		const searchControl = new GeoSearchControl({
			provider,
			style: 'button',
			showMarker: true,
			showPopup: false,
			autoClose: true,
			searchLabel: 'Search',
			animateZoom: true,
		});
		map.addControl(searchControl);

		return () => map.removeControl(searchControl);
	}, [map])
}

function MarkersLayer({ places }) {
  const map = useMap();
  const layerRef = useRef(L.layerGroup());

  useEffect(() => {
    const layerGroup = layerRef.current;
    layerGroup.addTo(map);

    layerGroup.clearLayers();
    places.forEach((p) => {
      const marker = L.marker([p.latitude, p.longitude]);
      if (p.name) marker.bindPopup(p.name);
      marker.addTo(layerGroup);
    });

    return () => {
      map.removeLayer(layerGroup);
    };
  }, [map, places]);

  return null;
}

function RecenterMap({center}){
	const map = useMap();
	useEffect(() => {
		if (center){
			map.setView(center);
		}
	}, [center, map])
	return null;
}

// ToDo
// On drawStart the markers do not disappear
export default function Map() {
	//const position = [12.905, 77.6]
	const [center, setCenter] = useState([12.905, 77.6]);
	const {fetchPlaces, places, searchType, setPlaces} = useContext(SearchContext);
	const rectangleRef = useRef(null);

	const eraseCurrent = () => {
		if (rectangleRef.current){
			rectangleRef.current.remove();
		}
	}

	useEffect(() => {
		eraseCurrent();
		setPlaces([]);
	}, [searchType]);

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

	useEffect(() => {
		const getLocation = async () => {
			try{
				const res = await axios.get("https://ipapi.co/json/");
				const location = [res.data.latitude, res.data.longitude];
				setCenter(location);
			}
			catch(err){
				console.error("IP location failed:", err);
			}
		};
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((pos) => {
				const {latitude, longitude} = pos.coords;
				setCenter([latitude, longitude]);
			}, (error) => {
				console.error(error);
				getLocation();
			},
			{
				enableHighAccuracy: false,
				timeout: 5000,
				maximumAge: 0,
			})
		} else{
			console.log("geolocation not available");
			getLocation();
		}
	}, [])

	return(
		<>
		<MapContainer className={styles.leafletContainer} 
									center={center} zoom={13} 
									scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<SearchControl/>
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
					edit={{
						edit: false,
						remove: false,
					}}
				/>
			</FeatureGroup>
			<MarkersLayer places={places}/>
			<RecenterMap center={center}/>
		</MapContainer>
		</>
	)
}