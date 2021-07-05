export interface Evaluation {
  evaluationOwner: number;
  evaluationDedicationTime: number;
  evaluationMaterialQuality: number;
  evaluationProfessorEvaluation: number;
  evaluationContentComplexity: number;
  generalEvaluation: number;
  evaluationDesc: string;
}

export interface EvaluationData {
  evaluationId: string;
  evaluationOwner: string;
  evaluationDedicationTime: number;
  evaluationMaterialQuality: number;
  evaluationProfessorEvaluation: number;
  evaluationContentComplexity: number;
  generalEvaluation: number;
  evaluationDesc: string;
  evaluationUpvoteCount: number;
  evaluationDownvoteCount: number;
  evaluationUpvoted: boolean;
  evaluationDownvoted: boolean;

}
