import PropTypes from 'prop-types';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SCREEN_W = 2.6;
const SCREEN_H = SCREEN_W / 1.6;
const tmp = new THREE.Vector3();

/** Soft radial sprite used for the coloured glow behind each screen. */
const useGlowTexture = () =>
  useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

const Screen = ({ project, position, rotation, index, onSelect, glow }) => {
  const texture = useLoader(THREE.TextureLoader, project.cover);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const group = useRef();
  const glowMat = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const g = group.current;
    g.position.y = position[1] + Math.sin(t * 0.7 + index * 1.9) * 0.09;
    g.rotation.x = rotation[0] + Math.sin(t * 0.5 + index) * 0.025;
    const s = hovered ? 1.07 : 1;
    g.scale.lerp(tmp.set(s, s, s), 0.12);
    g.position.z = THREE.MathUtils.lerp(g.position.z, position[2] + (hovered ? 0.35 : 0), 0.12);
    glowMat.current.opacity = THREE.MathUtils.lerp(glowMat.current.opacity, hovered ? 0.75 : 0.32, 0.1);
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        document.body.style.cursor = '';
        onSelect(project.slug);
      }}
    >
      <mesh position={[0, 0, -0.25]} scale={[SCREEN_W * 1.9, SCREEN_H * 2.1, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          ref={glowMat}
          map={glow}
          color={project.accent}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, -0.035]}>
        <boxGeometry args={[SCREEN_W + 0.09, SCREEN_H + 0.09, 0.06]} />
        <meshStandardMaterial color="#0e1526" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

Screen.propTypes = {
  project: PropTypes.object.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  index: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  glow: PropTypes.object.isRequired,
};

const Particles = ({ count = 900 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#fec544" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
};

Particles.propTypes = { count: PropTypes.number };

const Orb = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += delta * 0.03;
  });
  return (
    <group ref={ref} position={[0, 0.2, -3.2]}>
      <mesh>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial color="#fec544" wireframe transparent opacity={0.13} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#7c8cff" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

const Rig = ({ projects, onSelect }) => {
  const rig = useRef();
  const { viewport } = useThree();
  const glow = useGlowTexture();
  useEffect(() => () => glow.dispose(), [glow]);
  const wide = viewport.aspect > 1.25;
  const scale = Math.min(1, viewport.width / (wide ? 13.5 : 7.5));
  const offsetX = wide ? viewport.width * 0.25 : 0;

  useFrame(({ pointer }) => {
    const r = rig.current;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    r.rotation.y = THREE.MathUtils.lerp(r.rotation.y, pointer.x * 0.22 - scroll * 0.35, 0.05);
    r.rotation.x = THREE.MathUtils.lerp(r.rotation.x, -pointer.y * 0.12 + scroll * 0.15, 0.05);
    r.position.y = THREE.MathUtils.lerp(r.position.y, scroll * 1.6, 0.08);
  });

  const layout = [
    { position: [-2.05, 0.55, -0.7], rotation: [0, 0.5, 0] },
    { position: [0, -0.15, 0.35], rotation: [0, 0, 0] },
    { position: [2.05, 0.65, -0.7], rotation: [0, -0.5, 0] },
  ];

  return (
    <group position={[offsetX, 0, 0]} scale={scale}>
      <group ref={rig}>
        <Orb />
        {projects.slice(0, 3).map((project, i) => (
          <Screen key={project.slug} project={project} index={i} onSelect={onSelect} glow={glow} {...layout[i]} />
        ))}
      </group>
    </group>
  );
};

Rig.propTypes = {
  projects: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const Hero3D = ({ projects, onSelect, active = true }) => (
  <Canvas
    className="hero-canvas"
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 8], fov: 35 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    frameloop={active ? 'always' : 'never'}
  >
    <ambientLight intensity={0.6} />
    <pointLight position={[4, 3, 5]} intensity={40} color="#fec544" />
    <pointLight position={[-5, -2, 3]} intensity={25} color="#7c8cff" />
    <Particles />
    <Suspense fallback={null}>
      <Rig projects={projects} onSelect={onSelect} />
    </Suspense>
  </Canvas>
);

Hero3D.propTypes = {
  projects: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Hero3D;
