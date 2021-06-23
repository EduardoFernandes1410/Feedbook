const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const User = require('./User');

const EVALUATION_DATA_COLUMNS = 'evaluation_id,subject_id,evaluation_owner,evaluation_dedication_time,evaluation_material_quality,evaluation_professor_evaluation,evaluation_content_complexity,general_evaluation,evaluation_upvote_count,evaluation_downvote_count,evaluation_desc';
const EVALUATION_ID_COLUMN = 'evaluation_id';
const EVALUATION_TABLE = 'evaluation_tb';
const VOTES_TABLE = 'user_votes_tb';

class Evaluation {
    constructor(id, subject_id, owner, dedication_time, material_quality, professor_evaluation, content_complexity,
        general_evaluation, upvote_count, downvote_count, desc, dbController = null) {
        this.id = id;
        this.subject_id = subject_id;
        this.owner = owner;
        this.dedication_time = dedication_time;
        this.material_quality = material_quality;
        this.professor_evaluation = professor_evaluation;
        this.content_complexity = content_complexity;
        this.general_evaluation = general_evaluation;
        this.upvote_count = upvote_count;
        this.downvote_count = downvote_count;
        this.dbController = dbController;
        this.upvoted = null;
        this.downvoted = null;
        this.desc = desc;
    }

    // Auxiliary method to build an object from tb data
    static objectFromRow(row, db) {
        return new Evaluation(
            row.evaluation_id,
            row.subject_id,
            row.evaluation_owner,
            row.evaluation_dedication_time,
            row.evaluation_material_quality,
            row.evaluation_professor_evaluation,
            row.evaluation_content_complexity,
            row.evaluation_general_evaluation,
            row.evaluation_upvote_count,
            row.evaluation_downvote_count,
            row.evaluation_desc,
            db,
        );
    }

    // Retrieves the data of evaluation with the given id from the database, using the given controller
    static async getEvaluationById(dbController, id) {
        const evaluationData = await dbController.select(
            EVALUATION_TABLE, EVALUATION_DATA_COLUMNS, mysql.format('evaluation_id=?', id)
        );
        return Evaluation.objectFromRow(evaluationData[0], dbController);
    }


    // Retrieves all evaluations of the given subject
    static async getSubjectEvaluations(dbController, subject_id) {
        const evaluationData = await dbController.select(
            EVALUATION_TABLE, EVALUATION_DATA_COLUMNS, mysql.format('subject_id=?', subject_id)
        );
        var objects = Array()
        evaluationData.forEach((value) => {
            objects.push(Evaluation.objectFromRow(value, dbController));
        });
        return objects;
    }

    /*
        Adds an evaluation with the given data in the database, using 
        the given controller. Returns an Eluvation object with
        the given data on success.
    */
    static async createNewEvaluation(dbController, subject_id, owner, dedication_time, material_quality, professor_evaluation,
        content_complexity, general_evaluation, desc) {

        let newEvaluation = newEvaluation(null, subject_id, owner, dedication_time, material_quality, professor_evaluation,
            content_complexity, general_evaluation, desc, 0, 0, dbController);

        await dbController.insert(
            EVALUATION_TABLE, [
                newEvaluation.subject_id, newEvaluation.owner, newEvaluation.dedication_time,
                newEvaluation.material_quality, newEvaluation.professor_evaluation, newEvaluation.content_complexity,
                newEvaluation.general_evaluation, newEvaluation.upvote_count, newEvaluation.downvote_count, newEvaluation.dbController,
                newEvaluation.upvoted, newEvaluation.downvoted, newEvaluation.desc
            ],
            "subject_id,evaluation_owner,evaluation_dedication_time,evaluation_material_quality,evaluation_professor_evaluation,evaluation_content_complexity,general_evaluation,evaluation_upvote_count,evaluation_downvote_count,evaluation_desc"
        );
        const id = await dbController.query("SELECT last_insert_id()");
        newEvaluation.id = id[0]['last_insert_id()'];
        return newEvaluation;
    }


    // Deletes the evaluation with the given id of the database, using the given controller
    static async deleteEvaluation(dbController, id) {
        await dbController.deleteEntry(EVALUATION_TABLE, EVALUATION_ID_COLUMN, id);
    }

    static async checkVoting(dbController, evalObj, user_id) {
        const q = await dbController.select(
            VOTES_TABLE,
            "",
            mysql.format("evaluation_id=? AND user_id=?", [evalObj.id, user_id])
        );
        if (!q.length) {
            evalObj.upvoted = false;
            evalObj.downvoted = false;
        } else {
            if (q[0].vote_type == 1) {
                evalObj.upvoted = true;
                evalObj.downvoted = false;
            } else if (q[0].vote_type == 0) {
                evalObj.upvoted = false;
                evalObj.downvoted = false;
            } else if (q[0].vote_type == -1) {
                evalObj.upvoted = false;
                evalObj.downvoted = true;
            }
        }
    }

    // Returns the unique identifier of the current evaluation
    getId() {
        return this.id;
    }

}

module.exports = Evaluation;