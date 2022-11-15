const model = { "headers": [{ "name": "id", "type": "int" }, { "name": "name", "type": "varchar" }, { "name": "age", "type": "int" }, { "name": "address", "type": "varchar" }, { "name": "salary", "type": "double" }], "rows": [{ "_id": "1", "id": 1, "name": "Ramesh", "age": 32, "address": "Ahmedabad", "salary": 2000 }, { "_id": "2", "id": 2, "name": "Khilan", "age": 25, "address": "Delhi", "salary": 1500 }, { "_id": "3", "id": 3, "name": "kaushik", "age": 23, "address": "Kota", "salary": 2000 }, { "_id": "4", "id": 4, "name": "Chaitali", "age": 25, "address": "Mumbai", "salary": 6500 }, { "_id": "5", "id": 5, "name": "Hardik", "age": 27, "address": "Bhopal", "salary": 8500 }, { "_id": "6", "id": 6, "name": "Komal", "age": 22, "address": "MP", "salary": 4500 }] };

const commandMap = new Map();
commandMap.set('model-load', modelLoadCommand);

const modelLoadCommand = async (model) => {
    const model = ev.model;
};

const messageListener = async (ev) => {
    const message = ev.data;
    commandMap.get(message.command)(message.data);
};










