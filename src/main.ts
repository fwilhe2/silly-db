import * as core from '@actions/core'
// import {wait} from './wait'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const key: string = core.getInput('key')
    core.info(`Query for ${key}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    if (fs.existsSync('db.json')) {
      core.info('Found existing db')
    } else {
      const fixture = `{
      "Germany": "Berlin",
      "France": "Paris",
      "Italy": "Rome"
    }`

      fs.writeFileSync('db.json', fixture)
    }

    const input = fs.readFileSync('db.json')
    const data = JSON.parse(input.toString())

    const query: string = core.getInput('query')
    const value: string = core.getInput('value')
    if (query === 'read') {
      core.info(`Value for key ${key}: ${data[key]}`)

      core.setOutput('value', data[key])
    } else if (query === 'write') {
      data[key] = value
      fs.writeFileSync('db.json', JSON.stringify(data))
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
