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
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    {!cartProducts?.length && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500">Start shopping to add items to your cart</p>
                        </div>
                    )}
                </div>

                {cartProducts.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900">Cart</h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-4 px-6 font-medium text-gray-700 text-sm uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th className="text-center py-4 px-6 font-medium text-gray-700 text-sm uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th className="text-right py-4 px-6 font-medium text-gray-700 text-sm uppercase tracking-wider">
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {products.map(product => (
                                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-6 px-6">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={product.images?.[0] || "/placeholder.jpg"}
                                                                alt={product.title}
                                                                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                                                            />
                                                            <div>
                                                                <h3 className="font-medium text-gray-900">{product.title}</h3>
                                                                <p className="text-sm text-gray-500 mt-1">Product details</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-6 text-center">
                                                        <div className="inline-flex items-center space-x-3">
                                                            <button
                                                                onClick={() => lessOfThisProduct(product._id)}
                                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                                </svg>
                                                            </button>
                                                            <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                                                {cartProducts.filter(id => id === product._id).length}
                                                            </span>
                                                            <button
                                                                onClick={() => moreOfThisProduct(product._id)}
                                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-6 text-right">
                                                        <span className="font-semibold text-gray-900">Rp{cartProducts.filter(id => id === product._id).length * product.price}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>Rp{total}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        {!!cartProducts?.length && (
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Information</h2>

                                    <div className="space-y-4 mb-6">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            name="name"
                                            onChange={ev => setName(ev.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            value={email}
                                            name="email"
                                            onChange={ev => setEmail(ev.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                        />
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={city}
                                                name="city"
                                                onChange={ev => setCity(ev.target.value)}
                                                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Postal Code"
                                                value={postalCode}
                                                name="postalCode"
                                                onChange={ev => setPostalCode(ev.target.value)}
                                                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Street Address"
                                            value={streetAddress}
                                            name="streetAddress"
                                            onChange={ev => setStreetAddress(ev.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Country"
                                            value={country}
                                            name="country"
                                            onChange={ev => setCountry(ev.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                        />
                                    </div>
                                    <button onClick={goToPayment} className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-300 focus:outline-none">
                                        Continue to payment
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        Secure checkout powered by industry-standard encryption
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}