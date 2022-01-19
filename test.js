const mysqlssh = require("mysql-ssh");

mysqlssh
    .connect(
        {
            host: "PUT SSH HOST HERE",
            user: "PUT SSH USERNAME HERE",
            password: "PUT SSH PASSWORD HERE",
        },
        {
            host: "PUT DATABASE HOST HERE",
            user: "PUT DATABASE USERNAME",
            password: "PUT DATABASE PASSWORD HERE",
            database: "PUT DATABASE NAME HERE",
        }
    )
    .then((client) => {
        client.query("SELECT * FROM `Sightings`", function (err, results, fields) {
            if (err) throw err;
            console.log(results);
            mysqlssh.close();
            return(results);
        });
    })
    .catch((err) => {
        console.log(err);
    });
