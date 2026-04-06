"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { photos, categories } from "../photos";

export default function PhotographyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("c");

  const filtered = activeCategory
    ? photos.filter((p) => p.category === activeCategory)
    : photos;

  function setCategory(id: string | null) {
    if (id) {
      router.push(`/photography?c=${id}`, { scroll: false });
    } else {
      router.push("/photography", { scroll: false });
    }
  }

  return (
    <div>
      <header className="gallery-header">
        <Link href="/" className="gallery-back">
          Jarmo Isotalo
        </Link>
        <h1 className="gallery-title">Photography</h1>
        <nav className="gallery-tabs">
          <button
            className={`gallery-tab ${!activeCategory ? "active" : ""}`}
            onClick={() => setCategory(null)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`gallery-tab ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </header>
      <div className="gallery-grid">
        {filtered.map((photo) => (
          <Link
            key={photo.id}
            href={`/photo/${photo.id}${activeCategory ? `?c=${activeCategory}` : ""}`}
            className={`gallery-item gallery-item-${photo.aspect}`}
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
    </div>
  );
}
