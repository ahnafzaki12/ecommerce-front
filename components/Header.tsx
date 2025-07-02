import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header(){

    const {cartProducts} = useContext(CartContext);

    return(
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href={"/"} className="text-2xl font-bold text-black tracking-tight hover:scale-105 transform transition-all duration-300 ease-out">
                        Store
                    </Link>
                    
                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-12">
                        <Link href={'/'} className="text-gray-600 hover:text-black text-base font-medium transition-all duration-300 relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href={'/products'} className="text-gray-600 hover:text-black text-base font-medium transition-all duration-300 relative group">
                            Products
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href={'/categories'} className="text-gray-600 hover:text-black text-base font-medium transition-all duration-300 relative group">
                            Categories
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-6">
                        <Link href={'/account'} className="text-gray-600 hover:text-black transition-all duration-300 p-2 hover:bg-gray-50 rounded-full transform hover:scale-110">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </Link>
                        <Link href={'/cart'} className="text-gray-600 hover:text-black transition-all duration-300 p-2 hover:bg-gray-50 rounded-full transform hover:scale-110 relative group">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" />
                            </svg>
                            <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center text-[11px] font-semibold transform group-hover:scale-110 transition-transform duration-300">
                                {cartProducts.length}
                            </span>
                        </Link>

                        {/* Mobile menu button */}
                        <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}