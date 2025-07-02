import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import mongooseConnect from "@/lib/mongoose";
import { Product, ProductType } from "@/models/Product";

export default function Home({
  featuredProduct,
  newProducts,
}: {
  featuredProduct: ProductType;
  newProducts: ProductType[];
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} /> {/* pastikan komponen ini menerima props-nya */}
    </div>
  );
}


export async function getServerSideProps() {
  const featuredProductId = "685cc82d94f63355b4c250eb";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit:10})
  if (!featuredProduct) {
    return {
      notFound: true, // akan tampilkan 404 page
    };
  }

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

