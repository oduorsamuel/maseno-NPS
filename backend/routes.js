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

module.exports = { routesFxn: (connection, validate) => [
  //Post Request
  {
    method: 'POST',
    path: '/department',
    handler: (request, h) => {
        let departmentId = request.payload.departmentId;
        let departmentName = request.payload.departmentName;
        return new Promise(
            (res, reject) => {

                connection.query("INSERT INTO departments(departmentId, departmentName) VALUES ('" + departmentId + "','" + departmentName + "')", (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }
                    if (result) {
                        res({ "success": "Submission is successful" });
                    } else {
                        res({ "Failure": "Submission error" });
                    }
                });
            }
        );
    }},
    {
      method:'post',
      path:'/program',
      handler:(request, h)=>{
        let department=request.payload.department;
        let programId=request.payload.programId;
        let programName=request.payload.programName;
        return new Promise(
          (res, reject)=>{
          connection.query("insert into programs(departmentId,programId, ProgramName) VALUES('"+department+"','"+programId+"','"+programName+"')",(err,result,fields)=>{
            if(err){
              reject(err);
            }
            if(result){
              res({ "Success":"Submission Successful"});
            }
            else{
              res({"Failure":"An error occured during submission"});
            }
          })
          }
        );
      }
    },
    {
      method:'post',
      path:'/unit',
      handler:(request, h)=>{
        let department=request.payload.department;
        let program=request.payload.program;
        let year=request.payload.year;
        let semester=request.payload.semester;
        let unitCode=request.payload.unitCode;
        let unitName=request.payload.unitName;
        return new Promise(
          (res, reject)=>{
            connection.query("insert into units(departmentId, programId, year,semester,unitCode, unitName) VALUES('"+department+"','"+program+"','"+year+"', '"+semester+"',  '"+unitCode+"','"+unitName+"')",(err,result,fields)=>{
              if(err){
                reject(err);
              }
              if(result){
                res({"Success":"Submission successful"})
              }
              else{
                res({"Failure":"Submission Unsuccessful"})
              }
            })
          }
        );
      }
    },

    //Get Requests
  {
    method: 'GET',
    path: '/departments',
    handler: (request, h) => {

        return new Promise(
            (res, reject) => {
                connection.query("select * from departments", (err, result, fields) => {
                    if (err) {
                        reject(err);
                    }
                    res(JSON.stringify(result));
                });
            }
        );
    }},

    {
     method:'get',
     path:'/programs',
    handler: (request, h)=>{
           return new Promise(
            (res, reject)=>{
              connection.query("select * from programs", (err,result,fields)=>{
                if(err){
                  reject(err);
                }
                res(result);
              })
            }
           );   
    }
    },

    {
      method:'get',
      path:'/programs/{departmentId}',
      handler:(request,h)=>{
        const departmentId = request.params.departmentId;
        return new Promise(
          (res, reject)=>{
            connection.query('SELECT * FROM departments INNER JOIN programs ON departments.departmentId=programs.departmentId WHERE departments.departmentId = ?',[request.params.departmentId],(err, result,fields)=>{
              if(err){
                reject(err);
              }
              res(result);
            })
          }
        );
      }
    },

    {
      method:'get',
      path:'/units',
      handler:(request,h)=>{
        return new Promise(
          (res, reject)=>{
            connection.query("select * from units",(err, result,fields)=>{
              if(err){
                reject(err);
              }
              res(result);
            })
          }
        );
      }
    },

    {
      method:'get',
      path:'/programs/{programId}/{year}/{semester}',
      handler:(request,h)=>{
        const programId = request.params.programId;
        const year = request.params.year;
        const semester = request.params.semester;
        return new Promise(
          (res, reject)=>{
            connection.query('SELECT * FROM programs INNER JOIN units ON programs.programId=units.programId WHERE programs.programId = ? AND units.year= ? AND units.semester= ?',[request.params.programId,request.params.year,request.params.semester],(err, result,fields)=>{
              if(err){
                reject(err);
                console.log(err);
              }
              res(result);
            })
          }
        );
      }
    },
    {
      method:'delete',
      path:'/departments/{departmentId}',
      handler:(request,h)=>{
        const departmentId = request.params.departmentId;
        return new Promise(
          (res, reject)=>{
            connection.query('DELETE FROM departments WHERE departmentId = ?',[request.params.departmentId],(err, result,fields)=>{
              if(err){
                reject(err);
              }
              res(result);
            })
          }
        );
      }
    },

    {
      method:'delete',
      path:'/programs/{programId}',
      handler:(request,h)=>{
        const programId = request.params.programId;
        return new Promise(
          (res, reject)=>{
            connection.query('DELETE FROM programs WHERE programId = ?',[request.params.programId],(err, result,fields)=>{
              if(err){
                reject(err);
              }
              res(result);
            })
          }
        );
      }
    },

    {
      method:'delete',
      path:'/units/{unitCode}',
      handler:(request,h)=>{
        const unitCode = request.params.unitCode;
        return new Promise(
          (res, reject)=>{
            connection.query('DELETE FROM units WHERE unitCode= ?',[request.params.unitCode],(err, result,fields)=>{
              if(err){
                reject(err);
              }
              res(result);
            })
          }
        );
      }
    },

{
  method: 'GET',
  path: '/getSurveys',
  handler: function(request, h) { 
    return h.file(SURVEYFILE);
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

//survey Query
 {
  method:'get',
  path:'/dept',
  handler:(req, h)=>{
    return new Promise(
     (res, reject)=>{
       connection.query("SELECT * FROM `encounter` JOIN `studentResponse` on studentResponse.surveyEncounter_surveyEncounterId=encounter.surveyEncounterId WHERE departmentId=2", (err,result,fields)=>{
         if(err){
           reject(err)
         }
         res(result)
       })
     } 
    )
  }
},
{
  method:'get',
  path:'/allSurvey',
  handler:(req, h)=>{
    return new Promise(
     (res, reject)=>{
       connection.query("SELECT * FROM encounter INNER JOIN studentResponse ON encounter.surveyEncounterId=studentresponse.surveyEncounter_surveyEncounterId", (err,result,fields)=>{
         if(err){
           reject(err)
         }
         res(result)
        //  console.log(JSON.stringify(result));
       })
     } 
    )
  }
},

{
  method:'get',
  path:'/allSurveys/{unitCode}',
  handler:(request,h)=>{
    const unitCode = request.params.unitCode;
    return new Promise(
      (res, reject)=>{
        connection.query('SELECT * FROM encounter INNER JOIN studentResponse ON encounter.surveyEncounterId=studentresponse.surveyEncounter_surveyEncounterId WHERE unitCode = ?',[request.params.unitCode],(err, result,fields)=>{
          if(err){
            reject(err);
          }
          res(result);
        })
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