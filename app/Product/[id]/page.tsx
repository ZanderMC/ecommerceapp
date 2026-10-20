import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const instant = false

export default async function ProductPage({ params}: PageProps){
  
  const { id } = await params
  const { data: product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  
    return (
       
         <>
         <section className=" flex flex-row flex-1/2 my-32 mx-[4rem] gap-20">
                {/* <img className="aspect-auto h-[10vh]  -mr-10" src={product.image_url} alt={product.name}>
                <img className="aspect-auto w-[45vw] " src={product.image_url} alt={product.name}> */}
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
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mt-4">
                            <label htmlFor="size"  className="block mb-2 font-semibold">Selecciona una talla:</label>
                            <select id="size" name="size" className="border w-full  border-black px-2 py-3">
                                {product.sizes.map((size: any , id : number) => (
                                    <option value={size}  key={id} >{size}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mt-4 flex flex-col  gap-2">
                        <label htmlFor="quantity" className="block font-semibold">Cantidad:</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            // min={1}
                            // value={1}
                            className="border border-black px-2 py-3 w-16 text-center"
                        />
                    </div>

                    <button 
                        id="add-to-cart-btn"
                        className="mt-6 px-4 py-4 bg-black text-white rounded cursor-pointer hover:bg-black/90 transition-colors"
                        data-product={JSON.stringify(product)}
                    >
                        Añadir al carrito 
                    </button>
                </div>
            </section>

 

     </>
    )
}

 