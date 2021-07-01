export interface SubjectList {
  subjects: Subject[];
}

export interface Subject {
  subjectId: number,
  professorName: string,
  professorImgUrl: string,
  professorEmail: string,
  meanDedicationTime: number,
  meanMaterialQuality: number,
  meanProfessorEvaluation: number,
  meanContentComplexity: number,
  meanGeneral: number,
  subjectCod: string,
  subjectName: string,
  evaluationsCount: number,
}
