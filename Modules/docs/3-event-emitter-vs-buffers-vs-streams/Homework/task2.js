// "homework": "node --experimental-modules --es-module-specifier-resolution=node task2.js"
import * as fs from "fs";
import { pipeline } from "stream";
import csv from "csvtojson";

const process = async () => {
    try {
        const readStream = fs.createReadStream("./bin/csv.csv");
        const writeStream = fs.createWriteStream("./bin/txt.txt");

        pipeline(
            readStream,
            csv({
                trim: true,
                delimiter: ";",
                headers: ["book", "author", "amount", "price"],
            }).subscribe((row) => {
                // Remove/transform needed rows.
                row.price = parseFloat(row.price.replace(",", "."));
                delete row.amount;
            }),
            writeStream,
            (error) => {
                if (error) {
                    console.error(`Error occurred in pipeline - ${error}`);
                    resolve({ errorMessage: error.message });
                }
            }
        );
    } catch (error) {
        console.error(error);
    }
};
process();
