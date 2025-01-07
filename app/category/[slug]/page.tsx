import { client } from "@/sanity/lib/client";
import CasinoComponent from "@/app/components/CasinoComponent";
import AnimatedSection from "@/app/components/AnimatedSection";
import { Casino } from '@/app/utils/interface';

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getCasinosByCategory(slug: string) {
  const query = `*[_type == "casino" && references(*[_type == "category" && slug.current == "${slug}"]._id)] | order(orderRank) {
    _id,
    offerTitle,
    offerUrl,
    offerDescription,
    offerText,
    rating,
    "imageUrl": casinoImage.asset->url,
    termsConditionsUrl,
    "categoryUrls": categoryUrls[] {
      "categoryId": category->_id,
      "categorySlug": category->slug.current,
      url,
      urlNumber
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    paymentMethods[]-> {
      _id,
      name,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}

async function getCategory(slug: string): Promise<Category> {
  const query = `*[_type == "category" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    description
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function CategoryPage({ params }: PageProps) {
  const casinos = await getCasinosByCategory(params.slug);
  const category: Category = await getCategory(params.slug);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <main className="relative">
   

        {/* Casino List Section */}
        <AnimatedSection className="w-full py-20 bg-[#0D0D0D]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative mb-16 text-center">
              {/* Background glow effect */}
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20 opacity-30" />
              
              {/* Section title with cyberpunk accents */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-cyan-400 mb-4">
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                  <span className="text-sm font-mono uppercase tracking-[0.2em]">SpinnerTop Selection</span>
                  <div className="w-12 h-[2px] bg-cyan-400"></div>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-display mb-4 text-white">
                  <span className="text-cyan-400">{category.title}</span> 
                </h1>
                
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {category.description}
                
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              {casinos.map((casino: Casino, index: number) => (
                <CasinoComponent
                  key={casino._id}
                  casino={casino}
                  index={index}
                  categorySlug={params.slug}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
