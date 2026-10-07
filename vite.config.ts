//@ts-nocheck
declare global {
  const Salla: any;
}
import { defineConfig } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
  sallaTransformPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

const seedScript = `
  (function() {
    try {
      const compName = 'promo-banner';
      const dataKey = 'form-builder::data_' + compName;
      const schemaKey = 'form-builder::' + compName;
      const existing = localStorage.getItem(dataKey);
      const raw = window.customComponentsRaw && window.customComponentsRaw[compName];
      let parsed = null;
      try { parsed = existing ? JSON.parse(existing) : null; } catch(e) {}
      const isOutdated = !parsed || typeof parsed.height_desktop !== 'number' || parsed.height_desktop > 100 || !parsed.slides || !parsed.slides[0] || !Array.isArray(parsed.slides[0].bg_type) || typeof parsed.slides[0].title !== 'object';
      if (raw && raw.fields && isOutdated) {
        const defaults = {};
        raw.fields.forEach(function(f) {
          if (f.id && f.id !== 'twilight-bundles-component-name') {
            if (f.value !== undefined) {
              defaults[f.id] = f.value;
            } else if (f.selected && f.selected[0]) {
              defaults[f.id] = f.selected[0].value;
            } else {
              defaults[f.id] = '';
            }
          }
        });
        localStorage.setItem(dataKey, JSON.stringify(defaults));
        localStorage.setItem(schemaKey, JSON.stringify(raw.fields));
      }
    } catch (e) {
      console.warn('Pre-seed script error:', e);
    }
  })();
`;

export default defineConfig({
  css: {
    postcss: {
      plugins: [],
    },
  },
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      preSeedScript: seedScript,
      js: seedScript,
    }),
    {
      name: 'salla-local-uploader-and-redirect',
      configureServer(server) {
        // 1. Root redirect to demo
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '') {
            res.writeHead(302, { Location: '/node_modules/.salla-temp/index.html' });
            res.end();
            return;
          }
          next();
        });

        // 2. Real local image/file uploader for Form Builder
        server.middlewares.use('/__salla_demo/uploader', (req, res) => {
          if (req.method === 'POST') {
            const chunks: Buffer[] = [];
            req.on('data', (c) => chunks.push(c));
            req.on('end', () => {
              try {
                const buffer = Buffer.concat(chunks);
                const contentType = req.headers['content-type'] || '';
                const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
                const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null;

                let filename = 'banner-' + Date.now() + '.jpg';
                let fileData = buffer;

                if (boundary) {
                  const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'));
                  if (headerEnd !== -1) {
                    const headerText = buffer.subarray(0, headerEnd).toString('utf8');
                    const fnMatch = headerText.match(/filename=["']?([^"'\r\n]+)["']?/i);
                    if (fnMatch && fnMatch[1]) {
                      const cleanFn = path.basename(fnMatch[1]).replace(/[^a-zA-Z0-9._-]/g, '_');
                      filename = Date.now() + '-' + cleanFn;
                    }
                    const boundaryEnd = buffer.indexOf(Buffer.from('--' + boundary + '--'));
                    const lastEnd = boundaryEnd !== -1 ? boundaryEnd - 2 : buffer.length;
                    fileData = buffer.subarray(headerEnd + 4, lastEnd);
                  }
                }

                const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
                if (!fs.existsSync(uploadsDir)) {
                  fs.mkdirSync(uploadsDir, { recursive: true });
                }

                const filePath = path.join(uploadsDir, filename);
                fs.writeFileSync(filePath, fileData);

                const resultUrl = '/uploads/' + filename;
                res.writeHead(200, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                });
                res.end(JSON.stringify({
                  status: 200,
                  success: true,
                  data: { url: resultUrl }
                }));
              } catch (err) {
                console.error('Uploader error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 500, success: false, error: String(err) }));
              }
            });
            return;
          }
          res.writeHead(405);
          res.end();
        });
      },
    },
  ],
});
