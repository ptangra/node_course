const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const data = dataBuffer.toString()
const dataJSON = JSON.parse(data)

dataJSON.name = 'Petar'
dataJSON.age = '23'

const dataReady = JSON.stringify(dataJSON)
fs.writeFileSync('1-JSON.json', dataReady)
