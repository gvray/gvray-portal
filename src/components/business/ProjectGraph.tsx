"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Timer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTheme } from "@/providers/ThemeProvider";
import { projects, buildLinks, categoryColors, categoryColorsLight } from "@/lib/projects";
import type { Project } from "@/lib/projects";


function createTextSprite(text: string, color: string, isDark: boolean): THREE.Sprite {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D not supported");

  const fontSize = 56;
  ctx.font = `500 ${fontSize}px "Geist Mono", monospace`;
  const metrics = ctx.measureText(text);
  const w = metrics.width + 48;
  const h = fontSize + 24;
  canvas.width = w;
  canvas.height = h;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Light theme: stronger shadow for contrast
  ctx.shadowColor = color;
  ctx.shadowBlur = isDark ? 16 : 24;
  ctx.fillStyle = color;
  ctx.fillText(text, w / 2, h / 2);

  ctx.shadowBlur = 0;
  ctx.fillStyle = isDark ? "#e0e0e8" : "#1a1a24";
  ctx.fillText(text, w / 2, h / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(w / 35, h / 35, 1);
  return sprite;
}

function getMouseNDC(e: MouseEvent, container: HTMLElement): THREE.Vector2 {
  const rect = container.getBoundingClientRect();
  const cw = rect.width || container.offsetWidth;
  const ch = rect.height || container.offsetHeight;
  return new THREE.Vector2(
    ((e.clientX - rect.left) / cw) * 2 - 1,
    -((e.clientY - rect.top) / ch) * 2 + 1,
  );
}

export default function ProjectGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = isDark ? categoryColors : categoryColorsLight;
    const linkColor = isDark ? 0x00f0ff : 0x0066ff;
    const ambientColor = isDark ? 0x00f0ff : 0x0066ff;
    const dustColor = 0xff006e;
    const fogColor = isDark ? 0x0a0a0f : 0xeef0f2;
    const linkOpacity = isDark ? 0.12 : 0.22;
    const ambientOpacity = isDark ? 0.5 : 0.7;
    const dustOpacity = isDark ? 0.25 : 0.45;
    const glowOpacity = isDark ? 0.12 : 0.18;
    const haloOpacity = isDark ? 0.04 : 0.08;
    const ringOpacity = isDark ? 0.3 : 0.45;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(fogColor, 0.012);

    const w = container.offsetWidth;
    const h = Math.max(container.offsetHeight, 200);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    camera.position.set(0, 1, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controls.enablePan = false;
    container.style.cursor = "grab";

    controls.addEventListener("start", () => {
      container.style.cursor = "grabbing";
    });
    controls.addEventListener("end", () => {
      container.style.cursor = "grab";
    });

    const colorMap: Record<Project["category"], THREE.Color> = {
      frontend: new THREE.Color(colors.frontend),
      backend: new THREE.Color(colors.backend),
      tool: new THREE.Color(colors.tool),
      ai: new THREE.Color(colors.ai),
      other: new THREE.Color(colors.other),
    };

    // === NODES ===
    const nodeGroup = new THREE.Group();
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeLabels: THREE.Sprite[] = [];
    const nodeData: {
      project: (typeof projects)[0];
      mesh: THREE.Mesh;
      hitBox: THREE.Mesh;
      label: THREE.Sprite;
      glow: THREE.Mesh;
      halo: THREE.Mesh;
      ring: THREE.Mesh;
    }[] = [];

    projects.forEach((project, i) => {
      const color = colorMap[project.category];
      const radius = 0.22;

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 32, 32),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 }),
      );

      const phi = Math.acos(-1 + (2 * i) / projects.length);
      const theta = Math.sqrt(projects.length * Math.PI) * phi;
      const r = 14 + Math.random() * 10;

      mesh.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi) * 0.5,
        r * Math.cos(phi),
      );

      // Glow + Halo + Ring
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.54, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: glowOpacity, depthWrite: false }),
      );
      mesh.add(glow);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 2.8, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: haloOpacity, depthWrite: false }),
      );
      mesh.add(halo);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius * 1.26, radius * 1.4, 64),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: ringOpacity, side: THREE.DoubleSide, depthWrite: false }),
      );
      // 倾斜 ring 让它有土星环的 3D 透视感
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.6;
      ring.rotation.z = (Math.random() - 0.5) * 0.4;
      mesh.add(ring);

      // Label
      const label = createTextSprite(project.name, colors[project.category], isDark);
      label.position.set(0, radius + 0.85, 0);
      mesh.add(label);
      nodeLabels.push(label);

      // Invisible hit box for easier raycasting interaction
      const hitBox = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 4, 16, 16),
        new THREE.MeshBasicMaterial({ visible: false }),
      );
      mesh.add(hitBox);

      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodeMeshes.push(hitBox);
      nodeData.push({ project, mesh, hitBox, label, glow, halo, ring });
    });

    scene.add(nodeGroup);

    // === LINKS ===
    const rawLinks = buildLinks(projects);
    const linkGroup = new THREE.Group();

    rawLinks.forEach((link) => {
      const a = nodeData.find((n) => n.project.id === link.source);
      const b = nodeData.find((n) => n.project.id === link.target);
      if (!a || !b) return;

      const curve = new THREE.QuadraticBezierCurve3(
        a.mesh.position.clone(),
        a.mesh.position.clone().add(b.mesh.position).multiplyScalar(0.5).add(
          new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3),
        ),
        b.mesh.position.clone(),
      );

      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
      const mat = new THREE.LineBasicMaterial({ color: linkColor, transparent: true, opacity: linkOpacity, depthWrite: false });
      linkGroup.add(new THREE.Line(geo, mat));
    });

    scene.add(linkGroup);

    // === PARTICLES ===
    const particles = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 2500 }, () => {
          const r = 12 + Math.random() * 40;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          return new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi),
          );
        }),
      ),
      new THREE.PointsMaterial({ color: ambientColor, size: 0.12, transparent: true, opacity: ambientOpacity, sizeAttenuation: true, depthWrite: false }),
    );
    scene.add(particles);

    // === DUST ===
    const dust = new THREE.Points(
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: 800 }, () =>
          new THREE.Vector3((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80),
        ),
      ),
      new THREE.PointsMaterial({ color: dustColor, size: 0.08, transparent: true, opacity: dustOpacity, sizeAttenuation: true, depthWrite: false }),
    );
    scene.add(dust);

    // === RAYCASTER ===
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);
    let hovered: THREE.Mesh | null = null;

    const findNodeData = (object: THREE.Object3D) =>
      nodeData.find((n) => n.mesh === object || n.hitBox === object) || null;

    const onMouseMove = (e: MouseEvent) => {
      mouse.copy(getMouseNDC(e, container));

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);

      if (hits.length > 0) {
        const data = findNodeData(hits[0].object);
        const targetMesh = data?.mesh ?? null;
        if (targetMesh && hovered !== targetMesh) {
          if (hovered) hovered.scale.set(1, 1, 1);
          hovered = targetMesh;
          targetMesh.scale.set(2, 2, 2);
        }
        controls.autoRotate = false;
        container.style.cursor = "pointer";
      } else {
        if (hovered) {
          hovered.scale.set(1, 1, 1);
          hovered = null;
        }
        controls.autoRotate = true;
        container.style.cursor = "grab";
      }
    };

    const onClick = (e: MouseEvent) => {
      mouse.copy(getMouseNDC(e, container));

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(nodeMeshes);

      if (hits.length > 0) {
        const data = findNodeData(hits[0].object);
        if (data) window.open(data.project.githubUrl, "_blank");
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);

    // === ANIMATION ===
    let frame: number;
    const timer = new Timer();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      particles.rotation.y += 0.0003;
      dust.rotation.y -= 0.0002;

      nodeData.forEach((n, i) => {
        n.mesh.position.y += Math.sin(t * 0.5 + i * 1.5) * 0.003;
      });

      linkGroup.children.forEach((child, i) => {
        const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = (isDark ? 0.08 : 0.15) + Math.sin(t * 1.5 + i) * (isDark ? 0.04 : 0.07);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // === RESIZE ===
    const handleResize = () => {
      const w = container.offsetWidth;
      const h = Math.max(container.offsetHeight, 200);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isDark]);

  return (
    <div ref={containerRef} className="project-graph relative flex-1 min-h-[420px]" style={{ cursor: "grab" }} />
  );
}
