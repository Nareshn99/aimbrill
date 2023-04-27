import jwt from "jsonwebtoken"


export const reqSignIn = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (typeof token == "undefined") return res.status(400).send({ status: false, message: "Token is missing" });
     
    jwt.verify(token, process.env.SECRET, function (err, data) {
      if (err) {
        return res.status(400).send({ status: false, message: err.message })
      } else {
        req.decodedToken = data;
        next()
      }
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ status: false, error: err.message })
  }
}