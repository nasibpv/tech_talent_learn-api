// import db file 
const { deleteModel } = require('mongoose')
const db = require('./db')
const jwt=require('jsonwebtoken')
const allUser = () => {
    return db.User.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                users: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "user not involve"
            }
        }
    })
}
const login = (userId,password) => {
    console.log(userId,password);
    return db.User.findOne({email:userId}).then(result => {
        
        if(result){
        if (result.password==password) {
            const token =jwt.sign({userId},'supersecretkey123')
            return {
                statusCode: 200,
                message:"Login Succeessfully ",
                status:true,  
                usertype: result.usertype,
                username:result.name,
                email:result.email,
                token
            }
        }
        else {
            return {
                statusCode: 202,
                message: "incorrect Password please check your password"
            }
        }
    }
    else{
        return{
            statusCode: 202,
        message:'Please check email id or connect office'
        }


    }
    })
}

const staff = () => {
    return db.Staff.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                staffs: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "staff not involve"
            }
        }
    })
}

const student = () => {
    return db.Student.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                students: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "student not involve"
            }

        }
    })
}

const leave = () => {
    return db.Leave.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                leave: result
            }
        }
        else {
            return {
                statusCode: 405,
                meassage: "Data not invlove"
            }
        }
    })
}
const request = () => {
    return db.Request.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                request: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "data not involve"
            }
        }
    })
}
const addStaff = (staffId,name, age, gender, dob, address, place, pin, email, phonenumber, password, cources) => {

    return db.Staff.findOne({ phonenumber:phonenumber, email: email, password:password }).then(result => {
    
        if (result) {
            return {
                status: false,
                message: "user already present",
                statusCode: 401
            }
        }
        else{
            const newstaff = new db.Staff({
                staffId:staffId,
                name:name,
                age,
                gender,
                dob,
                address,
                place,
                pin,
                email,
                phonenumber,
                password,
                cource:cources
            })

            const newuser = new db.User({
                userId:staffId,
                name,
                usertype: "STAFF",
                email,
                password: password
            })

            const attendance=new db.Staffattendance({
                attendanceId:staffId,
                name,
                email,
                cource:cources,
                attendance:[]
            })

            attendance.save() 
            newstaff.save()
            newuser.save()

            return {
                status: true,
                message:"staff register success",
                statusCode: 202
            }
        }
    })

}

