import { notFound } from "next/navigation";
import { getCategory, getCategoryProductCount } from "@/lib/queries";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { DesignVariantProvider, VariantSelector } from "@/components/design-variant-selector";
import { CategoryVariantGrid } from "@/components/variant-grids";

export async function generateStaticParams() {
  return await db.select({ category: categories.slug }).from(categories);
}

export default async function Page(props: {
  params: Promise<{
    category: string;
  }>;
}) {
  const { category } = await props.params;
  const urlDecoded = decodeURIComponent(category);
  const cat = await getCategory(urlDecoded);
  if (!cat) {
    return notFound();
  }

  const countRes = await getCategoryProductCount(urlDecoded);

  const finalCount = countRes[0]?.count;

  return (
    <div className="container p-4 sm:p-6">
      {finalCount && (
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-accent2 px-3 py-1 text-xs font-semibold text-accent1">
            {finalCount} {finalCount === 1 ? "Product" : "Products"}
          </span>
        </div>
      )}
      <DesignVariantProvider>
        <VariantSelector />
        <div className="space-y-6">
          {cat.subcollections.map((subcollection, index) => (
            <div key={index}>
              <h2 className="mb-3 text-lg font-bold text-gray-900">
                {subcollection.name}
              </h2>
              <CategoryVariantGrid
                categories={subcollection.subcategories}
                basePath={`/products/${category}/`}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </DesignVariantProvider>
    </div>
  );
}
