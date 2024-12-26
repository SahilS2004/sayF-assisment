import React, { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";

export default function Home() {
  const [type, setType] = useState("");
  const [radius, setRadius] = useState(5000);
  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjM2MDAsInN1YmplY3QiOiJzYWhpbEBnbWFpbC5jb20iLCJpYXQiOjE3MzUxMjkzNTl9.ns3XtsDeRCrIgGJT2FlQKYE7Q3wfiDe-huS2xOI-QCY";
        const apiUrl = `https://sahils2004.app.n8n.cloud/webhook/getmapdetail?type=${type}&radius=${radius}&latitude=${latitude}&longitude=${longitude}&token=${token}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            setData(Array.isArray(data.results) ? data.results : data);
            console.log("API Response:", data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Local Business Finder
          </h1>
          <p className="text-gray-600">
            Discover businesses around your location
          </p>
          <p className="text-black-600">It may take few seconds when search</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Type of business
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="type"
                type="text"
                placeholder="e.g., restaurant, cafe, gym"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-11"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="radius"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search radius: {(radius / 1000).toFixed(1)}km
            </label>
            <input
              type="range"
              id="radius"
              min="1000"
              max="100000"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            Find Nearby Places
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {item.name || "Unknown Name"}
              </h2>
              <p className="text-gray-600 mb-3 line-clamp-2">
                <MapPin className="inline h-4 w-4 mr-1 text-gray-400" />
                {item.vicinity || "Unknown Location"}
              </p>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-gray-700 font-medium">
                  {item.rating ? `${item.rating} / 5` : "No Rating"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
