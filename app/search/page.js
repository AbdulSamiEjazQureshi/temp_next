import Image from "next/image";
import { getProductById } from "../lib/data/products";

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;

  const product = await getProductById(searchParams.article);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Search(props) {
  const searchParams = await props.searchParams;

  const product = await getProductById(searchParams.article);

  if (!product) {
    return <div>No Product Found with Article: {product.article}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Part Info</h1>

      <div className="flex items-start gap-2">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
        />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-lg">
            {product.title + " " + product.id + " " + product.brand}
          </span>
          <table>
            <tbody>
              <tr>
                <td>Manufacturer</td>
                <td>{product.brand}</td>
              </tr>
              <tr>
                <td>Part number</td>
                <td>{product.id}</td>
              </tr>
              <tr>
                <td>Title</td>
                <td>{product.title}</td>
              </tr>
            </tbody>
          </table>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
