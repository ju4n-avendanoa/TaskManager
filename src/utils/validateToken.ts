import { jwtVerify } from "jose";

async function validateToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
  const user = await jwtVerify(token, secret);
  return user;
}

export default validateToken;
