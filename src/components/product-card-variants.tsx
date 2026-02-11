"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, ArrowRight, Star, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "@/components/ui/link"
import type { Product } from "@/db/schema"

/* ──────────────────────────────────────────────────────────────────
   Shared types & helpers
   ────────────────────────────────────────────────────────────────── */

interface ProductCardProps {
  product: Product
  category_slug: string
  subcategory_slug: string
  loading?: "eager" | "lazy"
  imageUrl?: string | null
  index?: number
}

function productHref(p: ProductCardProps) {
  return `/products/${p.category_slug}/${p.subcategory_slug}/${p.product.slug}`
}

function formatPrice(price: string | number) {
  return `$${parseFloat(String(price)).toFixed(2)}`
}

// Deterministic pseudo-random helpers based on product slug
function seededRandom(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function getAccentColor(slug: string) {
  const colors = [
    { name: "Cobalt", hex: "#1e3a5f" },
    { name: "Sienna", hex: "#a0522d" },
    { name: "Sage", hex: "#6b7f5e" },
  ]
  return colors[seededRandom(slug) % colors.length]
}

function getIsNew(slug: string) {
  return seededRandom(slug) % 5 === 0
}

function getOriginalPrice(price: string | number, slug: string) {
  if (seededRandom(slug) % 3 !== 0) return null
  return (parseFloat(String(price)) * 1.25).toFixed(2)
}

function getRating(slug: string) {
  return (3.5 + (seededRandom(slug) % 15) / 10).toFixed(1)
}

/* ──────────────────────────────────────────────────────────────────
   VARIANT 1 — Minimal Clean
   White background, large image, ultra-minimal info, airy spacing.
   ────────────────────────────────────────────────────────────────── */

export function ProductMinimal(props: ProductCardProps) {
  const { product, imageUrl } = props
  const [liked, setLiked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const accent = getAccentColor(product.slug)
  const isNew = getIsNew(product.slug)
  const originalPrice = getOriginalPrice(product.price, product.slug)

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl bg-[#fafafa]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Image */}
      <Link href={productHref(props)} prefetch={true} className="relative aspect-[3/4] overflow-hidden bg-[#f0f0f0]">
        <Image
          src={imageUrl ?? "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          loading={props.loading ?? "lazy"}
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            hovering ? "scale-[1.03]" : "scale-100",
          )}
        />
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#152a47] shadow-sm">
            New In
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-300",
            liked ? "text-[#e11d48]" : "text-[#bbb] hover:text-[#666]",
          )}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-3.5 w-3.5", liked && "fill-[#e11d48]")} />
        </button>
      </Link>
      {/* Info */}
      <Link href={productHref(props)} prefetch={true} className="flex flex-col gap-1.5 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#999]">
          {props.subcategory_slug.split("-").join(" ")}
        </p>
        <h3 className="text-sm font-medium leading-snug text-[#222]">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full border border-[#e5e5e5]"
            style={{ backgroundColor: accent.hex }}
          />
          <span
            className="h-3 w-3 rounded-full border border-[#e5e5e5]"
            style={{ backgroundColor: "#555" }}
          />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-[#222]">{formatPrice(product.price)}</span>
          {originalPrice && (
            <span className="text-xs text-[#bbb] line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   VARIANT 2 — Editorial Dark
   Jet-black bg, no border-radius, serif type, moody, hover quick-view.
   ────────────────────────────────────────────────────────────────── */

export function ProductEditorial(props: ProductCardProps) {
  const { product, imageUrl } = props
  const [liked, setLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isNew = getIsNew(product.slug)
  const originalPrice = getOriginalPrice(product.price, product.slug)
  const discount = originalPrice
    ? Math.round(((parseFloat(originalPrice) - parseFloat(product.price)) / parseFloat(originalPrice)) * 100)
    : 0

  return (
    <div
      className="group relative flex flex-col overflow-hidden bg-[#152a47]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productHref(props)} prefetch={true} className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl ?? "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          loading={props.loading ?? "lazy"}
          className={cn(
            "object-cover transition-all duration-1000 ease-out",
            isHovered ? "scale-105 brightness-110" : "scale-100 brightness-[0.85]",
          )}
        />
        <div className="absolute left-4 top-4 flex gap-2">
          {isNew && (
            <span className="border border-[#f5f0e8]/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-[#f5f0e8] backdrop-blur-sm">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="border border-primary/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              {`-${discount}%`}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className={cn(
            "absolute right-4 top-4 flex h-10 w-10 items-center justify-center border backdrop-blur-sm transition-all duration-300",
            liked
              ? "border-primary/60 bg-[#152a47]/30 text-primary"
              : "border-[#f5f0e8]/20 bg-[#152a47]/20 text-[#f5f0e8]/60 hover:text-[#f5f0e8]",
          )}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-primary")} />
        </button>

        {/* Hover action */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex items-center justify-center py-4 transition-all duration-500",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <span className="flex items-center gap-1.5 border border-[#f5f0e8]/30 bg-[#152a47]/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#f5f0e8] backdrop-blur-sm transition-all duration-300 hover:bg-[#f5f0e8] hover:text-[#152a47]">
            <Eye className="h-3.5 w-3.5" />
            View Details
          </span>
        </div>
      </Link>
      <Link href={productHref(props)} prefetch={true} className="flex flex-col gap-3 p-5">
        <div>
          <p className="text-[9px] font-light uppercase tracking-[0.35em] text-[#f5f0e8]/35">
            {props.subcategory_slug.split("-").join(" ")}
          </p>
          <h3 className="mt-1  text-[15px] font-light leading-snug tracking-tight text-[#f5f0e8]">
            {product.name}
          </h3>
        </div>
        <div className="flex items-baseline justify-between border-t border-[#f5f0e8]/10 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-light tracking-tight text-[#f5f0e8]">
              {formatPrice(product.price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-[#f5f0e8]/25 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   VARIANT 3 — Full-Bleed Overlay
   Image covers entire card, text overlaid with gradient, bold type.
   ────────────────────────────────────────────────────────────────── */

export function ProductOverlay(props: ProductCardProps) {
  const { product, imageUrl } = props
  const [liked, setLiked] = useState(false)
  const [hovering, setHovering] = useState(false)
  const isNew = getIsNew(product.slug)
  const originalPrice = getOriginalPrice(product.price, product.slug)
  const discount = originalPrice
    ? Math.round(((parseFloat(originalPrice) - parseFloat(product.price)) / parseFloat(originalPrice)) * 100)
    : 0

  return (
    <Link
      href={productHref(props)}
      prefetch={true}
      className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        src={imageUrl ?? "/placeholder.svg?height=400&width=400"}
        alt={product.name}
        fill
        loading={props.loading ?? "lazy"}
        className={cn(
          "object-cover transition-transform duration-[1200ms] ease-out",
          hovering ? "scale-110" : "scale-100",
        )}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Top badges */}
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <div className="flex gap-2">
          {isNew && (
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#152a47]">New</span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-[#ef4444] px-3 py-1 text-[10px] font-bold text-white">
              {`-${discount}%`}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
            liked ? "bg-white text-[#e11d48]" : "bg-white/20 text-white hover:bg-white/40",
          )}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-[#e11d48]")} />
        </button>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
          {props.subcategory_slug.split("-").join(" ")}
        </p>
        <h3 className="mb-2 text-xl font-bold leading-tight text-white">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="text-xs text-white/40 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-bold text-[#152a47] transition-colors hover:bg-[#f5f5f5] active:scale-95">
            <ShoppingBag className="h-3.5 w-3.5" />
            Shop
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ──────────────────────────────────────────────────────────────────
   VARIANT 4 — Horizontal Catalog Row
   Wide horizontal layout, side-by-side image and details.
   ────────────────────────────────────────────────────────────────── */

export function ProductCatalog(props: ProductCardProps) {
  const { product, imageUrl } = props
  const originalPrice = getOriginalPrice(product.price, product.slug)
  const rating = getRating(product.slug)
  const discount = originalPrice
    ? Math.round(((parseFloat(originalPrice) - parseFloat(product.price)) / parseFloat(originalPrice)) * 100)
    : 0

  return (
    <Link
      href={productHref(props)}
      prefetch={true}
      className="group flex flex-col gap-0 overflow-hidden rounded-xl border border-[#eee] bg-white transition-all duration-500 hover:shadow-lg hover:shadow-black/5 sm:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[200px] sm:w-48">
        <Image
          src={imageUrl ?? "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          loading={props.loading ?? "lazy"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-[#e11d48] px-2 py-0.5 text-[10px] font-bold text-white">
            {`${discount}% OFF`}
          </span>
        )}
      </div>
      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
              {props.subcategory_slug.split("-").join(" ")}
            </p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-xs font-bold text-[#333]">{rating}</span>
            </div>
          </div>
          <h3 className="mb-2 text-base font-semibold leading-snug text-[#152a47]">{product.name}</h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-[#888]">{product.description}</p>
        </div>
        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-[#f0f0f0] pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#152a47]">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="text-sm text-[#bbb] line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <span className="flex items-center gap-2 rounded-lg bg-[#152a47] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#333] active:scale-95">
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Bag
          </span>
        </div>
      </div>
    </Link>
  )
}

/* ──────────────────────────────────────────────────────────────────
   VARIANT 5 — Magazine Feature
   Large serif title, warm palette, editorial feel.
   ────────────────────────────────────────────────────────────────── */

export function ProductMagazine(props: ProductCardProps) {
  const { product, imageUrl } = props
  const [liked, setLiked] = useState(false)
  const accent = getAccentColor(product.slug)
  const isNew = getIsNew(product.slug)
  const originalPrice = getOriginalPrice(product.price, product.slug)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#f5f0e8]">
      {/* Image */}
      <Link href={productHref(props)} prefetch={true} className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl ?? "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          loading={props.loading ?? "lazy"}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f0e8]" />
        {isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            New Season
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault()
            setLiked(!liked)
          }}
          className={cn(
            "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
            liked ? "bg-primary text-white" : "bg-white/80 text-[#999] hover:text-primary",
          )}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-white")} />
        </button>
      </Link>
      {/* Content overlapping image */}
      <Link href={productHref(props)} prefetch={true} className="relative z-10 -mt-16 px-6 pb-6">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {props.subcategory_slug.split("-").join(" ")}
        </p>
        <h3 className="mb-3 text-balance  text-2xl font-bold leading-tight text-[#2d1f10]">
          {product.name}
        </h3>
        {/* Colors */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: accent.hex }}
          />
          <span className="h-5 w-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: "#444" }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#2d1f10]">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="text-sm text-[#a0917e] line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <span className="flex items-center gap-2 rounded-full bg-[#2d1f10] px-5 py-2.5 text-xs font-bold text-[#f5f0e8] transition-colors hover:bg-primary active:scale-95">
            Shop Now
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Variant Selector
   ────────────────────────────────────────────────────────────────── */

export const PRODUCT_VARIANTS = [
  {
    id: "minimal" as const,
    name: "Minimal Clean",
    description: "White, airy, lightweight. Product-first.",
    component: ProductMinimal,
  },
  {
    id: "editorial" as const,
    name: "Editorial Dark",
    description: "Moody, no-radius, serif. Quick-view on hover.",
    component: ProductEditorial,
  },
  {
    id: "overlay" as const,
    name: "Full-Bleed Overlay",
    description: "Image-dominant, gradient text, immersive.",
    component: ProductOverlay,
  },
  {
    id: "catalog" as const,
    name: "Horizontal Catalog",
    description: "Wide rows for comparison shopping.",
    component: ProductCatalog,
  },
  {
    id: "magazine" as const,
    name: "Magazine Feature",
    description: "Warm, editorial, storytelling-first.",
    component: ProductMagazine,
  },
] as const

export type ProductVariantId = (typeof PRODUCT_VARIANTS)[number]["id"]
