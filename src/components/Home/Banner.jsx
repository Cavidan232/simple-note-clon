import React from 'react';
import bg from "../../assets/devices.png";

function Banner() {
  return (
    <div className="relative min-h-[100vh] bg-cover bg-center flex items-center justify-center text-center bg-custom-dark">
      <div className="absolute inset-0 bg-custom-dark opacity-40"></div>
      <div className="relative z-10 text-white px-[30px] py-12 md:px-8 md:py-16 lg:py-24">
        <h1 className="text-6xl font-bold mx-auto w-full md:text-5xl md:w-[34%] lg:text-6xl mb-4">
          The simplest way to keep notes
        </h1>
        <p className="text-base mx-auto w-full md:text-xl md:w-[40%] lg:text-2xl mb-6">
          All your notes, synced on all your devices. Get Simplenote now for iOS, Android, Mac, Windows, Linux, or in your browser.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg md:text-xl hover:bg-blue-700">
          Sign up now
        </button>
        <img src={bg} alt="Devices" className="mt-6 min-w-[100%] mx-auto" />
      </div>
    </div>
  );
}

export default Banner;
