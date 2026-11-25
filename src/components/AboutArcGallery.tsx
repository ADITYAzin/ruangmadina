import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

const GALLERY_IMAGES: Record<string, string> = {
  team_model:
    "https://images.pexels.com/photos/6615107/pexels-photo-6615107.jpeg?auto=compress&cs=tinysrgb&w=900",
  blueprint_review:
    "https://images.pexels.com/photos/5584052/pexels-photo-5584052.jpeg?auto=compress&cs=tinysrgb&w=900",
  material_studio:
    "https://images.pexels.com/photos/9617369/pexels-photo-9617369.jpeg?auto=compress&cs=tinysrgb&w=900",
  wood_craft:
    "https://images.pexels.com/photos/6790088/pexels-photo-6790088.jpeg?auto=compress&cs=tinysrgb&w=900",
  workshop_floor:
    "https://images.pexels.com/photos/6790066/pexels-photo-6790066.jpeg?auto=compress&cs=tinysrgb&w=900",
  site_measure:
    "https://images.pexels.com/photos/4981810/pexels-photo-4981810.jpeg?auto=compress&cs=tinysrgb&w=900",
  interior_progress:
    "https://images.pexels.com/photos/5691533/pexels-photo-5691533.jpeg?auto=compress&cs=tinysrgb&w=900",
};

const ITEM_IDS = [
  "team_model",
  "blueprint_review",
  "material_studio",
  "wood_craft",
  "workshop_floor",
  "site_measure",
  "interior_progress",
] as const;

export default function AboutArcGallery() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isPausedRef = useRef(false);

  const items: GalleryItem[] = ITEM_IDS.map((id) => ({
    id,
    image: GALLERY_IMAGES[id],
    caption: t(`about.gallery.${id}`),
  }));

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let stageWidth = stage.clientWidth || window.innerWidth;
    let cardWidth = cardRefs.current[0]?.offsetWidth || 270;
    let gap = stageWidth < 640 ? 18 : 28;
    let stride = cardWidth + gap;
    let totalWidth = stride * items.length;
    let offset = 0;
    let currentSpeed = prefersReducedMotion ? 0 : stageWidth < 640 ? 28 : 42;
    let lastTime = performance.now();
    let rafId = 0;

    const measure = () => {
      stageWidth = stage.clientWidth || window.innerWidth;
      cardWidth = cardRefs.current[0]?.offsetWidth || 270;
      gap = stageWidth < 640 ? 18 : 28;
      stride = cardWidth + gap;
      totalWidth = stride * items.length;
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(stage);

    const renderFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const baseSpeed = prefersReducedMotion ? 0 : stageWidth < 640 ? 28 : 42;
      const targetSpeed = isPausedRef.current ? 0 : baseSpeed;
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      offset = (offset + currentSpeed * dt) % totalWidth;

      const halfStage = stageWidth * 0.5;
      const curveDepth = stageWidth < 640 ? 44 : stageWidth < 1024 ? 72 : 104;
      const maxTilt = stageWidth < 640 ? 5.5 : 9;

      for (let i = 0; i < items.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // Wrap seamlessly around totalWidth
        const rawX = i * stride - offset;
        const wrappedX =
          (((rawX + cardWidth) % totalWidth) + totalWidth) % totalWidth -
          cardWidth;

        const cardCenterX = wrappedX + cardWidth * 0.5;
        const tNorm = (cardCenterX - halfStage) / Math.max(halfStage, 1);

        // Balanced symmetrical U-curve: lowest at center (t=0), rising on both sides
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

  return (
    <div
      className="about-arc-wrapper"
      aria-label={t("about.galleryLabel")}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      onFocusCapture={() => {
        isPausedRef.current = true;
      }}
      onBlurCapture={() => {
        isPausedRef.current = false;
      }}
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
              alt={item.caption}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="about-arc-caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
