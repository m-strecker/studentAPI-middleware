//import express 
var express = require('express');
var app = express();

app.use(express.json());

//CUSTOM MIDDLEWARE
var c = 0;

function get_middleware (req, res, next){
    c++;
    console.log("HTTP Method: GET");
    console.log("Request Number: " + c);
    next();
}

function post_middleware (req, res, next){
    c++;
    console.log("HTTP Method: POST");
    console.log("Request Number: " + c);
    next();
}

function patch_middleware (req, res, next){
    c++;
    console.log("HTTP Method: PATCH");
    console.log("Request Number: " + c);
    next();
}

function delete_middleware (req, res, next){
    c++;
    console.log("HTTP Method: DELETE");
    console.log("Request Number: " + c);
    next();
}





//turn on server on port 8000
var server = app.listen(8000, function(){
    console.log("Server is ON")
})

//create student array
const students = [{id: 007, name: 'James Bond', section: 3, gpa: 88, nationality:'British'},
{id: 101, name: 'Peter Venkman', section: 1, gpa: 71, nationality:'American'},
{id: 200, name: 'Egon Spengler', section: 6, gpa: 99, nationality:'American'},
{id: 092, name: 'Ray Stanz', section: 4, gpa: 91, nationality:'Canadian'},
{id: 187, name: 'Winston Zedemore', section: 2, gpa: 95, nationality:'American'}];


 //POST METHOD for adding a new student
 app.post('/students/add_student', post_middleware, (req, res)=>{
    const student = {
         id: req.body.id,
         name: req.body.name,
         section: req.body.section,
         gpa: req.body.gpa,
         nationality: req.body.nationality 
    };
    //After object created, push to array 
    students.push(student);
    res.status(200).send(student);
});

//GET METHOD for all students
app.get('/students', get_middleware, (req, res)=>{
    res.send(students);
});


// GET METHOD for student with specific ID
app.get('/students/:id', get_middleware, (req, res)=>{
       //Search for the student in the array by ID
        const student = students.find((element)=>{
        if (element.id === parseInt(req.params.id)) 
        return true});
        //If found return student, else return error    
        if (student) {return res.status(200).send(student);}
        return res.status(404).send('Wrong ID, No Student Found ');
    });

 





//PATCH METHOD for updating a student with specific ID
app.patch('/students/update_student/:id', patch_middleware, (req, res)=>{
    
        //Search for the student in the array by ID
        const student = students.find((element)=>{
            if (element.id === parseInt(req.params.id)) 
            {return true;}
        });
        //If the student exists, use for/in loop, to update value      
        if (student) {
            for (let i in req.body){
            student[i] = req.body[i];
            }
            return res.status(200).send(student);
        }
        //If no student found, error message  
        return res.status(404).send('Wrong ID, No Student Found');
});

//DELETE METHOD for delete a student
app.delete('/students/delete/:id', delete_middleware, (req, res)=>{

    //Check whether the student exists
    const student = students.find((element)=>{
        if (element.id === parseInt(req.params.id)) 
        {return true;}
    });
    //If student exists, save index and delete using spice method
    if(student){
        const index = students.indexOf(student);
        students.splice(index, 1);
        return res.status(200).send(student);
    }
    return res.status(404).send('Wrong ID, No Student Found');
});
            

