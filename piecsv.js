const neatCsv = require('neat-csv')
const fs = require('fs')

// put your csv in the csv folder and change the name below
const pathToCsvFile = './filename.csv'
// you will overwrite an old saved file if you dont change 'desired file name' between runs
const desiredFileName = 'results'

fs.readFile(pathToCsvFile, async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const inMemoryCsv = await neatCsv(data)
  remapToSetsAndPrintJson(inMemoryCsv)
})

const remapToSetsAndPrintJson = (csv) => {
  const dict = {}

  for (let row of csv) {
    for (let column of Object.keys(row)) {
      let value = [row[column]]
      if (!dict[value]) dict[value] = new Set()
      dict[value].add(column)
    }
  }

  for (let key of Object.keys(dict)) {
    dict[key] = Array.from(dict[key])
  }

  fs.writeFile(`./output/${desiredFileName}.json`, JSON.stringify(dict), 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

  console.table(dict)
  console.log('PIE CSV BETA 0.1')
}

