"use server";
import api from "@/lib/axios";
import axios from "axios";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),

  // .coerce automatically converts "49.99" (string) to 49.99 (number)
  price: z.coerce
    .number()
    .positive("Price must be greater than zero")
    .multipleOf(0.01, "Price cannot have more than 2 decimal places"),

  stockQuantity: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(1, "Stock cannot be negative"),

  // Ensures a category is actually selected (assuming 0 or null is the default 'Select' value)
  categoryId: z.coerce
    .number({
      invalid_type_error: "Please select a valid category",
    })
    .positive("You must select a category"),
});

const ProductImageSchema = z.object({
  images: z
    .array(z.any())
    .min(1, { message: "At least one image is required." })
    .max(5, { message: "You can upload a maximum of 5 images." })
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Each image must be less than 5MB.",
    })
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      { message: "Only .jpg, .jpeg, .png and .webp formats are supported." },
    ),
});

export async function addProductAction(prevState: any, formData: FormData) {
  const files = formData.getAll("images") as File[];

  const validFiles = files.filter(
    (file) => file.name !== "undefined" && file.size > 0,
  );
  // Validate product fields
  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stockQuantity: formData.get("stockQuantity"),
    categoryId: formData.get("category"),
  });
  // validate product images
  const validatedImages = ProductImageSchema.safeParse({
    images: validFiles,
  });

  // If either fails, merge errors and return
  if (!validatedFields.success || !validatedImages.success) {
    return {
      errors: {
        ...(validatedFields.success
          ? {}
          : validatedFields.error.flatten().fieldErrors),
        ...(validatedImages.success
          ? {}
          : validatedImages.error.flatten().fieldErrors),
      },
      message: "Validation Failed",
    };
  }

  // Post product data to backend
  const dataToSend = new FormData();
  const productBlob = new Blob(
    [
      JSON.stringify({
        ...validatedFields.data,
      }),
    ],
    {
      type: "application/json",
    },
  );

  dataToSend.append("product", productBlob);
  files.forEach((file) => dataToSend.append("images", file));

  try {
    // const response = await fetch("http://localhost:8080/product", {
    //   method: "POST",
    //   body: dataToSend, // FormData
    // });
    // If the request was not ok
    // if (!response.ok) {
    //   const error = await response.json();
    //   return {
    //     errors: {
    //       ...error,
    //     },
    //   };
    // }
    // If the request was ok
    return { ok: true };
  } catch (error) {
    console.log(error);
  }
}
