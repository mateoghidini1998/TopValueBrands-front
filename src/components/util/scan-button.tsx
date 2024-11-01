"use client";
import React, { useRef, useState } from "react";

const ScanButton: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scan, setScan] = useState<MediaStream | null>(null);
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  const toggleCamera = async () => {
    if (!videoOpen) {
      // Abrir la cámara
      try {
        const mediaScan = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setScan(mediaScan);
        setVideoOpen(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaScan;
        }
      } catch (error) {
        console.error("Error opening camera", error);
        setVideoOpen(false);
      }
    } else {
      // Cerrar la cámara
      if (scan) {
        scan.getTracks().forEach((track) => track.stop());
        setScan(null);
        setVideoOpen(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="w-8 h-8 bg-red-500 rounded-md m-4"
        onClick={toggleCamera}
      >
        {videoOpen ? "Cerrar Cámara" : "Abrir Cámara"}
      </button>
      {/* {videoOpen && ( */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={videoOpen ? "100%" : 0}
        height={videoOpen ? "auto" : 0}
      />
      {/* )} */}
    </div>
  );
};

export default ScanButton;
