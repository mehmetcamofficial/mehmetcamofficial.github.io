/* Digital Mehmet V2 — Three.js avatar renderer
   Progressive enhancement: procedural 3D avatar now, optional rigged GLB later. */
import * as THREE from "https://esm.sh/three@0.180.0";
import { GLTFLoader } from "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

const MODEL_CLIP_HINTS = {
  idle: ["idle", "breathing", "stand"],
  thinking: ["thinking", "think"],
  speaking: ["talk", "talking", "speaking", "gesture"],
  paused: ["idle", "stand"]
};

const MORPH_HINTS = {
  mouth: ["mouthopen", "jawopen", "aa", "viseme_aa"],
  blinkLeft: ["blinkleft", "eyeblinkleft"],
  blinkRight: ["blinkright", "eyeblinkright"]
};

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const norm = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

class ProceduralAvatar {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.root.name = "DigitalMehmetProcedural";
    this.scene.add(this.root);

    this.skin = new THREE.MeshStandardMaterial({ color: 0xd6a17f, roughness: 0.68, metalness: 0.03 });
    this.suit = new THREE.MeshStandardMaterial({ color: 0x26384f, roughness: 0.58, metalness: 0.08 });
    this.suitDark = new THREE.MeshStandardMaterial({ color: 0x142235, roughness: 0.62, metalness: 0.06 });
    this.shirt = new THREE.MeshStandardMaterial({ color: 0xe9eef5, roughness: 0.76 });
    this.hair = new THREE.MeshStandardMaterial({ color: 0x17191d, roughness: 0.82 });
    this.eye = new THREE.MeshStandardMaterial({ color: 0x101820, roughness: 0.45 });
    this.mouthMat = new THREE.MeshStandardMaterial({ color: 0x4d1e22, roughness: 0.75 });

    this.leftArm = new THREE.Group();
    this.rightArm = new THREE.Group();
    this.leftForearm = new THREE.Group();
    this.rightForearm = new THREE.Group();
    this.head = new THREE.Group();
    this.torso = new THREE.Group();
    this.mouth = null;
    this.leftEye = null;
    this.rightEye = null;

