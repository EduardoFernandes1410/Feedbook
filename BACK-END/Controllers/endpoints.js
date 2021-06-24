const User = require("../Models/User.js");
const Evaluation = require("../Models/Evaluation.js");

const LOGIN_ERROR_MSG = "Wrong username or password provided!";
const UNEXPECTED_ERROR_MSG = "unexpected error";
const CONNECTION_ERROR_MSG = "connection error"
const ERROR_KEY = "error";


/*
    This function registers the handlers defined above to the corresponding 
    endpoints on the given express app instance. A database controller (connection) 
    must also be passed in order to handle the database dependent operations as
    well as an authentication controller. Any handler function requiring the use 
    of the database controller or authentication controllers might be defined 
    inside of this function to have easy access to those controllers. 
*/
function registerEndpoints(app, dbController, authController){
    // Defining the endpoint handler functions
    async function doLogin(req, res) {

    }

    async function doRegister(req, res){

    }

    async function returnEvaluations(req, res) {
        const resData = req.body;
        // checks connection
        if (!dbController.isConnected()) {
            res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG })
            return
        }

        // auth check

        try {
            const q = await Evaluation.getSubjectEvaluations(dbController, resData.subjectId);
            var evaluationsArr = Array();
            for (var e of q) {
                await Evaluation.checkVoting(dbController, e, resData.userId);
                evaluationsArr.push({
                    "evaluationId": e.id,
                    "evaluationOwner": e.owner,
                    "evaluationDedicationTime": e.dedication_time,
                    "evaluationMaterialQuality": e.material_quality,
                    "evaluationProfessorEvaluation": e.professor_evaluation,
                    "evaluationContentComplexity": e.content_complexity,
                    "evaluationDesc": e.desc,
                    "evaluationUpvoteCount": e.upvote_count,
                    "evaluationDownvoteCount": e.downvote_count,
                    "evaluationUpvoted": e.upvoted,
                    "evaluationDownvoted": e.downvoted,
                });
            };
            res.send({ "evaluations": evaluationsArr });
            return
        } catch {
            res.status(400).send({ ERROR_KEY: UNEXPECTED_ERROR_MSG });
            return
        }
    }

    // async function cadastrateUser(resData, dbController) {
    //     if (!dbController.isConnected()) {
    //         return { "error": "Erro de conexão" }
    //     }
    //     console.log(User.)
    //     const u = User.createNewUser(dbController, resData.name, resData.email, resData.password);
    //     return JSON.stringify(u);
    // };

    // Registering the endpoints
    app.post('/user/login', doLogin);
}

module.exports = registerEndpoints;