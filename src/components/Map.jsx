import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    let map;

      const initMap = () => {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.4057, lng: -3.6708 }, 
        zoom: 8,
      });

      fetch("../../server/dbgeo.json")
        .then((response) => response.json())
        .then((data) => {
          data.sites.forEach((site) => {
            const coords = site.geometry.coordinates;
            const latLng = new window.google.maps.LatLng(coords[1], coords[0]);

            new window.google.maps.Marker({
              position: latLng,
              map: map,
              title: site.properties.name, 
            });
          });
        })
        .catch((error) => console.error("Error al cargar dbgeo.json:", error));
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDgXksZ9VmsHXH2KD1_q4qa8gzsXr24-zA&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.body.appendChild(script);
    } else {
      window.initMap();
    }

    return () => {
      const scriptTag = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div id="map" style={{ height: "100%" }}></div>
    </div>
  );
};

export default Map;