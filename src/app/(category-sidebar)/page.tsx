import { getCollections, getProductCount } from "@/lib/queries";
import { DesignVariantProvider, VariantSelector } from "@/components/design-variant-selector";
import { CategoryVariantGrid } from "@/components/variant-grids";

export default async function Home() {
  const [collections, productCount] = await Promise.all([
    getCollections(),
    getProductCount(),
  ]);

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="relative mb-6 overflow-hidden rounded-xl px-6 py-8 text-gray-900 shadow-lg sm:px-10 sm:py-10">
        <img
          src="/background.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome to ePen</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Discover {productCount.at(0)?.count.toLocaleString()} premium products across all categories
          </p>
        </div>
      </div>
      <DesignVariantProvider>
        <VariantSelector />
        {collections.map((collection) => (
          <div key={collection.name} className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">{collection.name}</h2>
            <CategoryVariantGrid
              categories={collection.categories}
              basePath="/products/"
              loading="eager"
            />
          </div>
        ))}
      </DesignVariantProvider>
    </div>
  );
}
