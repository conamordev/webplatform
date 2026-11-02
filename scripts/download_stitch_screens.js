const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = process.env.STITCH_PROJECT_ID || '6501009366121445546';
const API_KEY = process.env.STITCH_API_KEY || '';

const SCREENS = [
  { id: 'a34978188f4d4641a81f0e47b38e20b4', name: 'inicio-sin-sesion', title: 'Página de Inicio - sin iniciar sesion' },
  { id: 'b5b7f4b7f4084ff29267159452554f33', name: 'inicio-con-sesion', title: 'pagina - inicio - sesion iniciada' },
  { id: '9313acecc9c341cbad1a7ac30adfa25c', name: 'buscar-eventos', title: 'pagina - buscar eventos' },
  { id: '909ba074f60d4fc1a717710fc600514d', name: 'buscar-eventos-encontrados', title: 'pagina - buscar eventos - eventos encontrados' },
  { id: '4ab6958426914e15bd7a0102e266cc1e', name: 'iniciar-sesion', title: 'pagina - iniciar sesion' },
  { id: 'e15428bc746e45dfbe703adc672e72a8', name: 'registro', title: 'pagina- registro' },
  { id: '9037060c56eb4e05933194bb071afafe', name: 'contacto', title: 'Pagina-contacto' },
  { id: 'fe28aa7b473043d2aa4cb08a2f8b725d', name: 'como-crear-evento', title: 'pagina-como crear evento' },
  { id: 'c7e8f9ff5a90429c96050446a58ac8a4', name: 'crear-evento', title: 'pagina-crear evento' },
  { id: '7ab5ce9098fd47f99ceb785825182d37', name: 'config-evento-info', title: 'pagina configuracion del evento - seccion informacion del evento' },
  { id: '3f2dc6ae6cd840659266d1130abba720', name: 'config-evento-anfitriones-permisos', title: 'pagina configuracion del evento - seccion detalles de anfitriones y permisos' },
  { id: '4aa04aeed6494752b9f8249d03e8f7ee', name: 'config-evento-detalles', title: 'pagina configuracion del evento - seccion detalles del evento' },
  { id: '87e5ec7640aa4868b0053f3cea418962', name: 'config-evento-colores-tipografia', title: 'pagina configuracion del evento - mostrando paleta de colores y tipografia' },
  { id: 'b3cb0c458a6f4eab80dc3ee7f74bbdef', name: 'config-evento-lista-regalos', title: 'pagina configuracion del evento - seccion lista de regalos' },
  { id: '76214cace8da4e55923fb9f1fe56905c', name: 'invitado-evento', title: 'pagina vista de invitado - seccion evento' },
  { id: 'f8bf9f54b23b4dd9a4463bad77e9a5f7', name: 'invitado-mesa-regalos', title: 'pagina vista de invitado - seccion mesa de regalos' },
  { id: '3ce98b905c5c46e6b3ee0aa7ee81aaf0', name: 'invitado-detalle-regalo', title: 'pagina vista de invitado - seccion detalles de regalo' },
  { id: 'cba057d3ec7d4fd5b53a28c8899eadb8', name: 'invitado-pago-regalo', title: 'pagina vista de invitado - seccion pago de regalo' },
  { id: '8eea1eeaa2734e6c8506011fe3921cc3', name: 'invitado-dedicatorias', title: 'pagina vista de invitado - seccion dedicatorias' },
  { id: 'c5c6e7565f7f4faeb80e5b1267af93cc', name: 'invitado-confirmacion-rsvp', title: 'pagina vista de invitado - seccion Confirmación de Asistencia' },
  { id: '02701195f5ed44bbbdb9fe3b3399026f', name: 'perfil-mis-datos', title: 'Mi Perfil - seccion mis datos' },
  { id: '797c3aa06795415fa4e7afc474a2f074', name: 'perfil-resumen', title: 'mi perfil - seccion resumen' },
  { id: 'dbcb196a26ae41bb9a2abea66f0566fd', name: 'perfil-info-bancaria', title: 'Mi Perfil - seccion Información Bancaria' },
  { id: '4fe3060ab52849bc959aecb848264f0c', name: 'perfil-mis-eventos', title: 'Mi Perfil - seccion mis eventos' },
  { id: '50417da6c1614eacb4453fd93396a9d2', name: 'error-400', title: 'pagina-error-400' },
  { id: '528f4c21f724491d88a198c7596a4d11', name: 'error-500', title: 'pagina-error-500' },
  { id: '6f2ed159350549b8b5f52ba2e8a29813', name: 'perfil-mi-cuenta', title: 'Mi Perfil - seccion mi cuenta' },
  { id: '04634bb565e747ad9a039fd174763f32', name: 'aviso-legal', title: 'pagina - aviso legal' },
];

