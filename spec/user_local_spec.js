/* This test uses frisby.js http://frisbyjs.com/docs/api/ */
var frisby = require('frisby');

//var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
var baseUrl =  'http://localhost:8000/api/v1/';

function isDefinedObject(val){
  expect(val).not.toBeUndefined();
}

frisby.create('Get user list')
.get(baseUrl + 'user/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  id:             String,
  username:       String,
  resource_uri:   String,
})
.toss();

var name = "admin" //Mouse trap bla bla
frisby.create('Filter user by username')
.get(baseUrl + 'user/?format=json&username__icontains=' + name)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  username: function(val){ expect(val.toLowerCase().indexOf(name)).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

