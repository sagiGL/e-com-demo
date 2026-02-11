"use client"

import Image from "next/image"
import { Link } from "@/components/ui/link"

/* ──────────────────────────────────────────────────────────────────
   Category Card Variants
   Match the 5 product card styles for visual consistency
   ────────────────────────────────────────────────────────────────── */

interface CategoryCardProps {
  name: string
  slug: string
  imageUrl?: string | null
  href: string
  loading?: "eager" | "lazy"
  productCount?: number
}

/* ─── Variant 1: Minimal Clean ───────────────────────────────── */

export function CategoryMinimal({ name, imageUrl, href, loading }: CategoryCardProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className="group flex flex-col items-center overflow-hidden rounded-xl bg-[#fafafa] transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f0f0f0]">
        <Image
          loading={loading ?? "lazy"}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=200&width=200"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-1 p-4">
        <h3 className="text-sm font-medium text-[#222]">{name}</h3>
      </div>
    </Link>
  )
}

/* ─── Variant 2: Editorial Dark ──────────────────────────────── */

export function CategoryEditorial({ name, imageUrl, href, loading }: CategoryCardProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className="group relative flex flex-col overflow-hidden bg-[#152a47] transition-all rounded-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          loading={loading ?? "lazy"}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=200&width=200"}
          alt={name}
          fill
          className="object-cover brightness-[0.75] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
        />
      </div>
      <div className="p-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#f5f0e8]/40">Collection</p>
        <h3 className="mt-1  text-sm font-light tracking-tight text-[#f5f0e8]">{name}</h3>
      </div>
    </Link>
  )
}

/* ─── Variant 3: Full-Bleed Overlay ──────────────────────────── */

export function CategoryOverlay({ name, imageUrl, href, loading }: CategoryCardProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
    >
      <Image
        loading={loading ?? "lazy"}
        decoding="sync"
        src={imageUrl ?? "/placeholder.svg?height=200&width=200"}
        alt={name}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className="mt-0.5 text-[11px] text-white/60">Explore collection →</p>
      </div>
    </Link>
  )
}

/* ─── Variant 4: Horizontal Catalog ──────────────────────────── */

export function CategoryCatalog({ name, imageUrl, href, loading, productCount }: CategoryCardProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className="group flex items-center gap-4 overflow-hidden rounded-xl border border-[#eee] bg-white p-3 transition-all duration-300 hover:shadow-md hover:shadow-black/5"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5]">
        <Image
          loading={loading ?? "lazy"}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=200&width=200"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-[#222] truncate">{name}</h3>
        {productCount != null && (
          <p className="text-[10px] text-[#999]">{productCount} products</p>
        )}
      </div>
      <span className="text-[10px] font-semibold text-[#999] transition-colors group-hover:text-[#152a47]">
        →
      </span>
    </Link>
  )
}

/* ─── Variant 5: Magazine Feature ────────────────────────────── */

export function CategoryMagazine({ name, imageUrl, href, loading }: CategoryCardProps) {
  return (
    <Link
      prefetch={true}
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#f5f0e8] transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          loading={loading ?? "lazy"}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=200&width=200"}
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f0e8]" />
      </div>
      <div className="relative z-10 -mt-8 px-5 pb-5">
        <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Collection</p>
        <h3 className=" text-lg font-bold text-[#2d1f10]">{name}</h3>
      </div>
    </Link>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Category Variant Map
   ────────────────────────────────────────────────────────────────── */

export const CATEGORY_VARIANTS = {
  minimal: CategoryMinimal,
  editorial: CategoryEditorial,
  overlay: CategoryOverlay,
  catalog: CategoryCatalog,
  magazine: CategoryMagazine,
} as const

export type CategoryVariantId = keyof typeof CATEGORY_VARIANTS
