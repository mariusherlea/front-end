// ./app/page.tsx

import QuestionCard from "@/components/Question/Card";
import QuestionDrawer from "@/components/Question/Drawer";
import { getQuestions } from "../../utils";

export default async function Home() {
  const questions = await getQuestions();
  return (
    <main>
      <header className="bg-stone-50 px-4 py-12 dark:bg-stone-900 lg:px-6">
        <div className="wrapper mx-auto max-w-3xl">
          <h1 className="mb-2 text-6xl font-black leading-tight">
            Start asking questions
          </h1>
          <QuestionDrawer />
        </div>
      </header>
      <section className="site-section p-4 lg:px-6">
        <div className="wrapper mx-auto max-w-3xl">
          <header className="section-header mb-4">
            <h2 className="section-title text-xl font-semibold">Questions</h2>
          </header>
          {questions?.data?.length ? (
            <ul className="grid gap-4">
              {questions.data.map((question) => (
                <li key={question?.documentId}>
                  <QuestionCard question={question} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions found yet. Be the first to ask!</p>
          )}
        </div>
      </section>
    </main>
  );
}
