import * as path from 'path';
import * as fs from 'fs';
import { generateSQL, Schema } from './parser';
import { searchForJoiningTables } from './alterSchema';

const schemaPath = path.resolve(__dirname, '../schema.json');
const schemaFile = JSON.parse(fs.readFileSync(schemaPath).toString('utf8')) as Schema;

searchForJoiningTables(schemaFile);
const sql = generateSQL(schemaFile);
console.log(sql);

fs.writeFileSync(path.resolve(__dirname, '../schema.sql'), sql);
