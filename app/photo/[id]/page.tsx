"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useCallback, useState } from "react";
import { getPhoto, getAdjacentPhotos, photos } from "../../photos";
import Link from "next/link";

export default function PhotoPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const category = searchParams.get("c") || undefined;
  const photo = getPhoto(id);
  const { prev, next } = getAdjacentPhotos(id, category);
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState<"none" | "left" | "right">("none");
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      const target = dir === "prev" ? prev : next;
      if (!target) return;
      setDirection(dir === "prev" ? "right" : "left");
      setLoaded(false);
      const qs = category ? `?c=${category}` : "";
      setTimeout(() => {
        router.push(`/photo/${target.id}${qs}`);
      }, 150);
    },
    [prev, next, router]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate("prev");
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        navigate("next");
      } else if (e.key === "Escape") {
        router.push(backHref);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, router]);

  // Reset animation state on id change
  useEffect(() => {
    setDirection("none");
  }, [id]);

  // Touch/swipe handling
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe is dominant and > 50px
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) navigate("prev");
      else navigate("next");
    }
  }

  const backHref = category ? `/photography?c=${category}` : "/photography";

  if (!photo) {
    return (
      <div className="viewer">
        <div className="viewer-empty">
          <p>Photo not found</p>
          <Link href={backHref} className="viewer-back">
            Back
          </Link>
        </div>
      </div>
    );
  }

  const filtered = category ? photos.filter((p) => p.category === category) : photos;
  const currentIndex = filtered.findIndex((p) => p.id === id);
  const total = filtered.length;

  return (
    <div
      className="viewer"
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="viewer-topbar">
        <Link href={backHref} className="viewer-back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 10H5M5 10L10 5M5 10L10 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <span className="viewer-counter">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Image */}
      <div className={`viewer-image-wrap loaded viewer-slide-${direction}`}>
        <img
          key={`${photo.id}-thumb`}
          src={photo.thumb}
          alt={photo.alt}
          className={`viewer-image ${loaded ? "viewer-image-hidden" : ""}`}
          draggable={false}
        />
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className={`viewer-image viewer-image-full ${loaded ? "viewer-image-visible" : ""}`}
          draggable={false}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Arrow navigation */}
      {prev && (
        <button
          className="viewer-arrow viewer-arrow-left"
          onClick={() => navigate("prev")}
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      {next && (
        <button
          className="viewer-arrow viewer-arrow-right"
          onClick={() => navigate("next")}
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
