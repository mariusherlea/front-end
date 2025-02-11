type Comment = {
  id: number;
  documentId: string;
  cText: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  user: string;
  answer: Answer;
};

type CommentInput = {
  cText: string;
  user: string;
  answer: string;
};

type Answer = {
  id: number;
  documentId: string;
  aText: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  question?: Question | null;
};

type Question = {
  id: number;
  documentId: string;
  qText: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
  answers?: Answer[] | null;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type AnswersResponse = {
  data?: Answer[];
  meta?: Meta;
};

type QuestionsResponse = {
  data?: Question[];
  meta?: Meta;
};

type CommentsResponse = {
  data?: Comment[];
  meta?: Meta;
};

type QuestionResponse = {
  data?: Question;
};

type AnswerResponse = {
  data?: Answer;
};

type CommentResponse = {
  data?: Comment;
};

type ErrorResponse = {
  error?: {
    message: string;
  };
};

export type {
  Answer,
  Question,
  Comment,
  CommentInput,
  Meta,
  QuestionsResponse,
  QuestionResponse,
  AnswersResponse,
  AnswerResponse,
  CommentsResponse,
  CommentResponse,
  ErrorResponse,
};
