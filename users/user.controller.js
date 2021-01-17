const { getUserByEmail, create, getUsers, getUserById, updateUser, deleteUser } = require('./user.service');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    // login admin for performing all 

    login : (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {

            if (err) {
                 console.log(err);
                 return res.json({
                    status: 401 ,
                    success: false,
                    message: "Unauthorized User"
                 });
            }
            if (!results) {
                return res.json({
                    status: 400,
                    success:false,
                    message: "invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            //const result = body.password;
            if (result) {
                results.password = undefined;
                const jsontoken = sign( {result: results}, process.env.JWT_KEY, { expiresIn: "1h" } );
                return res.json({
                    success: true,
                    message: "Login successfully",
                    token: jsontoken
                })
            }else{
                return res.json({
                    success: false,
                    data: "invalid email or password"    
                })
            }
        });
    },
    // for create user
    createUser : ( req, res ) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Database Connection Error"
                });
            }
            return res.status(200).json({
                status: 200,
                success: true,
                data: results 
            });
        });
    },
    // for get all users
    getUsers : (req, res) => {
        getUsers( (err, results) => {
            if(err){
                console.log(err);
            }
            return res.json({
                status: 200,
                success: true,
                data: results
            });
        });
    },
    // for get user by specific id
    getUserById : (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err) throw err;
            if(!results){
                return res.json({
                    status: 404,
                    success: false,
                    message: "Data not found"
                });
            }
            return res.json({
                status: 200,
                success: true,
                data: results
            })
        } );
    },

    // for update user 
    updateUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser( body, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    status: 500,
                    success: false,
                    message: "Database connection failed"
                })
            }
            if(!results){
                return res.json({
                    status: 404,
                    success: false,
                    message: "Not Updated"
                })
            }
            return res.json({
                status: 200,
                success: true,
                data:results
            })
        });
    },
    // for delete user
    deleteUser : (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if(err){
                console.log(err);
                return res.json({
                    status: 500,
                    success: false,
                    message: 'Database connection failed'
                });
            }
            if(!results){
                return res.json({
                    status:404, 
                    success: false,
                    message: 'User Not Found'
                })
            }
            return res.json({
                status: 200,
                success: true,
                message: 'User delete successfully'
            });
        });
    }
}