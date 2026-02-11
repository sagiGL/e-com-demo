import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductsForSubcategory,
  getSubcategory,
  getSubcategoryProductCount,
} from "@/lib/queries";
import { DesignVariantProvider, VariantSelector } from "@/components/design-variant-selector";
import { ProductVariantGrid } from "@/components/variant-grids";
// import { db } from "@/db";

// export async function generateStaticParams() {
//   const results = await db.query.subcategories.findMany({
//     with: {
//       subcollection: {
//         with: {
//           category: true,
//         },
//       },
//     },
//   });
//   return results.map((s) => ({
//     category: s.subcollection.category.slug,
//     subcategory: s.slug,
//   }));
// }

export async function generateMetadata(props: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { subcategory: subcategoryParam } = await props.params;
  const urlDecodedCategory = decodeURIComponent(subcategoryParam);

  const [subcategory, rows] = await Promise.all([
    getSubcategory(urlDecodedCategory),
    getSubcategoryProductCount(urlDecodedCategory),
  ]);

  if (!subcategory) {
    return notFound();
  }

  const description = rows[0]?.count
    ? `Choose from over ${rows[0]?.count - 1} products in ${subcategory.name}. In stock and ready to ship.`
    : undefined;

  return {
    openGraph: { title: subcategory.name, description },
  };
}

export default async function Page(props: {
  params: Promise<{
    subcategory: string;
    category: string;
  }>;
}) {
  const { subcategory, category } = await props.params;
  // const urlDecodedCategory = decodeURIComponent(category);
  const urlDecodedSubcategory = decodeURIComponent(subcategory);
  const [products, countRes] = await Promise.all([
    getProductsForSubcategory(urlDecodedSubcategory),
    getSubcategoryProductCount(urlDecodedSubcategory),
  ]);

  if (!products) {
    return notFound();
  }

  const finalCount = countRes[0]?.count;
  return (
    <div className="container mx-auto p-4 sm:p-6">
      {finalCount > 0 ? (
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-accent2 px-3 py-1 text-xs font-semibold text-accent1">
            {finalCount} {finalCount === 1 ? "Product" : "Products"}
          </span>
        </div>
      ) : (
        <p className="text-gray-500">No products for this subcategory</p>
      )}
      <DesignVariantProvider>
        <VariantSelector />
        <ProductVariantGrid
          products={products}
          category_slug={category}
          subcategory_slug={subcategory}
        />
      </DesignVariantProvider>
    </div>
  );
}
