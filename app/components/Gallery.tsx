"use client";

import Link from "next/link";
import { photos } from "../photos";

const PREVIEW_COUNT = 4;

export default function Gallery() {
  if (photos.length === 0) return null;

  const preview = photos.slice(0, PREVIEW_COUNT);

  return (
    <section className="gallery-section">
      <div className="section fade-in">
        <p className="section-label">Photography</p>
      </div>
      <div className="gallery-preview">
        {preview.map((photo) => (
          <Link
            key={photo.id}
            href="/photography"
            className="gallery-preview-item"
          >
            <img
              src={photo.thumb}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
            />
          </Link>
        ))}
      </div>
      <div className="gallery-cta">
        <Link href="/photography" className="gallery-cta-link">
          View all photos
        </Link>
      </div>
    </section>
  );
}
