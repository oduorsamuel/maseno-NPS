export class Attributes {

    constructor(public unitCode:String,public unitName:String, public programId:any){}
}

export class Departments {

    constructor(public departmentId:String, public departmentName:String,){}
}

export class Programs {
    constructor(public departmentId:any,public programId:any,public programName:String,){}
}

export class AcademicYears {
    constructor(public academicYear:String,){}
}