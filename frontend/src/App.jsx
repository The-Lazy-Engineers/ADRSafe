import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/navbar";
import symptomsData from "../src/assets/symptoms.json";
const symps = symptomsData.symptoms;

const App = () => {
  const [message, setMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [tempSelectedSymptoms, setTempSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [postResponse, setPostResponse] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleSubmit = async () => {
    let binarySymptomsArray = symps.map((symptom) =>
      selectedSymptoms.includes(symptom) ? 1 : 0
    );

    binarySymptomsArray = binarySymptomsArray.concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    //alert("Binary representation of symptoms: " + binarySymptomsArray.join(", "));


    try {
      const response = await fetch('http://127.0.0.1:5000/predict', { // Local Flask backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: binarySymptomsArray }) // Send symptoms as JSON
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await response.json();
      //alert("Response from backend:" + JSON.stringify(data));

      // You can now update state to display the response
      setPostResponse(data);
      setHasSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleCheckboxChange = (symptom) => {
    setTempSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const filteredSymptoms = symps.filter((symptom) =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function capitalize(str) {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHasSubmitted(false);
  }, [selectedSymptoms]);

  const handleConfirm = () => {
    setSelectedSymptoms(tempSelectedSymptoms);
    setShowDropdown(false);
  };

  const handleCancel = () => {
    setTempSelectedSymptoms(selectedSymptoms);
    setShowDropdown(false);
  };

  return (
    <>
      <Navbar showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm} />

      {/* Show login form when showLoginForm is true */}
      {showLoginForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginForm(false)}
              className="absolute top-4 right-6 text-gray-500 hover:text-gray-400 text-2xl focus:outline-none"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-gray-200 mb-4">User Login</h2>
            <form className="flex flex-col">
              <input
                placeholder="Email address"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
              />
              <input
                placeholder="Password"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="password"
              />

              {/* check box thingy */}
              <div className="flex items-center justify-between py-1">
                <label
                  htmlFor="hr"
                  className="flex items-center gap-2.5 dark:text-white light:text-black"
                >
                  <input id="hr" type="checkbox" className="peer hidden" />
                  <div
                    className="h-5 w-5 flex rounded-md border border-[#a2a1a833] light:bg-[#e8e8e8] dark:bg-[#212121] peer-checked:bg-blue-600 transition"
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 light:stroke-[#e8e8e8] dark:stroke-[#212121]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Remember me</span>
                </label>

                <div className="text-gray-500">
                  Don't have an account?
                  <a
                    className="ml-1 text-sm text-blue-500 hover:underline"
                    href="#"
                  >
                    Signup
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowLoginForm(false)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 text-blue-100 rounded-md w-full transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (

        <>
          <div className="flex flex-col items-center pt-[20vh] h-screen bg-gray-900 text-gray-100">
            {!showLoginForm && (<div className="relative w-[80vw] max-w-[800px]" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Start typing to search symptoms..."
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md border border-[#0a101f] bg-[#0a101f] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {showDropdown && (
                <div className="absolute mt-1 w-full bg-[#1a2238] border border-[#1a2238] rounded-md shadow-lg z-10 max-h-[60vh] flex flex-col">
                  <div className="max-h-100 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500">
                    {filteredSymptoms.length > 0 ? (
                      filteredSymptoms.map((symptom, index) => (
                        <label
                          key={index}
                          htmlFor={`symptom-${index}`}
                          className="flex items-center p-2 hover:bg-gray-700 cursor-pointer gap-2.5"
                        >
                          <input
                            id={`symptom-${index}`}
                            type="checkbox"
                            checked={tempSelectedSymptoms.includes(symptom)}
                            onChange={() => handleCheckboxChange(symptom)}
                            className="peer hidden"
                          />
                          <div className="h-5 w-5 flex rounded-md bg-gray-900 peer-checked:bg-blue-600 transition">
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 stroke-gray-900 peer-checked:stroke-white"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 12.6111L8.92308 17.5L20 6.5"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          {symptom}
                        </label>
                      ))
                    ) : (
                      <p className="p-2 text-gray-400">No matching symptoms</p>
                    )}
                  </div>

                  <div className="flex justify-between p-2 bg-[#1a2238] border-t border-[#2c3a5e] sticky bottom-0">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setTempSelectedSymptoms([])}
                        className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded"
                      >
                        Deselect All
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirm}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-1 rounded-md"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

            {selectedSymptoms.length > 0 && (
              <>
                <div className="mt-4 w-[80vw] max-w-[800px] bg-[#0a101f] rounded-t-md p-4">
                  <h3 className="text-lg font-bold from-blue-400 to-blue-500 bg-gradient-to-r bg-clip-text text-transparent mb-3">
                    Selected Symptoms:
                  </h3>
                  <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600">
                    {selectedSymptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-700 text-white px-3 py-0 rounded-md"
                      >
                        <span>{symptom}</span>
                        <button
                          onClick={() => {
                            const updated = selectedSymptoms.filter(s => s !== symptom);
                            setSelectedSymptoms(updated);
                            setTempSelectedSymptoms(updated);
                          }}
                          className="ml-2 text-white hover:text-gray-300 focus:outline-none text-lg font-medium"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer bar with submit button */}
                <div className="w-[80vw] max-w-[800px] bg-[#0a101f] rounded-b-md p-3 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200"
                  >
                    Submit Symptoms
                  </button>
                </div>
              </>
            )}


            {hasSubmitted && (
              <>
                <div className="mt-4 w-[80vw] max-w-[800px] flex flex-col md:flex-row gap-4">
                  {/* Possible Disease Card */}
                  <div className="flex-1 bg-[#0a101f] rounded-md p-4">
                    <h3 className="text-lg font-bold from-green-400 via-teal-500 to-teal-500 bg-gradient-to-r bg-clip-text text-transparent mb-3">Possible Disease:</h3>
                    <p className="text-gray-400">
                      {capitalize(postResponse.predicted_disease) || "No prediction available"}
                    </p>
                  </div>

                  {/* Medication Card 
                  <div className="flex-1 bg-[#0a101f] rounded-md p-4">
                    <h3 className="text-lg font-bold from-green-400 via-teal-500 to-teal-500 bg-gradient-to-r bg-clip-text text-transparent mb-3">Medication:</h3>
                    <p className="text-gray-400">
                    {capitalize(postResponse.predicted_drug) || "No prediction available"}
                    </p>
                  </div>*/}
                </div>
              </>
            )}

          </div>
        </>
      )}
    </>
  );
};

export default App;