    this.build();
    this.root.position.set(0, -1.82, 0);
    this.root.rotation.y = -0.06;
  }

  mesh(geometry, material, position, scale = [1,1,1]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  build() {
    const torsoBody = this.mesh(new THREE.CylinderGeometry(0.7, 0.58, 1.72, 20), this.suit, [0, 1.55, 0], [0.82, 1, 0.52]);
    torsoBody.rotation.z = Math.PI;
    this.torso.add(torsoBody);

    const shirtPanel = this.mesh(new THREE.BoxGeometry(0.42, 1.18, 0.08), this.shirt, [0, 1.72, 0.39], [1,1,1]);
    shirtPanel.rotation.x = -0.04;
    this.torso.add(shirtPanel);

    const tie = this.mesh(new THREE.ConeGeometry(0.11, 0.62, 4), this.suitDark, [0, 1.63, 0.445], [1,1,0.48]);
    tie.rotation.z = Math.PI;
    this.torso.add(tie);

    const lapelGeo = new THREE.BufferGeometry();
    lapelGeo.setAttribute("position", new THREE.Float32BufferAttribute([
      0,0,0, 0.42,0.58,0, 0.14,0.92,0,
      0,0,0, -0.42,0.58,0, -0.14,0.92,0
    ], 3));
    lapelGeo.computeVertexNormals();
    const lapel = new THREE.Mesh(lapelGeo, this.suitDark);
    lapel.position.set(0, 1.34, 0.455);
    lapel.castShadow = true;
    this.torso.add(lapel);

    const neck = this.mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.3, 16), this.skin, [0, 2.56, 0]);
    this.torso.add(neck);
    this.root.add(this.torso);

    this.head.position.set(0, 2.98, 0);
    const face = this.mesh(new THREE.SphereGeometry(0.43, 30, 22), this.skin, [0,0,0], [0.96,1.08,0.88]);
    this.head.add(face);

    const hairCap = this.mesh(new THREE.SphereGeometry(0.45, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.47), this.hair, [0, 0.13, -0.025], [1.02,0.92,0.92]);
    this.head.add(hairCap);

    const browGeo = new THREE.BoxGeometry(0.15, 0.022, 0.025);
    const browLeft = this.mesh(browGeo, this.hair, [-0.16, 0.09, 0.365], [1,1,1]);
    const browRight = this.mesh(browGeo, this.hair, [0.16, 0.09, 0.365], [1,1,1]);
    browLeft.rotation.z = -0.08;
    browRight.rotation.z = 0.08;
    this.head.add(browLeft, browRight);

    const eyeGeo = new THREE.SphereGeometry(0.04, 16, 10);
    this.leftEye = this.mesh(eyeGeo, this.eye, [-0.16, 0.01, 0.38], [1.12,0.62,0.48]);
    this.rightEye = this.mesh(eyeGeo, this.eye, [0.16, 0.01, 0.38], [1.12,0.62,0.48]);
    this.head.add(this.leftEye, this.rightEye);

    const nose = this.mesh(new THREE.ConeGeometry(0.045, 0.18, 10), this.skin, [0,-0.07,0.415], [1,1,0.8]);
    nose.rotation.x = Math.PI / 2;
    this.head.add(nose);

    this.mouth = this.mesh(new THREE.BoxGeometry(0.18, 0.03, 0.025), this.mouthMat, [0,-0.21,0.39], [1,1,1]);
    this.head.add(this.mouth);

    const earGeo = new THREE.SphereGeometry(0.085, 14, 10);
    this.head.add(
      this.mesh(earGeo, this.skin, [-0.42,-0.02,-0.015], [0.72,1,0.55]),
      this.mesh(earGeo, this.skin, [0.42,-0.02,-0.015], [0.72,1,0.55])
    );

    this.root.add(this.head);

    this.buildArm(this.leftArm, this.leftForearm, -1);
    this.buildArm(this.rightArm, this.rightForearm, 1);
    this.root.add(this.leftArm, this.rightArm);

    const belt = this.mesh(new THREE.CylinderGeometry(0.53,0.53,0.12,18), this.suitDark, [0,0.63,0], [0.86,1,0.56]);
    this.root.add(belt);
  }

  buildArm(upper, lower, side) {
    upper.position.set(side * 0.63, 2.23, 0);
    upper.rotation.z = side * -0.14;

    const upperMesh = this.mesh(new THREE.CylinderGeometry(0.14,0.13,0.94,14), this.suit, [0,-0.43,0], [0.92,1,0.74]);
    upper.add(upperMesh);

    lower.position.set(0,-0.9,0);
    const lowerMesh = this.mesh(new THREE.CylinderGeometry(0.12,0.1,0.82,14), this.suit, [0,-0.37,0], [0.9,1,0.72]);
    lower.add(lowerMesh);

    const hand = this.mesh(new THREE.SphereGeometry(0.12,16,12), this.skin, [0,-0.82,0], [0.86,1.1,0.72]);
    lower.add(hand);

    upper.add(lower);
  }

  update(state, time, reducedMotion) {
    if (reducedMotion) {
      this.mouth.scale.y = 1;
      this.leftEye.scale.y = 0.62;
      this.rightEye.scale.y = 0.62;
      return;
    }

    const breathe = Math.sin(time * 1.7) * 0.012;
    this.torso.scale.y = 1 + breathe;
    this.head.position.y = 2.98 + Math.sin(time * 1.15) * 0.012;
    this.head.rotation.y = Math.sin(time * 0.63) * 0.035;
    this.head.rotation.z = Math.sin(time * 0.47) * 0.012;

    const blinkCycle = time % 4.7;
    const blink = blinkCycle > 4.47 ? Math.max(0.08, 1 - Math.sin(((blinkCycle - 4.47) / 0.23) * Math.PI)) : 1;
    this.leftEye.scale.y = 0.62 * blink;
    this.rightEye.scale.y = 0.62 * blink;

    if (state === "speaking") {
      const talk = 0.55 + Math.abs(Math.sin(time * 10.5)) * 1.4;
      this.mouth.scale.y = talk;
      this.mouth.scale.x = 1 + Math.sin(time * 7.2) * 0.08;
      this.head.rotation.x = Math.sin(time * 2.1) * 0.025;
      this.rightArm.rotation.z = -0.28 + Math.sin(time * 2.4) * 0.12;
      this.rightArm.rotation.x = 0.1 + Math.sin(time * 1.7) * 0.08;
      this.rightForearm.rotation.z = 0.34 + Math.sin(time * 2.8) * 0.2;
      this.leftArm.rotation.z = 0.18 + Math.sin(time * 1.9 + 1.2) * 0.06;
      this.leftForearm.rotation.z = -0.12 + Math.sin(time * 2.3) * 0.08;
    } else if (state === "thinking") {
      this.mouth.scale.y = 0.72;
      this.head.rotation.y = -0.16 + Math.sin(time * 0.9) * 0.02;
      this.head.rotation.x = -0.05;
      this.rightArm.rotation.z = -0.62;
      this.rightArm.rotation.x = -0.18;
      this.rightForearm.rotation.z = 1.08;
      this.leftArm.rotation.z = 0.13;
      this.leftForearm.rotation.z = -0.08;
    } else if (state === "paused") {
      this.mouth.scale.y = 0.55;
      this.rightArm.rotation.z *= 0.94;
      this.leftArm.rotation.z *= 0.94;
    } else {
      this.mouth.scale.y = 0.58;
      this.mouth.scale.x = 1;
      this.rightArm.rotation.z = -0.14 + Math.sin(time * 0.72) * 0.018;
      this.rightArm.rotation.x = Math.sin(time * 0.55) * 0.014;
      this.rightForearm.rotation.z = Math.sin(time * 0.61) * 0.025;
      this.leftArm.rotation.z = 0.14 + Math.sin(time * 0.68 + 0.9) * 0.018;
      this.leftForearm.rotation.z = Math.sin(time * 0.57 + 0.5) * 0.025;
    }
  }
}

