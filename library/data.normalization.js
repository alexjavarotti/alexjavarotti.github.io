async function requestData4(serie1, serie2, serie3, serie4) {
    try {
        let [data_serie1, data_serie2, data_serie3, data_serie4] = await Promise.all([
            fetch(serie1).then(response => response.text().then(text => text)),
            fetch(serie2).then(response => response.text().then(text => text)),
            fetch(serie3).then(response => response.text().then(text => text)),
            fetch(serie4).then(response => response.text().then(text => text))
        ]);

        var responses = [data_serie1, data_serie2, data_serie3, data_serie4];
        var arrays = responses.map(x => csvToArray(x));
        var contents = arrays.map(x => removeHeaders(x));
        var data = contents.map(x => typifyData(x));
        return data;
    }
    catch (err) {
        console.log(err);
    };
}

function assignInformation4(data, common, list) {
    
}

async function requestData9(serie1, serie2, serie3, serie4, serie5, serie6, serie7, serie8, serie9) {
    try {
        let [data_serie1, data_serie2, data_serie3, data_serie4] = await Promise.all([
            fetch(serie1).then(response => response.text().then(text => text)),
            fetch(serie2).then(response => response.text().then(text => text)),
            fetch(serie3).then(response => response.text().then(text => text)),
            fetch(serie4).then(response => response.text().then(text => text)),
            fetch(serie5).then(response => response.text().then(text => text)),
            fetch(serie6).then(response => response.text().then(text => text)),
            fetch(serie7).then(response => response.text().then(text => text)),
            fetch(serie8).then(response => response.text().then(text => text)),
            fetch(serie9).then(response => response.text().then(text => text))
        ]);
        return [data_serie1, data_serie2, data_serie3, data_serie4, data_serie5, data_serie6, data_serie7, data_serie8, data_serie9]
    }
    catch (err) {
        console.log(err);
    };
}

function csvToArray(csv) {
    clean = csv.replace(/'/g, '');
    rows = clean.split("\n")
    return rows.map(function (row) {
        return row.split(",");
    });
};

function removeHeaders(list) {
    return list.splice(1);
}

function typifyData(list) {
    var typed = list.map(function (row) {
        for (i = 0; i < row.length; i++) {
            if (i == 1) row[i] = parseFloat(row[i])
        }
        return row;
    });
    return typed;
}

