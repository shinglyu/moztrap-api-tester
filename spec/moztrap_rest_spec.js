var frisby = require('frisby');

//var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
var baseUrl =  'https://moztrap.mozilla.org/api/v1/'
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
//.expectJSONLength(2)
//.expectJSON('meta', {hi:"hi"})
//.expectJSON('objects.0.case', {hi:"hi"})
/*
.expectJSONTypes({
  id_str: String,
  retweeted: Boolean,
  in_reply_to_screen_name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
  user: {
    verified: Boolean,
    location: String,
    url: String
  }
})
*/
.toss();
