//!  import server framwork (express)

const express=require('express')
// token 

// ! import front-end to server connect laberary in cors
const cors=require('cors')

// ! import login file 
const logic=require('./service/logic')
// express store in server variable

const server=express()

// cors is method
server.use(cors({origin:'http://localhost:3000'}))

// convert json
server.use(express.json())
// ! port setting for server

server.listen(8000,()=>{
    console.log('server started at port 8000');
})

// run command npx nodemon index.js

// nest intergratioon
// integration using laberary is mongoose
// resovle
// ! import json web token
const jwt=require("jsonwebtoken")
// !middleware
const jwtmiddleware=(req,res,next)=>{
    try{
        console.log('jwt');
        const token=req.headers['access-token']
        // const token=request.body.token
    // token verification (verify method using)
   const data= jwt.verify(token,'supersecretkey123')
   console.log(data);
   next()
}
catch{
    res.status(401).json({
        statusCode:401,
        status:false,
        message:"please login"
    })
    
}
}

server.get('/userLogin',(req,res)=>{
    logic.allUser().then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.post('/loginForm',(req,res)=>{
    logic.login(req.body.userId,req.body.password).then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/staff',(req,res)=>{
    logic.staff().then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/student',(req,res)=>{
    logic.student().then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/leave',(req,res)=>{
    logic.leave().then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/request',(req,res)=>{
    logic.request().then(data=>{
        res.status(data.statusCode).json(data)
    })
})

server.post('/addStaffs',jwtmiddleware,(req,res)=>{
    logic.addStaff(req.body.staffId,req.body.name,req.body.age,req.body.gender,req.body.dob,req.body.address,req.body.place,req.body.pin,req.body.email,req.body.phonenumber,req.body.password,req.body.cource)  
    .then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.post('/updateStaffDetails',jwtmiddleware,(req,res)=>{
    logic.updateStaff(req.body.staffId,req.body.name,req.body.age,req.body.gender,req.body.dob,req.body.address,req.body.place,req.body.pin,req.body.email,req.body.phonenumber,req.body.password,req.body.cource)
    .then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.post('/reply',jwtmiddleware,(req,res)=>{
    logic.reply(req.body.id,req.body.date,req.body.day,req.body.reply).then(data=>{
        res.status(data.statusCode).json(data)
    })
})

server.post('/addStudent',jwtmiddleware,(req,res)=>{
    logic.addStudent(req.body.id,req.body.name,req.body.age,req.body.gender,req.body.cource,req.body.address,req.body.dob,req.body.place,req.body.pin,req.body.phonenumber,req.body.email,req.body.password,req.body.tutor,req.body.batchId).then(data=>{
        res.status(data.statusCode).json(data)
    })
})

server.get('/editStudent/:id',(req,res)=>{
    logic.editStudent(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post('/updateStudent',jwtmiddleware,(req,res)=>{
    console.log('hiii');
    logic.updateStudent(req.body.studentId,req.body.name,req.body.age,req.body.gender,req.body.cource,req.body.address,req.body.dob,req.body.place,req.body.pin,req.body.phonenumber,req.body.email,req.body.password,req.body.batchId).then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.delete('/deleteStudent/:id',jwtmiddleware,(req,res)=>{
    logic.deleteStudent(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

server.post("/complaintSend",jwtmiddleware,(req,res)=>{
    logic.complaintSend(req.body.id,req.body.user,req.body.name,req.body.email,req.body.date,req.body.days,req.body.cource,req.body.reason,req.body.status,req.body.replyDate,req.body.reply).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post("/leaveRequest",jwtmiddleware,(req,res)=>{
    logic.leaveRequest(req.body.id,req.body.names,req.body.email,req.body.cource,req.body.applyDate,req.body.reason,req.body.leaveDate,req.body.day,req.body.statuss,req.body.user).then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.post("/leaveReply",jwtmiddleware,(req,res)=>{
    logic.leaveReply(req.body.id,req.body.names,req.body.statuss).then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/studentAttendance',(req,res)=>{
    logic.studentattendance().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post("/markStudentAttendance",(req,res)=>{
    logic.studentAttendanceMark(req.body.attendanceId,req.body.status,req.body.date)
    .then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/staffAttendance',(req,res)=>{
    logic.staffattendance().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post("/markStaffAttendance",(req,res)=>{
    console.log('hii');
    logic.staffAttendanceMark(req.body.attendanceId,req.body.status,req.body.date)
    .then(data=>{
        res.status(data.statusCode).json(data)
    })
})
server.get('/batch',(req,res)=>{
    logic.batch().then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.get('/editBatch/:id',(req,res)=>{
    console.log(req.params.id);
    logic.editBatch(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.get('/editStaff/:id',(req,res)=>{
    console.log(req.params.id);
    logic.editStaff(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.post("/addBatch",jwtmiddleware,(req,res)=>{
    console.log('helo');
    logic.addBatch(req.body.batchId,req.body.batchName,req.body.tutorName,req.body.date,req.body.phonenumber,req.body.email,req.body.cource).then(data=>{
        res.status(data.statusCode).json(data)
    })
})

server.post('/editBatchDetails',jwtmiddleware,(req,res)=>{
    logic.updateBatch(req.body.batchId,req.body.batchName,req.body.tutorName,req.body.date,req.body.phonenumber,req.body.email,req.body.cource)
    .then(data=>{
        res.status(data.statusCode).json(data)
    })
})


server.delete('/deleteBatch/:id',jwtmiddleware,(req,res)=>{
    logic.deleteBatch(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
server.delete('/deleteStaff/:id',jwtmiddleware,(req,res)=>{
    logic.deleteStaff(req.params.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})



