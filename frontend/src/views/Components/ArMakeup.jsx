import React, { useRef, useState, useEffect } from "react";

const MakeupEffectApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [effect, setEffect] = useState("Foundation");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  // 1️⃣ Start webcam on mount, clean up on unmount
  useEffect(() => {
    let mediaStream;
    const startVideo = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startVideo();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // 2️⃣ Capture frame, send to backend, set before/after images
  const applyBackendEffect = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // draw current frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      console.log("Before image blob:", blob);
      const beforeURL = URL.createObjectURL(blob);
      setBeforeImage(beforeURL);
   
      // Send to backend
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("effect", effect);
   
      try {
        const res = await fetch("http://localhost:8001/apply_effect/", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error(res.statusText);
        const resultBlob = await res.blob();
        console.log("After effect result blob:", resultBlob);  // Log the result
        const afterURL = URL.createObjectURL(resultBlob);
        setAfterImage(afterURL);
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }, "result/png");
   
  };

  // 3️⃣ Stop camera & go back
  const handleExit = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    window.history.back();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🎨 Live Makeup Effects</h2>

      <div style={{ margin: "15px 0" }}>
        <label style={{ marginRight: "10px" }}>Choose Effect:</label>
        <select value={effect} onChange={(e) => setEffect(e.target.value)}>
          <option value="Foundation">Foundation</option>
          <option value="Concealer">Concealer</option>
          <option value="Primer">Primer</option>
        </select>
      </div>

      <div>
          <video
            ref={videoRef}
            style={{ width: "60%", borderRadius: "8px" }}
            autoPlay
            muted
          />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={applyBackendEffect}
          style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}
        >
          Apply {effect}
        </button>
        <button
          onClick={handleExit}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Exit
        </button>
      </div>

      {(beforeImage || afterImage) && (
        <div style={{ marginTop: "30px" }}>
          <h3>🖼️ Before & After</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            {beforeImage && (
              <div>
                <p>Before</p>
                <img
                  src={beforeImage}
                  alt="Before"
                  style={{ maxWidth: "300px", borderRadius: "8px" }}
                />
              </div>
            )}
            {afterImage && (
              <div>
                <p>After</p>
                <img
                  src={afterImage}
                  alt="After"
                  style={{ maxWidth: "300px", borderRadius: "8px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeupEffectApp;


