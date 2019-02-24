var connection = require('../dbconnection'); //reference of connectionconnection.js

var response = {
    //getiing responses from the database
    getDepartments(callback) {
        return connection.query("Select * from departments", callback);
    },
    addDepartment: function (response, callback) {
        return connection.query("Insert into departments value(?,?)", [response.departmentId,response.departmentName], callback);
    },

    getPrograms(callback) {
        connection.query("select * from programs", callback);
    },

    addProgram: function (response, callback) {
        return connection.query("Insert into programs value(?,?,?)", [response.programId,response.programName,response.departmentId], callback);
    },

    getAcademicYear(callback) {
        connection.query("select academicYear from academicyears", callback);
    },
    addAcademicYear: function (response, callback) {
        return connection.query("Insert into academicyears values(?)", [response.academicYear], callback);
    },

    getUnits(callback) {
        connection.query("select * from units", callback);
    },

    addUnit: function (response, callback) {
        return connection.query("Insert into units values(?,?,?)", [response.unitCode, response.unitName, response.programId], callback);
    },
    addresponse:function(response, callback){
       return connection.query("Insert into response values (?,?)"[response.question,response.answer], callback)
    },
    getresponseById: function (id, callback) {

        return connection.query("select * from sam where Id=?", [id], callback);
    },
    deleteUnit: function (unitCode, callback) {
        return connection.query("delete from units where unitCode=?", [unitCode], callback);
    },
    deleteDepartment:function(departmentId, callback){
        return connection.query("delete from departments where departmentId=?" ,[departmentId],callback);
    },
    deleteProgram:function(programId,callback){
     return connection.query("delete from programs where programId=?", [programId], callback)
    }
};
module.exports = response;