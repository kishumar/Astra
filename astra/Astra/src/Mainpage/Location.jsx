import React, { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";

function LocationFetcher({ value, onChange }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // 🔹 Reverse Geocode (Lat/Lon → Full Address with street)
  const fetchLocation = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
      );
      const data = await response.json();
      const {
        house_number,
        road,
        neighbourhood,
        suburb,
        city,
        town,
        village,
        state,
        postcode,
        country,
      } = data.address;

      // Build a nice readable string
      return [
        house_number,
        road,
        neighbourhood,
        suburb,
        city || town || village,
        state,
        postcode,
        country,
      ]
        .filter(Boolean)
        .join(", ");
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Unable to fetch location";
    }
  };

  // 🔹 Handle "Pin" button click
  const handleFetchClick = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const locString = await fetchLocation(latitude, longitude);
          onChange(locString);
          setSuggestions([]);
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          onChange("Unable to fetch location");
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      onChange("Geolocation not supported");
    }
  };

  // 🔹 Fetch Suggestions (when typing)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(delayDebounce);
  }, [value]);

  return (
    <div className="relative w-full">
      {/* Input + Pin Button */}
      <div className="flex items-center gap-2 bg-black text-white p-4 rounded-xl">
        <input
          type="text"
          placeholder="Enter your location or click on Pin *"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-2 bg-gray-800 rounded-lg outline-none"
        />
        <button
          onClick={handleFetchClick}
          disabled={loading}
          className={`p-2 rounded-lg flex items-center justify-center ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          ) : (
            <MapPin className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-gray-900 text-white w-full mt-1 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((sug) => {
            const addr = sug.address || {};
            const details = [
              addr.house_number,
              addr.road,
              addr.neighbourhood,
              addr.suburb,
              addr.city || addr.town || addr.village,
              addr.state,
              addr.postcode,
              addr.country,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={sug.place_id}
                className="p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  onChange(details || sug.display_name);
                  setSuggestions([]);
                }}
              >
                <div className="font-medium">{sug.display_name}</div>
                {details && (
                  <div className="text-xs text-gray-400">{details}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default LocationFetcher;
