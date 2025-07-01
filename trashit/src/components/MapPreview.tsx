import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapPreviewProps {
  lat: number | null;
  lng: number | null;
}

const MapPreview = ({ lat, lng }: MapPreviewProps) => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || lat === null || lng === null) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: 15,
        interactive: false,
      });

      marker.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    } else {
      map.current.setCenter([lng, lat]);
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      }
    }
  }, [lat, lng]);

  return (
    <div className="w-full h-56 rounded-lg overflow-hidden shadow-md border" ref={mapContainer} />
  );
};

export default MapPreview;
