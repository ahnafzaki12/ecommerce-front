import Header from "@/components/Header";
import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";

interface ProductType {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
}

interface ProductsPageProps {
  products: ProductType[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">All Products</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse our full catalog of high-quality items
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: ProductType) => (
              <Link key={product._id} href={`/products/${product._id}`} passHref>
                <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-50">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-black">${product.price}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault(); // karena dibungkus Link
                        addProduct(product._id.toString());
                      }}
                      className="w-full bg-black text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
