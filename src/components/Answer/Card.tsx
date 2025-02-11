// ./components/Answer/Card.tsx

"use client";

import { Answer, Comment } from "../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentForm from "@/components/Comment/Form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import CommentCard from "@/components/Comment/Card";
import { getComments } from "../../../utils";

const AnswerCard: React.FC<{
  answer: Answer;
}> = ({ answer }) => {
  const [showPostComment, setShowPostComment] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetComments = async () => {
    if (showComments) {
      setShowComments(false);
      return;
    }
    setLoading(true);
    toast.promise(getComments(answer?.documentId), {
      loading: (() => {
        setLoading(true);
        return "Fetching comments...";
      })(),
      success: (data) => {
        if (data?.error) {
          return data.error.message;
        }
        if (!data?.data?.length) {
          return "No comments yet. Be the first!";
        }
        setComments(data?.data);
        setLoading(false);
        return "Comments fetched successfully";
      },
      error: (error) => {
        setLoading(false);
        console.log("🚨 ~ handleGetComments ~ error", error);
        return "Unable to fetch comments";
      },
      finally: () => {
        setLoading(false);
        setShowComments(true);
      },
    });
  };

  return (
    <article className="flex flex-col rounded-none border border-stone-100 bg-stone-50 dark:border-stone-900 dark:bg-stone-900">
      <div className="user flex w-full items-center gap-2 border-b border-stone-200 p-4 dark:border-stone-800">
        <Avatar>
          <AvatarImage
            src={`https://avatar.iran.liara.run/public/${Math.floor(
              Math.random() * 10 + 1
            )}`}
            alt={answer?.user}
          />
          <AvatarFallback>
            {answer?.user
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className=" ">{answer?.user}</p> on{" "}
        <p>{new Date(answer?.updatedAt).toDateString()}</p>
      </div>
      <div
        className="p-4"
        {...{
          dangerouslySetInnerHTML: {
            __html: answer?.aText,
          },
        }}
      ></div>
      <div className="flex flex-wrap gap-2 border-t border-stone-200 p-4 dark:border-stone-800">
        {!showPostComment ? (
          <Button
            onClick={() => setShowPostComment(!showPostComment)}
            variant={"outline"}
          >
            Post a comment
          </Button>
        ) : (
          <div className="w-full">
            <Button
              onClick={() => setShowPostComment(!showPostComment)}
              variant={"outline"}
              className="mb-4"
            >
              Hide comment form
            </Button>
            <CommentForm answer={answer?.documentId} />
          </div>
        )}
        <Button onClick={handleGetComments} variant={"outline"}>
          {loading
            ? "Fetching comments..."
            : showComments
            ? "Hide comments"
            : "Show comments"}
        </Button>
      </div>
      {showComments && (
        <div className="border-t border-stone-200 dark:border-stone-800">
          {comments?.length ? (
            <ul className="flex flex-col gap-4">
              {comments.map((comment, i) => (
                <li
                  key={comment?.documentId}
                  className="border-t border-stone-200 first-of-type:border-t-0 dark:border-stone-800"
                >
                  <CommentCard comment={comment} i={i} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4">No comments yet. Be the first!</p>
          )}
        </div>
      )}
    </article>
  );
};

export default AnswerCard;