class GLBAvatar {
  constructor(scene, gltf) {
    this.scene = scene;
    this.gltf = gltf;
    this.root = gltf.scene;
    this.scene.add(this.root);
    this.mixer = new THREE.AnimationMixer(this.root);
    this.actions = new Map();
    this.currentAction = null;
    this.morphTargets = [];
    this.indexAnimations();
    this.indexMorphTargets();
    this.fit();
  }

  fit() {
    const box = new THREE.Box3().setFromObject(this.root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const height = Math.max(size.y, 0.001);
    const scale = 3.55 / height;
    this.root.scale.setScalar(scale);
    this.root.position.x -= center.x * scale;
    this.root.position.y -= box.min.y * scale + 1.8;
    this.root.position.z -= center.z * scale;
  }

  indexAnimations() {
    for (const clip of this.gltf.animations || []) {
      const name = norm(clip.name);
      this.actions.set(name, this.mixer.clipAction(clip));
    }
  }

  indexMorphTargets() {
    this.root.traverse((object) => {
      if (!object.morphTargetDictionary || !object.morphTargetInfluences) return;
      this.morphTargets.push(object);
    });
  }

  findAction(state) {
    const hints = MODEL_CLIP_HINTS[state] || MODEL_CLIP_HINTS.idle;
    for (const [name, action] of this.actions) {
      if (hints.some((hint) => name.includes(norm(hint)))) return action;
    }
    return this.actions.values().next().value || null;
  }

  playState(state) {
    const next = this.findAction(state);
    if (!next || next === this.currentAction) return;
    next.reset().fadeIn(0.28).play();
    if (this.currentAction) this.currentAction.fadeOut(0.28);
    this.currentAction = next;
  }

  setMorph(hints, value) {
    for (const mesh of this.morphTargets) {
      for (const [name, index] of Object.entries(mesh.morphTargetDictionary)) {
        if (hints.some((hint) => norm(name).includes(norm(hint)))) {
          mesh.morphTargetInfluences[index] = clamp01(value);
        }
      }
    }
  }

  update(state, time, delta, reducedMotion) {
    this.playState(state);
    if (!reducedMotion) this.mixer.update(delta);

    const mouth = state === "speaking"
      ? 0.22 + Math.abs(Math.sin(time * 10.8)) * 0.68
      : state === "thinking" ? 0.08 : 0.02;
    this.setMorph(MORPH_HINTS.mouth, mouth);

    const blinkCycle = time % 4.7;
    const blink = reducedMotion ? 0 : (blinkCycle > 4.48 ? Math.sin(((blinkCycle - 4.48) / 0.22) * Math.PI) : 0);
    this.setMorph(MORPH_HINTS.blinkLeft, blink);
    this.setMorph(MORPH_HINTS.blinkRight, blink);
  }
}

class DigitalMehmet3D {
  constructor(root, stage) {
    this.root = root;
    this.stage = stage;
    this.state = root.dataset.state || "idle";
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.clock = new THREE.Clock();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.avatar = null;
    this.canvas = null;
    this.resizeObserver = null;
    this.frame = null;
  }

