import { db } from "@/db";
import { collections } from "@/db/schema";
import { getCollectionDetails } from "@/lib/queries";
import { DesignVariantProvider, VariantSelector } from "@/components/design-variant-selector";
import { CategoryVariantGrid } from "@/components/variant-grids";

export async function generateStaticParams() {
  return await db.select({ collection: collections.slug }).from(collections);
}

export default async function Home(props: {
  params: Promise<{
    collection: string;
  }>;
}) {
  const collectionName = decodeURIComponent((await props.params).collection);

  const collectionList = await getCollectionDetails(collectionName);

  return (
    <div className="w-full p-4 sm:p-6">
      <DesignVariantProvider>
        <VariantSelector />
        {collectionList.map((collection) => (
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
