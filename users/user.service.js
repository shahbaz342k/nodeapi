const pool = require('../config/db');
const created_at = require('../inc/dateTime');
//console.log(pool);

module.exports = {
    getUserByEmail : (email, callback) => {
        pool.query(
            `SELECT email, password FROM admin WHERE email = ?`,
            [email],
            (error, results) => {
                if (error) {
                    return callback(error);
                }else{
                    return callback(null, results[0]);
                }
            }
            );
    },
    create : (data, callback) => {
        pool.query( 
            `INSERT INTO users (name,email,password,gender,created_at) VALUES(?,?,?,?, '${created_at}')`, 
            [
                data.name,
                data.email,
                data.password,
                data.gender
            ],
            (error, results, fields) => {
                if(error){
                   return callback(error);
                }
                return callback(null, results)
            }
        );
    },
    getUsers : (callback) => {
        pool.query(`SELECT * FROM users ORDER BY id DESC`,
            [],
            (error, results) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }, 
    getUserById : (id, callback) => {
        pool.query( `SELECT * FROM users WHERE id = ?`, 
            [id], 
            (error, results, fields) => { 
                if (error){
                    return callback(error);
                } 
                return callback(null, results[0]);
            }
        );
        
    },
    updateUser : (data, callback) => {
        pool.query(
            `UPDATE users SET name= ?, email= ?, password=?, gender=? WHERE id = ?  `, 
            [
                data.name,
                data.email,
                data.password,
                data.gender,
                data.id
            ], 
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            });
    },
    deleteUser: (id,callback) => {
        pool.query(
            `DELETE FROM users WHERE id= ?`, 
            [id], 
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
}