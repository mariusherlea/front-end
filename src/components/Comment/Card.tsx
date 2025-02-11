// ./components/Comment/Card.tsx

"use client";

import { Comment } from "../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentCard: React.FC<{
  comment: Comment;
  i: number;
}> = ({ comment, i }) => {
  return (
    <article className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={`https://avatar.iran.liara.run/public/${i + 1}`}
            alt={comment?.user}
          />
          <AvatarFallback>
            {comment?.user
              ?.split(" ")
              .map((name) => name[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className=" ">{comment?.user}</p>
      </div>
      <p className="text-sm">{comment?.cText}</p>
    </article>
  );
};

export default CommentCard;
