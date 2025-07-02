import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK!);


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.json('should be a POST request');
        return;
    }
    const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

    await mongooseConnect();

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productInfos = await Product.find({ _id: uniqueIds });

    const line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productInfos.find(p => p._id.toString() === productId);
        const quantity = productsIds.filter((id: string) => id === productId).length;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'IDR',
                    unit_amount: Math.floor(Number(productInfo.price)),
                    product_data: {
                        name: productInfo.title,
                    },
                },
            });

        }
    }
    const orderDoc = await Order.create({
        line_items, name, email, city, postalCode, streetAddress, country, paid: false,
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.URL + '/cart?success=1',
        cancel_url: process.env.URL + '/cart?canceled=1',
        metadata: { orderId: orderDoc._id.toString() },
    });

    res.json({
        url: session.url,
    })


}