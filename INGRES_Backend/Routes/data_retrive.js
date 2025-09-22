const mysql = require('mysql2');
let answers = null;
async function data_retrive(sql_query) {
    console.log("Inside data_retrive function");
    console.log("SQL Query received in data_retrive for retrieval from the databse :\n\n\n\n ",sql_query);
    // Create a connection to the database
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

      try {
       await connection.connect(function(err) {
              if (err) throw err;
            connection.query(sql_query, function (err, result, fields) {
                if (err) throw err;
                answers = result;
                console.log(result);
                  });
          });
          return answers;
      } catch (error) {
        // console.error("Error executing query in db: ", error);
        console.log("Error executing query in db: ", error);
      }
}

module.exports = data_retrive;