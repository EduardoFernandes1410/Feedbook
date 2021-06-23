const User = require("../Models/User.js")
const dbController = require("./DatabaseController.js");
const Evaluation = require("../Models/Evaluation.js")

let db = new dbController("localhost", 3306, "admin", "WCaQnnUB", "feedbook_db");

const AUTH_ERROR_MSG = "wrong credentials";
const UNEXPECTED_ERROR_MSG = "unexpected error";
const CONNECTION_ERROR_MSG = "connection error"
const ERROR_KEY = "error";

db.connect().then(() => { console.log("BD conectado.") });

async function doLogin(req, res, db) {
    const resData = req.body;
    if (!db.isConnected()) {
        res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG });
        return
    }
    try {
        const u = await User.getUserByEmail(db, resData.email);
        if (u.validatePassword(resData.password)) {
            console.log("logou");
        } else {
            res.status(400).send({ ERROR_KEY: AUTH_ERROR_MSG });
            return
        }
        res.send({ "deu certo": "" })
    } catch {
        res.status(400).send({ ERROR_KEY: AUTH_ERROR_MSG });
        return
    }
};

async function returnEvaluations(req, res, db) {
    const resData = req.body;
    // checks connection
    if (!db.isConnected()) {
        res.status(400).send({ ERROR_KEY: CONNECTION_ERROR_MSG })
        return
    }

    // auth check

    try {
        const q = await Evaluation.getSubjectEvaluations(db, resData.subjectId);
        var evaluationsArr = Array();
        for (var e of q) {
            await Evaluation.checkVoting(db, e, resData.userId);
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



const express = require('express');

const app = express();

app.use(express.json());

app.post("/hello", async function(req, res) {
    res.set("Content-Type", "application/json");
    // const data = await doLogin(req, res, db);
    await returnEvaluations(req, res, db);
    // res.send(data);
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});


// async function cadastrateUser(resData, db) {
//     if (!db.isConnected()) {
//         return { "error": "Erro de conexão" }
//     }
//     console.log(User.)
//     const u = User.createNewUser(db, resData.name, resData.email, resData.password);
//     return JSON.stringify(u);
// };