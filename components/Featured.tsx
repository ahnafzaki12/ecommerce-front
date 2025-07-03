import { ProductType } from "@/models/Product";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

type FeaturedProps = {
    product: ProductType;
};

export default function Featured({ product }: FeaturedProps) {
    const { addProduct } = useContext(CartContext);

    function addFeaturedToCart() {
       addProduct(product._id!.toString());
    }

    return (
        <section className="relative bg-gradient-to-br from-gray-50 to-white py-12 px-6 lg:px-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-gray-100 opacity-20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30 -translate-y-32 translate-x-32"></div>

            <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 text-black/60 text-sm font-medium mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            New Release
                        </div>

                        {/* Main heading */}
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                            {product.title}
                        </h1>

                        {/* Description */}
                        <p className="text-xl text-gray-600 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed mb-10 font-light">
                            {product.description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                            <button
                                onClick={addFeaturedToCart}
                                className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                Add to Cart
                            </button>
                            <Link href={`/products/${product._id}`} className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="https://ahnaf-next-ecommerce.s3.ap-southeast-2.amazonaws.com/1750911016486.jpeg"
                                alt="Product showcase"
                                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                            />
                            {/* Image overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
                        </div>

                        {/* Floating accent elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-20"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-pink-400 to-orange-400 rounded-full blur-xl opacity-15"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}