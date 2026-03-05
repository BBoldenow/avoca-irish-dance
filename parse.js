import fs from 'fs';
const d = JSON.parse(fs.readFileSync('./lighthouse.json', 'utf8'));
console.log('--- SCORES ---');
for (const [k, v] of Object.entries(d.categories)) {
    console.log(`${v.title}: ${Math.round(v.score * 100)}`);
}
console.log('\n--- TOP ISSUES ---');
const issues = Object.values(d.audits)
    .filter(a => a.score !== null && a.score < 1 && a.weight !== 0)
    .sort((a, b) => a.score - b.score);
for (const issue of issues) {
    console.log(`[${issue.id}] Score: ${issue.score} | ${issue.title}`);
    if (issue.displayValue) console.log(`    ${issue.displayValue}`);
}
