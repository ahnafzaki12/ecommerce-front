import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "@/models/Product";



export default function CartPage() {
    const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts])

    function moreOfThisProduct(id: string | undefined) {
        if (!id) return;
        addProduct(id);
    }

    function lessOfThisProduct(id: string | undefined) {
        if (!id) return;
        removeProduct(id);
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.href.includes('success')) {
            setIsSuccess(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.href.includes('success')) {
            clearCart();
            localStorage.removeItem("cart");
        }
    }, []);

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
        });

        if (response.data.url) {
            window.location = response.data.url;
        }

    }

    if (isSuccess) {
        return (
            <>
                <Header />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                    <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
                        <h1 className="text-2xl font-semibold text-green-600 mb-4">
                            🎉 Thanks for your order!
                        </h1>
                        <p className="text-gray-600">
                            We will email you when the order is on its way.
                        </p>
                    </div>
                </div>
            </>
        );
    }


    return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          {!cartProducts?.length && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-8 border border-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-normal text-black mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-sm">Start shopping to add items to your cart</p>
            </div>
          )}
        </div>

        {cartProducts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-normal text-black">Cart</h2>
                </div>

                <div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-normal text-gray-600 text-xs uppercase">Product</th>
                        <th className="text-center py-4 px-6 font-normal text-gray-600 text-xs uppercase">Quantity</th>
                        <th className="text-right py-4 px-6 font-normal text-gray-600 text-xs uppercase">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-b border-gray-100">
                          <td className="py-6 px-6">
                            <div className="flex items-center space-x-4">
                              <img
                                src={product.images?.[0] || "/placeholder.jpg"}
                                alt={product.title}
                                className="w-12 h-12 object-cover"
                              />
                              <div>
                                <h3 className="font-normal text-black text-sm">{product.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">Product details</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-6 text-center">
                            <div className="inline-flex items-center space-x-4">
                              <button
                                onClick={() => lessOfThisProduct(product._id)}
                                className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs"
                              >
                                −
                              </button>
                              <span className="font-normal text-black text-sm min-w-[1rem] text-center">
                                {cartProducts.filter((id) => id === product._id).length}
                              </span>
                              <button
                                onClick={() => moreOfThisProduct(product._id)}
                                className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-6 px-6 text-right">
                            <span className="font-normal text-black text-sm">
                              Rp{cartProducts.filter((id) => id === product._id).length * product.price}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t border-gray-300">
                        <td className="py-4 px-6"></td>
                        <td className="py-4 px-6 text-center font-normal text-black text-sm">Total</td>
                        <td className="py-4 px-6 text-right font-normal text-black">Rp{total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {!!cartProducts?.length && (
              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6">
                  <h2 className="text-lg font-normal text-black mb-8">Order Information</h2>

                  <div className="space-y-4 mb-8">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-sm"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        name="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 text-sm"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      name="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-sm"
                    />
                  </div>

                  <button onClick={goToPayment} className="w-full bg-black text-white py-3 px-6 text-sm font-normal">
                    Continue to payment
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">Secure checkout</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}