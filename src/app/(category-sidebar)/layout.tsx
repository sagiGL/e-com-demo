import { Link } from "@/components/ui/link";
import { getCollections } from "@/lib/queries";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCollections = await getCollections();
  return (
    <div className="flex flex-grow font-sans">
      <aside className="fixed left-0 hidden w-64 min-w-64 max-w-64 overflow-y-auto border-r border-gray-200 bg-gray-50/80 p-5 md:block md:h-full">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
          Categories
        </h2>
        <ul className="flex flex-col items-start justify-center gap-0.5">
          {allCollections.map((collection) => (
            <li key={collection.slug} className="w-full">
              <Link
                prefetch={true}
                href={`/${collection.slug}`}
                className="block w-full rounded-lg px-3 py-2 text-sm text-gray-700 transition-all hover:bg-white hover:text-accent1 hover:shadow-sm"
              >
                {collection.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main
        className="min-h-[calc(100vh-113px)] flex-1 overflow-y-auto p-4 pt-0 md:pl-64"
        id="main-content"
      >
        {children}
      </main>
    </div>
  );
}
