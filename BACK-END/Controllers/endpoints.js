const User = require("../Models/User.js");
const Evaluation = require("../Models/Evaluation.js");
const Subject = require("../Models/Subject.js");

const LOGIN_ERROR_MSG = "Wrong username or password provided.";
const REGISTER_ERROR_MSG = "Failed to create new user.";
const UNEXPECTED_ERROR_MSG = "unexpected error";
const CONNECTION_ERROR_MSG = "connection error"
const ERROR_KEY = "error";
const AUTH_FAILURE_MSG = "authentication failure"


/*
    This function registers the handlers defined above to the corresponding 
    endpoints on the given express app instance. A database controller (connection) 
    must also be passed in order to handle the database dependent operations as
    well as an authentication controller. Any handler function requiring the use 
    of the database controller or authentication controllers might be defined 
    inside of this function to have easy access to those controllers. 
*/
function registerEndpoints(app, dbController, authController) {
    // Defining the endpoint handler functions
    async function doLogin(req, res) {
        const reqBody = req.body;
        let resBody = {};
        // Setting response type to JSON
        res.type('json');
        // Trying to authenticate the user
        try {
            const user = await User.getUserByEmail(dbController, reqBody.email);
            if (!user.validatePassword(reqBody.password)) {
                throw "Invalid password!";
            }
            resBody = {
                user: {
                    name: user.getName(),
                    surname: user.getSurname(),
                    email: user.getEmail(),
                    id: user.getId()
                },
                token: await authController.getToken(user)
            };
            res.status(200);
        } catch {
            console.error("Failed login attempt registered!");
            res.status(401);
            resBody = { error: LOGIN_ERROR_MSG };
        } finally {
            res.json(resBody);
            res.end();
        }
    }

    async function doRegister(req, res) {
        const reqBody = req.body;
        let resBody = {};
        res.type('json');
        try {
            const newUser = await User.createNewUser(dbController,
                reqBody.name,
                reqBody.surname,
                reqBody.email,
                reqBody.password);
            resBody = {
                user: {
                    name: newUser.getName(),
                    surname: newUser.getSurname(),
                    email: newUser.getEmail(),
                    id: newUser.getId()
                },
                token: await authController.getToken(newUser)
            };
            res.status(201);
        } catch (error) {
            console.error("Failed to register a new user!\nAn error happened: ", error);
            res.status(500);
            resBody = { error: REGISTER_ERROR_MSG };
        } finally {
            res.json(resBody);
            res.end();
        }
    }

    async function doUpdate(req, res) {
        const reqBody = req.body;
        let resBody = {};
        res.type('json');
        // Checking request token and denying service if invalid
        if (!await authController.validateToken(reqBody.token)) {
            console.error("User authentication failed: invalid token");
            res.status(403);
            res.json({ error: AUTH_FAILURE_MSG });
            res.end();
            return;
        }
        // Retrieving user to modify and modifying the data
        try {
            let user = await User.getUserById(dbController, reqBody.user.id);
            user.changeName(reqBody.user.name);
            user.changeSurname(reqBody.user.surname);
            user.changeEmail(reqBody.user.email);
            user.changePassword(reqBody.user.password);
            await user.saveUpdates();
            resBody = {
                user: {
                    name: user.getName(),
                    surname: user.getSurname(),
                    email: user.getEmail(),
                    id: user.getId()
                },
                // Generating a new token for the updated user data
                token: await authController.getToken(user)
            };
            res.status(200);
        } catch (error) {
            console.error('Failed to update user!\nThe server encountered an error:', error);
            res.status(500);
            resBody = { error: UNEXPECTED_ERROR_MSG };
        } finally {
            res.json(resBody);
            res.end();
        }
    }

    async function returnEvaluations(req, res) {
        const reqData = req.body;
        // checks connection
        if (!dbController.isConnected()) {
            res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG })
            return
        }

        // auth check
        if (!await authController.validateToken(reqData.token)) {
            res.status(400).send({ ERROR_KEY: AUTH_FAILURE_MSG })
            return
        }

        try {
            const q = await Evaluation.getSubjectEvaluations(dbController, reqData.subjectId);
            var evaluationsArr = Array();
            for (var e of q) {
                await e.checkVoting(reqData.userId);
                evaluationsArr.push({
                    "evaluationId": e.id,
                    "evaluationOwner": e.owner,
                    "evaluationDedicationTime": e.dedication_time,
                    "evaluationMaterialQuality": e.material_quality,
                    "evaluationProfessorEvaluation": e.professor_evaluation,
                    "evaluationContentComplexity": e.content_complexity,
                    "evaluationGeneral": e.general_evaluation,
                    "evaluationDesc": e.desc,
                    "evaluationUpvoteCount": e.upvote_count,
                    "evaluationDownvoteCount": e.downvote_count,
                    "evaluationUpvoted": e.upvoted,
                    "evaluationDownvoted": e.downvoted,
                });
            };

            evaluationsArr.sort(function(a, b) {
                return -a[evaluationUpvoteCount] + b[evaluationUpvoteCount];
            });

            res.send({ "evaluations": evaluationsArr }); // falta retornar subject
            console.log(`All subject ${reqData.subjectId} evaluations have been retrieved.`)
            return
        } catch {
            res.status(400).send({ ERROR_KEY: UNEXPECTED_ERROR_MSG });
            return
        }
    }

    async function feedSubjects(req, res) {
        const reqData = req.body;
        // checks connection
        if (!dbController.isConnected()) {
            res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG })
            return
        }

        // auth check
        if (!await authController.validateToken(reqData.token)) {
            res.status(400).send({ ERROR_KEY: AUTH_FAILURE_MSG })
            return
        }
        console.log(reqData.userId);
        try {
            const q = await Subject.getAllSubjects(dbController);
            var subjectsArr = Array();

            for (var e of q) {
                subjectsArr.push({
                    "subjectId": e.id,
                    "professorName": e.professor_name,
                    "professorImgUrl": e.professor_img_url,
                    "professorEmail": e.professor_email,
                    "meanDedicationTime": e.mean_dedication_time,
                    "meanMaterialQuality": e.mean_material_quality,
                    "meanProfessorEvaluation": e.mean_professor_evaluation,
                    "meanContentComplexity": e.mean_content_complexity,
                    "meanGeneral": e.mean_general,
                    "subjectCod": e.cod,
                    "subjectName": e.name,
                    "evaluationsCount": e.evaluations_count,
                    "userEvaluatedSubject": await Subject.checkEvaluatedByUser(dbController, reqData.userId, e.id)
                });
            };

            subjectsArr.sort(function(a, b) {
                return -a[reqData.orderBy] + b[reqData.orderBy];
            });


            res.send({ "subjects": subjectsArr });
            console.log("Subjects have been retrieved by order.")
            return
        } catch {
            res.status(400).send({ ERROR_KEY: UNEXPECTED_ERROR_MSG });
            return
        }
    }

    async function doSearch(req, res) {
        const reqData = req.body;
        // checks connection
        if (!dbController.isConnected()) {
            res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG })
            return
        }

        // auth check
        if (!await authController.validateToken(reqData.token)) {
            res.status(400).send({ ERROR_KEY: AUTH_FAILURE_MSG })
            return
        }

        try {
            const q = await Subject.searchForSubjectName(dbController, reqData.query);
            var subjectsArr = Array();

            for (var e of q) {
                subjectsArr.push({
                    "subjectId": e.id,
                    "professorName": e.professor_name,
                    "professorImgUrl": e.professor_img_url,
                    "professorEmail": e.professor_email,
                    "meanDedicationTime": e.mean_dedication_time,
                    "meanMaterialQuality": e.mean_material_quality,
                    "meanProfessorEvaluation": e.mean_professor_evaluation,
                    "meanContentComplexity": e.mean_content_complexity,
                    "meanGeneral": e.mean_general,
                    "subjectCod": e.cod,
                    "subjectName": e.name,
                    "evaluationsCount": e.evaluations_count
                });
            };

            res.send({ "subjects": subjectsArr });
            console.log("Subjects have been retrieved by searching.")
            return
        } catch {
            res.status(400).send({ ERROR_KEY: UNEXPECTED_ERROR_MSG });
            return
        }
    }

    async function doEvaluation(req, res) {
        console.log("Recebendo avaliação.");
        const reqData = req.body;
        let resData = {};
        res.type('json');
        // checks connection
        if (!dbController.isConnected()) {
            res.status(503).send({ ERROR_KEY: CONNECTION_ERROR_MSG });
            return;
        }
        // auth check
        if (!await authController.validateToken(reqData.token)) {
            res.status(403).send({ ERROR_KEY: AUTH_FAILURE_MSG });
            console.log("Token expired");
            return;
        }
        try {
            const evaluation = await Evaluation.createNewEvaluation(
                dbController,
                reqData.subjectId,
                reqData.evaluation.owner,
                reqData.evaluation.dedicationTime,
                reqData.evaluation.materialQuality,
                reqData.evaluation.professorEvaluation,
                reqData.evaluation.contentComplexity,
                reqData.evaluation.generalEvaluation,
                reqData.evaluation.desc
            );
            await Subject.userEvaluatedSubject(dbController, reqData.userId, reqData.subjectId, evaluation);
            res.status(200);
            resData = {};
        } catch (error) {
            res.status(500);
            resData = { error: UNEXPECTED_ERROR_MSG };
            console.error("Error evaluating subject: ", error);
        } finally {
            res.json(resData);
            res.end();
        }
    }

    async function doEvaluationVote(req, res) {
        const reqData = req.body;
        let resData = {};
        res.type('json');
        // Checking if the user is authenticated
        if (!await authController.validateToken(reqData.token)) {
            res.status(403);
            res.json({ error: AUTH_FAILURE_MSG });
            res.end();
            return;
        }
        try {
            // Checking if the evaluation type is valid
            if (!Number.isInteger(reqData.type) && (reqData.type < -1 || reqData.type > 1)) {
                console.error(`Invalid vote type "${reqData.type}" received from the requisition.\nThe vote type must be 1 for upvote, -1 for downvote and 0 for null!`);
                throw Error("Invalid vote type received from the requisition.");
            }
            // Getting the target evaluation
            let currentEval = await Evaluation.getEvaluationById(dbController, reqData.evaluationId);
            // Checking if the user already voted on the current evaluation
            await currentEval.checkVoting(reqData.userId);
            // Processing the vote (updating vote or skipping if needed)
            await Evaluation.processVote(dbController, reqData.userId, reqData.evaluationId, reqData.type);
            // Updating the count of up/down votes on the current evaluation
            await Evaluation.computeEvaluationVotes(dbController, currentEval.getId())
            res.status(200);
        } catch (error) {
            console.error('Error evaluating subject: ', error);
            resData = { error: UNEXPECTED_ERROR_MSG };
            res.status(500);
        } finally {
            res.json(resData);
            res.end();
        }
    }

    // Registering the endpoints
    app.post('/user/login', doLogin);
    app.post('/user/register', doRegister);
    app.put('/user/update', doUpdate);
    app.post('/subject/evaluations', returnEvaluations);
    app.post('/feed/all', feedSubjects);
    app.post('/feed/search', doSearch);
    app.post('/subject/evaluate', doEvaluation);
    app.post('/subject/evaluate/vote', doEvaluationVote);
}

module.exports = registerEndpoints;