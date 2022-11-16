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

const DATA_TABLE = document.getElementById('data-table');




const modelLoadCommand = async (jsonModel) => {
    const model = JSON.parse(jsonModel);
    setHeaders(model.headers);
    const tbody = document.createElement('tbody');
    model.rows.forEach(async row => {
        const r = await createNewRow(row, model.headers);
        tbody.appendChild(r);
    });
    DATA_TABLE.appendChild(tbody);
};

const commandMap = new Map();
commandMap.set('model-load', modelLoadCommand);

const setHeaders = (headers) => {
    const thead = DATA_TABLE.createTHead();
    const headerRow = thead.insertRow();
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

    thead.appendChild(headerRow);
};

const createNewRow = async (row, headers) => {
    const tr = document.createElement('tr');
    tr.dataset._id = row._id;
    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        const cell = createNewCell(header.type, row[header.name]);
        tr.appendChild(cell);
    }
    return tr;
};

const createNewCell = (type, value) => {
    const td = document.createElement('td');
    td.classList.add('data-table__cell');
    const innerDiv = document.createElement('div');
    innerDiv.setAttribute('contenteditable', true);
    innerDiv.setAttribute('spellcheck', false);
    innerDiv.classList.add('data-table__text-input');
    innerDiv.classList.add('input-' + inputTypes.get(type));
    innerDiv.innerText = value;
    td.appendChild(innerDiv);
    return td;
};

const messageListener = async (ev) => {
    const message = ev.detail;
    commandMap.get(message.command)(message.data);
};



document.addEventListener('DOMContentLoaded', async () => {
    document.addEventListener('message', messageListener);
    const msg = new CustomEvent('message', { detail: { command: 'model-load', data: JSON.stringify(model) } });
    await new Promise(resolve => setTimeout(resolve, 500));
    document.dispatchEvent(msg);
});








