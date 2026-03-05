import fs from 'fs';
const d = JSON.parse(fs.readFileSync('./lighthouse.json', 'utf8'));
const out = {
    errors: d.audits['errors-in-console'].details?.items || [],
    lcp: d.audits['largest-contentful-paint-element'].details?.items || [],
    labels: d.audits['label-content-name-mismatch'].details?.items || [],
    images: d.audits['modern-image-formats'].details?.items || []
};
console.log('START_JSON\n' + JSON.stringify(out, null, 2) + '\nEND_JSON');
