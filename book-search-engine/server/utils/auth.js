// import package
import jwt from 'jsonwebtoken';
// set token secret
const secret = 'thelastchallenge';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization || '';
// If no token is provided calls the next function and skips the authentication step
  if (!token) {
    return next();
  }
  try{
// Verifies the JWT using the provided secret key 
    const { data } = jwt.verify(token, secret);

    req.user = data;
    // Sets the `user` property on the request object to the extracted data from the JWT, making it available to subsequent middleware or route handlers
  } catch {
    console.log('Invalid token');
  }
// Calls the next function to proceed to the next middleware or route handler in the chain
  next();
};

export default authMiddleware;

 