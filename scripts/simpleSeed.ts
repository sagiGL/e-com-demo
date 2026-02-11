import "../drizzle/envConfig";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import slugifyLib from "slugify";

const makeSlug = (text: string) =>
  slugifyLib(text, { lower: true, strict: true });

const sqlClient = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sqlClient, schema });

const { collections, categories, subcollections, subcategories, products } =
  schema;

// Deterministic placeholder image using picsum with a seed
const img = (seed: number, size = 400) =>
  `https://picsum.photos/seed/${seed}/${size}/${size}`;

// ── Catalog data ──────────────────────────────────────────────
const catalog = [
  {
    collection: "Drawing & Sketching",
    categories: [
      {
        name: "Graphite Pencils",
        subcollections: [
          {
            name: "Student Grade",
            subcategories: [
              { name: "HB Pencils", products: ["Classic HB Drawing Pencil", "School Pack HB Pencils (12)", "Beginner Sketch Pencil Set", "Economy HB Pencils (24)", "Student Grade HB Pencil", "Eco-Friendly HB Pencil", "Budget Drawing Pencil", "Recycled Wood HB Pencil", "Practice Pencil Set (6)", "Junior Artist HB Pencil"] },
              { name: "Soft Lead Pencils", products: ["2B Soft Sketch Pencil", "4B Drawing Pencil", "6B Ultra Soft Pencil", "Charcoal Blend 2B Pencil", "Dark Shade 4B Set (6)", "Student Soft Lead Pack", "Smooth Sketch 6B Pencil", "Beginner Shading Pencils", "Mixed Soft Lead Set (3)", "Soft Core Drawing Pencil"] },
            ],
          },
          {
            name: "Professional Grade",
            subcategories: [
              { name: "Artist Pencils", products: ["Professional Graphite Set (12)", "Studio Drawing Pencil 2H-8B", "Master Sketch Pencil Set", "Premium Graphite Pencils (24)", "Professional 2B Pencil", "Exhibition Grade Pencil Set", "Artist Series HB-6B", "Pro Sketch Pencil Kit", "Gallery Quality Graphite Set", "Professional Drawing Pack (18)"] },
              { name: "Technical Pencils", products: ["Precision Mechanical Pencil 0.5mm", "Drafting Pencil 0.3mm", "Technical Drawing Set", "Architect Pencil 0.7mm", "Engineering Pencil Pack", "Fine Line Mechanical Pencil", "Lead Holder 2mm", "Precision Clutch Pencil", "Technical Lead Refills (HB)", "Drafting Lead Set (2H-4B)"] },
            ],
          },
        ],
      },
      {
        name: "Colored Pencils",
        subcollections: [
          {
            name: "Wax-Based",
            subcategories: [
              { name: "Basic Sets", products: ["12-Color Wax Pencil Set", "24-Color Student Set", "Bright Basics 12-Pack", "Rainbow Pencil Collection", "Primary Colors Set (8)", "Vivid Wax Pencils (18)", "Starter Color Set (10)", "School Color Pack (24)", "Fun Colors Pencil Set", "Mini Wax Pencil Set (6)"] },
              { name: "Premium Sets", products: ["72-Color Professional Set", "120 Premier Soft Core Set", "48-Color Artist Collection", "Lightfast Premium Set (36)", "Master Colorist 60-Pack", "Studio Quality 48 Set", "Premium Blending Set (24)", "Signature Color Collection", "Archival Grade 36 Set", "Artist Deluxe 90 Colors"] },
            ],
          },
          {
            name: "Oil-Based",
            subcategories: [
              { name: "Oil Color Sets", products: ["24-Color Oil Pencil Set", "Professional Oil Pencils (36)", "Vibrant Oil Color Pack", "Artist Oil Pencils (48)", "Studio Oil Color Set", "Oil Base Blending Set", "Rich Pigment Oil Pencils", "Soft Oil Pencil Pack (12)", "Premium Oil Color 24-Set", "Creamy Oil Pencil Collection"] },
              { name: "Specialty Oil Pencils", products: ["Metallic Oil Pencil Set (12)", "Neon Oil Pencils (8)", "Pastel Tone Oil Set", "Earth Tone Oil Pencils", "Skin Tone Oil Set (12)", "Watercolor Oil Pencils", "Fluorescent Oil Pack (6)", "Warm Tone Oil Set", "Cool Tone Oil Set", "Mixed Media Oil Pencils"] },
            ],
          },
        ],
      },
      {
        name: "Charcoal & Pastels",
        subcollections: [
          {
            name: "Charcoal",
            subcategories: [
              { name: "Vine Charcoal", products: ["Vine Charcoal Sticks (25)", "Extra Soft Vine Pack", "Natural Vine Charcoal Box", "Thin Vine Charcoal Set", "Medium Vine Charcoal", "Assorted Vine Charcoal", "Fine Vine Charcoal Sticks", "Premium Vine Charcoal", "Bulk Vine Charcoal (50)", "Studio Vine Charcoal Pack"] },
              { name: "Compressed Charcoal", products: ["Compressed Charcoal Set (6)", "Soft Compressed Sticks", "Hard Compressed Charcoal", "Round Compressed Set", "Square Compressed Charcoal", "Jumbo Compressed Sticks", "Mixed Hardness Set", "Compressed Charcoal Pencils", "Tinted Compressed Set", "Artist Compressed Pack"] },
            ],
          },
          {
            name: "Pastels",
            subcategories: [
              { name: "Soft Pastels", products: ["48-Color Soft Pastel Set", "24 Landscape Tones", "Portrait Pastel Collection", "Basic Soft Pastel Set (12)", "Full Spectrum 72 Set", "Half-Stick Pastel Set", "Earth Tone Pastels (18)", "Vibrant Soft Pastels", "Student Soft Pastel Kit", "Pastel Landscape Set"] },
              { name: "Oil Pastels", products: ["Oil Pastel Set (24)", "Jumbo Oil Pastels (12)", "Professional Oil Pastels (36)", "Neon Oil Pastel Pack", "Water-Soluble Oil Pastels", "Artist Oil Pastel Set", "Metallic Oil Pastels (8)", "Fluorescent Oil Pastels", "Student Oil Pastel Kit", "Premium Oil Pastel Collection"] },
            ],
          },
        ],
      },
      {
        name: "Sketchbooks & Paper",
        subcollections: [
          {
            name: "Sketchbooks",
            subcategories: [
              { name: "Spiral Bound", products: ["A4 Spiral Sketchbook 100gsm", "A5 Pocket Sketchbook", "Large Format Spiral Pad", "Mixed Media Spiral Book", "Toned Tan Spiral Sketchbook", "Heavy Weight Spiral Pad", "Travel Spiral Sketchbook", "Black Paper Spiral Pad", "Watercolor Spiral Book", "Premium Spiral Sketch Pad"] },
              { name: "Hardbound", products: ["Hardcover Sketch Journal A5", "Landscape Hardbound Sketchbook", "Square Hardbound Pad", "Premium Hardcover A4", "Stitched Hardbound Journal", "Archival Hardcover Sketchbook", "Toned Gray Hardbound", "Lay-Flat Hardcover Pad", "Large Hardbound Sketchbook", "Mini Hardcover Sketchbook"] },
            ],
          },
          {
            name: "Loose Paper",
            subcategories: [
              { name: "Drawing Paper", products: ["Bristol Smooth Pad (20 sheets)", "Vellum Surface Paper Pack", "Newsprint Practice Pad", "Tracing Paper Roll", "Layout Paper Pad", "Marker Paper Pack", "Mixed Media Paper", "Heavyweight Drawing Pad", "Smooth Finish Paper Pack", "Acid-Free Drawing Sheets"] },
              { name: "Specialty Paper", products: ["Watercolor Paper 300gsm", "Pastel Paper Assortment", "Toned Paper Pack", "Black Drawing Paper", "Kraft Paper Roll", "Rice Paper Sheets", "Yupo Synthetic Paper", "Hot Press Watercolor Pad", "Cold Press Paper Pack", "Canvas Paper Pad"] },
            ],
          },
        ],
      },
    ],
  },
  {
    collection: "Painting",
    categories: [
      {
        name: "Acrylic Paint",
        subcollections: [
          {
            name: "Student Acrylics",
            subcategories: [
              { name: "Tube Sets", products: ["12-Color Acrylic Set 75ml", "6-Color Primary Set", "24-Color Acrylic Pack", "Beginner Acrylic Kit", "Neon Acrylic Set (6)", "Pastel Acrylic Set (8)", "Basic Acrylic Tubes (10)", "Student Value Pack 50ml", "Mini Acrylic Tubes (24)", "Sampler Acrylic Set"] },
              { name: "Acrylic Bottles", products: ["16oz White Acrylic", "16oz Black Acrylic", "8oz Primary Red", "8oz Primary Blue", "8oz Primary Yellow", "32oz Gesso Primer", "16oz Burnt Sienna", "16oz Ultramarine Blue", "Pouring Medium 16oz", "Acrylic Medium Gloss 8oz"] },
            ],
          },
          {
            name: "Professional Acrylics",
            subcategories: [
              { name: "Heavy Body", products: ["Titanium White Heavy Body", "Cadmium Red Heavy Body", "Ultramarine Blue Heavy Body", "Cadmium Yellow Heavy Body", "Phthalo Green Heavy Body", "Burnt Umber Heavy Body", "Raw Sienna Heavy Body", "Mars Black Heavy Body", "Quinacridone Magenta Heavy Body", "Yellow Ochre Heavy Body"] },
              { name: "Fluid Acrylics", products: ["Fluid Acrylic Primary Set", "Hansa Yellow Fluid", "Pyrrole Red Fluid", "Phthalo Blue Fluid", "Titanium White Fluid 4oz", "Interference Gold Fluid", "Iridescent Pearl Fluid", "Carbon Black Fluid", "Dioxazine Purple Fluid", "Jenkins Green Fluid"] },
            ],
          },
        ],
      },
      {
        name: "Oil Paint",
        subcollections: [
          {
            name: "Student Oils",
            subcategories: [
              { name: "Oil Tube Sets", products: ["12-Color Oil Paint Set", "6-Color Starter Oil Set", "Landscape Oil Set (8)", "Portrait Oil Color Set", "Earth Tone Oil Set (6)", "Primary Oil Colors (5)", "Student Oil Paint Kit", "Basic Oil Tube Pack", "Oil Paint Sampler Set", "Mini Oil Tubes (12)"] },
              { name: "Oil Mediums", products: ["Linseed Oil 250ml", "Turpentine 500ml", "Liquin Medium", "Stand Oil 75ml", "Safflower Oil Medium", "Odorless Mineral Spirits", "Painting Medium 250ml", "Drying Linseed Oil", "Cold Pressed Linseed", "Alkyd Medium 75ml"] },
            ],
          },
          {
            name: "Professional Oils",
            subcategories: [
              { name: "Artist Grade Oils", products: ["Cadmium Red Artist Oil", "French Ultramarine Oil", "Titanium White 200ml", "Yellow Ochre Artist Oil", "Ivory Black 150ml", "Cerulean Blue Oil", "Viridian Green Oil", "Raw Umber Artist Grade", "Alizarin Crimson Oil", "Naples Yellow Oil"] },
              { name: "Specialty Oils", products: ["Water-Mixable Oil Set", "Quick-Dry Oil Paints", "Iridescent Oil Set", "Metallic Oil Color Pack", "Transparent Oil Glazing Set", "Alkyd Oil Set (8)", "Oil Paint Sticks (12)", "Oil Bar Set", "Fluorescent Oil Colors", "Neo-Megilp Medium 100ml"] },
            ],
          },
        ],
      },
      {
        name: "Watercolor",
        subcollections: [
          {
            name: "Pan Watercolors",
            subcategories: [
              { name: "Half Pan Sets", products: ["12-Color Half Pan Set", "24-Color Travel Set", "36-Color Studio Set", "Portable Watercolor Tin", "Half Pan Refill Singles", "Metallic Half Pan Set (6)", "Earth Tone Half Pan Set", "Floral Palette Half Pans", "Professional Half Pan Kit", "Plein Air Half Pan Set"] },
              { name: "Full Pan Sets", products: ["18-Color Full Pan Set", "36-Color Full Pan Collection", "72-Color Master Set", "Full Pan Refill Singles", "Landscape Full Pan Set", "Portrait Full Pan Set", "Full Pan Mixing Set", "Premium Full Pan Kit", "Signature Full Pan Collection", "Studio Full Pan Set"] },
            ],
          },
          {
            name: "Tube Watercolors",
            subcategories: [
              { name: "Watercolor Tube Sets", products: ["12-Color Tube Set 10ml", "24-Color Professional Tubes", "5-Color Primary Tube Set", "Watercolor Tube Sampler", "6-Color Landscape Tubes", "Granulating Watercolor Set", "Luminescent Tube Set", "Student Tube Set (8)", "Basics Tube Pack", "Vibrant Tube Collection"] },
              { name: "Individual Tubes", products: ["Winsor Yellow 14ml", "French Ultramarine 14ml", "Permanent Rose 14ml", "Raw Sienna 14ml", "Burnt Sienna 14ml", "Sap Green 14ml", "Payne's Gray 14ml", "Chinese White 14ml", "Cerulean Blue 14ml", "Quinacridone Gold 14ml"] },
            ],
          },
        ],
      },
      {
        name: "Brushes",
        subcollections: [
          {
            name: "Natural Hair",
            subcategories: [
              { name: "Sable Brushes", products: ["Kolinsky Sable Round #4", "Kolinsky Sable Round #8", "Sable Watercolor Wash 1\"", "Red Sable Detail Brush", "Sable Fan Brush", "Kolinsky Travel Brush Set", "Sable Filbert #6", "Premium Sable Liner", "Sable Dagger Striper", "Kolinsky Sable Set (5)"] },
              { name: "Hog Bristle", products: ["Hog Bristle Flat 1\"", "Hog Bristle Round #10", "Hog Bristle Filbert #8", "Hog Bristle Fan Brush", "Natural Bristle Set (6)", "Long Handle Bristle Flat", "Bristle Bright Brush #12", "Oil Painting Bristle Set", "Hog Hair Mop Brush", "Bristle Palette Knife Set"] },
            ],
          },
          {
            name: "Synthetic",
            subcategories: [
              { name: "Acrylic Brushes", products: ["Synthetic Round Set (6)", "Acrylic Flat Brush Pack", "Taklon Filbert Set", "Detail Brush Set (4)", "Large Wash Brush 2\"", "Angular Shader Brush", "Liner Brush Set (3)", "Acrylic Fan Brush", "Synthetic Mop Brush", "Multi-Pack Brush Set (12)"] },
              { name: "Watercolor Brushes", products: ["Aqua Brush Pen Set (3)", "Synthetic Quill Brush", "Travel Brush Set", "Pointed Round Set (4)", "Watercolor Mop Brush", "Synthetic Sable Round", "Water Brush Pen Pack", "Flat Wash Brush 1.5\"", "Script Liner Brush", "Watercolor Brush Roll Set"] },
            ],
          },
        ],
      },
      {
        name: "Canvas & Surfaces",
        subcollections: [
          {
            name: "Stretched Canvas",
            subcategories: [
              { name: "Standard Canvas", products: ["8x10\" Stretched Canvas (5pk)", "11x14\" Stretched Canvas (3pk)", "16x20\" Stretched Canvas", "18x24\" Gallery Canvas", "24x36\" Large Canvas", "Canvas Multi-Pack Assorted", "6x6\" Mini Canvas (10pk)", "12x12\" Square Canvas", "9x12\" Canvas Value Pack", "20x24\" Studio Canvas"] },
              { name: "Gallery Wrap", products: ["Gallery Wrap 16x20\"", "Gallery Wrap 24x30\"", "Gallery Wrap 30x40\"", "Gallery Wrap 36x48\"", "Gallery Wrap 12x16\"", "Deep Edge Gallery 18x24\"", "Gallery Wrap Square 20x20\"", "Panoramic Gallery Wrap", "Gallery Canvas 24x24\"", "XL Gallery Wrap 40x60\""] },
            ],
          },
          {
            name: "Panels & Boards",
            subcategories: [
              { name: "Wood Panels", products: ["Birch Wood Panel 8x10\"", "Cradled Wood Panel 11x14\"", "Hardboard Panel 16x20\"", "Basswood Panel 12x12\"", "Deep Cradle Panel 9x12\"", "Smooth Wood Panel Pack", "Gesso'd Birch Panel", "Artist Wood Panel Set", "Mini Wood Panels (6pk)", "Large Cradled Panel 24x30\""] },
              { name: "Canvas Boards", products: ["Canvas Board 8x10\" (3pk)", "Canvas Board 9x12\" (5pk)", "Canvas Board 11x14\"", "Canvas Board 16x20\"", "Canvas Board Multi-Pack", "Academy Canvas Boards", "Primed Canvas Board Set", "Student Canvas Boards (10)", "Canvas Board 5x7\" (8pk)", "Mixed Size Board Pack"] },
            ],
          },
        ],
      },
    ],
  },
  {
    collection: "Sculpting & Modeling",
    categories: [
      {
        name: "Clay & Ceramics",
        subcollections: [
          {
            name: "Air-Dry Clay",
            subcategories: [
              { name: "White Air-Dry", products: ["White Air-Dry Clay 2.5lb", "Premium White Air-Dry 5lb", "Fine White Modeling Clay", "Student Air-Dry Pack", "Quick-Dry White Clay", "Ultra-Light Air-Dry Clay", "Smooth Air-Dry Clay", "Natural Air-Dry Block", "Mini Air-Dry Clay Pack", "Bulk White Air-Dry 10lb"] },
              { name: "Colored Air-Dry", products: ["Colored Air-Dry Set (6)", "Terracotta Air-Dry Clay", "Gray Stone Air-Dry Clay", "Earth Tone Air-Dry Pack", "Bright Color Air-Dry Set", "Pastel Air-Dry Clay (8)", "Natural Clay Color Pack", "Multicolor Air-Dry Kit", "Metallic Air-Dry Set", "Marbled Air-Dry Clay"] },
            ],
          },
          {
            name: "Polymer Clay",
            subcategories: [
              { name: "Polymer Clay Sets", products: ["Polymer Clay 24-Color Pack", "Sculpting Polymer Set (12)", "Oven-Bake Clay Starter Kit", "Professional Polymer Clay 30-Set", "Pastel Polymer Pack", "Metallic Polymer Set (8)", "Translucent Polymer Clay", "Neon Polymer Clay (6)", "Glow-in-Dark Polymer Pack", "Miniature Polymer Kit"] },
              { name: "Polymer Clay Tools", products: ["Clay Extruder Set", "Polymer Texture Sheets (6)", "Clay Cutter Set (15pc)", "Acrylic Clay Roller", "Silicone Clay Molds", "Detail Tool Set (8pc)", "Needle Tool Pack", "Ball Stylus Set", "Polymer Clay Blade Set", "Bead Roller Kit"] },
            ],
          },
        ],
      },
      {
        name: "Sculpting Tools",
        subcollections: [
          {
            name: "Hand Tools",
            subcategories: [
              { name: "Carving Tools", products: ["Wood Carving Knife Set (6)", "Detail Carving Tools", "Linoleum Cutter Set", "V-Gouge Set (4)", "Micro Carving Kit", "Palm Chisel Set", "Spoon Gouge Pack", "Precision Carving Blades", "Relief Carving Set", "Stone Carving Tools"] },
              { name: "Modeling Tools", products: ["Wire End Tool Set (10)", "Ribbon Loop Tool Pack", "Sculpting Spatula Set", "Dental Tool Kit (6)", "Clay Shaper Set (5)", "Wax Modeling Tools", "Double-End Modeling Set", "Silicone Tip Shapers", "Wooden Modeling Tools", "Precision Sculpting Kit"] },
            ],
          },
          {
            name: "Electric Tools",
            subcategories: [
              { name: "Rotary Tools", products: ["Mini Rotary Tool Kit", "Variable Speed Rotary", "Cordless Rotary Tool", "Rotary Bit Set (50pc)", "Diamond Burr Set", "Polishing Attachment Kit", "Flex Shaft Rotary", "Heavy Duty Rotary", "Detail Rotary Tool", "Engraving Rotary Set"] },
              { name: "Heat Tools", products: ["Heat Gun for Polymer Clay", "Embossing Heat Tool", "Temperature Control Heat Gun", "Mini Heat Gun", "Dual-Temp Heat Tool", "Precision Heat Pen", "Soldering & Sculpt Station", "Wood Burning Pen Kit", "Hot Wire Cutter", "Foam Sculpting Hot Knife"] },
            ],
          },
        ],
      },
      {
        name: "Armatures & Frames",
        subcollections: [
          {
            name: "Wire Armatures",
            subcategories: [
              { name: "Armature Wire", products: ["Aluminum Armature Wire 1/8\"", "Steel Armature Wire 1/4\"", "Copper Wire Assortment", "Flexible Armature Wire Spool", "Heavy Gauge Wire 3mm", "Fine Armature Wire 1mm", "Wire Combo Pack", "Brass Wire Assortment", "Armature Wire Spool Set", "Galvanized Steel Wire"] },
              { name: "Pre-Made Armatures", products: ["Human Figure Armature 12\"", "Animal Armature Kit", "Hand Armature Model", "Head Armature Base", "Full Body Armature 18\"", "Miniature Armatures (5pk)", "Poseable Figure Armature", "Dynamic Pose Armature", "Seated Figure Armature", "Custom Armature Kit"] },
            ],
          },
          {
            name: "Bases & Stands",
            subcategories: [
              { name: "Display Bases", products: ["Wooden Display Base 6\"", "Marble Look Base 8\"", "Acrylic Display Stand", "Rotating Display Base", "Black Wood Platform", "Walnut Display Stand", "Metal Display Base", "Clear Acrylic Pedestal", "Tiered Display Stand", "Museum Quality Base"] },
              { name: "Modeling Stands", products: ["Sculptor's Turntable 8\"", "Heavy Duty Banding Wheel", "Adjustable Model Stand", "Tabletop Sculpting Stand", "Tilting Work Stand", "Aluminum Turntable 12\"", "Clay Model Platform", "Portable Sculpting Base", "Studio Turntable Pro", "Mini Turntable 4\""] },
            ],
          },
        ],
      },
    ],
  },
];

