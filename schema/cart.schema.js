import z from "zod";

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  products: [
    {
      id: z.string(),
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().positive(),
      image: z.string(),
      quantity: z.number().int(),
    },
  ],
});

/*

import { z } from "zod";

// shape for POST /api/cart — adding item to cart
export const addToCartSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  quantity: z.number().int().positive(),
});

// shape for PATCH /api/cart/:productId — only quantity changes
export const updateCartSchema = z.object({
  quantity: z.number().int().positive(),
});

*/
