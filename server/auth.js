import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  // eslint-disable-next-line no-undef
  return jwt.sign(payload, process.env.Secret);
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);
  jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.Secret,
    (err, decodedToken) => {
      if (err) {
        return res.sendStatus(400);
      } else {
        req.userId = decodedToken.id;
        next();
      }
    }
  );
};
