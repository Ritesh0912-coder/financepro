/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, ThreeElements } from '@react-three/fiber';
import {
    useFBO,
    useScroll,
    Image,
    Scroll,
    Preload,
    ScrollControls,
    MeshTransmissionMaterial,
    Text
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';

interface NavItem {
    label: string;
    link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
    mode?: Mode;
    lensProps?: ModeProps;
    barProps?: ModeProps;
    cubeProps?: ModeProps;
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: FluidGlassProps) {
    const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
    const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

    const {
        navItems = [
            { label: 'Home', link: '/' },
            { label: 'News', link: '/news' },
            { label: 'LTP Tools', link: '/ltp-calculator' }
        ],
        ...modeProps
    } = rawOverrides;

    return (
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
            <ScrollControls damping={0.2} pages={3} distance={0.4}>
                {mode === 'bar' && <NavItems items={navItems as NavItem[]} />}
                <Wrapper modeProps={modeProps}>
                    <Scroll>
                        <Typography />
                        <Images />
                    </Scroll>
                    <Scroll html />
                    <Preload />
                </Wrapper>
            </ScrollControls>
        </Canvas>
    );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
    children?: ReactNode;
    shape: 'sphere' | 'box' | 'bar'; // Changed from glb/geometryKey to simple shape
    lockToBottom?: boolean;
    followPointer?: boolean;
    modeProps?: ModeProps;
}

interface ZoomMaterial extends THREE.Material {
    zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> { }

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

const ModeWrapper = memo(function ModeWrapper({
    children,
    shape,
    lockToBottom = false,
    followPointer = true,
    modeProps = {},
    ...props
}: ModeWrapperProps) {
    const ref = useRef<THREE.Mesh>(null!);
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

    useFrame((state, delta) => {
        const { gl, viewport, pointer, camera } = state;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

        const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
        const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
        easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
        gl.setClearColor(0x0f1218, 0); // Transparent/Dark bg
    });

    const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
        scale?: number;
        ior?: number;
        thickness?: number;
        anisotropy?: number;
        chromaticAberration?: number;
        [key: string]: unknown;
    };

    return (
        <>
            {createPortal(children, scene)}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent />
            </mesh>
            <mesh
                ref={ref}
                scale={scale ?? 1.5} // Adjusted default scale for primitives
                rotation-x={Math.PI / 2}
                {...props}
            >
                {shape === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
                {shape === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
                {shape === 'bar' && <boxGeometry args={[4, 1, 1]} />}

                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior ?? 1.15}
                    thickness={thickness ?? 5}
                    anisotropy={anisotropy ?? 0.01}
                    chromaticAberration={chromaticAberration ?? 0.1}
                    {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
                />
            </mesh>
        </>
    );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
    return <ModeWrapper shape="sphere" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
    return <ModeWrapper shape="box" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
    const defaultMat = {
        transmission: 1,
        roughness: 0,
        thickness: 10,
        ior: 1.15,
        color: '#ffffff',
        attenuationColor: '#ffffff',
        attenuationDistance: 0.25
    };

    return (
        <ModeWrapper
            shape="bar"
            lockToBottom
            followPointer={false}
            modeProps={{ ...defaultMat, ...modeProps }}
            {...p}
        />
    );
}

function NavItems({ items }: { items: NavItem[] }) {
    const group = useRef<THREE.Group>(null!);
    const { viewport, camera } = useThree();

    const DEVICE = {
        mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
        tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
        desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }
    };
    const getDevice = () => {
        // Check if window is defined (client-side)
        if (typeof window === 'undefined') return 'desktop';
        const w = window.innerWidth;
        return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
    };

    const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

    useEffect(() => {
        const onResize = () => setDevice(getDevice());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const { spacing, fontSize } = DEVICE[device];

    useFrame(() => {
        if (!group.current) return;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
        group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

        group.current.children.forEach((child, i) => {
            child.position.x = (i - (items.length - 1) / 2) * spacing;
        });
    });

    const handleNavigate = (link: string) => {
        if (!link) return;
        window.location.href = link;
    };

    return (
        <group ref={group} renderOrder={10}>
            {items.map(({ label, link }) => (
                <Text
                    key={label}
                    fontSize={fontSize}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0}
                    outlineBlur="20%"
                    outlineColor="#000"
                    outlineOpacity={0.5}
                    renderOrder={10}
                    onClick={e => {
                        e.stopPropagation();
                        handleNavigate(link);
                    }}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'auto')}
                >
                    {label}
                </Text>
            ))}
        </group>
    );
}

function Images() {
    const group = useRef<ZoomGroup>(null!);
    const data = useScroll();
    const { height } = useThree(s => s.viewport);

    useFrame(() => {
        // Use fallback if children are not ready
        if (!group.current || !group.current.children || group.current.children.length < 5) return;

        group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
        group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
        group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
        group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
        group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    });

    // Using random images from Unsplash as fallbacks since local assets might be missing
    return (
        <group ref={group}>
            <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
            <Image position={[2, 0, 3]} scale={3} url="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
            <Image position={[-2.05, -height, 6]} scale={[1, 3]} url="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
            <Image position={[-0.6, -height, 9]} scale={[1, 2]} url="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
            <Image position={[0.75, -height, 10.5]} scale={1.5} url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" />
        </group>
    );
}

function Typography() {
    const DEVICE = {
        mobile: { fontSize: 0.2 },
        tablet: { fontSize: 0.4 },
        desktop: { fontSize: 0.6 }
    };
    const getDevice = () => {
        if (typeof window === 'undefined') return 'desktop';
        const w = window.innerWidth;
        return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
    };

    const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

    useEffect(() => {
        const onResize = () => setDevice(getDevice());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const { fontSize } = DEVICE[device];

    return (
        <Text
            position={[0, 0, 12]}
            fontSize={fontSize}
            letterSpacing={-0.05}
            outlineWidth={0}
            outlineBlur="20%"
            outlineColor="#000"
            outlineOpacity={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            FinNew Pro
        </Text>
    );
}
