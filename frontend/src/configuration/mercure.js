const MERCURE_HOST = process.env.VUE_APP_MERCURE_PUBLIC_URL;
export const mercureConfig = {
  url: MERCURE_HOST,
  globalTopic: 'https://localhost/books',
  bookTopic: 'https://localhost/books/:uuid'
}
