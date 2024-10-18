import { Form, useNavigate, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom';
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
    product: Product
}

export async function action ({params}: ActionFunctionArgs) {
    if (params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/');
    }
}

export default function ProductDetails({product}: ProductDetailsProps) {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = product.availability;

    return (
        <tr className="border-b ">
            <td className=" font-ysabeau-office p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className=" font-ysabeau-office p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className=" font-ysabeau-office p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600' } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className=" font-ysabeau-office p-3 text-lg text-gray-800 ">
                <div className=" flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`productos/${product.id}/editar`)}
                        className=' font-ysabeau-office bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>
                    <Form
                        className='w-full'
                        method='POST'
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if(!confirm('¿Eliminar?')){
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className=' font-ysabeau-office bg-red-600 hover:bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
