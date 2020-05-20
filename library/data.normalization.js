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

async function requestStateData(cumulativeCases, cumulativeDeaths, projectionCases, projectionDeaths) {
    try {
        let [data_cumulative_cases, data_cumulative_deaths, data_projection_cases, data__projection_deaths] = await Promise.all([
            fetch(cumulativeCases).then(response => response.text().then(text => text)),
            fetch(cumulativeDeaths).then(response => response.text().then(text => text)),
            fetch(projectionCases).then(response => response.text().then(text => text)),
            fetch(projectionDeaths).then(response => response.text().then(text => text))
        ]);
        return { cumulative_cases: data_cumulative_cases, cumulative_deaths: data_cumulative_deaths, projection_cases : data_projection_cases, projection_deaths: data__projection_deaths }
    }
    catch (err) {
        console.log(err);
    };
}