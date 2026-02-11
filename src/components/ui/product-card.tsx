"use client";
import { Link } from "@/components/ui/link";
import NextImage from "next/image";
import { getImageProps } from "next/image";
import { Product } from "@/db/schema";
import { useEffect } from "react";

export function getProductLinkImageProps(
  imageUrl: string,
  productName: string,
) {
  return getImageProps({
    width: 48,
    height: 48,
    quality: 65,
    src: imageUrl,
    alt: `A small picture of ${productName}`,
  });
}

export function ProductLink(props: {
  imageUrl?: string | null;
  category_slug: string;
  subcategory_slug: string;
  loading: "eager" | "lazy";
  product: Product;
}) {
  const { category_slug, subcategory_slug, product, imageUrl } = props;

  // prefetch the main image for the product page, if this is too heavy
  // we could only prefetch the first few cards, then prefetch on hover
  const prefetchProps = getImageProps({
    height: 256,
    quality: 80,
    width: 256,
    src: imageUrl ?? "/placeholder.svg?height=64&width=64",
    alt: `A small picture of ${product.name}`,
  });
  useEffect(() => {
    try {
      const iprops = prefetchProps.props;
      const img = new Image();
      // Don't interfer with important requests
      img.fetchPriority = "low";
      // Don't block the main thread with prefetch images
      img.decoding = "async";
      // Order is important here, sizes must be set before srcset, srcset must be set before src
      if (iprops.sizes) img.sizes = iprops.sizes;
      if (iprops.srcSet) img.srcset = iprops.srcSet;
      if (iprops.src) img.src = iprops.src;
    } catch (e) {
      console.error("failed to preload", prefetchProps.props.src, e);
    }
  }, [prefetchProps]);
  return (
    <Link
      prefetch={true}
      className="group flex w-full flex-row overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-[280px]"
      href={`/products/${category_slug}/${subcategory_slug}/${product.slug}`}
    >
      <div className="flex h-[130px] w-[90px] flex-shrink-0 items-center justify-center bg-gray-50 p-3">
        <NextImage
          loading={props.loading}
          decoding="sync"
          src={imageUrl ?? "/placeholder.svg?height=48&width=48"}
          alt={`A small picture of ${product.name}`}
          width={48}
          height={48}
          quality={65}
          className="h-auto w-14 flex-shrink-0 object-contain transition-transform group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <div className="text-sm font-semibold text-gray-800 group-hover:text-accent1">
            {product.name}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>
        </div>
        <p className="mt-2 text-sm font-bold text-accent1">
          ${parseFloat(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
