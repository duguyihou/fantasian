export default () => ({
  jwt_secret: process.env.JWT_SECRET || 'aksmdaasdnjasjjdansjdnasjdnjweunjwe',
  jwt_expiresIn: process.env.JWT_EXPIRESIN || '12d',
});
