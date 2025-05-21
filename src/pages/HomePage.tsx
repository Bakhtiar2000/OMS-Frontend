import ProductCard from "../component/ProductCard";
import useProducts from "../hook/useProducts";
import type { TProduct } from "../types/product.type";
import PageLoader from "../utils/PageLoader";

const HomePage = () => {
  const { productsData, productsLoading, productsRefetch } = useProducts();
  if (productsLoading) return <PageLoader />;
  return (
    <section className="max-w-[1400px] mx-auto my-10">
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {productsData &&
          productsData.length > 0 &&
          productsData.map((product: TProduct) => (
            <ProductCard
              product={product}
              refetch={productsRefetch}
              key={product._id}
            />
          ))}
      </div>
    </section>
  );
};

export default HomePage;
