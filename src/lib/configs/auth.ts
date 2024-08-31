export default {
  meEndpoint: process.env.NEXT_PUBLIC_ME_ENDPOINT,
  loginEndpoint: 'https://api.dev.telegram.campaign.bucle.dev/auth/login',
  superAdminLoginEndpoint: process.env.NEXT_PUBLIC_LOGIN,
  dispensaryLoginEndpoint: '',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
};
