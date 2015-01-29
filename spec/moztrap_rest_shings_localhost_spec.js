/* This test uses frisby.js http://frisbyjs.com/docs/api/ */
var frisby = require('frisby');

//var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
var baseUrl =  'http://localhost:8000/api/v1/'

frisby.create('Get CaseVersion list')
.get(baseUrl + 'caseversion/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  case:           String,
  description:    String,
  environments:   Array,
  id:             String,
  productversion: String,
  resource_uri:   String,
  status:         String,
  steps:          Array,
  tags:           Array,
})
.toss();

/*
var tag="gaia"
frisby.create('Filter by tag')
.get(baseUrl + 'caseversion/?format=json&tags__name__icontains=' + tag)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  case:           String,
  description:    String,
  environments:   Array,
  id:             String,
  productversion: String,
  resource_uri:   String,
  status:         String,
  steps:          Array,
  tags:           Array,
})
.expectBodyContains(tag) //Need a better way to verify that gaia is in tag
.toss();
*/

/*
var name = "log"
frisby.create('Filter by name for caseVersionSearch')
.get(baseUrl + 'caseversionsearch/?format=json&name__icontains=' + name)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONLength("objects", 3) //for shing' local db
.expectJSON("objects.*", {
  name: function(val){ expect(val.indexOf(name)).toBeGreaterThan(0) }
})
//.inspectJSON()
.toss();
*/

frisby.create('Get Suite list')
.get(baseUrl + 'suite/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  description:    String,
  id:             String,
  name:           String,
  product:        String,
  resource_uri:   String,
  status:         String,
})
.toss();

frisby.create('Get CaseSelection list')
.get(baseUrl + 'caseselection/?format=json')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('objects.0', {
  case:           String,
  case_id:        String,
  created_by:     Object,
  id:             String,
  name:           String,
  priority:       String,
  product:        Object,
  product_id:     String,
  productversion:String,
  resource_uri:   String,
  tags:           Array,
  modified_on:    String,
})
.toss();

var name = "can"
frisby.create('Filter CaseSelection by name')
.get(baseUrl + 'caseselection/?format=json&name__icontains=' + name)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  name: function(val){ expect(val.toLowerCase().indexOf(name)).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

var username = "manager"
frisby.create('Filter CaseSelection by creator name')
.get(baseUrl + 'caseselection/?format=json&created_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.created_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();

var tag="key"
frisby.create('Filter by tag')
.get(baseUrl + 'caseselection/?format=json&tags__name__icontains=' + tag)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectBodyContains(tag) //Need a better way to verify that gaia is in tag
.toss();

/* NOT OK, see comment in API Status v2
var status = "active"
frisby.create('Filter CaseSelection by status')
.get(baseUrl + 'caseselection/?format=json&status=' + status)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*", {
  status: status
})
//.inspectJSON()
.toss();
*/

/* TODO: enable modified_by in fields
var username = "manager"
frisby.create('Filter CaseSelection by modifier name')
.get(baseUrl + 'caseselection/?format=json&modified_by__username__icontains=' + username)
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON("objects.*.modified_by", {
  username: function(val){ expect(val).indexOf(username).not.toBeLessThan(0) }
})
//.inspectJSON()
.toss();
*/



function testOrderBy(resource, field) {
  frisby.create('Order ' + resource + ' by name')
  .get(baseUrl + resource + '/?format=json&order_by=' + field)
  .expectStatus(200) //500 if not allowed
  .expectHeaderContains('content-type', 'application/json')
  .toss();
}

testOrderBy('caseselection', 'name')
testOrderBy('caseselection', '-name')
testOrderBy('caseselection', 'modified_on')
testOrderBy('caseselection', '-modified_on')
testOrderBy('caseselection', 'case__priority')
testOrderBy('caseselection', '-case__priority')
