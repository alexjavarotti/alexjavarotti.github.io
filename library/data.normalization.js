async function requestData() {
    alagoas_casos_acumulados = 'https://raw.githubusercontent.com/C4NESub9/googleData/master/dataAl/CAAiL_Al.csv'
    bahia_casos_acumulados = 'https://raw.githubusercontent.com/C4NESub9/googleData/master/dataAl/CABiA_Al.csv'
    ceara_casos_acumulados = 'https://raw.githubusercontent.com/C4NESub9/googleData/master/dataAl/CACiE_Al.csv'
    maranhao_casos_acumulados = 'https://raw.githubusercontent.com/C4NESub9/googleData/master/dataAl/CAMiA_Al.csv'


    try {
        let [alagoas, bahia, ceara, maranhao] = await Promise.all([
            fetch(alagoas_casos_acumulados).then(response => response.text().then(text => text)),
            fetch(bahia_casos_acumulados).then(response => response.text().then(text => text)),
            fetch(ceara_casos_acumulados).then(response => response.text().then(text => text)),
            fetch(maranhao_casos_acumulados).then(response => response.text().then(text => text))
        ]);
        return { serie1: alagoas, serie2: bahia, serie3: ceara, serie4: maranhao }
    }
    catch (err) {
        console.log(err);
    };
}

async function requestData4(serie1, serie2, serie3, serie4) {
    try {
        let [data_serie1, data_serie2, data_serie3, data_serie4] = await Promise.all([
            fetch(serie1).then(response => response.text().then(text => text)),
            fetch(serie2).then(response => response.text().then(text => text)),
            fetch(serie3).then(response => response.text().then(text => text)),
            fetch(serie4).then(response => response.text().then(text => text))
        ]);
        return [data_serie1, data_serie2, data_serie3, data_serie4]
    }
    catch (err) {
        console.log(err);
    };
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


