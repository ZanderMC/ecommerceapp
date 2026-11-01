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
         <section className=" flex flex-row flex-1/2 my-32 mx-[4rem] gap-20">
            
                 <img
                 className="aspect-auto h-[10vh]  -mr-10"
      src={product.image_url}
      
      alt="Picture of the author"
    />
    <img
    className="aspect-auto w-[45vw] "
      src={product.image_url}
      
      alt="Picture of the author"
    />
                <div className="flex flex-col">
                    <h1 className="text-6xl mt-4">{product.name}</h1>
                    <span className="text-xl font-bold mt-4">{product.price} SOLES</span>
                    <span className="block mb-2 font-semibold mt-4">Descripción</span>
                    <p>{product.description}</p>
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

 