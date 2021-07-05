export interface SubjectList {
  subjects: SubjectItem[];
}

export interface SubjectItem {
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
