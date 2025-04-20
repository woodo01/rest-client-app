import createNextIntlPlugin from 'next-intl/plugin';
import { NextConfig } from "next/dist/server/config-shared";

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withNextIntl(nextConfig);