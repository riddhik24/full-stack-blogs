import jwt from "jsonwebtoken";

const generateToken = (id, role_name, res) => {
  const token = jwt.sign(
    {
      id: id,
      role: role_name,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("JWT", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "None",
  });
};

export default generateToken;
