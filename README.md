# **DB Assignment 11 - ORM**  
  
## **Object Relational Mapping**  
  
## * Exercise 1  
  
Our program is written in TypeScript and uses the specified JSON file (schema.json) to convert the JSON file to valid MySQL commands, using our custom parsing implementation.

### **How it works**

1)

The first thing we do is crawl through the file looking for many-to-many relations, as well as relations that could cause any problems when parsing the file. If we encounter any, we change the schema to better fit how a MySQL database should be made - we make joining tables when needed, and change which entities contain what data, so that any query that must be performed, is optimized for any operation.

We also check for any inverse references that we can change - if the Customer has an Order[] and Order has no reference to Customer, we instead save a Customer field in the Order table. That way we still follow the 1st normal form.

2.

After changing the schema to better fit as a model for a database, we call the parser to create the SQL commands to create the database.

It works by initializing the tables in the database with only their basic data types - in this assignment only String and Number. We then run some ```ALTER TABLE``` commands to add in the more advanced parts - foreign key references and the following columns needed to support them.

### **Requirements**

The schema file must follow this standard:

```JSON
{
    "schemaName": "DatabaseName",
    "entities": [
        {
            "TableName": {
                "tableField1": "FieldType",
                "tableField2": "FieldType"
            }
        },
        {
            "TableName2": {
                "tableFieldPrimitive": "String",
                "tableFieldAdvanced": "TableName"
            }
        }
    ]
}
```

### **Usage**

1) Download and install NodeJS and NPM
2) Open a terminal in the root directory of the project
3) Run command: ```npm start```
4) Created MySQL code is written to a file called schema.sql and to the terminal.

## * Exercise 2

Because of time constraints and Algorithm & Datastructure test-exam, only part 1 was successfully created and uploaded.
