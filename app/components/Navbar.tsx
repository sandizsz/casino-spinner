import { client } from "@/sanity/lib/client";
import { Category, Casino } from "../utils/interface";
import { NavbarClient } from "./NavbarClient";

async function getCategories() {
  const query = `*[_type == "category"] | order(_updatedAt desc) {
    title,
    slug,
    _id
  }`;
  // Add revalidation
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

async function getCasinos() {
  const query = `*[_type == "casino"] | order(orderRank)[0...10] {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    "imageUrl": casinoImage.asset->url
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

const Navbar = async () => {
  const [categories, casinos] = await Promise.all([
    getCategories(),
    getCasinos()
  ]);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#FF1745] to-[#1E2A44] shadow-lg">
      <NavbarClient categories={categories} casinos={casinos} />
    </header>
  );
};

export default Navbar;