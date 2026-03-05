import fs from 'fs';
const d = JSON.parse(fs.readFileSync('./lighthouse2.json', 'utf8'));
const out = {
    lcp: d.audits['largest-contentful-paint-element'].details?.items || [],
    labels: d.audits['label-content-name-mismatch'].details?.items || [],
    images: d.audits['modern-image-formats'].details?.items || []
};
console.log('START_JSON\n' + JSON.stringify(out, null, 2) + '\nEND_JSON');
