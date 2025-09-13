import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Users,
  CreditCard,
} from "lucide-react";
import MapPreview from "../components/MapPreview";

const Stepper = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedCollectorId, setSelectedCollectorId] = useState<number | null>(
    null
  );

  const [selectedCollector, setSelectedCollector] =
    useState<CollectorType | null>(null);

  const [coords, setCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });
  const [suggestedCollectors, setSuggestedCollectors] = useState<
    CollectorType[]
  >([]);

  type CollectorType = {
    id: number;
    username: string;
    full_name: string;
    phone?: string;
  };

  const [plans, setPlans] = useState<{ name: string; price: string }[]>([]);

  type SubscriptionPlan = {
    name: string;
    display_name?: string;
    description?: string;
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/subscription/plans/"
        );
        if (res.ok) {
          const data: SubscriptionPlan[] = await res.json();
          const formattedPlans = data.map((plan) => ({
            name: plan.display_name || plan.name,
            price: plan.description || "",
          }));
          setPlans(formattedPlans);
        } else {
          console.error("Failed to fetch subscription plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (pickupLocation) {
        geocodeAddress(pickupLocation);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [pickupLocation, geocodeAddress]);

  //Handle pickup location

  const handleLocationContinue = async () => {
    if (!pickupLocation || coords.lat === null || coords.lng === null) {
      alert("Please enter a valid pickup location.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token being sent:", token);

      console.log("Sending lat:", coords.lat, "lng:", coords.lng);

      const res = await fetch(
        `http://localhost:8000/api/assignment/suggest/?lat=${coords.lat}&lng=${coords.lng}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!coords.lat || !coords.lng) {
        console.error("Missing coordinates");
        return;
      }

      if (res.ok) {
        const json = await res.json();
        setSuggestedCollectors(json.suggested_collectors);
        setStep(step + 1); // move to next step
      } else {
        const err = await res.json();
        alert("Error suggesting collectors: " + (err.detail || "Try again"));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong suggesting collectors.");
    }
  };

  //Next step function

  const nextStep = async () => {
    if (step === 1 && !selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }
    if (step === 2 && (!pickupDate || !pickupTime)) {
      alert("Please select both date and time.");
      return;
    }
    if (
      step === 3 &&
      (!pickupLocation || coords.lat === null || coords.lng === null)
    ) {
      alert("Please enter a valid pickup location.");
      return;
    }

    if (step === 4 && !selectedCollectorId) {
      alert("Please select a collector.");
      return;
    }
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => step > 1 && setStep(step - 1);

  //payload to be submitted at step 5
  const handleSubmit = async () => {
    try {
      if (!pickupDate || !pickupTime) {
        alert("Please select both date and time.");
        return;
      }
      if (!selectedCollector) {
        alert("Please select a collector.");
        return;
      }

      const datetimeString = new Date(
        `${pickupDate}T${pickupTime}`
      ).toISOString();
      
      const res = await fetch("http://localhost:8000/api/pickups/requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          plan: selectedPlan.toLowerCase().replace("-", "_"),
          location: pickupLocation,
          latitude: coords.lat,
          longitude: coords.lng,
          pickup_datetime: datetimeString,
          collector_id: selectedCollectorId,
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

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgGreen.jpeg')" }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-20 z-0" />
      <div className="max-w-4xl w-full relative z-10 text-trashBlue">
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`flex items-center gap-2 text-sm font-medium ${
                step === s ? "text-trashBlue" : "text-gray-500"
              }`}
            >
              {s === 1 && <Users />}
              {s === 2 && <Calendar />}
              {s === 3 && <MapPin />}
              {s === 4 && <CheckCircle />}
              {s === 5 && <CreditCard />}
              Step {s}
            </div>
          ))}
        </div>

        <div className="bg-white/90 p-6 rounded-2xl shadow-xl animate-fade-in h-[400px] transition-all duration-300">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Choose a Subscription Plan
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {plans.length === 0 && <p>Loading plans...</p>}
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
                    <h3 className="text-lg font-bold text-green-700">
                      {plan.name}
                    </h3>
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
              <h2 className="text-xl font-semibold">
                Enter Your Pickup Address
              </h2>
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
                  📍 Coords: Lat {coords.lat.toFixed(5)}, Lng{" "}
                  {coords.lng.toFixed(5)}
                </p>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Suggested Trash Collectors
              </h2>
              {suggestedCollectors.length === 0 ? (
                <p>No collectors found near your location.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {suggestedCollectors.map((collector) => (
                    <div
                      key={collector.id}
                      onClick={() => {
                        setSelectedCollector(collector);
                        setSelectedCollectorId(collector.id);
                      }}
                      className={`border-2 p-4 rounded-xl cursor-pointer transition-all ${
                        selectedCollector?.id === collector.id
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-green-700">
                        {collector.full_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Username: {collector.username}
                      </p>
                      {collector.phone && (
                        <p className="text-sm">Phone: {collector.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Confirm & Pay</h2>
              <div className="text-gray-700 mb-6 space-y-2">
                <p>
                  Plan: <strong>{selectedPlan}</strong>
                </p>
                <p>
                  Date: <strong>{pickupDate}</strong>
                </p>
                <p>
                  Time: <strong>{pickupTime}</strong>
                </p>
                <p>
                  Location: <strong>{pickupLocation}</strong>
                </p>
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

        <div className="flex justify-between mt-6 px-4">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={step === 3 ? handleLocationContinue : nextStep}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            {step === 5 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
