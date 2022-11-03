import fs from 'fs';
import { promisify } from "util";
import { pipeline } from 'stream/promises';
import CSVToJSON from "csvtojson";

const pipelineAsync = promisify(pipeline);
const CSV_FILENAME = '../bin/csv.csv';
const TXT_FILENAME = '../bin/write.txt';

const readable = fs.createReadStream(CSV_FILENAME)
const writable = fs.createWriteStream(TXT_FILENAME);

const transform = CSVToJSON({ delimiter: ";" }).fromStream(readable)
    .then(csv => {
        return csv
            .map(obj => {
                const myObjLower = lowercaseKeys(obj)
                return JSON.stringify(myObjLower)
            })
            .join('\n');
    });

const lowercaseKeys = obj =>
    Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {});


(async function run() {
    try{
        await pipelineAsync(
            readable,
            transform,
            writable
        );
        console.log("Pipeline accomplished.");
    }

    catch(err) {
        console.error('Pipeline failed with error: ', err);
    }
})();
