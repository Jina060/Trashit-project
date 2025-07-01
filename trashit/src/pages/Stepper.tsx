// Full updated Stepper.tsx with geocoding and small map preview

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import MapPreview from "../components/MapPreview";

const Stepper = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [gpsError, setGpsError] = useState(false);

  const nextStep = () => {
    if (step === 1 && !selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }
    if (step === 2 && (!pickupDate || !pickupTime)) {
      alert("Please select both date and time.");
      return;
    }
    if (step === 3 && (!pickupLocation || coords.lat === null || coords.lng === null)) {
      alert("Please enter a valid pickup location.");
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => step > 1 && setStep(step - 1);

  // Geocode the typed location into coordinates
  const geocodeAddress = useCallback(async (address: string) => {
    if (!address) return;

    const token = import.meta.env.VITE_MAPBOX_TOKEN;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${token}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setCoords({ lat, lng });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  }, []);

  // Call geocoding API when address changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (pickupLocation) {
        geocodeAddress(pickupLocation);
      }
    }, 1000); // wait a bit before calling API

    return () => clearTimeout(delayDebounce);
  }, [pickupLocation, geocodeAddress]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/pickups/schedule/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan: selectedPlan.toLowerCase().replace("-", "_"),
          location: pickupLocation,
          latitude: coords.lat,
          longitude: coords.lng,
          date: pickupDate,
          time: pickupTime,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = `/pay/${data.id}`;
      } else {
        const error = await res.json();
        alert("Error: " + (error.detail || "Failed to schedule pickup"));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Try again.");
    }
  };

  const plans = [
    { name: "On-Demand", price: "1000FCFA per pickup" },
    { name: "Weekly", price: "3000FCFA/month (4 pickups)" },
    { name: "Monthly", price: "8000FCFA/month (unlimited pickups)" },
  ];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center py-12 px-4 bg-cover bg-center" style={{ backgroundImage: "url('/bgGreen.jpeg')" }}>
      <div className="absolute inset-0 bg-white bg-opacity-20 z-0" />
      <div className="max-w-4xl w-full relative z-10 text-trashBlue">
        {/* Step Indicators */}
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex items-center gap-2 text-sm font-medium ${step === s ? "text-trashBlue" : "text-gray-500"}`}>
              {s === 1 && <Users />}
              {s === 2 && <Calendar />}
              {s === 3 && <MapPin />}
              {s === 4 && <CheckCircle />}
              {s === 5 && <CreditCard />}
              Step {s}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white/90 p-6 rounded-2xl shadow-xl animate-fade-in h-[400px] transition-all duration-300">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Choose a Subscription Plan</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                      selectedPlan === plan.name
                        ? "border-green-600 bg-green-50 shadow-lg"
                        : "border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-green-700">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
              <input
                type="date"
                className="border rounded p-2 w-full mb-4"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
              <input
                type="time"
                className="border rounded p-2 w-full"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Enter Your Pickup Address</h2>
              <input
                type="text"
                placeholder="E.g. Mile 17, Buea"
                className="border rounded p-2 w-full"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />

              <MapPreview lat={coords.lat} lng={coords.lng} />

              {coords.lat && coords.lng && (
                <p className="text-sm text-green-600">
                  📍 Coords: Lat {coords.lat.toFixed(5)}, Lng {coords.lng.toFixed(5)}
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Suggested Trash Collectors</h2>
              <p className="text-sm text-gray-600 mb-4">
                Collector will be auto-assigned based on your location.
              </p>
              <div className="border p-4 rounded-xl shadow bg-green-50">
                <h3 className="font-bold text-green-700">
                  You’ll be assigned the nearest available collector.
                </h3>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Confirm & Pay</h2>
              <div className="text-gray-700 mb-6 space-y-2">
                <p>Plan: <strong>{selectedPlan}</strong></p>
                <p>Date: <strong>{pickupDate}</strong></p>
                <p>Time: <strong>{pickupTime}</strong></p>
                <p>Location: <strong>{pickupLocation}</strong></p>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
              >
                Proceed to Pay via PawaPay
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 px-4">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={step === 5}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            {step === 4 ? "Confirm" : "Next"}{" "}
            <ArrowRight className="inline w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
