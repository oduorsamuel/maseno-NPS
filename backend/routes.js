'use strict';

const SURVEYFILE = './surveys.json';
const request = require('request');

// builds a query to insert appropriate number of rows into surveyResponse table
const surveyResponse_query_constructor = (studentResponse, surveyEncounterId) => {
  const responseValue_constructor = (surveyEncounterId) => (question) => (answer) =>
    "('"+surveyEncounterId+"','"+question+"','"+answer+"')";
  const responseValue_surveySpecific = responseValue_constructor(surveyEncounterId);
  const queryInit = (responseValues) => 
                      'INSERT INTO studentResponse (surveyEncounter_surveyEncounterId, question, answer) VALUES ' + 
                      responseValues + ';';
  
  var responseValueArray = [];
  for (var question in studentResponse) {
    if (!Array.isArray(studentResponse[question])) {
      responseValueArray.push(responseValue_surveySpecific(question)(studentResponse[question]));
    } else {
      const responseValue_questionSpecific = responseValue_surveySpecific(question);
      for (var answer of surveyResponse[question]) {
        responseValueArray.push(responseValue_questionSpecific(answer));
      }
    }
  }

  return queryInit(responseValueArray.join())
};

const surveyEncounter_query_constructor = (surveyEncounterInfo) => {
  const surveyEncounter_query = `INSERT INTO encounter
                                (date, departmentId,programId, yearOfStudy, semester, unitCode) VALUES
                                (
                                 '${surveyEncounterInfo.date}',
                                 '${surveyEncounterInfo.departmentId}',
                                 '${surveyEncounterInfo.programId}',
                                 '${surveyEncounterInfo.yearOfStudy}',
                                 '${surveyEncounterInfo.semester}',
                                 '${surveyEncounterInfo.unitCode}');`;
  return surveyEncounter_query;
};

const MOCK_LOCATIONS = [{uuid:1, name:"Information Technology"},
                        {uuid:2, name:"Computer Science"},];


module.exports = { routesFxn: (connection, validate) => [
  {
    method: 'GET',
    path: '/departments',
    handler: (request, h) => {
        const results=[];
        connection.query('SELECT * FROM departments', function (Error, results) {
            if (Error) {
                console.log(Error);
                return Error;
            }
             console.log(JSON.stringify(results));  
          });
          return JSON.stringify(results);
          
                
    }},

{
  method: 'GET',
  path: '/getSurveys',
  handler: function(request, h) { 
    return h.file(SURVEYFILE);
  }
},
{
  method: 'GET',
  path: '/getLocations',
  handler: function(request, h) { 
    return MOCK_LOCATIONS;
  }
},
{
  method: 'POST',
  path: '/storeSurveys',
  handler: function(request, h) {
    return new Promise(
      (resolve, reject) => {
        connection.query(
          surveyEncounter_query_constructor(request.payload.encounterInfo),
          (error, _rows, _fields) => {
            if (error) {reject(error)}
          }
        );
        connection.query(
          'SELECT LAST_INSERT_ID();',
          (error, rows, _fields) => {
            if (error) {reject(error)}
            const surveyEncounterId = rows[0]["LAST_INSERT_ID()"];
            const surveyResponse_query = surveyResponse_query_constructor(request.payload.responseInfo, surveyEncounterId);
            
            connection.query(
              surveyResponse_query,
              (error, rows, _fields) => {
                if (error) {reject(error)}
              }
            );
          }
        );
      }
    );
  }
},
{
  method: 'POST',
  path: '/login',
  options: {
    auth: false
  },
  handler: function(request, h) {
    return validate({},request.payload.username, request.payload.password)
  }
},
// {
//   method: 'GET',
//   path: '/logout',
//   options: {
//     auth: false
//   },
//   handler: function(req, h) {
//     return new Promise(
//       (resolve, reject) => {
//         const callback = (_error, _response, _body) => '';
//         request(
//           { method: 'DELETE',
//               url: 'https://maseno.ac.ke',
//             }, callback
//         );    
//       }
//     )
//   }
// }
]}