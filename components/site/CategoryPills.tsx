"use client";
import { CATEGORIES, type Category } from "@/lib/shop-data";

export function CategoryPills({
  active,
  onChange,
}: {
  active: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
      {CATEGORIES.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground shadow-card hover:bg-secondary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
