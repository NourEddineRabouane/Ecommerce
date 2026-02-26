"use server";

import { z } from "zod";

// Define your schema
const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Must be greather than 3 character"),
});

export async function signupAction(prevState: any, formData: FormData) {
  const validatedFields = SignupSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const res = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (!res.ok) {
      console.log(result);
    }
  } catch (e) {}

  console.log("User data received on server:", validatedFields.data);

  return { success: "Account created successfully!" };
}
