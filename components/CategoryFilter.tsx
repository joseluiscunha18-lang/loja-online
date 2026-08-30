import type { Category, CategoryKey } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  active: CategoryKey | "all";
  onChange: (key: CategoryKey | "all") => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
            active === cat.key
              ? "bg-ink text-bone"
              : "border border-line bg-white text-ink-soft hover:border-emerald hover:text-emerald"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
