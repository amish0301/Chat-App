const cookieOptions = {
  // 15 days of expiration
  maxAge: "15d",
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

module.exports = { cookieOptions }