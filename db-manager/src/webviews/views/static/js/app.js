const model = { "headers": [{ "name": "id", "type": "int" }, { "name": "name", "type": "varchar" }, { "name": "age", "type": "int" }, { "name": "address", "type": "varchar" }, { "name": "salary", "type": "double" }], "rows": [{ "_id": "1", "id": 1, "name": "Ramesh", "age": 32, "address": "Ahmedabad", "salary": 2000 }, { "_id": "2", "id": 2, "name": "Khilan", "age": 25, "address": "Delhi", "salary": 1500 }, { "_id": "3", "id": 3, "name": "kaushik", "age": 23, "address": "Kota", "salary": 2000 }, { "_id": "4", "id": 4, "name": "Chaitali", "age": 25, "address": "Mumbai", "salary": 6500 }, { "_id": "5", "id": 5, "name": "Hardik", "age": 27, "address": "Bhopal", "salary": 8500 }, { "_id": "6", "id": 6, "name": "Komal", "age": 22, "address": "MP", "salary": 4500 }] };

const inputTypes = new Map([
    ['int', 'number'],
    ['varchar', 'text'],
    ['double', 'number'],
    ['float', 'number'],
    ['date', 'date'],
    ['datetime', 'datetime-local'],
    ['time', 'time'],
    ['timestamp', 'datetime-local'],
    ['text', 'text'],
]);




const modelLoadCommand = async (jsonModel) => {
    const model = JSON.parse(jsonModel);
    setHeaders(model.headers);
    model.rows.forEach(row => setNewRow(row, model.headers));
};

const commandMap = new Map();
commandMap.set('model-load', modelLoadCommand);

const setHeaders = (headers) => {
    const table = document.getElementById('data-table');
    const tHead = table.createTHead();
    const headerRow = tHead.insertRow();
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        const th = document.createElement('th');

        const pTitle = document.createElement('p');
        pTitle.classList.add('data-table__title');
        pTitle.innerText = header.name;

        const pType = document.createElement('p');
        pType.classList.add('data-table__dtype');
        pType.innerText = header.type;

        th.appendChild(pTitle);
        th.appendChild(pType);

        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
};

const setNewRow = async (row, headers) => {
    const tr = document.createElement('tr');
    tr.dataset._id = row._id;
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        const cell = createNewCell(header.type, row[header.name]);
        tr.appendChild(cell);
    }
    document.getElementById('data-table').appendChild(tr);
};

const createNewCell = (type, value) => {
    const td = document.createElement('td');
    td.classList.add('data-table__cell');
    const innerDiv = document.createElement('div');
    innerDiv.setAttribute('contenteditable', true);
    innerDiv.classList.add('data-table__text-input');
    innerDiv.classList.add('input-' + inputTypes.get(type));
    innerDiv.innerText = value;
};

const messageListener = async (ev) => {
    const message = ev.data;
    commandMap.get(message.command)(message.data);
};



window.addEventListener('message', messageListener, false);

new Event('message', { data: { command: 'model-load', data: JSON.stringify(model) } });






