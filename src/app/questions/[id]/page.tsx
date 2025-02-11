// ./questions/[id]/page.tsx

import AnswerCard from "@/components/Answer/Card";
import AnswerForm from "@/components/Answer/Form";
import { getAnswers, getQuestion } from "../../../../utils";
import Link from "next/link";

const QuestionPage = async ({ params }: { params: { id?: string } }) => {
  const { id } = await params; // Await params before using it

  if (!id) {
    return <p>Invalid Question ID</p>;
  }

  try {
    const [question, answers] = await Promise.all([
      getQuestion(id),
      getAnswers(id),
    ]);

    if (!question?.data) {
      return (
        <header className="bg-stone-50 px-4 py-12 dark:bg-stone-900 lg:px-6">
          <div className="wrapper mx-auto max-w-3xl">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              Oops! Question not found
            </h1>
            <Link className="underline" href="/">
              Maybe you&apos;d like to ask a question?
            </Link>
          </div>
        </header>
      );
    }

    return (
      <main>
        <header className="bg-stone-50 px-4 py-12 dark:bg-stone-900 lg:px-6">
          <div className="wrapper mx-auto max-w-3xl">
            <h1 className="mb-2 text-4xl font-black leading-tight">
              {question.data.qText}
            </h1>
            <p>
              Asked by {question.data.user} on{" "}
              {new Date(question.data.createdAt).toDateString()}
            </p>
          </div>
        </header>
        <section className="site-section bg-gray-100 px-4 py-12 lg:px-6">
          <div className="wrapper mx-auto max-w-3xl">
            <AnswerForm id={id} />
          </div>
        </section>
        <section className="site-section px-4 py-12 lg:px-6">
          <div className="wrapper mx-auto max-w-3xl">
            <header className="section-header mb-8">
              <h2 className="text-2xl">Answers</h2>
            </header>
            <ul className="flex flex-col gap-4" aria-live="polite">
              {answers?.data?.length ? (
                answers.data.map((answer) => (
                  <li key={answer?.documentId}>
                    <AnswerCard answer={answer} />
                  </li>
                ))
              ) : (
                <p>No answers yet. Be the first!</p>
              )}
            </ul>
          </div>
        </section>
      </main>
    );
  } catch {
    return (
      <p className="text-red-500">
        Failed to load question or answers. Please try again later.
      </p>
    );
  }
};

export default QuestionPage;
