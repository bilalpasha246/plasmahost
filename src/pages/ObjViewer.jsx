import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";
import Navbar from "../components/Navbar";

function ObjViewer() {
    const [file, setFile] = useState(null); // State to store the uploaded file
    const viewerRef = useRef(null); // Ref for the three.js viewer container

    useEffect(() => {
        if (!file) return;

        // Initialize Three.js
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            50,
            viewerRef.current.clientWidth / viewerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.x = 5;
        camera.position.y = 5;
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            viewerRef.current.clientWidth,
            viewerRef.current.clientHeight
        );

        viewerRef.current.innerHTML = ""; // Clear previous renderer
        viewerRef.current.appendChild(renderer.domElement);

        // Add lighting
        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Sky color, ground color, intensity
        scene.add(light);

        // Add OrbitControls for interactivity
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth controls
        controls.dampingFactor = 0.1;

        // Load and display OBJ file
        const loader = new OBJLoader();
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            const contents = e.target.result; // Get the contents of the file
            const obj = loader.parse(contents); // Parse the OBJ file

            obj.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
                }
            });
            scene.add(obj); // Add the object to the scene
        };

        fileReader.readAsText(file); // Read the file as text

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update(); // Update orbit controls
            renderer.render(scene, camera);
        };
        animate();

        // Clean up resources on component unmount
        return () => {
            while (viewerRef.current.firstChild) {
                viewerRef.current.removeChild(viewerRef.current.firstChild);
            }
        };
    }, [file]);

    // Handle file drop
    const fileDrop = (event) => {
        event.preventDefault();
        const uploadedFile = event.dataTransfer.files[0];
        setFile(uploadedFile);
    };

    // Handle file selection via input
    const fileSelect = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    // Ignore drag over events
    const dragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="flex flex-col min-h-screen w-full h-full">
            <Navbar />
            {file ? (
                /* OBJ Viewer */
                <div
                    className="flex-grow flex flex-col justify-center items-center w-full h-full"
                    ref={viewerRef}
                ></div>
            ) : (
                /* File Drop Zone */
                <div className="flex-grow flex flex-col justify-center items-center w-full h-full">
                    <h1 className="text-5xl font-bold text-center mb-16">Visualize OBJ Files</h1>
                    <label
                        className="flex flex-col items-center justify-center w-[30%] h-[22%] border-2 border-dashed border-white rounded-md cursor-pointer"
                        onDrop={fileDrop}
                        onDragOver={dragOver}
                    >
                        <>
                            <i className="bx bxs-cloud-upload text-9xl text-white mt-16"></i>
                            <span className="text-md font-semibold text-white mb-16">
                                Drop file to upload or Press to Browse
                            </span>
                            <input
                                id="objUpload"
                                type="file"
                                accept=".obj"
                                className="hidden"
                                onChange={fileSelect}
                            />
                        </>
                    </label>
                    {/* Footer Text */}
                    <p className="text-md text-center mt-16 italic">
                        Visualize and explore your 3D OBJ files with ease, directly in your browser.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ObjViewer;
