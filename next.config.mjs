/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer, dev, webpack }) => {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      }
   
      config.externals.push(
        'pino-pretty',
        'lokijs',
        'encoding'
      )
   
      return config
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: false
        }
      ]
    }
  }
   
  export default nextConfig