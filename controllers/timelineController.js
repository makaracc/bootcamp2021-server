var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME || 'database-1.ccv4n4im9zdq.ap-southeast-2.rds.amazonaws.com',
    user: process.env.RDS_USERNAME || 'admin',
    password: process.env.RDS_PASSWORD || 'bootcamp',
    port: process.env.RDS_PORT || 3306,
    database: "bootcampusers"
});

let createTable = "CREATE TABLE Posts ( userId varchar(255), time DATE,content varchar(255) );"


const connect=()=>{
    connection.connect(function (err) {
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }
        console.log('Connected to database.');
        connection.query(createTable, function (err, result) {
          if (err){
              console.log('Table exists')
          }else{
              console.log(result);

      
          }
        })
    });

}

const getPosts=(req, res)=>{
    console.log(">>>>>>>>>>",req.user);
    connection.query("SELECT * FROM Posts", function (err, result) {
        if (err) throw err;
        console.log('[Posts]:', result);
        res.json({message: "Success", data: result, statusCode: 200}).status(200)
    });

  
}

const postPost=(req, res)=>{
    console.log('HIT POST')
    let postData = req.body;
    time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    userId = 'alessio',
        content = 'this is a good day'
    let insertQuery = `INSERT INTO Posts (userId, time,content) VALUES ('${req.user.email||'johndoe'}','${time}','${postData.content||'fakecontent'}')`;
    connection.query(insertQuery, function (err, result) {
        if(err) {
            console.log('[Err]:',err)
            res.json({message: err.message, statusCode: 400}).status(400)
        }
        else{
            res.json({message: "Succesfully Created", data: result, statusCode: 201}).status(201)
        }
    });

}

module.exports = {
    postPost,getPosts,connect
}