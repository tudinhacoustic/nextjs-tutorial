"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function handleLogin(sessionData: any) {
  const encryptedSessionData = await encrypt(sessionData); // Encrypt your session data
  const expires = new Date(Date.now() + 10 * 1000);
  cookies().set("session", encryptedSessionData, { expires, httpOnly: true });
  // Redirect or handle the response after setting the cookie
}