async function seed() {
  console.log("🌱 Seeding database with comprehensive art supply catalog...\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(products);
  await db.delete(subcategories);
  await db.delete(subcollections);
  await db.delete(categories);
  await db.delete(collections);

  let imgSeed = 1;
  let totalProducts = 0;

  for (const col of catalog) {
    // Insert collection
    const [insertedCollection] = await db
      .insert(collections)
      .values({ name: col.collection, slug: makeSlug(col.collection) })
      .returning();
    console.log(`📁 Collection: ${col.collection}`);

    for (const cat of col.categories) {
      // Insert category
      await db.insert(categories).values({
        name: cat.name,
        slug: makeSlug(cat.name),
        collection_id: insertedCollection.id,
        image_url: img(imgSeed++, 200),
      });
      console.log(`  📂 Category: ${cat.name}`);

      for (const sc of cat.subcollections) {
        // Insert subcollection
        const [insertedSC] = await db
          .insert(subcollections)
          .values({
            name: sc.name,
            category_slug: makeSlug(cat.name),
          })
          .returning();

        for (const subcat of sc.subcategories) {
          // Insert subcategory
          const subcatSlug = makeSlug(subcat.name);
          await db.insert(subcategories).values({
            name: subcat.name,
            slug: subcatSlug,
            subcollection_id: insertedSC.id,
            image_url: img(imgSeed++, 200),
          });

          // Insert products
          const productRows = subcat.products.map((pName) => {
            const slug = makeSlug(pName) + "-" + imgSeed;
            const price = (Math.random() * 120 + 2.99).toFixed(2);
            const description = randomDescription(pName);
            const image_url = img(imgSeed++);
            return {
              name: pName,
              slug,
              description,
              price,
              subcategory_slug: subcatSlug,
              image_url,
            };
          });
          await db.insert(products).values(productRows);
          totalProducts += productRows.length;
        }
      }
    }
  }

  console.log(`\n✅ Seeded successfully!`);
  console.log(`   Collections: ${catalog.length}`);
  console.log(`   Categories:  ${catalog.reduce((a, c) => a + c.categories.length, 0)}`);
  console.log(`   Products:    ${totalProducts}`);
}

function randomDescription(productName: string): string {
  const descriptions = [
    `${productName} — crafted for artists who demand precision and quality. Ideal for studio and plein air work.`,
    `Premium quality ${productName.toLowerCase()}. Smooth, reliable, and built to last through countless creative sessions.`,
    `Whether you're a beginner or professional, the ${productName} delivers outstanding results every time.`,
    `Elevate your art with ${productName}. Consistent performance with vibrant, lightfast results.`,
    `The ${productName} combines exceptional value with professional-grade quality. A studio essential.`,
    `Designed for the modern artist, ${productName} offers superior handling and rich, saturated output.`,
    `${productName}: trusted by art educators and professionals worldwide. Perfect for all skill levels.`,
    `Discover the difference with ${productName}. Sustainably made with premium, archival-quality materials.`,
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed error:", err);
    process.exit(1);
  });
