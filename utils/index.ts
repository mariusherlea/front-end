// ./utils/index.ts

import {
  AnswerResponse,
  AnswersResponse,
  CommentInput,
  CommentResponse,
  CommentsResponse,
  ErrorResponse,
  QuestionResponse,
  QuestionsResponse,
} from "../types";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches a list of questions from the API, sorted by their last update time in ascending order.
 *
 * @returns {Promise<QuestionsResponse & ErrorResponse>} - A promise that resolves with the list of questions and any errors encountered.
 */
const getQuestions: () => Promise<
  QuestionsResponse & ErrorResponse
> = async (): Promise<QuestionsResponse & ErrorResponse> => {
  try {
    const res = await fetch(`${API_URL}/questions?sort[0]=updatedAt:asc`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    console.log("🚀 ~ getQuestions ~ data", data);
    console.log(API_URL);
    console.log(API_TOKEN);
    return data;
  } catch (error) {
    console.log("🚨 ~ getQuestions", error);
    return {
      error: { message: "Unable to fetch questions" },
    };
  }
};

/**
 * Creates a new question in the API.
 *
 * @param {Object} question - The question data.
 * @param {string} question.qText - The text of the question.
 * @param {string} question.user - The user ID of the person asking the question.
 * @returns {Promise<QuestionResponse & ErrorResponse>} - A promise that resolves with the created question and any errors encountered.
 */
const createQuestion = async (question: {
  qText: string;
  user: string;
}): Promise<QuestionResponse & ErrorResponse> => {
  console.log("🚀 ~ createQuestion ~ question", question);

  try {
    const res = await fetch(`${API_URL}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          qText: question.qText,
          user: question.user,
        },
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("🚨 ~ createQuestion", error);
    return {
      error: { message: "Unable to create question" },
    };
  }
};

/**
 * Fetches comments related to a specific answer from the API, sorted by their last update time in ascending order.
 *
 * @param {string} answer - The ID of the answer to fetch comments for.
 * @returns {Promise<CommentsResponse & ErrorResponse>} - A promise that resolves with the list of comments and any errors encountered.
 */
const getComments = async (
  answer: string
): Promise<CommentsResponse & ErrorResponse> => {
  try {
    const res = await fetch(
      `${API_URL}/comments?populate=*&filters[answer][documentId]=${answer}&sort[0]=updatedAt:asc`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getComments", error);
    return {
      error: { message: "Unable to fetch comments" },
    };
  }
};

/**
 * Creates a new comment in the API.
 *
 * @param {CommentInput} comment - The comment data.
 * @returns {Promise<CommentResponse & ErrorResponse>} - A promise that resolves with the created comment and any errors encountered.
 */
const createComment: (
  comment: CommentInput
) => Promise<CommentResponse & ErrorResponse> = async ({
  cText,
  user,
  answer,
}: CommentInput): Promise<CommentResponse & ErrorResponse> => {
  try {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ data: { cText, user, answer } }),
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ createComment", error);
    return {
      error: { message: "Unable to create comment" },
    };
  }
};

/**
 * Creates a new answer in the API.
 *
 * @param {Object} answer - The answer data.
 * @param {string} answer.aText - The text of the answer.
 * @param {string} answer.user - The user ID of the person providing the answer.
 * @param {string} answer.questionId - The ID of the question that the answer is related to.
 * @returns {Promise<AnswerResponse & ErrorResponse>} - A promise that resolves with the created answer and any errors encountered.
 */
const createAnswer = async (answer: {
  aText: string;
  user: string;
  questionId: string;
}): Promise<AnswerResponse & ErrorResponse> => {
  console.log("🚀 ~ createAnswer ~ answer", answer);

  try {
    const res = await fetch(`${API_URL}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          aText: answer.aText,
          user: answer.user,
          question: answer.questionId,
        },
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("🚨 ~ createAnswer", error);
    return {
      error: { message: "Unable to create answer" },
    };
  }
};

/**
 * Fetches a specific question from the API by its ID.
 *
 * @param {string} id - The ID of the question to fetch.
 * @returns {Promise<QuestionResponse & ErrorResponse>} - A promise that resolves with the question data and any errors encountered.
 */
const getQuestion: (
  id: string
) => Promise<QuestionResponse & ErrorResponse> = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/questions/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getQuestion", error);
    return {
      error: { message: "Unable to fetch question" },
    };
  }
};

/**
 * Fetches a list of answers related to a specific question from the API, sorted by their creation time in ascending order.
 *
 * @param {string} question - The ID of the question to fetch answers for.
 * @returns {Promise<AnswersResponse & ErrorResponse>} - A promise that resolves with the list of answers and any errors encountered.
 */
const getAnswers: (
  question: string
) => Promise<AnswersResponse & ErrorResponse> = async (
  question: string
): Promise<AnswersResponse & ErrorResponse> => {
  try {
    const res = await fetch(
      `${API_URL}/answers?populate=*&filters[question][documentId]=${question}&sort[0]=createdAt:asc`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.log("🚨 ~ getAnswers", error);
    return {
      error: { message: "Unable to fetch answers" },
    };
  }
};

export {
  getQuestion,
  getQuestions,
  createQuestion,
  getAnswers,
  createAnswer,
  getComments,
  createComment,
};
