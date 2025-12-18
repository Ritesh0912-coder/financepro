"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    PerspectiveCamera,
    Stars,
    useGLTF,
    ContactShadows,
    Float,
    Bloom,
    EffectComposer
} from "@react-three/drei";
import { gsap } from "gsap";
import { RGBELoader } from "three-stdlib";

// Placeholder models if GLBs are not available
// In production, these should be /public/models/bull.glb and /public/models/bear.glb
const BULL_MODEL_URL = "/models/bull.glb";
const BEAR_MODEL_URL = "/models/bear.glb";
const HDR_URL = "/hdr/studio.hdr";

interface CinematicIntroProps {
    onComplete: () => void;
}

const Bull = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    // Using useGLTF which handles suspense automatically if wrapped in Suspense
    // For now we'll use a placeholder box if loading fails or for initial dev
    // const { scene } = useGLTF(BULL_MODEL_URL);

    return (
        <group ref={ref} position={position} rotation={rotation} name="bull">
            {/* Muscular Bull Placeholder */}
            <mesh castShadow>
                <boxGeometry args={[1.5, 1.2, 2.5]} />
                <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Horns */}
            <mesh position={[0.5, 0.5, 1.2]} rotation={[0.5, 0, 0]}>
                <coneGeometry args={[0.1, 0.5, 8]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
            <mesh position={[-0.5, 0.5, 1.2]} rotation={[0.5, 0, 0]}>
                <coneGeometry args={[0.1, 0.5, 8]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </group>
    );
};

const Bear = ({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) => {
    const ref = useRef<THREE.Group>(null);
    // const { scene } = useGLTF(BEAR_MODEL_URL);

    return (
        <group ref={ref} position={position} rotation={rotation} name="bear">
            {/* Massive Bear Placeholder */}
            <mesh castShadow>
                <boxGeometry args={[1.8, 1.5, 2.8]} />
                <meshStandardMaterial color="#4a2c1b" roughness={0.8} metalness={0.1} />
            </mesh>
            {/* Claws/Heads */}
            <mesh position={[0, 0.4, 1.4]}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshStandardMaterial color="#4a2c1b" />
            </mesh>
        </group>
    );
};

const CollisionEffect = ({ active }: { active: boolean }) => {
    const sphereRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (active && sphereRef.current) {
            sphereRef.current.scale.addScalar(delta * 50);
            if (sphereRef.current.material instanceof THREE.MeshStandardMaterial) {
                sphereRef.current.material.opacity = Math.max(0, 1 - sphereRef.current.scale.x / 100);
            }
        }
    });

    return (
        <mesh ref={sphereRef} position={[0, 0, 0]} visible={active}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffd700"
                emissiveIntensity={10}
                transparent
                opacity={1}
            />
        </mesh>
    );
};

const Scene = ({ onComplete }: CinematicIntroProps) => {
    const { camera, scene } = useThree();
    const bullRef = useRef<THREE.Group>(null);
    const bearRef = useRef<THREE.Group>(null);
    const [collisionActive, setCollisionActive] = useState(false);
    const lightRef = useRef<THREE.PointLight>(null);

    useEffect(() => {
        // Initial positions
        const bull = scene.getObjectByName("bull");
        const bear = scene.getObjectByName("bear");

        if (!bull || !bear) return;

        // cinematic timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 500);
            }
        });

        // Start Charge
        tl.to(bull.position, {
            z: -1.5,
            x: -1,
            duration: 2.5,
            ease: "power2.in"
        }, 0);

        tl.to(bear.position, {
            z: -1.5,
            x: 1,
            duration: 2.5,
            ease: "power2.in"
        }, 0);

        // Camera move
        tl.to(camera.position, {
            z: 5,
            y: 2,
            x: 0,
            duration: 2.5,
            ease: "power1.inOut"
        }, 0);

        // Collision Moment
        tl.add(() => {
            setCollisionActive(true);
            // Screen shake simulated by camera nudge
            gsap.to(camera.position, {
                y: "+=0.2",
                x: "+=0.1",
                duration: 0.05,
                repeat: 10,
                yoyo: true,
                ease: "none"
            });
        }, 2.5);

        // Slow motion effect
        tl.to(bull.position, { x: -0.2, z: -1.5, duration: 1, ease: "none" }, 2.5);
        tl.to(bear.position, { x: 0.2, z: -1.5, duration: 1, ease: "none" }, 2.5);

        // Light expansion
        tl.to(lightRef.current, {
            intensity: 100,
            duration: 1,
            ease: "power4.out"
        }, 2.6);

    }, [scene, camera, onComplete]);

    return (
        <>
            <color attach="background" args={["#000"]} />
            <Environment preset="night" />

            <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={40} />

            <ambientLight intensity={0.2} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={2}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />
            <pointLight
                ref={lightRef}
                position={[0, 2, -1.5]}
                intensity={0}
                color="#ffd700"
            />

            <Bull position={[-15, 0, -1.5]} rotation={[0, Math.PI / 2, 0]} />
            <Bear position={[15, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]} />

            <CollisionEffect active={collisionActive} />

            <ContactShadows
                opacity={0.4}
                scale={20}
                blur={2}
                far={10}
                resolution={256}
                color="#000000"
            />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#050505" roughness={0.8} />
            </mesh>
        </>
    );
};

const CinematicIntro: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(true);

    useEffect(() => {
        const hasPlayed = sessionStorage.getItem("intro_played");
        const isMobile = window.innerWidth < 768;

        // Performance check simple
        const isLowPower = false; // Could check navigator.hardwareConcurrency

        if (!hasPlayed && !isMobile && !isLowPower) {
            setIsVisible(true);
            setIsDismissed(false);
        }
    }, []);

    const handleComplete = () => {
        gsap.to(".intro-overlay", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                setIsDismissed(true);
                sessionStorage.setItem("intro_played", "true");
            }
        });
    };

    if (isDismissed) return null;

    return (
        <div className="intro-overlay fixed inset-0 z-[9999] bg-black pointer-events-none">
            <Canvas shadows>
                <Scene onComplete={handleComplete} />
            </Canvas>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-xs font-light tracking-widest uppercase">
                Financial Intelligence Loading...
            </div>
        </div>
    );
};

export default CinematicIntro;
