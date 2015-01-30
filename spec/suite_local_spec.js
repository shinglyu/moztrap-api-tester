/* This test uses frisby.js http://frisbyjs.com/docs/api/ */
var frisby = require('frisby');

//var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
var baseUrl =  'http://localhost:8000/api/v1/';

function isDefinedObject(val){
  expect(val).not.toBeUndefined();
}

frisby.create('Get Suite list')
.get(baseUrl + 'suite/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  description:    String,
  id:             String,
  name:           String,
  product:        isDefinedObject,
  resource_uri:   String,
  status:         String,
  modified_on:    String,
})
.toss();

var name = "trap" //Mouse trap bla bla
frisby.create('Filter Suite by name')
.get(baseUrl + 'suite/?format=json&name__icontains=' + name)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  name: function(val){ expect(val.toLowerCase().indexOf(name)).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

/*
var username = "manager"
frisby.create('Filter Suite by creator name')
.get(baseUrl + 'suite/?format=json&created_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.created_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

var tag = "key"
frisby.create('Filter by tag')
.get(baseUrl + 'suite/?format=json&tags__name__icontains=' + tag)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectBodyContains(tag) //Need a better way to verify that gaia is in tag
.toss();
*/

var status = "active"
frisby.create('Filter Suite by status')
.get(baseUrl + 'suite/?format=json&status=' + status)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  status: status
})
//.inspectJSON()
.toss();

var username = "manager"
frisby.create('Filter Suite by creator name')
.get(baseUrl + 'suite/?format=json&created_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.modified_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();
var username = "manager"
frisby.create('Filter Suite by modifier name')
.get(baseUrl + 'suite/?format=json&modified_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.modified_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

function testOrderBy(resource, field) {
  frisby.create('Order ' + resource + ' by name')
  .get(baseUrl + resource + '/?format=json&order_by=' + field)
  .expectStatus(200) //500 if not allowed
  .expectHeaderContains('content-type', 'application/json')
  /*
  .expectJSONTypes({
    meta: isDefinedObject, 
    objects: Array,
  })
  */
  .toss();
}

testOrderBy('suite', 'name')
testOrderBy('suite', '-name')
testOrderBy('suite', 'modified_on')
testOrderBy('suite', '-modified_on')
