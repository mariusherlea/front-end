// ./components/Comment/Form.tsx

"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "../../../utils";

const CommentForm: React.FC<{
  answer: string;
}> = ({ answer }) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim() || !user.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.promise(createComment({ cText: comment, user, answer }), {
      loading: (() => {
        setLoading(true);
        return "Posting comment...";
      })(),
      success: (data) => {
        console.log("🚀 ~ data", data);
        if (data.error) {
          throw new Error(data.error.message);
        }

        setLoading(false);
        setComment("");
        setUser("");
        router.refresh();
        return "Comment posted!";
      },
      error: (error) => {
        setLoading(false);
        return error.message;
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Textarea
        className="bg-white dark:bg-stone-800"
        name="comment"
        placeholder="Type your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Input
        className="bg-white dark:bg-stone-800"
        type="text"
        name="name"
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <Button type="submit" variant={"default"}>
        {loading ? "Posting comment..." : "Post comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
