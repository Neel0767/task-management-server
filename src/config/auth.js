module.exports = {
  secret: process.env.JWT_SECRET,
  // jwtExpiration: 3600,         // 1 hour
  // jwtRefreshExpiration: 86400, // 24 hours

  jwtExpiration: process.env.JWT_EXPIRY,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRY,
}
