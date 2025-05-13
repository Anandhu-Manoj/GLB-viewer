import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import 'bootstrap/dist/css/bootstrap.min.css';

const cardStyle = {
  background: "rgba(34, 40, 49, 0.97)",
  borderRadius: "24px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
  padding: "40px 48px",
  minWidth: "340px",
  color: "#fff",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "400px",
};

const inputStyle = {
  margin: "18px 0 8px 0",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #5b86e5",
  background: "#232526",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
};

const buttonStyle = {
  padding: "12px 32px",
  background: "linear-gradient(90deg, #36d1c4 0%, #5b86e5 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.2s",
  minWidth: "120px",
};

const backButtonStyle = {
  ...buttonStyle,
  background: "linear-gradient(90deg, #232526 0%, #5b86e5 100%)",
  border: "1px solid #5b86e5",
  color: "#5b86e5",
};

const toastStyle = {
  position: "fixed",
  top: "32px",
  right: "32px",
  background: "#e74c3c",
  color: "#fff",
  padding: "18px 32px",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
  fontWeight: 600,
  fontSize: "1.1rem",
  zIndex: 9999,
  opacity: 0.95,
  transition: "opacity 0.3s",
};

const previewContainerStyle = {
  width: "320px",
  height: "220px",
  background: "#181a1b",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  margin: "0 auto 8px auto",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.06)",
};

const GLBPreview = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const UploadModelPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const navigate = useNavigate();

  const showToastMsg = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(null);
    setPreviewUrl(null);

    if (!selected) return;

    if (selected.name.toLowerCase().endsWith('.glb')) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      showToastMsg('Please upload a .glb file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToastMsg('Please upload the file');
      return;
    }
    if (!file.name.toLowerCase().endsWith('.glb')) {
      showToastMsg('Please upload a .glb file.');
      return;
    }
    if (!previewUrl) {
      showToastMsg('Please preview the file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/models/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setToastMsg('Uploaded successfully!');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate(`/view`);
        }, 1500);
      } else {
        showToastMsg(result.error || 'Upload failed');
      }
    } catch (error) {
      showToastMsg('Error uploading model: ' + error.message);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
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
      <div style={cardStyle} className="p-4">
        <h2 style={{ marginBottom: 0, marginTop: 0 }}>Upload 3D Model (.glb only)</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="file"
            accept=".glb"
            onChange={handleFileChange}
            style={inputStyle}
          />
          {previewUrl && (
            <div className="my-3">
              <div style={previewContainerStyle}>
                <Canvas camera={{ position: [0, 0, 2.5] }}>
                  <ambientLight intensity={0.7} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <OrbitControls enablePan enableZoom enableRotate autoRotate />
                  <React.Suspense fallback={null}>
                    <GLBPreview url={previewUrl} />
                  </React.Suspense>
                </Canvas>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <button
              type="submit"
              style={buttonStyle}
            >
              Upload
            </button>
            <button
              type="button"
              style={backButtonStyle}
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      {showToast && (
        <div style={toastStyle}>
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default UploadModelPage;