  async init() {
    if (!this.canUseWebGL()) return false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    this.camera.position.set(0, 1.25, 7.1);
    this.camera.lookAt(0, 1.1, 0);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.canvas = this.renderer.domElement;
    this.canvas.className = "dm-3d-canvas";
    this.canvas.setAttribute("aria-hidden", "true");
    this.stage.prepend(this.canvas);

    this.addLighting();
    this.addPlatform();

    const modelUrl = this.root.dataset.modelUrl;
    this.avatar = modelUrl ? await this.tryLoadModel(modelUrl) : null;
    if (!this.avatar) this.avatar = new ProceduralAvatar(this.scene);

    this.root.dataset.avatarMode = this.avatar instanceof GLBAvatar ? "glb" : "procedural";
    this.root.classList.add("dm-3d-ready");

    this.bind();
    this.resize();
    this.animate();
    return true;
  }

  canUseWebGL() {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      return false;
    }
  }

  addLighting() {
    const hemi = new THREE.HemisphereLight(0xdceeff, 0x162236, 2.3);
    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(3.2, 5.6, 5.2);
    key.castShadow = true;

    const rim = new THREE.PointLight(0x4d7cff, 11, 9, 2);
    rim.position.set(-2.8, 2.8, 2.2);

    const fill = new THREE.PointLight(0x55d8ff, 5.5, 8, 2);
    fill.position.set(2.6, 1.4, 1.6);

    this.scene.add(hemi, key, rim, fill);
  }

  addPlatform() {
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x15243a,
      roughness: 0.35,
      metalness: 0.72,
      emissive: 0x071a32,
      emissiveIntensity: 0.75
    });
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.34, 0.14, 48), platformMat);
    platform.position.y = -1.82;
    platform.receiveShadow = true;
    this.scene.add(platform);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0x4d7cff, transparent: true, opacity: 0.58 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.018, 8, 72), ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.74;
    this.scene.add(ring);
  }

  async tryLoadModel(url) {
    try {
      const loader = new GLTFLoader();
      const gltf = await loader.loadAsync(url);
      return new GLBAvatar(this.scene, gltf);
    } catch (error) {
      console.warn("Digital Mehmet GLB unavailable, using procedural avatar:", error);
      return null;
    }
  }

  bind() {
    document.addEventListener("digital-mehmet:state", (event) => {
      this.state = event.detail?.state || this.root.dataset.state || "idle";
    });

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener?.("change", (event) => {
      this.reducedMotion = event.matches;
    });

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.stage);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (this.frame) cancelAnimationFrame(this.frame);
        this.frame = null;
      } else if (!this.frame) {
        this.clock.getDelta();
        this.animate();
      }
    });
  }

  resize() {
    if (!this.renderer || !this.camera) return;
    const rect = this.stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate = () => {
    const delta = Math.min(this.clock.getDelta(), 0.05);
    const time = this.clock.elapsedTime;
    this.avatar?.update(this.state, time, delta, this.reducedMotion);
    this.renderer.render(this.scene, this.camera);
    this.frame = requestAnimationFrame(this.animate);
  };
}

async function mount3D() {
  const root = document.querySelector("[data-digital-mehmet]");
  const stage = root?.querySelector("[data-dm-avatar]");
  if (!root || !stage || root.dataset.threeMounted === "true") return;

  root.dataset.threeMounted = "true";
  const experience = new DigitalMehmet3D(root, stage);
  const ok = await experience.init();
  if (ok) window.digitalMehmet3D = experience;
}

function boot() {
  if (document.querySelector("[data-digital-mehmet]")) {
    mount3D();
    return;
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector("[data-digital-mehmet]")) {
      observer.disconnect();
      mount3D();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

boot();
