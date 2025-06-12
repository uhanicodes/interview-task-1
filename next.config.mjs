/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://res.cloudinary.com')],
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;