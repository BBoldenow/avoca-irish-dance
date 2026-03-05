import fs from 'fs';
const d = JSON.parse(fs.readFileSync('./lighthouse.json', 'utf8'));
console.log('--- CONSOLE ERRORS ---');
const errors = d.audits['errors-in-console'].details?.items || [];
console.log(errors);

console.log('\n--- LCP ELEMENT ---');
const lcp = d.audits['largest-contentful-paint-element'].details?.items || [];
console.log(lcp);

console.log('\n--- LABEL MISMATCH ---');
const labels = d.audits['label-content-name-mismatch'].details?.items || [];
console.log(labels);
