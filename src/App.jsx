import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { useState, Suspense } from "react";
import { Leva } from "leva";
import Loader from "./components/loader";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Leva />
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          fontSize: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          zIndex: 10,
        }}
      >
        3D DOC Visualizer
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 15px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ffffff",
          fontSize: "14px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          zIndex: 10,
          lineHeight: "1.5",
        }}
      >
        <strong>Orbit Controls:</strong>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>🔄 Rotate: Left Click + Drag</li>
          <li>🔍 Zoom: Scroll Wheel</li>
          <li>🔄 Pan: Right Click + Drag</li>
          <li>⛶ Reset: Double Click</li>
        </ul>
      </div>

      <Canvas
        camera={{
          position: cameraPosition,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows={true}
      >
        <Suspense fallback={null}>
          <Scene onLoaded={() => setIsLoading(false)} />
        </Suspense>
      </Canvas>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default App;
