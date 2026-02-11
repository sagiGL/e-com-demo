import { ProductMinimal } from "@/components/product-card-variants";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { Metadata } from "next";

import { getProductDetails, getProductsForSubcategory } from "@/lib/queries";
// import { db } from "@/db";

// export async function generateStaticParams() {
//   const results = await db.query.products.findMany({
//     with: {
//       subcategory: {
//         with: {
//           subcollection: {
//             with: {
//               category: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   return results.map((s) => ({
//     category: s.subcategory.subcollection.category.slug,
//     subcategory: s.subcategory.slug,
//     product: s.slug,
//   }));
// }

export async function generateMetadata(props: {
  params: Promise<{ product: string; category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { product: productParam } = await props.params;
  const urlDecodedProduct = decodeURIComponent(productParam);

  const product = await getProductDetails(urlDecodedProduct);

  if (!product) {
    return notFound();
  }

  return {
    openGraph: { title: product.name, description: product.description },
  };
}

export default async function Page(props: {
  params: Promise<{
    product: string;
    subcategory: string;
    category: string;
  }>;
}) {
  const { product, subcategory, category } = await props.params;
  const urlDecodedProduct = decodeURIComponent(product);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const [productData, relatedUnshifted] = await Promise.all([
    getProductDetails(urlDecodedProduct),
    getProductsForSubcategory(urlDecodedSubcategory),
  ]);

  if (!productData) {
    return notFound();
  }
  const currentProductIndex = relatedUnshifted.findIndex(
    (p) => p.slug === productData.slug,
  );
  const related = [
    ...relatedUnshifted.slice(currentProductIndex + 1),
    ...relatedUnshifted.slice(0, currentProductIndex),
  ];

  return (
    <div className="container p-4 sm:p-6">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-6 p-4 sm:p-6 md:flex-row md:gap-10">
          <div className="flex items-center justify-center rounded-xl bg-gray-50 p-6 md:min-w-[300px]">
            <Image
              loading="eager"
              decoding="sync"
              src={productData.image_url ?? "/placeholder.svg?height=64&width=64"}
              alt={`A small picture of ${productData.name}`}
              height={256}
              quality={80}
              width={256}
              className="h-56 w-56 flex-shrink-0 object-contain md:h-64 md:w-64"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {productData.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-600">{productData.description}</p>
            </div>
            <div className="mt-6">
              <p className="text-3xl font-extrabold text-accent1">
                ${parseFloat(productData.price).toFixed(2)}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  In stock
                </span>
                <span className="text-xs text-gray-400">Ships in 2-4 weeks</span>
              </div>
              <div className="mt-4">
                <AddToCartForm productSlug={productData.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {related.length > 0 && (
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            More in this category
          </h2>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {related?.map((product) => (
            <ProductMinimal
              key={product.name}
              loading="lazy"
              category_slug={category}
              subcategory_slug={subcategory}
              product={product}
              imageUrl={product.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
