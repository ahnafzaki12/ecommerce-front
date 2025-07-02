import mongoose, { model, Schema, models } from "mongoose";

// ✅ Tambahkan interface TypeScript di sini
export interface ProductType {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string; // atau: mongoose.Types.ObjectId jika kamu tidak pakai `JSON.parse(JSON.stringify(...))`
  properties?: Record<string, any>;
  timestamps?: {
  createdAt?: Date;
  updatedAt?: Date;
};
}

const ProductSchema = new Schema({
  title: { type: String, required: true }, // typo: require → required
  description: String,
  price: { type: Number, required: true }, // typo: require → required
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
}, {
    timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
