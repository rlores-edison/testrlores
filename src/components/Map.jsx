import { useEffect } from "react";      

const Map = () => {
  useEffect(() => {
      if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDgXksZ9VmsHXH2KD1_q4qa8gzsXr24-zA&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = function () {
        new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: 40.4057, lng: -3.6708 },
          zoom: 8,
        });
      };
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
