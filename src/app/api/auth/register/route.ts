import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store the user in a database
    // 4. Send verification email

    // This is a mock implementation for demonstration purposes
    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName,
      email,
      createdAt: new Date().toISOString(),
    };

    // Return success
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
