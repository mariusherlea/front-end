// ./components/Question/Card.tsx

import { Button } from "@/components/ui/button";
import { Question } from "../../../types";
import Link from "next/link";

const QuestionCard: React.FC<{
  question: Question;
}> = ({ question }) => {
  return (
    <article
      key={question.id}
      className="rounded-none border border-stone-100 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800"
    >
      <h3 className="text-3xl font-semibold">{question.qText}</h3>
      <p className="text-stone-600 dark:text-stone-400">
        Asked by {question.user} on{" "}
        {new Date(question.createdAt).toDateString()}
      </p>
      <Button variant="outline" className="mt-3" asChild>
        <Link href={`/questions/${question.documentId}`}>View Question</Link>
      </Button>
    </article>
  );
};

export default QuestionCard;
