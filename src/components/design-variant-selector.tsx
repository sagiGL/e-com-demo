"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { PRODUCT_VARIANTS, type ProductVariantId } from "./product-card-variants"

/* ──────────────────────────────────────────────────────────────────
   Design Variant Context — shared between product & category cards
   ────────────────────────────────────────────────────────────────── */

const VariantContext = createContext<{
  variant: ProductVariantId
  setVariant: (v: ProductVariantId) => void
}>({
  variant: "minimal",
  setVariant: () => {},
})

export function useDesignVariant() {
  return useContext(VariantContext)
}

export function DesignVariantProvider({
  children,
  defaultVariant = "minimal",
}: {
  children: ReactNode
  defaultVariant?: ProductVariantId
}) {
  const [variant, setVariant] = useState<ProductVariantId>(defaultVariant)
  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </VariantContext.Provider>
  )
}

/* ──────────────────────────────────────────────────────────────────
   Variant Selector Tabs
   ────────────────────────────────────────────────────────────────── */

export function VariantSelector() {
  const { variant, setVariant } = useDesignVariant()

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
          Design Variant
        </span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          {PRODUCT_VARIANTS.length} styles
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRODUCT_VARIANTS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left transition-all duration-300",
              variant === v.id
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : "border-[#e5e5e5] bg-white text-[#666] hover:border-[#ccc] hover:bg-[#fafafa]",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold",
                variant === v.id
                  ? "bg-white/20 text-white"
                  : "bg-[#f5f5f5] text-[#999]",
              )}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-[12px] font-semibold leading-tight">{v.name}</p>
              <p
                className={cn(
                  "text-[10px] leading-tight",
                  variant === v.id ? "text-white/70" : "text-[#999]",
                )}
              >
                {v.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
