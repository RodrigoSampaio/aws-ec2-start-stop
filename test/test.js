'use strict'

const assert = require('assert')
const index = require('../index')

describe('Lambda Start Stop EC2 Instances', () => {

  describe('Handler test - Start', () => {

    it('it should start or stop(it depends of the parameter params.Action) instance named as TEST-LAMBDA-START-STOP', () => {

      const event = {
        params: {
          DryRun: false,
          Filters: [
            {
              Name: 'tag-value',
              Values: [
                'TEST-LAMBDA-START-STOP'
              ]
            }
          ],
          Action: "stop"
        }
      }
      index.handler(event, null, (err, data) => {

        if (err) {
          console.log(err)
        } else {
          console.log(JSON.stringify(data))
        }

      })

    })
  })
})
