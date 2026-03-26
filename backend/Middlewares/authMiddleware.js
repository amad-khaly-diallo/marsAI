const { verifyToken } = require('../Utils/jwt.utils');

const authenticate = (req, res, next) => {
  // Priorité au header Authorization: Bearer <token>,
  // sinon fallback sur le cookie "token" (compat local).
  const auth = req.headers.authorization || '';
  const [type, headerToken] = auth.split(' ');
  const cookieToken = req.cookies?.token;
  const token =
    type === 'Bearer' && headerToken
      ? headerToken
      : cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
};

// Middleware pour vérifier rôle
const authorize = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        next();
    };
};

// Middleware optionnel : set req.user si token valide, sans bloquer si absent
const optionalAuthenticate = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const [type, headerToken] = auth.split(' ');
  const cookieToken = req.cookies?.token;
  const token = type === 'Bearer' && headerToken ? headerToken : cookieToken;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) req.user = decoded;
  }
  next();
};

module.exports = { authenticate, authorize, optionalAuthenticate };
