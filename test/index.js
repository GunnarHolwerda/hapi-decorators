'use strict'

var test = require('tape')
var NoRoutes = require('./fixtures/no-routes')
var web = require('../')

@web.controller('/check')
class Check {
  @web.route('get', '/in')
  @web.validate({ payload: true })
  checkIn(request, reply) {
    
  }
}

test('instance has routes function', function (t) {
  let check = new Check()

  t.ok(typeof check.routes === 'function', 'Has `routes` function')
  t.end()
})

test('instance has no routes', function (t) {
  let instance = new NoRoutes()

  t.same(instance.routes(), [], 'No routes returns empty array')
  t.end()
})

test('instance generates routes array', function (t) {
  let check = new Check()
  var results = check.routes()

  t.ok(Array.isArray(results), 'results is an array')
  t.equal(results.length, 1, 'Has one result')

  let first = results[0]

  t.equal(first.method, 'get', 'method is get')
  t.equal(first.path, '/check/in', 'path is merged with controller path')
  t.equal(typeof first.handler, 'function', 'handler is a function')
  t.same(first.config, { id: 'Check.checkIn', bind: check, validate: { payload: true } }, 'Config is valid')
  t.end()
})
