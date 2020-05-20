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

function assignInformation4(data, area, list) {
    var result = data.map((value, index) => {
        var serie = {'area' : area, 'variable' : list[index], "data": value}
        return serie;
    });
    return result;
}

function mountTableByArea(data, area, variables, start, period) {

    var dateRange = createDateRange(start, period).map((d) => dateToString(d));

    var data_cols = [
        { id: '0', label: 'Data', type: 'string' },
        { id: '1', label: variables[0], type: 'number' },
        { id: '2', label: variables[1], type: 'number' },
        { id: '3', label: variables[2], type: 'number' },
        { id: '4', label: variables[3], type: 'number' }
    ]
    var data_rows = [];
    for (date of dateRange) {
        var x1 = searchSamples(data, date, area, variables[0])
        var x2 = searchSamples(data, date, area, variables[1])
        var x3 = searchSamples(data, date, area, variables[2])
        var x4 = searchSamples(data, date, area, variables[3])

        row = { c: [{ v: date }, { v: x1 }, { v: x2 }, { v: x3 }, { v: x4 }] }
        data_rows.push(row);
    }
    return { cols: data_cols, rows: data_rows }
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

