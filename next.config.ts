import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Mantener ESLint pero con configuración personalizada
    // ignoreDuringBuilds: false,
    dirs: ["app", "pages", "components", "src"] // Solo escanea estos directorios
  },
  webpack: config => {
    // Ignorar archivos específicos durante la compilación
    config.resolve.alias = {
      ...config.resolve.alias
    };

    // Agregar regla para excluir archivos generados
    config.module.rules.push({
      test: /lib\/generated/,
      use: "ignore-loader"
    });

    return config;
  }
};

export default nextConfig;
