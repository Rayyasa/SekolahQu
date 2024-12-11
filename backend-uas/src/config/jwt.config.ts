export const jwt_config = {
  access_token_secret: process.env.JWT_SECRET,
  expired: process.env.JWT_EXPIRED,
  refresh_token_secret: process.env.TOKEN_SECRET,
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.'
};
