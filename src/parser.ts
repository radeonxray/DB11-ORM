export interface Schema {
    schemaName: string;
    entities: Array<object>;
}

const BASIC_TYPES = ["String", "Number"];
const TYPE_CONVERSION = ["VARCHAR(255)", "DECIMAL"];

export function generateSQL(schema: Schema) {
    if (!isValid(schema)) {
        throw Error(`Schema is invalid`);
    }
    let resultingSQL = `DROP DATABASE IF EXISTS ${schema.schemaName};\n`;
    resultingSQL += `CREATE DATABASE ${schema.schemaName};\n`;
    resultingSQL += `USE ${schema.schemaName};\n`;
    resultingSQL += getBasicTypesSQL(schema);
    resultingSQL += getAdvancedTypesSQL(schema);
    return resultingSQL;
}

function getBasicTypesSQL(schema: Schema) {
    let sql = "";
    schema.entities.forEach((table) => {
        const tableName = getKeys(table)[0];
        const columns = getKeys(table[tableName]);
        let tableSQL = `CREATE TABLE \`${tableName}\` (\n`;
        tableSQL += `   id int AUTO_INCREMENT PRIMARY KEY,\n`;
        columns.forEach((field) => {
            const fieldType = table[tableName][field];
            const basicType = getBasicType(fieldType);
            if (basicType) {
                tableSQL += `   ${field} ${basicType},\n`;
            }
        });
        tableSQL = tableSQL.substring(0, tableSQL.length - 2);
        tableSQL += `\n);\n`;
        sql += tableSQL;
    });
    return sql;
}

function getAdvancedTypesSQL(schema: Schema) {
    let sql = "";
    schema.entities.forEach((table) => {
        const tableName = getKeys(table)[0];
        const columns = getKeys(table[tableName]);
        let tableSQL = `ALTER TABLE \`${schema.schemaName}\`.\`${tableName}\`\n`;
        columns.forEach((field) => {
            const fieldType = table[tableName][field];
            const basicType = getBasicType(fieldType);
            if (!basicType) {
                tableSQL += `ADD COLUMN \`${field}\` int,\n`;
                tableSQL += `ADD FOREIGN KEY (\`${field}\`) REFERENCES \`${fieldType}\`(\`id\`),\n`;
            }
        });
        if (tableSQL.includes("ADD FOREIGN KEY")) {
            tableSQL = tableSQL.substring(0, tableSQL.length - 2);
            tableSQL += `;\n`;
            sql += tableSQL;
        }
    });
    return sql;
}

function isValid(schema: Schema) {
    if (!schema.schemaName) {
        throw Error(`Schema must have a valid schemaName`);
    }
    if (!schema.entities) {
        throw Error(`Schema must have valid entities`);
    }
    return true;
}

function getBasicType(type: string) {
    for (let i = 0; i < BASIC_TYPES.length; i++) {
        if (BASIC_TYPES[i].toLowerCase() === type.toLowerCase()) {
            return TYPE_CONVERSION[i];
        }
    }
    return false;
}

function getKeys(obj: object) {
    return Object.keys(obj);
}
