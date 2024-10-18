import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action ({request}: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = '';
    if (Object.values(data).includes('')){
        error = "Todos los campos son obligatorios";
    }
    if (error.length){
        return error;
    }

    await addProduct(data);

    return redirect('/');
}

export default function NewProduct() {
    const error = useActionData() as string;

    return (
        <>
            <div className=" flex justify-between">
                <h2 className=" font-ysabeau-office text-4xl font-black text-slate-500">Registrar Producto</h2>
                <Link
                    to="/"
                    className=" font-ysabeau-office rounded-md px-3 py-5 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 text-center"
                >
                    Volver a Productos
                </Link>
            </div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Form
                className="mt-10"
                method='POST'
            >
                <ProductForm />
                <input
                    type="submit"
                    className=" font-ysabeau-office mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
