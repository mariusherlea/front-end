"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAnswer } from "../../../utils";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("../TiptapEditor"), { ssr: false });

const AnswerForm: React.FC<{ id?: string }> = ({ id }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return toast.error("Invalid question ID");
    if (!value.trim() || !name.trim())
      return toast.error("Please fill in all fields");

    toast.promise(createAnswer({ aText: value, user: name, questionId: id }), {
      loading: (() => {
        setLoading(true);
        return "Submitting answer...";
      })(),
      success: (data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        setLoading(false);
        setName("");
        setValue("");
        router.refresh();
        return "Answer submitted successfully!";
      },
      error: (error) => {
        setLoading(false);
        return error.message;
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <TiptapEditor onChange={setValue} />
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" variant="default" className="w-fit">
        {loading ? "Submitting..." : "Submit Answer"}
      </Button>
    </form>
  );
};

export default AnswerForm;
