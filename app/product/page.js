import Link from "next/link";
import { getAllProducts } from "../lib/data/products";
import PaginationFooter from "./_components/pagination_footer";

export default async function Products(props) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const limit = 50;
  const data = await getAllProducts(currentPage, limit);
  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shop By Product</h1>
      <h2 className="text-lg font-bold mb-4">About {data.total} Results</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Id</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Price
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  className="text-blue-500 underline"
                  href={`/product/${product.id}-${product.brand}/${product.id}`}
                >
                  {product.id}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.description.substring(0, 15)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-center p-4">
              <PaginationFooter
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
