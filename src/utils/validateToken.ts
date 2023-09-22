import jwt from "jsonwebtoken";

function validateToken(token: string) {
  const user = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err, user) => {
      if (err) throw new Error();
      return user;
    }
  );
  return user;
}

export default validateToken;
