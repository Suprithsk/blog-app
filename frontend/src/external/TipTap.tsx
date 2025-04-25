
import { Editor, EditorContent } from "@tiptap/react";

import "./styles.scss";


const MenuBar = ({editor}: { editor: Editor | null }) => {
    // const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="p-4 bg-white rounded-md shadow-md border-2 border-slate-200">
            <div className=" flex flex-row gap-2 items-center justify-start flex-wrap ">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active " : "button-tiptap "}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : "button-tiptap"}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    className={editor.isActive("strike") ? "is-active   " : "button-tiptap"}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive("code") ? "is-active" : "button-tiptap"}
                >
                    Code
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className="button-tiptap"
                >
                    Clear marks
                </button>
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className="button-tiptap"
                >
                    Clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive("paragraph") ? "is-active" : "button-tiptap"}
                >
                    Paragraph
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H1
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H2
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H3
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 4 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H4
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 5 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H5
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 6 })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    H6
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active button-tiptap" : "button-tiptap"}
                >
                    Bullet list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : "button-tiptap"
                    }
                >
                    Ordered list
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    className={editor.isActive("codeBlock") ? "is-active" : "button-tiptap"}
                >
                    Code block
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    className={editor.isActive("blockquote") ? "is-active" : "button-tiptap"}
                >
                    Blockquote
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    className="button-tiptap"
                >
                    Horizontal rule
                </button>
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className="button-tiptap"
                >
                    Hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="button-tiptap"
                >
                    Undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="button-tiptap"
                >
                    Redo
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().setColor("#958DF1").run()
                    }
                    className={
                        editor.isActive("textStyle", { color: "#958DF1" })
                            ? "is-active"
                            : "button-tiptap"
                    }
                >
                    Purple
                </button>
            </div>
        </div>
    );
};

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const TipTap = ({editor,readOnly}:{editor: Editor | null,readOnly:boolean}) => {

    if(!editor) {
        return null;
    }

    return (
        <div className="">
            {!readOnly && <MenuBar editor={editor} />}
            <EditorContent
                editor={editor}
                content={content}

            />
        </div>
    );
};

export default TipTap;
