// ./components/Question/Form.tsx

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion } from "../../../utils";

const QuestionForm: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim() || !name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.promise(createQuestion({ qText: question, user: name }), {
      loading: (() => {
        setLoading(true);
        return "Submitting question...";
      })(),
      success: (data) => {
        console.log("🚀 ~ handleSubmit ~ data", data);

        if (data.error) {
          throw new Error(data.error.message);
        }
        setLoading(false);
        setQuestion("");
        setName("");
        router.push(`/questions/${data.data?.documentId}`);

        return "Question submitted successfully!";
      },
      error: (error) => {
        setLoading(false);
        console.log("🚨 ~ handleSubmit ~ error", error);

        return "Failed to submit question";
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="name"
          id="name"
          defaultValue="Happy Hogan"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="question">Your Question</Label>
        <Textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <Button type="submit">
        {loading ? "Submitting question..." : "Submit Question"}
      </Button>
    </form>
  );
};

export default QuestionForm;
