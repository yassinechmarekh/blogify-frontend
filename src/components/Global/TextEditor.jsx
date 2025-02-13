import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Underline,
} from "lucide-react";
import { Mark } from "@tiptap/core";

const TextEditor = ({ onContentChange, oldContent }) => {
  const [content, setContent] = useState("");

  const underline = Mark.create({
    name: "underline",
    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },
    parseHTML() {
      return [
        {
          tag: "u",
        },
        {
          style: "text-decoration",
          getAttrs: (value) => value === "underline" && null,
        },
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ["u", this.options.HTMLAttributes, 0];
    },
    addCommands() {
      return {
        toggleUnderline:
          () =>
          ({ commands }) => {
            return commands.toggleMark(this.name);
          },
      };
    },
  });

  useEffect(() => {
    setContent(oldContent);
  }, [oldContent]);
  useEffect(() => {
    console.log("Updated content:", content);
    if (editor && content) {
      editor.commands.setContent(content, false);
    }
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      underline,
    ],
    content: "<p>Start writing here...</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
      onContentChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className={"flex gap-2 mb-2"}>
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("bold")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Bold className="h-4 w-4" />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("italic")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Italic className="h-4 w-4" />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("underline")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Underline className="h-4 w-4" />
        </div>
        <div
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("paragraph")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Pilcrow className="h-4 w-4" />
        </div>
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("heading", { level: 1 })
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Heading1 className="h-4 w-4" />
        </div>
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Heading2 className="h-4 w-4" />
        </div>
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <Heading3 className="h-4 w-4" />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("bulletList")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <List className="h-4 w-4" />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-sm cursor-pointer my-transition ${
            editor.isActive("orderedList")
              ? "bg-iris text-white"
              : "bg-transparent text-space-cadet hover:bg-tropical-indigo/20 hover:text-iris"
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="text-editor"
        onChange={() => {
          onContentChange(editor.getHTML());
        }}
      />
    </div>
  );
};

export default TextEditor;
