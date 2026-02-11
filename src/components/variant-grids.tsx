"use client"

import { useDesignVariant } from "./design-variant-selector"
import { PRODUCT_VARIANTS } from "./product-card-variants"
import { CATEGORY_VARIANTS } from "./category-card-variants"
import type { Product } from "@/db/schema"

/* ──────────────────────────────────────────────────────────────────
   Product Grid — renders the active variant for each product
   ────────────────────────────────────────────────────────────────── */

interface ProductGridProps {
  products: Product[]
  category_slug: string
  subcategory_slug: string
}

export function ProductVariantGrid({ products, category_slug, subcategory_slug }: ProductGridProps) {
  const { variant } = useDesignVariant()
  const variantConfig = PRODUCT_VARIANTS.find((v) => v.id === variant)!
  const CardComponent = variantConfig.component

  // Adjust grid based on variant
  const gridClass =
    variant === "catalog"
      ? "grid grid-cols-1 gap-4 lg:grid-cols-2"
      : variant === "editorial" || variant === "overlay" || variant === "magazine"
        ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

  return (
    <div className={gridClass}>
      {products.map((product, i) => (
        <CardComponent
          key={product.slug}
          product={product}
          category_slug={category_slug}
          subcategory_slug={subcategory_slug}
          loading={i < 8 ? "eager" : "lazy"}
          imageUrl={product.image_url}
          index={i}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Category Grid — renders the active variant for each category
   ────────────────────────────────────────────────────────────────── */

interface CategoryItem {
  name: string
  slug: string
  image_url?: string | null
}

interface CategoryGridProps {
  categories: CategoryItem[]
  basePath: string
  loading?: "eager" | "lazy"
}

export function CategoryVariantGrid({ categories, basePath, loading }: CategoryGridProps) {
  const { variant } = useDesignVariant()
  const CardComponent = CATEGORY_VARIANTS[variant]

  // Adjust grid based on variant
  const gridClass =
    variant === "catalog"
      ? "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      : variant === "editorial" || variant === "overlay" || variant === "magazine"
        ? "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        : "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"

  return (
    <div className={gridClass}>
      {categories.map((cat, i) => (
        <CardComponent
          key={cat.slug}
          name={cat.name}
          slug={cat.slug}
          imageUrl={cat.image_url}
          href={`${basePath}${cat.slug}`}
          loading={loading ?? (i < 15 ? "eager" : "lazy")}
        />
      ))}
    </div>
  )
}
