import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js';
import { Smartphone, Sparkles } from 'lucide-react';

interface BadgeDefinition {
  id: string;
  name: string;
  type: 'rectangle' | 'circle';
  width: number;
  height: number;
  radius?: number;
  initialX: number; // percentage of container width
  initialY: number; // percentage of container height
  initialAngle: number; // radians
  renderContent: (isGrabbed: boolean) => React.ReactNode;
}

export const FooterPhysicsBadges: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const isReducedMotionRef = useRef<boolean>(false);

  const [hasIOSPermission, setHasIOSPermission] = useState<boolean | null>(null);
  const [needsIOSPermission, setNeedsIOSPermission] = useState<boolean>(false);
  const [isPhysicsActive, setIsPhysicsActive] = useState<boolean>(true);
  const [activeGrabbedIndex, setActiveGrabbedIndex] = useState<number | null>(null);
  const lastShakeTimeRef = useRef<number>(0);
  const lastAccRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  // Badge definitions matching the existing visual art and proportions
  const badgeConfigs: BadgeDefinition[] = [
    {
      id: 'human-badge',
      name: 'Human',
      type: 'rectangle',
      width: 170,
      height: 62,
      initialX: 0.18,
      initialY: 0.35,
      initialAngle: -0.12,
      renderContent: () => (
        <svg viewBox="0 0 160 70" className="w-44 sm:w-52 md:w-56 h-18 sm:h-22 md:h-24 drop-shadow-[5px_5px_0px_#052518] pointer-events-none">
          <path
            d="M 10 20 Q 35 5 75 15 Q 125 5 150 18 L 142 55 Q 115 65 75 52 Q 35 65 8 50 Z"
            fill="#FF6B4A"
            stroke="#093624"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <text
            x="80"
            y="43"
            textAnchor="middle"
            className="font-display font-black text-[21px] sm:text-[23px] md:text-[24px] fill-[#093624] tracking-wide uppercase select-none"
          >
            Human
          </text>
        </svg>
      )
    },
    {
      id: 'founder-led-badge',
      name: 'Founder-Led',
      type: 'circle',
      width: 110,
      height: 110,
      radius: 46,
      initialX: 0.40,
      initialY: 0.45,
      initialAngle: 0.08,
      renderContent: () => (
        <svg viewBox="0 0 110 110" className="w-28 sm:w-34 md:w-38 h-28 sm:h-34 md:h-38 drop-shadow-[5px_5px_0px_#052518] pointer-events-none">
          <path
            d="M 55 5 
               C 62 5, 68 12, 75 10 
               C 82 8, 90 14, 95 20 
               C 100 26, 104 35, 105 42 
               C 106 50, 102 58, 100 65 
               C 98 72, 94 80, 88 85 
               C 82 90, 74 92, 67 95 
               C 60 98, 52 98, 45 95 
               C 38 92, 30 90, 24 85 
               C 18 80, 14 72, 12 65 
               C 10 58, 6 50, 7 42 
               C 8 35, 12 26, 17 20 
               C 22 14, 30 8, 37 10 
               C 44 12, 50 5, 55 5 Z"
            fill="#F7F4E9"
            stroke="#093624"
            strokeWidth="2.5"
          />
          <text
            x="55"
            y="50"
            textAnchor="middle"
            className="font-display font-black text-[12.5px] sm:text-[13.5px] md:text-[14.5px] fill-[#093624] tracking-wider uppercase leading-tight select-none"
          >
            Founder
          </text>
          <text
            x="55"
            y="67"
            textAnchor="middle"
            className="font-display font-black text-[12.5px] sm:text-[13.5px] md:text-[14.5px] fill-[#093624] tracking-wider uppercase leading-tight select-none"
          >
            -Led
          </text>
        </svg>
      )
    },
    {
      id: 'revenue-badge',
      name: 'Revenue',
      type: 'rectangle',
      width: 170,
      height: 68,
      initialX: 0.62,
      initialY: 0.32,
      initialAngle: -0.15,
      renderContent: () => (
        <svg viewBox="0 0 160 80" className="w-44 sm:w-52 md:w-56 h-20 sm:h-24 md:h-26 drop-shadow-[5px_5px_0px_#052518] pointer-events-none">
          <polygon
            points="10,15 150,5 142,65 15,75"
            fill="#CBDA46"
            stroke="#093624"
            strokeWidth="2.5"
          />
          <text
            x="80"
            y="48"
            textAnchor="middle"
            className="font-display font-black text-[18px] sm:text-[20px] md:text-[21px] fill-[#093624] tracking-wider uppercase select-none"
          >
            Revenue
          </text>
        </svg>
      )
    },
    {
      id: 'high-intent-badge',
      name: 'High-Intent',
      type: 'circle',
      width: 120,
      height: 120,
      radius: 48,
      initialX: 0.84,
      initialY: 0.40,
      initialAngle: 0.22,
      renderContent: () => (
        <svg viewBox="0 0 120 120" className="w-30 sm:w-38 md:w-42 h-30 sm:h-38 md:h-42 drop-shadow-[5px_5px_0px_#052518] pointer-events-none">
          <polygon
            points="
              60,5 68,22 86,14 88,33 107,33 100,51 115,60 100,69 
              107,87 88,87 86,106 68,98 60,115 52,98 34,106 32,87 
              13,87 20,69 5,60 20,51 13,33 32,33 34,14 52,22
            "
            fill="#EEF2CC"
            stroke="#093624"
            strokeWidth="2.2"
            strokeDasharray="3 2"
          />
          <text
            x="60"
            y="55"
            textAnchor="middle"
            className="font-display font-black text-[11.5px] sm:text-[12.5px] md:text-[13.5px] fill-[#093624] tracking-wider uppercase select-none"
          >
            High
          </text>
          <text
            x="60"
            y="71"
            textAnchor="middle"
            className="font-display font-black text-[11.5px] sm:text-[12.5px] md:text-[13.5px] fill-[#093624] tracking-wider uppercase select-none"
          >
            -Intent
          </text>
        </svg>
      )
    }
  ];

  // Check iOS permission requirements
  useEffect(() => {
    try {
      const isIOS = typeof window !== 'undefined' && 
        (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

      if (isIOS && typeof (window as any).DeviceOrientationEvent !== 'undefined' && 
          typeof (window as any).DeviceOrientationEvent.requestPermission === 'function') {
        setNeedsIOSPermission(true);
      }
    } catch {
      // Ignore sandbox/iframe restrictions
    }
  }, []);

  // Request iOS device motion permission on user tap
  const requestMotionPermission = async () => {
    try {
      if (typeof (window as any).DeviceOrientationEvent !== 'undefined' &&
          typeof (window as any).DeviceOrientationEvent.requestPermission === 'function') {
        const response = await (window as any).DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setHasIOSPermission(true);
          setNeedsIOSPermission(false);
        } else {
          setHasIOSPermission(false);
        }
      }
    } catch (err) {
      setHasIOSPermission(false);
    }
  };

  // Shake burst effect: scatter badges with a playful impulse
  const triggerShakeScatter = useCallback(() => {
    if (!bodiesRef.current || bodiesRef.current.length === 0) return;
    bodiesRef.current.forEach((body) => {
      const impulseX = (Math.random() - 0.5) * 16;
      const impulseY = -(Math.random() * 14 + 6);
      Matter.Body.setVelocity(body, {
        x: body.velocity.x + impulseX,
        y: body.velocity.y + impulseY
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.35);
    });
  }, []);

  // Set up Matter.js physics simulation
  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        isReducedMotionRef.current = true;
        setIsPhysicsActive(false);
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    const {
      Engine,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Events,
      Composite
    } = Matter;

    // Create physics engine
    const engine = Engine.create({
      gravity: {
        x: 0,
        y: 0.9,
        scale: 0.001
      }
    });
    engineRef.current = engine;
    const world = engine.world;

    let containerWidth = container.clientWidth || 800;
    let containerHeight = container.clientHeight || 240;

    // Function to construct or update static bounding walls (Floor, Left, Right, Ceiling)
    const wallThickness = 120;
    const createWalls = (w: number, h: number) => {
      // Remove old walls if any
      if (wallsRef.current.length > 0) {
        Composite.remove(world, wallsRef.current);
        wallsRef.current = [];
      }

      const wallOpts = {
        isStatic: true,
        restitution: 0.3,
        friction: 0.4
      };

      const floor = Bodies.rectangle(w / 2, h + wallThickness / 2, w * 2, wallThickness, wallOpts);
      const ceiling = Bodies.rectangle(w / 2, -wallThickness / 2, w * 2, wallThickness, wallOpts);
      const leftWall = Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h * 2, wallOpts);
      const rightWall = Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h * 2, wallOpts);

      const newWalls = [floor, ceiling, leftWall, rightWall];
      wallsRef.current = newWalls;
      World.add(world, newWalls);
    };

    createWalls(containerWidth, containerHeight);

    // Responsive scaling factor based on container width
    const scaleFactor = containerWidth < 640 ? 0.8 : containerWidth < 1024 ? 0.92 : 1;

    // Create dynamic badge bodies
    const newBodies: Matter.Body[] = [];
    badgeConfigs.forEach((cfg) => {
      const x = containerWidth * cfg.initialX;
      const y = containerHeight * cfg.initialY;
      const bodyOptions: Matter.IBodyDefinition = {
        friction: 0.3,
        frictionAir: 0.025,
        restitution: 0.42,
        density: 0.0015,
        angle: cfg.initialAngle
      };

      let body: Matter.Body;
      if (cfg.type === 'circle' && cfg.radius) {
        body = Bodies.circle(x, y, cfg.radius * scaleFactor, bodyOptions);
      } else {
        body = Bodies.rectangle(
          x,
          y,
          cfg.width * scaleFactor,
          cfg.height * scaleFactor,
          {
            ...bodyOptions,
            chamfer: { radius: 16 * scaleFactor }
          }
        );
      }

      newBodies.push(body);
    });

    bodiesRef.current = newBodies;
    World.add(world, newBodies);

    // Mouse Constraint for direct grab-and-fling (desktop only to prevent mobile scroll hijacking)
    const isMobileDevice = typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768);
    if (!isMobileDevice) {
      const mouse = Mouse.create(container);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });
      mouseConstraintRef.current = mouseConstraint;
      World.add(world, mouseConstraint);

      // Keep track of which badge is currently being dragged
      Events.on(mouseConstraint, 'startdrag', (evt: any) => {
        const draggedBody = evt.body;
        const index = bodiesRef.current.indexOf(draggedBody);
        if (index !== -1) {
          setActiveGrabbedIndex(index);
        }
      });

      Events.on(mouseConstraint, 'enddrag', () => {
        setActiveGrabbedIndex(null);
      });
    }

    // Proximity Nudge: gently repel badges when the mouse moves nearby
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !bodiesRef.current.length) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Only apply if mouse is inside or immediately around the container
      if (
        mouseX < -30 ||
        mouseX > rect.width + 30 ||
        mouseY < -30 ||
        mouseY > rect.height + 30
      ) {
        return;
      }

      const proximityRadius = 140;
      const maxForce = 0.008;

      bodiesRef.current.forEach((body) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < proximityRadius) {
          // Stronger force the closer the mouse is
          const normalizedDist = 1 - dist / proximityRadius;
          const forceMagnitude = normalizedDist * maxForce;
          const fx = (dx / dist) * forceMagnitude;
          const fy = (dy / dist) * forceMagnitude;

          Matter.Body.applyForce(body, body.position, { x: fx, y: fy });
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Sync loop: update DOM element transforms on every frame
    let animId: number;
    const updateTransforms = () => {
      if (isVisibleRef.current) {
        bodiesRef.current.forEach((body, idx) => {
          const badgeEl = badgeRefs.current[idx];
          if (badgeEl) {
            const { x, y } = body.position;
            const angle = body.angle;
            badgeEl.style.transform = `translate3d(${x}px, ${y}px, 0px) translate(-50%, -50%) rotate(${angle}rad)`;
          }
        });
      }
      animId = requestAnimationFrame(updateTransforms);
    };
    animId = requestAnimationFrame(updateTransforms);

    // Create and start Runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // IntersectionObserver to only compute physics when section is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (runnerRef.current && engineRef.current) {
              runnerRef.current.enabled = true;
            }
          } else {
            if (runnerRef.current) {
              runnerRef.current.enabled = false;
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // ResizeObserver to update walls dynamically
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          createWalls(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      resizeObserver.disconnect();
      if (runnerRef.current) Runner.stop(runnerRef.current);
      if (engineRef.current) {
        World.clear(engineRef.current.world, false);
        Engine.clear(engineRef.current);
      }
    };
  }, []);

  // Device orientation (tilt) & Device motion (shake) handlers for mobile
  useEffect(() => {
    if (isReducedMotionRef.current) return;

    // Handle orientation/tilt -> map to gravity
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!engineRef.current) return;

      const gamma = e.gamma; // [-90, 90] left-right tilt
      const beta = e.beta;   // [-180, 180] front-back tilt

      if (gamma === null || beta === null) return;

      // Clamp and map tilt angles into gravity vectors
      // When phone is tilted right (+gamma), gravity pulls right
      // When phone is tilted forward/up (+beta), gravity pulls down/up
      const targetGravityX = Math.max(-1.8, Math.min(1.8, gamma / 30));
      const targetGravityY = Math.max(-1.8, Math.min(1.8, beta / 35));

      engineRef.current.world.gravity.x = targetGravityX;
      engineRef.current.world.gravity.y = targetGravityY;
    };

    // Handle motion/shake detection
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.acceleration || e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const curX = acc.x;
      const curY = acc.y;
      const curZ = acc.z;

      const deltaX = Math.abs(curX - lastAccRef.current.x);
      const deltaY = Math.abs(curY - lastAccRef.current.y);
      const deltaZ = Math.abs(curZ - lastAccRef.current.z);

      const shakeMagnitude = deltaX + deltaY + deltaZ;
      const now = Date.now();

      // Detect shake above threshold (e.g. > 18) with a 600ms debounce
      if (shakeMagnitude > 18 && now - lastShakeTimeRef.current > 600) {
        lastShakeTimeRef.current = now;
        triggerShakeScatter();
      }

      lastAccRef.current = { x: curX, y: curY, z: curZ };
    };

    try {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
      window.addEventListener('devicemotion', handleMotion, { passive: true });
    } catch {
      // Ignore if iframe policy blocks orientation
    }

    return () => {
      try {
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('devicemotion', handleMotion);
      } catch {
        // Ignore
      }
    };
  }, [triggerShakeScatter]);

  // Reduced motion or fallback rendering
  if (!isPhysicsActive) {
    return (
      <div className="relative pt-6 pb-12 sm:pb-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 select-none">
        {badgeConfigs.map((cfg) => (
          <div key={cfg.id} className="relative transition-transform duration-300">
            {cfg.renderContent(false)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full my-3 select-none">
      {/* Invisible Physics Play Area Container */}
      <div
        id="footer-badges-physics-box"
        ref={containerRef}
        className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden cursor-grab active:cursor-grabbing touch-none z-10"
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
        onClick={needsIOSPermission ? requestMotionPermission : undefined}
      >
        {badgeConfigs.map((cfg, index) => (
          <div
            key={cfg.id}
            id={cfg.id}
            ref={(el) => { badgeRefs.current[index] = el; }}
            className={`absolute top-0 left-0 transition-shadow duration-150 ${
              activeGrabbedIndex === index ? 'scale-105 z-30 cursor-grabbing' : 'z-20 cursor-grab'
            }`}
            style={{
              willChange: 'transform',
              transform: `translate3d(${cfg.initialX * 100}%, ${cfg.initialY * 100}%, 0px) translate(-50%, -50%) rotate(${cfg.initialAngle}rad)`
            }}
          >
            {cfg.renderContent(activeGrabbedIndex === index)}
          </div>
        ))}

        {/* Subtle helper tooltip for desktop/touch */}
        <div className="absolute top-2 right-3 pointer-events-none opacity-40 hover:opacity-80 transition-opacity hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#CBDA46]">
          <Sparkles className="w-3 h-3" />
          <span>Fling / Shake stickers</span>
        </div>
      </div>

      {/* iOS Motion Permission Banner (Only shown on iOS if required) */}
      {needsIOSPermission && hasIOSPermission !== true && (
        <div className="mt-2 flex justify-center">
          <button
            onClick={requestMotionPermission}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CBDA46] text-[#093624] text-xs font-mono font-bold uppercase tracking-wider border border-[#093624] shadow-[2px_2px_0px_#052518] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enable Tilt & Shake Physics</span>
          </button>
        </div>
      )}
    </div>
  );
};
