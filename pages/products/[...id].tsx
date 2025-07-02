"use client"

import Header from "@/components/Header"
import mongooseConnect from "@/lib/mongoose"
import { Product } from "@/models/Product"
import type { GetServerSidePropsContext } from "next"
import { useState } from "react"
import { CartContext } from "@/components/CartContext";
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useContext } from "react";

interface ProductType {
  _id: string
  title: string
  description: string
  price: number
  images: string[]
}

interface ProductPageProps {
  product: ProductType
}


export default function ProductPage({ product }: ProductPageProps) {
  const [activeImage, setActiveImage] = useState(product.images?.[0])
  const [quantity, setQuantity] = useState(1);

  const { addProduct } = useContext(CartContext);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Product Images */}
              <div className="p-8">
                {/* Main Image */}
                <div className="mb-6">
                  <img
                    src={activeImage || "/placeholder.svg?height=500&width=500"}
                    alt={product.title}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                  />
                </div>

                {/* Image Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(image)}
                      className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                        activeImage === image ? "ring-2 ring-black ring-offset-2" : "hover:opacity-75"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg?height=100&width=100"}
                        alt={`${product.title} - ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12 flex flex-col">
                <div className="flex-1">
                  {/* Product Title */}
                  <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight">{product.title}</h1>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(4.8) • 124 reviews</span>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-3xl font-light text-gray-900">${product.price}</span>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-3 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-3 font-medium">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-3 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                   onClick={(e) => {
                        e.preventDefault(); // karena dibungkus Link
                        addProduct(product._id.toString());
                      }}
                  className="w-full bg-black text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button className="w-full border border-gray-200 text-gray-900 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Add to Wishlist</span>
                  </button>
                </div>

                {/* Product Details */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SKU:</span>
                      <span className="text-gray-900">{product._id.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability:</span>
                      <span className="text-green-600">In Stock</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-gray-900">Free shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await mongooseConnect()
  const { id } = context.query
  const product = await Product.findById(id)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  }
}
