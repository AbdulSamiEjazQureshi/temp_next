import { getProductById } from "@/app/lib/data/products";
import Image from "next/image";
import ProductActions from "../_components/product-actions";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await getProductById(slug[1]);

  return {
    title: product.title,
  };
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;

  const product = await getProductById(slug[1]);

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

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
