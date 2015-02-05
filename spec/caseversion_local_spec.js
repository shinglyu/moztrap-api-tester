/* This test uses frisby.js http://frisbyjs.com/docs/api/ */
var frisby = require('frisby');

//var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
var baseUrl =  'http://localhost:8000/api/v1/';

function isDefinedObject(val){
  expect(val).toBeDefined();
  //console.log(typeof val)
  expect(typeof val).not.toEqual("string");
}

frisby.create('Get CaseVersion list')
.get(baseUrl + 'caseversion/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  case:           String,
  //case:           isDefinedObject,
  description:    String,
  environments:   isDefinedObject,
  id:             String,
  name:           String,
  productversion: String,
  resource_uri:   String,
  status:         String,
  steps:          Array,
  tags:           Array,
  modified_on:    String,
  modified_by:    isDefinedObject,
  priority:       String,
  productversion_name: String,
})
//.inspectJSON()
.toss();


var name = "can"
frisby.create('Filter CaseVersion by name')
.get(baseUrl + 'caseversion/?format=json&name__icontains=' + name)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  name: function(val){ expect(val.toLowerCase().indexOf(name)).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

var description= "can"
frisby.create('Filter CaseVersion by description')
.get(baseUrl + 'caseversion/?format=json&description__icontains=' + description)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  description: function(val){ expect(val.toLowerCase().indexOf(description)).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

var instr = "upper"
frisby.create('Filter CaseVersion by steps')
.get(baseUrl + 'caseversion/?format=json&steps__instruction__icontains=' + instr)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
/*
.expectJSON("objects.*.steps.?", {
  instruction: function(val){ expect(val.toLowerCase().indexOf(instr)).not.toBeLessThan(0) }
})
*/
.expectBodyContains(instr)
//.inspectJSON()
.toss();

var expected = "upper"
frisby.create('Filter CaseVersion by steps expected')
.get(baseUrl + 'caseversion/?format=json&steps__expected__icontains=' + expected)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
/*
.expectJSON("objects.*.steps.?", {
  expecteduction: function(val){ expect(val.toLowerCase().indexOf(expected)).not.toBeLessThan(0) }
})
*/
.expectBodyContains(expected)
//.inspectJSON()
.toss();

var username = "manager"
frisby.create('Filter CaseVersion by creator name')
.get(baseUrl + 'caseversion/?format=json&created_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.created_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

/* TODO: some priority is None
var priority= "3"
frisby.create('Filter CaseVersion by creator name')
.get(baseUrl + 'caseversion/?format=json&case__priority=' + priority)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  priority: priority
})
//.inspectJSON()
.toss();
*/

/*
var tag = "key"
frisby.create('Filter by tag')
.get(baseUrl + 'caseversion/?format=json&tags__name__icontains=' + tag)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectBodyContains(tag) //Need a better way to verify that gaia is in tag
.toss();
*/

var status = "active"
frisby.create('Filter CaseVersion by status')
.get(baseUrl + 'caseversion/?format=json&status=' + status)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  status: status
})
//.inspectJSON()
.toss();

var username = "manager"
frisby.create('Filter CaseVersion by modifier name')
.get(baseUrl + 'caseversion/?format=json&modified_by__username__icontains=' + username)
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
  .toss();
}

testOrderBy('caseversion', 'name')
testOrderBy('caseversion', '-name')
testOrderBy('caseversion', 'case__priority')
testOrderBy('caseversion', '-case__priority')
testOrderBy('caseversion', 'modified_on')
testOrderBy('caseversion', '-modified_on')
/*
testOrderBy('caseversion', 'productversion__name')
testOrderBy('caseversion', '-productversion__name')
*/
