// import jwt from "jsonwebtoken";

// export const checkAuth = (req, res, next) => {
//   //Get Token
//   const token = req.cookies.node_api_token;

//   if (!token) {
//     return res.json({
//       error: "invalid Token",
//     });
//   }
//   try {
//     // Verify the token valid or invalid
//     req.user = jwt.verify(token, process.env.SECRET_JWT);

//     //if OK ---> next()
//     next();

//     //if NOT ok ---> send (401) "unauthorized"
//   } catch {
//     return res.status(401).json({
//       error: "invalid token",
//     });
//   }
// };

import jwt from "jsonwebtoken";

// runs before any protected route — checks JWT cookie, attaches user to req
export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.node_api_token;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
};
