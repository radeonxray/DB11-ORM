import { Schema } from "./parser";

function getTableIndex(schema: Schema, table: string) {
    for (let i = 0; i < schema.entities.length; i++) {
        let entity = schema.entities[i];
        const tableName = getKeys(entity)[0];
        if (tableName === table) {
            return i;
        }
    }
    throw Error(`No table with name: ${table} found`);
}

export function createJoiningTable(schema: Schema, currentTable: string, currentColumn: string, foreignTable: string, foreignColumn: string) {
    let currentIndex = getTableIndex(schema, currentTable);
    let foreignIndex = getTableIndex(schema, foreignTable);
    delete schema.entities[currentIndex][currentTable][currentColumn];
    delete schema.entities[foreignIndex][foreignTable][foreignColumn];
    const newEntity = {};
    newEntity[`${currentTable.toLowerCase()}_id`] = `${currentTable}`;
    newEntity[`${foreignTable.toLowerCase()}_id`] = `${foreignTable}`;
    let temp = {};
    temp[`${currentTable}_${foreignTable}`] = newEntity;
    schema.entities.push(temp);
}

function createInverseReference(schema: Schema, currentTable: string, currentColumn: string, foreignTable: string) {
    let currentIndex = getTableIndex(schema, currentTable);
    delete schema.entities[currentIndex][currentTable][currentColumn];
    let foreignIndex = getTableIndex(schema, foreignTable);
    schema.entities[foreignIndex][foreignTable][`${currentTable.toLowerCase()}`] = `${currentTable}`;
}

export function searchForJoiningTables(schema: Schema) {
    for (let i = 0; i < schema.entities.length; i++) {
        const tables = schema.entities[i];
        const tableName = getKeys(tables)[0];
        const columns = getKeys(tables[tableName]);
        for (let j = 0; j < columns.length; j++) {
            const column = columns[j];
            const columnType = tables[tableName][column] as string;
            if (columnType.includes("*")) {
                const foreignTable = columnType.replace("*", "");
                const index = getTableIndex(schema, foreignTable);
                const foreignTableName = getKeys(schema.entities[index])[0];
                const foreignColumns = getKeys(schema.entities[index][foreignTableName]);
                for (let n = 0; n < foreignColumns.length; n++) {
                    const foreignColumn = foreignColumns[n];
                    const foreignColumnType = schema.entities[index][foreignTableName][foreignColumn] as string;
                    if (foreignColumnType.includes(tableName)) {
                        createJoiningTable(schema, tableName, column, foreignTable, foreignColumn);
                        return searchForJoiningTables(schema);
                    }
                }
                createInverseReference(schema, tableName, column, foreignTable);
                return searchForJoiningTables(schema);
            }
        }
    }
}

function getKeys(obj: object) {
    return Object.keys(obj);
}
