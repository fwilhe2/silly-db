import * as core from '@actions/core'
// import {wait} from './wait'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const key: string = core.getInput('key')
    core.debug(`Query for ${key}`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const fixture = `{
      "Germany": "Berlin",
      "France": "Paris",
      "Italy": "Rome"
    }`

    fs.writeFileSync('db.json', fixture)

    const input = fs.readFileSync('db.json')
    const data = JSON.parse(input.toString())

    core.debug(`Value for key ${key}: ${data[key]}`)

    core.setOutput('value', data[key])
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
