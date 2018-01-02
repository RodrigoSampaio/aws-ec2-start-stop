'use strict'

const AWS = require('aws-sdk')
const Promise = require('promise')
const ec2 = new AWS.EC2({region: 'sa-east-1'})

const listInstanceIds = (params) => {

    return new Promise((resolve, reject) => {
        ec2.describeInstances(params, function(err, data) {
          if (err) {
              return reject(err)
          } else {
              const instances = []
              data.Reservations.forEach(reservation => {
                  reservation.Instances.forEach(instance => {
                    instances.push(instance.InstanceId)
                  })
              });
              return resolve(instances)
          }
        })
    })

}

const startInstances = (params) => {

    return new Promise((resolve, reject) => {
        ec2.startInstances(params, function(err, data) {
          if (err) {
              return reject(err)
          } else {
              return resolve(data)
          }
        })
    })
    
}

const stopInstances = (params) => {

    return new Promise((resolve, reject) => {
        ec2.stopInstances(params, function(err, data) {
          if (err) {
              return reject(err)
          } else {
              return resolve(data)
          }
        })
    })
    
}

const handler = (event, context, callback) => {

    const action = event.params.Action
    delete event.params.Action
    listInstanceIds(event.params)
        .then(data => {
            const params = {
                InstanceIds: data
            }
            
            if (action === "start") {
                startInstances(params)
                    .then(data => {
                        callback(null, data)
                    })
                    .catch(err => {
                        callback(err)          
                    })
            } else if (action === "stop") {

                stopInstances(params)
                    .then(data => {
                        callback(null, data)
                    })
                    .catch(err => {
                        callback(err)          
                    })
            } else {
                callback("Event parameter \"Action\":<start|stop> wasn't informed.")
            }
            
        })
        .catch(err => {
            callback(err)
        })
}


exports.handler = handler
