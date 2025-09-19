import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "./config";

export default function Round3({ score, setScore }) {
  const titleRef = useRef();
  const descRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [flags, setFlags] = useState({ flag1: "", flag2: "" });

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      descRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, duration: 1 }
    );
  }, []);

  const handleFlagSubmit = async (flagKey) => {
    if (!user || !user.token) {
      toast.error("You must be logged in.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/flags/submit`,
        { flag: flags[flagKey] },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success(res.data.message);
      if (res.data.score !== undefined) setScore(res.data.score);

      // ✅ clear input after success
      setFlags({ ...flags, [flagKey]: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Flag submission failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 px-4 py-10 font-mono"
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl text-center mb-6 neon-glow"
      >
        ROUND 3: ADVANCED CHALLENGE
      </h1>

      <p
        ref={descRef}
        className="text-sm md:text-base text-center max-w-3xl mx-auto text-green-300 mb-8"
      >
        Download the special round games and crack the challenges! Submit both
        flags below. Each correct flag ={" "}
        <span className="text-green-400 font-bold">20 points</span>.
      </p>

      {/* Download Link */}
      <div className="text-center mb-10">
        <a
          href="https://nikhilkush078.github.io/ctf_main_website-/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-700 hover:bg-green-500 text-black font-bold rounded shadow underline"
        >
          🔗 DOWNLOAD GAMES
        </a>
      </div>

      {/* Two Column Flag Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Flag 1 */}
        <div className="border border-green-500 p-6 rounded-lg shadow-lg bg-gray-900/60">
          <h2 className="text-xl text-green-300 mb-3">Flag 1</h2>
          <input
            type="text"
            value={flags.flag1}
            onChange={(e) => setFlags({ ...flags, flag1: e.target.value })}
            placeholder="Enter Flag 1..."
            className="w-full p-2 mb-3 bg-black border border-green-500 text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          />
          <button
            onClick={() => handleFlagSubmit("flag1")}
            className="w-full py-2 px-4 bg-green-700 hover:bg-green-500 text-black font-bold rounded shadow"
          >
            SUBMIT FLAG 1
          </button>
        </div>

        {/* Flag 2 */}
        <div className="border border-green-500 p-6 rounded-lg shadow-lg bg-gray-900/60">
          <h2 className="text-xl text-green-300 mb-3">Flag 2</h2>
          <input
            type="text"
            value={flags.flag2}
            onChange={(e) => setFlags({ ...flags, flag2: e.target.value })}
            placeholder="Enter Flag 2..."
            className="w-full p-2 mb-3 bg-black border border-green-500 text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          />
          <button
            onClick={() => handleFlagSubmit("flag2")}
            className="w-full py-2 px-4 bg-green-700 hover:bg-green-500 text-black font-bold rounded shadow"
          >
            SUBMIT FLAG 2
          </button>
        </div>
      </div>
    </div>
  );
}
