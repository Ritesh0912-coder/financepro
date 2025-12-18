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

    return (
        <group ref={ref} position={position} rotation={rotation} name="bull">
            {/* Muscular Bull Placeholder - Green glow as per image */}
            <mesh castShadow>
                <boxGeometry args={[1.5, 1.2, 2.5]} />
                <meshStandardMaterial
                    color="#00ff44"
                    roughness={0.1}
                    metalness={0.9}
                    emissive="#004411"
                    emissiveIntensity={2}
                />
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

    return (
        <group ref={ref} position={position} rotation={rotation} name="bear">
            {/* Massive Bear Placeholder - Orange/Red fire as per image */}
            <mesh castShadow>
                <boxGeometry args={[1.8, 1.5, 2.8]} />
                <meshStandardMaterial
                    color="#ff4400"
                    roughness={0.5}
                    metalness={0.2}
                    emissive="#441100"
                    emissiveIntensity={2}
                />
            </mesh>
            {/* Claws/Heads */}
            <mesh position={[0, 0.4, 1.4]}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={1} />
            </mesh>
        </group>
    );
};

const CollisionEffect = ({ active }: { active: boolean }) => {
    const sphereRef = useRef<THREE.Mesh>(null);
    const particlesRef = useRef<THREE.Points>(null);

    const particlesCount = 200;
    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        const spd = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = 0;
            pos[i * 3 + 1] = 0;
            pos[i * 3 + 2] = 0;

            spd[i * 3] = (Math.random() - 0.5) * 2;
            spd[i * 3 + 1] = (Math.random() - 0.5) * 2;
            spd[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
        return [pos, spd];
    }, []);

    useFrame((state, delta) => {
        if (active) {
            if (sphereRef.current) {
                sphereRef.current.scale.addScalar(delta * 100);
                if (sphereRef.current.material instanceof THREE.MeshStandardMaterial) {
                    sphereRef.current.material.opacity = Math.max(0, 1 - sphereRef.current.scale.x / 150);
                }
            }
            if (particlesRef.current) {
                const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < particlesCount; i++) {
                    pos[i * 3] += speeds[i * 3] * delta * 20;
                    pos[i * 3 + 1] += speeds[i * 3 + 1] * delta * 20;
                    pos[i * 3 + 2] += speeds[i * 3 + 2] * delta * 20;
                }
                particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }
        }
    });

    return (
        <group position={[0, 1, -1.5]}>
            <mesh ref={sphereRef} visible={active}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffd700"
                    emissiveIntensity={30}
                    transparent
                    opacity={1}
                />
            </mesh>
            <points ref={particlesRef} visible={active}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particlesCount}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    color="#ffd700"
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

const Scene = ({ onComplete }: CinematicIntroProps) => {
    const { camera, scene } = useThree();
    const [collisionActive, setCollisionActive] = useState(false);
    const lightRef = useRef<THREE.PointLight>(null);

    useEffect(() => {
        const bull = scene.getObjectByName("bull");
        const bear = scene.getObjectByName("bear");

        if (!bull || !bear) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(onComplete, 200);
            }
        });

        // 1. Zoom in fast
        tl.fromTo(camera.position, { z: 60, y: 10 }, {
            z: 10,
            y: 2,
            duration: 1.2,
            ease: "expo.out"
        }, 0);

        // 2. Charge from afar
        tl.to(bull.position, {
            x: -1,
            duration: 1.4,
            ease: "power4.in"
        }, 0.2);

        tl.to(bear.position, {
            x: 1,
            duration: 1.4,
            ease: "power4.in"
        }, 0.2);

        // 3. Collision
        tl.add(() => {
            setCollisionActive(true);
            gsap.to(camera.position, {
                y: "+=0.4",
                x: "+=0.3",
                duration: 0.03,
                repeat: 15,
                yoyo: true,
                ease: "none"
            });
        }, 1.6);

        // 4. Whiteout
        tl.to(lightRef.current, {
            intensity: 500,
            duration: 0.5,
            ease: "expo.out"
        }, 1.7);

    }, [scene, camera, onComplete]);

    return (
        <>
            <color attach="background" args={["#000"]} />
            <Environment preset="night" />

            <PerspectiveCamera makeDefault fov={35} />

            <ambientLight intensity={0.1} />
            <directionalLight
                position={[15, 20, 10]}
                intensity={5}
                color="#fff"
                castShadow
            />
            <pointLight
                ref={lightRef}
                position={[0, 2, -1.5]}
                intensity={0}
                color="#fff"
            />

            <Bull position={[-80, 0, -1.5]} rotation={[0, Math.PI / 2, 0]} />
            <Bear position={[80, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]} />

            <CollisionEffect active={collisionActive} />

            <ContactShadows
                opacity={0.8}
                scale={150}
                blur={3}
                far={15}
                resolution={1024}
                color="#000000"
            />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#010101" roughness={1} />
            </mesh>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const CinematicIntro: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(true);

    useEffect(() => {
        const hasPlayed = sessionStorage.getItem("intro_played");
        const isMobile = window.innerWidth < 768;

        if (!hasPlayed && !isMobile) {
            setIsVisible(true);
            setIsDismissed(false);
        }
    }, []);

    const handleComplete = () => {
        gsap.to(".intro-overlay", {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            onComplete: () => {
                setIsDismissed(true);
                sessionStorage.setItem("intro_played", "true");
            }
        });
    };

    if (isDismissed) return null;

    return (
        <div className="intro-overlay fixed inset-0 z-[9999] bg-black pointer-events-none">
            <style jsx>{`
                .intro-overlay::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle, transparent 40%, black 150%);
                    pointer-events: none;
                }
                .noise {
                    position: absolute;
                    inset: 0;
                    opacity: 0.05;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    pointer-events: none;
                }
            `}</style>
            <div className="noise" />
            <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
                <Scene onComplete={handleComplete} />
            </Canvas>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-white/10 text-[10vw] font-black uppercase tracking-tighter mix-blend-overlay">
                    GLOBAL FINANCE
                </div>
            </div>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono tracking-[0.5em] uppercase animate-pulse">
                System Initializing...
            </div>
        </div>
    );
};

export default CinematicIntro;
