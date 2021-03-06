const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var port = process.env.PORT || "8000";



app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

//Making mongodb connection 
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

    mongoose.connect('mongodb://localhost/Timetable2020');

    mongoose.connection.once('open',function(){
        console.log('Connection has been successfully made');
    }).on('error',function(error) {
        console.log('There is an error ',error);
    });


//making a post request using student model
const Student = require('./models/student');  
const Class = require('./models/class');

app.post('/newStudent',(req,res,next)=>{
    Student.create({studentNo: req.body.studentNo,classes: splitModules(req.body.classes)}).then((student)=>{ 
        res.send(student);
    }).catch(next);
})

//updating student class info
app.put('/updateStudent',(req,res,next)=>{
    Student.findByIdAndUpdate({_id:req.body._id},{studentNo: req.body.studentNo,
        password: req.body.password,classes:splitModules(req.body.classes)}).then((student)=>{
        res.send(student);
    }).catch(next);
})

//function splitting string as saving as array
const splitModules = function(modules_String){
    arrayModules = modules_String.split(",");
    return arrayModules;
}
//get student and their classes
app.get('/getStudent',(req,res,next)=>{
    Student.find({studentNo:20102010}).then((student)=>{
        // student.classes.forEach(element => {
            console.log(req.body.studentNo);
            console.log(student);
        //     Class.find({Module_Code: element})
        //     res.send(element);
        // });
        res.send(student)
        
    })
})


//Delete all classes


app.listen(port,()=>{
    console.log('server is running on '+[port]);
})