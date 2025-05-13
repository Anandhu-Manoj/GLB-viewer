import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const selectStyle = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "1px solid #5b86e5",
  fontSize: "1rem",
  margin: "16px 0 24px 0",
  background: "#232526",
  color: "#fff",
  outline: "none",
};

const canvasWrapperStyle = {
  width: "100%",
  maxWidth: "600px",
  height: "400px",
  maxHeight: "60vh",
  background: "#181a1b",
  borderRadius: "18px",
  boxShadow: "0 4px 16px rgba(31,38,135,0.18)",
  margin: "0 auto",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.06)",
};

const cardCustomStyle = {
  background: "rgba(34, 40, 49, 0.97)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.08)",
  maxWidth: "700px",
  width: "100%",
  maxHeight: "95vh",
  overflow: "auto",
};

const buttonCustomStyle = {
  marginTop: "24px",
  padding: "12px 32px",
  background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.2s",
};

const ViewModelPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [modelUrl, setModelUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/models');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, []);

  const handleModelSelection = async (event) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);

    if (!modelId) {
      setModelUrl('');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/models/${modelId}`);
      const data = await response.blob();
      const modelBlobUrl = URL.createObjectURL(data);
      setModelUrl(modelBlobUrl);
    } catch (error) {
      console.error('Error fetching model file:', error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #232526 0%, #5b86e5 100%)",
        overflow: "hidden"
      }}
    >
      <div className="card p-4" style={cardCustomStyle}>
        <h2 className="mb-0">Select a Model</h2>
        <select
          onChange={handleModelSelection}
          value={selectedModel}
          style={selectStyle}
        >
          <option value="">Select & View Uploaded a model</option>
          {models.map((model) => (
            <option key={model._id} value={model._id}>
              {model.filename}
            </option>
          ))}
        </select>
        <div style={canvasWrapperStyle}>
          <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={1.5}
            />
            {modelUrl && <ModelViewer modelUrl={modelUrl} />}
          </Canvas>
        </div>
        <button
          style={buttonCustomStyle}
          className="btn"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
};

export default ViewModelPage;