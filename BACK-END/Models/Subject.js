const mysql = require('mysql2');

const SUBJECT_DATA_COLUMNS = 'subject_id,professor_id,mean_dedication_time,mean_material_quality,mean_professor_evaluation,mean_content_complexity,mean_general,subject_cod,subject_name,evaluations_count,search_field';
const SUBJECT_TABLE = 'subject_tb';
const PROFESSOR_TALBE = 'professor_tb';
const PROFESSOR_DATA_COLUMNS = 'professor_id,professor_name,professor_email,professor_img_url';
const USER_EVALUATED_SUBJECT_TABLE = "user_evaluated_subject_tb";
const USER_EVALUATED_SUBJECT_COLUMNS = "user_id,subject_id";

class Subject {
    constructor(id, professor_id, mean_dedication_time, mean_material_quality, mean_professor_avalaition, mean_content_complexity, mean_general, cod, name, evaluations_count, search_field, dbController = null) {
        this.id = id;
        this.professor_id = professor_id;
        this.mean_dedication_time = mean_dedication_time;
        this.mean_material_quality = mean_material_quality;
        this.mean_professor_evaluation = mean_professor_avalaition;
        this.mean_content_complexity = mean_content_complexity;
        this.mean_general = mean_general
        this.cod = cod;
        this.name = name;
        this.evaluations_count = evaluations_count;
        this.search_field = search_field;
        this.dbController = dbController;
        this.professor_name = null;
        this.professor_img_url = null;
        this.professor_email = null;
    }

    // Auxiliar method to construct a Subject object from query result
    static async subjectFromData(subjectData, dbController) {
        var subjects = []
        subjectData.forEach(element => {
            subjects.push(new Subject(
                element.subject_id,
                element.professor_id,
                element.mean_dedication_time,
                element.mean_material_quality,
                element.mean_professor_evaluation,
                element.mean_content_complexity,
                element.mean_general,
                element.subject_cod,
                element.subject_name,
                element.evaluations_count,
                element.search_field,
                dbController
            ))
        });
        for (var value of subjects) {
            await Subject.getSubjectProfessor(dbController, value);
        }
        return subjects;
    }

    // Retrieves the data of Subject with the given id from the database, using the given controller
    static async getSubjectById(dbController, id) {
        const subjectData = await dbController.select(SUBJECT_TABLE, SUBJECT_DATA_COLUMNS, mysql.format('subject_id=?', id));
        return await Subject.subjectFromData(subjectData, dbController);
    }

    // Retrieves the data of the Subject with the given name from the database, using the given controller
    static async searchForSubjectName(dbController, name) {
        name = name.normalize("NFD").replace(/[^0-9a-z A-Zs]/g, "");
        name = name.toUpperCase();

        var query = mysql.format("search_field LIKE ?", "%" + name + "%");

        const suffix = name.split(" ");
        for (var value of suffix) {
            query += mysql.format(" OR search_field LIKE ?", "%" + value + "%");
        }

        const subjectData = await dbController.select(SUBJECT_TABLE, SUBJECT_DATA_COLUMNS, query);
        return await Subject.subjectFromData(subjectData, dbController);
    }

    // Retrieves all subjects table rows as Subjects objects
    static async getAllSubjects(dbController) {
        const subjectData = await dbController.select(SUBJECT_TABLE, SUBJECT_DATA_COLUMNS, "");
        return await Subject.subjectFromData(subjectData, dbController);
    }

    static async getSubjectProfessor(dbController, subject) {
        const professorData = await dbController.select(PROFESSOR_TALBE, PROFESSOR_DATA_COLUMNS, mysql.format("professor_id=?", subject.professor_id));
        subject.professor_name = professorData[0].professor_name;
        subject.professor_email = professorData[0].professor_email;
        subject.professor_img_url = professorData[0].professor_img_url;
    }

    static async userEvaluatedSubject(dbController, user_id, subject_id) {
        await dbController.insert(
            USER_EVALUATED_SUBJECT_TABLE, [user_id, subject_id],
            USER_EVALUATED_SUBJECT_COLUMNS
        );

        const subject = await Subject.getSubjectById(subject_id);

        await dbController.updateEntry(SUBJECT_TABLE, ["subject_id"], [subject_id], { "evaluations_count": subject.evaluations_count + 1 });
    }

    // Returns the unique identifier of the current Subject
    getId() {
        return this.id;
    }

}

module.exports = Subject;