 
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

 


export async function GetAllProducts() {

    const { data: products, error } = await supabase
        .from('Product')
        .select('*');

    if (error) {
        return (
            <p>
                Error al consultar la tabla test: {error.message}
            </p>
        );
    }



    return (
        <>
            {  <div className="w-full h-auto grid grid-cols-4 gap-8">
                           
                            {products && products.length > 0 ? (
                                products.map(item => (
                                    <Link  href={`/Product/${item.id}/`} className="w-full h-[75vh]" key={item.id}>
                                        <div className="w-full h-[60vh]  ">
                                            {/* Cambia 'campo_imagen' por tu campo de imagen */}
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span>imagen</span>
                                            )}
                                        </div>
                                        {/* Cambia 'name' y 'campo_precio' por tus campos */}
                                        <div className="pt-3 px-4">
                                            <h2 className="text-[1.5rem] font-medium ">{item.name || 'NOMBRE DEL PRODUCTO'}</h2>
                                            <span className="text-xs font-light">{item.price ? `${item.price} SOLES` : '50 SOLES'}</span>
                                        </div>

                                    </Link>
                                ))
                            ) : (
                                <div className="w-full h-[75vh] bg-amber-400">
                                    <div className="w-full h-[60vh] bg-red-400">No hay datos</div>
                                    <h2>NOMBRE DEL PRODUCTO</h2>
                                    <span>50 SOLES</span>
                                </div>
                            )}
                        </div>
               
               
            }

            
        </>
    );
}

