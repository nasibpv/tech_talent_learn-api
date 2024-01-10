//! import mongoose

const mongoose=require('mongoose')

// next integraton method using "connect"

mongoose.connect('mongodb://127.0.0.1:27017/techInstitute')

// Model create

const User=mongoose.model('User',{
    userId:String,
name:String,
usertype:String,
email:String,
password:String

})
const language=mongoose.Schema({
    cource:String
})

const Staff=mongoose.model('Staff',{
    staffId:String,
    name:String,
    age:Number,
    gender:String,
    dob:Date,
    address:String,
    place:String,
    pin:Number,
    email:String,
    phonenumber:Number,
    password:String,
    cource:String
    })

const Student=mongoose.model('Student',{
    studentId: String,
        name: String,
        age:Number,
        cource:String,
        batchId:String,
        gender: String,
        address:String,
        dob:Date,
        place:String,
        pin:Number,
        phonenumber:Number,
        email:String,
        password:String,
})

const Leave=mongoose.model('Leave',{
    requestId:String,
    name:String,
    email:String,
    cource:String,
    date:Date,
    reason:String,
    leaveDate:Date,
    day:String,
    status:String,    
    userType:String,
})

const Request=mongoose.model('Request',{
    complaintId:String,
    user:String,
    name:String,
    email:String,
    date:Date,
    day:String,
    replyDate:String,
    replyDay:String,
    cource:String,
    reason:String,
    status:String,
    replyDate:Date,
    reply:String,
})

const Studentattendance=mongoose.model('Studentattendance',{
    attendanceId:String,
    name: String,
    email:String,
    tutorid:String,
    cource:String,
    batchId:String,
    attendance:Array 
})

const Staffattendance=mongoose.model('Staffattendance',{
    attendanceId:String,
    name: String,
    email:String,
    cource:String,
    attendance:Array
})

const Batch=mongoose.model('Batch',{
        batchId: String,
        batchName: String,
        tutorName:String,
        batchDate:Date,
        phonenumber:Number,
        email:String,
        cource:String
})

module.exports={
    User,
    Staff,
    Student,
    Leave,
    Request,
    Batch,
    Studentattendance,
    Staffattendance,
    
}