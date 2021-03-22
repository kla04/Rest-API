const express = require('express');
const bodyParser = require('body-parser');
const { resolveAny } = require('dns');
const app = express();
const router = express.Router();
const PORT = 80;

let students = {
    list:
        [
            { id: "6135512001", name: 'Kitti', surname: 'Noo', major: "CoE", GPA: 3.3 },
            { id: "6135512002", name: 'John', surname: 'Lennon', major: "SE", GPA: 2.87 },

        ]
}

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

router.route('/students')
    .get((req, res) => res.json(students.list))
    .post((req, res) => {
        //let id = (students.list.length)? students.list[students.list.length-1].id+1:1
        let id = req.body.id
        let name = req.body.name
        let surname = req.body.surname
        let major = req.body.major
        let GPA = req.body.GPA

        students = { list: [...students.list, { id, name, surname, major, GPA }] }
        res.json(students.list)
    })

router.route('/students/:student_id') //params
    .get((req, res) => {
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(students.list[id])
        }
        

    })
    .put((req, res) => {
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            students.list[id].name = req.body.name
            students.list[id].surname = req.body.surname
            students.list[id].major = req.body.major
            students.list[id].GPA = req.body.GPA
            res.json(students.list)
        }


    })
    .delete((req, res) => {
       
        let id = students.list.findIndex((item) => (+item.id === +req.params.student_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            students.list = students.list.filter((item) => +item.id !== +req.params.student_id)
            res.json(students.list)
        }
    })

app.listen(PORT, () => console.log('Server is running at', PORT));