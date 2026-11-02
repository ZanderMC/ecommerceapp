import { AddToCart } from "@/app/components/AddToCart";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const instant = false

export default async function ProductPage({ params}: PageProps){
  const { id } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return   <h1>Producto no encontrado</h1>;
  }

  
    return (
       
         <>
         <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:grid lg:grid-cols-[minmax(0,80px)_minmax(0,1fr)_minmax(280px,0.8fr)] lg:gap-8 lg:px-12 lg:py-20">
            
                 <img
                 className="hidden aspect-square w-full object-cover lg:block"
      src={product.image_url}
      
      alt="Picture of the author"
    />
    <img
    className="aspect-[3/4] w-full object-cover"
      src={product.image_url}
      
      alt="Picture of the author"
    />
                <div className="flex min-w-0 flex-col">
                    <h1 className="mt-1 text-3xl font-semibold sm:text-5xl lg:text-6xl">{product.name}</h1>
                    <span className="mt-4 text-xl font-bold">{product.price} SOLES</span>
                    <span className="mb-2 mt-6 block font-semibold">Descripción</span>
                    <p className="leading-7 text-black/70">{product.description}</p>
                    <AddToCart
                      product={{
                        id: product.id,
                        name: product.name,
                        price: Number(product.price),
                        image_url: product.image_url,
                      }}
                      sizes={(product.sizes ?? []) as string[]}
                    />
                </div>
            </section>

 

     </>
    )
}

 