let reqId = 1;
function callMcp(method, args) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      id: reqId++,
      method: 'tools/call',
      params: { name: method, arguments: args }
    });

    const req = https.request('https://stitch.googleapis.com/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.error) return reject(new Error(JSON.stringify(parsed.error)));
          resolve(parsed.result);
        } catch (e) {
          reject(new Error(e.message + ': ' + body.slice(0, 300)));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function fetchDownloadUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': API_KEY
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          reject(new Error(e.message + ': ' + body.slice(0, 300)));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'stitch_screens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifest = [];

  console.log(`Starting download of ${SCREENS.length} screens from project ${PROJECT_ID}...`);

  for (let i = 0; i < SCREENS.length; i++) {
    const screenMeta = SCREENS[i];
    const prefix = String(i + 1).padStart(2, '0');
    const folderName = `${prefix}_${screenMeta.name}`;
    const screenDir = path.join(outputDir, folderName);
    if (!fs.existsSync(screenDir)) {
      fs.mkdirSync(screenDir, { recursive: true });
    }

    console.log(`[${i + 1}/${SCREENS.length}] Fetching screen details: ${screenMeta.title} (${screenMeta.id})...`);
    try {
      const screenDetails = await callMcp('get_screen', {
        name: `projects/${PROJECT_ID}/screens/${screenMeta.id}`
      });

      const structured = screenDetails?.structuredContent;
      if (!structured) {
        console.error(`  Warning: No structuredContent for ${screenMeta.id}`);
        continue;
      }

      fs.writeFileSync(path.join(screenDir, 'meta.json'), JSON.stringify(structured, null, 2));

      // Download HTML code
      if (structured.htmlCode?.name) {
        console.log(`  Downloading HTML code...`);
        const fileRes = await callMcp('download_file', { name: structured.htmlCode.name });
        const html = fileRes?.structuredContent?.html;
        if (html) {
          fs.writeFileSync(path.join(screenDir, 'index.html'), html);
          console.log(`  Saved HTML (${html.length} bytes)`);
        } else {
          console.warn(`  No HTML returned in structuredContent`);
        }
      }

      // Download Screenshot Image
      if (structured.screenshot?.downloadUrl) {
        console.log(`  Downloading screenshot image...`);
        const imgData = await fetchDownloadUrl(structured.screenshot.downloadUrl);
        if (imgData?.dataString) {
          const buffer = Buffer.from(imgData.dataString, 'base64');
          fs.writeFileSync(path.join(screenDir, 'screenshot.png'), buffer);
          console.log(`  Saved screenshot.png (${buffer.length} bytes)`);
        } else {
          console.warn(`  No dataString in screenshot response`);
        }
      }

      manifest.push({
        index: i + 1,
        id: screenMeta.id,
        folder: folderName,
        title: structured.title || screenMeta.title,
        width: structured.width,
        height: structured.height,
        deviceType: structured.deviceType
      });

    } catch (err) {
      console.error(`  Error processing ${screenMeta.id}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nCompleted! Downloaded ${manifest.length}/${SCREENS.length} screens to ${outputDir}`);
}

main().catch(console.error);
