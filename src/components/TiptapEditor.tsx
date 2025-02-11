"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = ({
  onChange,
}: {
  onChange: (content: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Send content back to parent
    },
  });

  return (
    <div className="border rounded p-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
