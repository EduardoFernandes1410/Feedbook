export interface Evaluation {
  evaluation_owner: number;
  evaluation_dedication_time: number;
  evaluation_material_quality: number;
  evaluation_professor_evaluation: number;
  evaluation_content_complexity: number;
  general_evaluation: number;
  evaluation_desc: string;
}

export interface EvaluationData {
  evaluation_id: string;
  evaluation_owner: string;
  evaluation_dedication_time: number;
  evaluation_material_quality: number;
  evaluation_professor_evaluation: number;
  evaluation_content_complexity: number;
  general_evaluation: number;
  evaluation_desc: string;
  evaluation_upvote_count: number;
  evaluation_downvote_count: number;
  evaluation_upvoted: boolean;
  evaluation_downvoted: boolean;

}