editStaff = (id) => {
    return db.Staff.findOne({staffId:id}).then(result => {
        if (result) {
            return {
                statusCode: 200,
                staff: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Batch not involve"
            }
        }
    })
}
const updateStaff = (id,name, age, gender, dob, address, place, pin, email, phonenumber, password, cources) => {
    return db.Staff.findOne({staffId:id}).then(result => {
        if (result) {
            
            result.name=name
            result.age=age
            result.dob=dob
            result.gender=gender
            result.dob=dob
            result.address=address
            result.place=place
            result.pin=pin
            result.email=email
            result.phonenumber=phonenumber
            result.password=password
            result.cource=cources
            result.save()
            return {
                statusCode: 200,
                message:"Staff Details Update Successfully"
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Batch not involve"
            }
        }
    })
}
const addStudent = (id,name, age,gender, cource,  address, dob, place, pin, phonenumber, email, password,tutor,batchId) => {
    return db.Student.findOne({ phonenumber, email: email }).then(result => {
        if (result) {
            return {
                status: false,
                message: "user already present please check email and password",
                statusCode: 401
            }
        }
        else {
            const newstudent = new db.Student({
                studentId:id,
                name: name,
                age,
                cource: cource,
                batchId,
                gender,
                address,
                dob,
                place,
                pin,
                phonenumber,
                email,
                password: password
            })

            const newuser = new db.User({
                userId:id,
                name: name,
                usertype: "student",
                email,
                password: password
            })
            
            const attendance=new db.Studentattendance({
                attendanceId:id,
                name,
                email,
                tutorid:tutor,
                cource:cource,
                batchId,
                attendance:[]
            })

            newstudent.save()
            newuser.save()
            attendance.save()

            return {
                status: true,
                message: "student register success",
                statusCode: 200
            }
        }
    })
}
const editStudent = (id) => {
    return db.Student.findOne({studentId:id}).then(result => {
        if (result) {
            return {
                statusCode: 200,
                student: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Batch not involve"
            }
        }
    })
}
const updateStudent = (id,name, age,gender, cource,  address, dob, place, pin, phonenumber, email, password,batchId) => {
    return db.Student.findOne({ studentId:id}).then(result => {
        
        if (result) {
            
                result.studentId=id
                result.name= name
                result.age=age
                result.cource= cource
                result.batchId=batchId
                result.gender=gender
                result.address=address
                result.dob=dob
                result.place=place
                result.pin=pin
                result.phonenumber=phonenumber
                result.email=email
                result.password=password
          
            result.save()
            // const newuser = new db.User({
            //     userId:id,
            //     name: name,
            //     usertype: "student",
            //     email,
            //     password: password
            // })
            
            // const attendance=new db.Studentattendance({
            //     attendanceId:id,
            //     name,
            //     email,
            //     tutorid:tutor,
            //     cource:cource,
            //     batchId,
            //     attendance:""
            // })

            // newstudent.save()
            // newuser.save()
            // attendance.save()

            return {
                status: true,
                message: "student update success",
                statusCode: 200
            }
        }
        else {
            
            return {
                status: false,
                message: "user already present please check email and password",
                statusCode: 401
            }
        }
    })
}
const deleteStudent = (id) => {

    return db.Student.deleteOne({studentId:id}).then(result => { 
        if(result){
            deleteStudentUser(id)
            deleteStudentAttendance(id)
            return {
                statusCode:200,
                message:`deleted in student` 
            }
        }
        else{
            return {
                statusCode:404,
                message:'batch not present'
            }
        }
    })
}
const reply = (_id, date, day, reply) => {
    return db.Request.findOne({ _id }).then(result => {
        // console.log(result);
        if (result) {
            // result.push
            result.replyDay = day,
                result.replyDate = date,
                result.reply = reply,
                result.status = "view",
                result.save()

            return {
                status: true,
                message: "Reply  success",
                statusCode: 200
            }
        }
        else {
            return {
                status: false,
                message: "somthing wrong",
                statusCode: 404,
            }
        }
    })

}
const complaintSend = (id, user, names, email, date, days, cource, reason, statuss, replyDate, reply) => {
    return db.Request.findOne({ complaintId: id }).then(result => {
        if (result) {
            return {
                status: false,
                message: "somthing Wrong Please Try Again To Complaint Or refresh page already id present please ",
                statusCode: 404
            }

        }
        else {
            const newComplaint = new db.Request({
                complaintId: id,
                user: user,
                name: names,
                email: email,
                date,
                day:days,
                cource,
                reason,
                status: statuss,
                replyDate,
                reply
            })
            newComplaint.save()
            return {
                status: true,
                message: "Complaint Successfully",
                statusCode: 201
            }
        }
    })

}
const leaveRequest = (id, names, email, cource, applyDate, reason, leaveDate, day, statuss, user) => {
    return db.Leave.findOne({ requestId: id }).then(result => {

        if (result) {
            return {
                status: false,
                message: "PLease check your date or Retry again request id already preasent",
                statusCode: 402
            }
        }
        else {
            const newData = new db.Leave({
                requestId: id,
                name: names,
                email,
                cource,
                date: applyDate,
                reason,
                leaveDate,
                day,
                status: statuss,
                userType: user,

            })
            newData.save()
            return {
                status: true,
                message: "Leave Request Succeessfully",
                statusCode: 201
            }

        }
    })
}
const leaveReply = (id, names, statuss) => {
    return db.Leave.findOne({ requestId: id, name: names }).then(result => {

        if (result) {
            result.status = statuss
            result.save()
            return {
                status: true,
                message: "Leave Reply Succeessfully",
                statusCode: 201
            }
        }
        else {
            return {
                status: false,
                message: "PLease check your date or Retry again",
                statusCode: 402
            }
        }
    })
}
const studentattendance = () => {
    return db.Studentattendance.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                stdAttendance: result
            }
        }
        else{
            return {
                statusCode: 402,
                message:"somthing wrong"
            }
        }
    })
}
const studentAttendanceMark = (id,status,date) => {
    console.log(id,status);

    return db.Studentattendance.findOne({attendanceId:id}).then(result => {

        if (result) {
            result.attendance.push({
            Status:status,
            date:date
        })
            result.save()
            return db.Studentattendance.find().then(item=>{
                return{
                    status: true,
                    statusCode: 200
                }
            })
            
        }
        else {
            console.log('not working');
            return{
                status: true,
                statusCode: 200,
            }
        }
    })
}
const staffAttendanceMark = (id,status,date) => {

    return db.Staffattendance.findOne({attendanceId:id}).then(result => {

        if (result) {
            result.attendance.push({Status:status,
            date:date})
            result.save()
            return{
                status: true,
                statusCode: 200,
            }
        }
        else {
            console.log('not working');
            return{
                status: true,
                statusCode: 200,
            }
        }
    })
}
const staffattendance = () => {
    return db.Staffattendance.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                staffAttendances:result
            }
        }
        else{
            return {
                statusCode: 402,
                message:"somthing wrong"
            }
        }
    })
}
const batch = () => {
    return db.Batch.find().then(result => {
        if (result) {
            return {
                statusCode: 200,
                batchData: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Batch not involve"
            }
        }
    })
}
const editBatch = (id) => {
    return db.Batch.findOne({batchId:id}).then(result => {
        if (result) {
            return {
                statusCode: 200,
                batch: result
            }
        }
        else {
            return {
                statusCode: 404,
                message: "Batch not involve"
            }
        }
    })
}
const addBatch = (batchId,batchName,tutorName,date, phonenumber, email, cource ) => {
    return db.Batch.findOne({ batchName:batchName }).then(result => {
            if (result) {
                return {
                    status: false,
                    message: "Batch already present please check Batch Name",
                    statusCode: 401
                }
            }

            else {

                const newBatch = new db.Batch({
                    batchId,
                    batchName,
                    tutorName,
                    batchDate:date,
                    phonenumber,
                    email,
                    cource: cource
                })
                newBatch.save()
                return {
                    status: true,
                    message: "Batch Add successfully",
                    statusCode: 200
                }
            }
        })
    }
    const updateBatch = (id,batchName,tutorName,date, phonenumber, email, cource) => {
        return db.Batch.findOne({batchId:id}).then(result => {
            if (result) {
                
                result.batchName=batchName
                result.tutorName=tutorName
                result.batchDate=date
                result.phonenumber=phonenumber
                result.email=email
                result.cource=cource
                result.save()
                return {
                    statusCode: 200,
                    message:"Batch Details Update Successfully"
                }
            }
            else {
                return {
                    statusCode: 404,
                    message: "Batch not involve"
                }
            }
        })
    }
    const deleteBatch = (id) => {

        return db.Batch.deleteOne({batchId:id}).then(result => { 
            if(result){
                return {
                    statusCode:200,
                    message:'deleted in batch'
                }
            }
            else{
                return {
                    statusCode:404,
                    message:'batch not present'
                }
            }
        })
    }
    const deleteStaff= (id) => {

        return db.Staff.deleteOne({staffId:id}).then(result => { 
            if(result){
                deleteUser(id)
                deletestaffAttendance(id)
                return {
                    statusCode:200,
                    message:`deleted in student` 
                }
            }
            else{
                return {
                    statusCode:404,
                    message:'batch not present'
                }
            }
        })
    }
    const deleteUser=(id)=>{
        return db.User.deleteOne({userId:id}).then(result=>{
            if(result){
                return{
                    message:"okkk"
                }
            }
        })
    }
    const deletestaffAttendance=(id)=>{
        return db.Staffattendance.deleteOne({attendanceId:id}).then(result=>{
            if(result){
                return{
                    message:"okkk"
                }
            }
        })
    }
    const deleteStudentUser=(id)=>{
        console.log(id,'ih');
        return db.User.deleteOne({userId:id}).then(result=>{
            if(result){
                return{
                    message:"okkk"
                }
            }
        })
    }
    const deleteStudentAttendance=(id)=>{
        console.log(id,'ih');
        return db.Studentattendance.deleteOne({attendanceId:id}).then(result=>{
            if(result){
                return{
                    message:"okkk"
                }
            }
        })
    }

module.exports = {
    allUser,login, staff, student, leave, request, addStaff, addStudent,deleteStudent, reply, complaintSend, leaveRequest, leaveReply, studentattendance, 
    studentAttendanceMark,staffattendance,staffAttendanceMark,batch,addBatch,deleteBatch,editBatch,updateBatch,deleteStaff,editStaff,updateStaff,editStudent,updateStudent
}