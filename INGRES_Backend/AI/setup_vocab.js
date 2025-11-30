const XLSX = require('xlsx');
const fs = require('fs');


// this is a file which might come handy so dont delete it , it is used for extraction of unique names
// CONFIGURATION
const FILE_NAME = "Data2024Final2.xlsx"; // Your Excel File
const OUTPUT_FILE = 'vocab.json';

console.log("Reading Excel file...");
const workbook = XLSX.readFile(FILE_NAME);
const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Read first sheet
const data = XLSX.utils.sheet_to_json(sheet);

// We will store items like: { name: "Pune", type: "District" }
let vocabulary = [];
let seen = new Set(); // To avoid duplicates

data.forEach(row => {
    // 1. Process State
    if (row['State']) {
        const val = row['State'].trim();
        const key = val.toLowerCase() + "_state";
        if (!seen.has(key)) {
            vocabulary.push({ name: val, type: 'State' });
            seen.add(key);
        }
    }
    // 2. Process District
    if (row['District']) {
        const val = row['District'].trim();
        const key = val.toLowerCase() + "_district";
        if (!seen.has(key)) {
            vocabulary.push({ name: val, type: 'District' });
            seen.add(key);
        }
    }
    // 3. Process Assessment Unit Name (Block)
    if (row['Assessment Unit  Name']) { // Note the double space in your header
        const val = row['Assessment Unit  Name'].trim();
        const key = val.toLowerCase() + "_aun";
        if (!seen.has(key)) {
            vocabulary.push({ name: val, type: 'Assessment Unit Name' });
            seen.add(key);
        }
    }
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(vocabulary, null, 2));
console.log(`✅ Success! Extracted ${vocabulary.length} unique entities to ${OUTPUT_FILE}`);