/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            'undici',
            'firebase',
            '@firebase/storage',
            '@firebase/app',
        ],
    },
    images: {
        remotePatterns: [
            {
                hostname: 'firebasestorage.googleapis.com',
                protocol: 'https'
            }
        ]
    }
};

export default nextConfig;
