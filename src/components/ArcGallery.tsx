import { useEffect, useRef, useState } from "react";

export interface ArcGalleryItem {
  id: string;
  image: string;
  alt: string;
  caption?: string;
}

interface ArcGalleryProps {
  items: ArcGalleryItem[];
  ariaLabel: string;
}

export default function ArcGallery({ items, ariaLabel }: ArcGalleryProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isHoveredRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
  });

  const offsetRef = useRef(0);
  const totalWidthRef = useRef(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || items.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stageWidth = stage.clientWidth || window.innerWidth;
    let cardWidth = cardRefs.current[0]?.offsetWidth || 270;
    let gap = stageWidth < 640 ? 18 : 28;
    let stride = cardWidth + gap;
    totalWidthRef.current = stride * items.length;
    let currentSpeed = prefersReducedMotion ? 0 : stageWidth < 640 ? 28 : 42;
    let lastTime = performance.now();
    let rafId = 0;

    const measure = () => {
      stageWidth = stage.clientWidth || window.innerWidth;
      cardWidth = cardRefs.current[0]?.offsetWidth || 270;
      gap = stageWidth < 640 ? 18 : 28;
      stride = cardWidth + gap;
      totalWidthRef.current = stride * items.length;
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(stage);

    const renderFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const totalWidth = totalWidthRef.current;

      if (!dragRef.current.active) {
        if (Math.abs(dragRef.current.velocity) > 4) {
          offsetRef.current += dragRef.current.velocity * dt;
          dragRef.current.velocity *= Math.pow(0.05, dt);
        } else {
          dragRef.current.velocity = 0;
          const baseSpeed = prefersReducedMotion
            ? 0
            : stageWidth < 640
              ? 28
              : 42;
          const targetSpeed = isHoveredRef.current ? 0 : baseSpeed;
          currentSpeed += (targetSpeed - currentSpeed) * 0.08;
          offsetRef.current += currentSpeed * dt;
        }
      }

      offsetRef.current =
        ((offsetRef.current % totalWidth) + totalWidth) % totalWidth;

      const halfStage = stageWidth * 0.5;
      const curveDepth = stageWidth < 640 ? 44 : stageWidth < 1024 ? 72 : 104;
      const maxTilt = stageWidth < 640 ? 5.5 : 9;

      for (let i = 0; i < items.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const rawX = i * stride - offsetRef.current;
        const wrappedX =
          (((rawX + cardWidth) % totalWidth) + totalWidth) % totalWidth -
          cardWidth;

        const cardCenterX = wrappedX + cardWidth * 0.5;
        const tNorm = (cardCenterX - halfStage) / Math.max(halfStage, 1);

        const y = curveDepth * (1 - Math.min(tNorm * tNorm, 1.35));
        const rotateDeg = -tNorm * maxTilt;

        el.style.transform = `translate3d(${wrappedX.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotateDeg.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    measure();
    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [items.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) {
      return;
    }
    const now = performance.now();
    const dt = Math.max((now - dragRef.current.lastTime) / 1000, 0.008);
    const dx = e.clientX - dragRef.current.lastX;

    offsetRef.current -= dx;
    const instantVelocity = Math.max(-1800, Math.min(1800, -dx / dt));
    dragRef.current.velocity =
      dragRef.current.velocity * 0.45 + instantVelocity * 0.55;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastTime = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) {
      return;
    }
    dragRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className={`about-arc-wrapper ${isDragging ? "is-dragging" : ""}`}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onFocusCapture={() => {
        isHoveredRef.current = true;
      }}
      onBlurCapture={() => {
        isHoveredRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="about-arc-stage" ref={stageRef}>
        {items.map((item, idx) => (
          <figure
            key={item.id}
            className="about-arc-card"
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
          >
            <img
              src={item.image}
              alt={item.alt}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            {item.caption ? (
              <figcaption className="about-arc-caption">
                {item.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
