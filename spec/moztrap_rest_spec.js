/* This test uses frisby.js http://frisbyjs.com/docs/api/ */
var frisby = require('frisby');

var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
//var baseUrl =  'http://localhost:8000/api/v1/'

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
