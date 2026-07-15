import jwt from "jsonwebtoken"

function generateToken(id){
    const token = jwt.sign({
  data: id
}, process.env.SECRET_KEY_FOR_ENCRPT, { expiresIn: "30d" });

return token

}
export {generateToken}