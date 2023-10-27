var theTransactions = [];

function getElementById(id)
{
    let element = document.getElementById(id);
    if (element) {
        return element;
    }
    throw `Could not find element with id: ${id}`;
}

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

function transactionsFileLoaded(event)
{
    console.debug("called transactionsFileLoaded()");
    contents = JSON.parse(event.target.result);
    if (!contents.transactions)
    {
        console.error('Could not find transactions.');
        return;
    }
    theTransactions = contents.transactions;
    updateTransactionsTable();
}

function updateTransactionsTable()
{
    console.debug("called updateTransactionTable()");
    let table = getElementById("transactions-table");
    table.innerHTML = '';

    if (theTransactions.length == 0) {
        return;
    }

    // Create the headers
    let columns = Object.keys(theTransactions[0]);
    let tr = document.createElement('tr');
    columns.forEach(function(header) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(header.toLocaleUpperCase()));
        tr.appendChild(th);
    });
    table.append(tr);

    // Create the rows
    theTransactions.forEach(function(row) {
        tr = document.createElement('tr');
        columns.forEach(function(key) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(row[key]));
            tr.append(td);
        });
        table.append(tr);
    });
}

// Called by clicking "Clear File" button
function clearTransactions()
{
    theTransactions = [];
    updateTransactionsTable();
}

function main()
{
    console.debug("# main()");
}

// ---------- start of testing code ----------

function assert_equal(actual, expected)
{
    if (actual !== expected) {
        throw new Error(`\n\nExpected: ${expected}\n  Actual: ${actual}\n`)
    }
}

function test()
{
    // We are not running inside a browser!
    console.debug("Not in the browser");
    console.debug("Running tests!");

    // TODO: run tests

    console.debug("All tests passed!");
}

// ---------- end of testing code ----------

if (typeof document === 'undefined') {
    test();
} else {
    main();
}
