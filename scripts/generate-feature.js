import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración para ES Modules en Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const featureName = process.argv[2];

if (!featureName) {
  console.error(
    "❌ Error: Necesitás proveer un nombre. Ejemplo: node scripts/generate-feature.js auth",
  );
  process.exit(1);
}

const featureDir = path.join(
  __dirname,
  "..",
  "packages",
  "features",
  featureName,
);
const srcDir = path.join(featureDir, "src");

console.log(`🚀 Generando feature: @mas-copies/${featureName}...`);

try {
  // 1. Crear estructura de carpetas
  fs.mkdirSync(path.join(srcDir, "components"), { recursive: true });
  fs.mkdirSync(path.join(srcDir, "store"), { recursive: true });

  // 2. Crear package.json
  const pkgJson = {
    name: `@mas-copies/${featureName}`,
    version: "1.0.0",
    main: "src/index.ts",
    types: "src/index.ts",
    private: true,
  };
  fs.writeFileSync(
    path.join(featureDir, "package.json"),
    JSON.stringify(pkgJson, null, 2),
  );

  // 3. Crear index.ts base
  const indexContent = `// Public API para la feature ${featureName}\nexport {};\n`;
  fs.writeFileSync(path.join(srcDir, "index.ts"), indexContent);

  console.log(`✅ Carpetas y archivos base creados.`);
  console.log(
    `\n⚠️ IMPORTANTE: No olvides agregar estos paths en tu tsconfig.json y tsconfig.app.json:`,
  );
  console.log(
    `"@mas-copies/${featureName}": ["packages/features/${featureName}/src/index.ts"],`,
  );
  console.log(
    `"@mas-copies/${featureName}/*": ["packages/features/${featureName}/src/*"]\n`,
  );
} catch (error) {
  console.error("❌ Hubo un error creando la feature:", error);
}
