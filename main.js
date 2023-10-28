// ------------------- Called by UI --------------------

// Called by clicking "Load File" button
function loadTransactions()
{
    console.debug("called loadDataFile()");
    let file = getElementById("transactions-file").files[0];
    if (!file) {
        console.error("no file has been chosen");
        return;
    }
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = transactionsFileLoaded;
}

// Called by clicking "Clear File" button
function clearTransactions()
{
    updateTransactionsTable([]);
}

// -------------------- The rest --------------------

function getElementById(id)
{
    let element = document.getElementById(id);
    if (element) {
        return element;
    }
    throw `Could not find element with id: ${id}`;
}

function transactionsFileLoaded(event)
{
    console.debug("called transactionsFileLoaded()");
    contents = JSON.parse(event.target.result);
    if (!contents.transactions)
    {
        console.error('Could not find transactions.');
        return;
    }
    updateTransactionsTable(contents.transactions);
}

function updateTransactionsTable(transactions)
{
    console.debug("called updateTransactionTable()");
    let table = getElementById("transactions-table");
    table.innerHTML = '';

    if (transactions.length == 0) {
        return;
    }

    // Create the headers
    let columns = Object.keys(transactions[0]);
    let tr = document.createElement('tr');
    columns.forEach(function(header) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(header.toLocaleUpperCase()));
        tr.appendChild(th);
    });
    table.append(tr);

    // Create the rows
    transactions.forEach(function(row) {
        tr = document.createElement('tr');
        columns.forEach(function(key) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(row[key]));
            tr.append(td);
        });
        table.append(tr);
    });
}
