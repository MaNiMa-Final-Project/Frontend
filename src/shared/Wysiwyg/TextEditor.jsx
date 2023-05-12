import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


import "./editor.scss";

export default function MyEditor() {
    return (
        <div className="editorContainer">
        
            <CKEditor
                editor={ClassicEditor}
                config={{

                    toolbar: {
                        items: [
                            "undo",
                            "redo",
                            "|",
                            "heading",
                            "|",
                            "fontfamily",
                            "fontsize",
                            "fontColor",
                            "fontBackgroundColor",
                            "|",
                            "bold",
                            "italic",
                            "strikethrough",
                            "subscript",
                            "superscript",
                            "code",
                            "|",
                            "link",
                            "blockQuote",
                            "codeBlock",
                            "|",
                            "alignment",
                            "|",
                            "bulletedList",
                            "numberedList",
                            "todoList",
                            "outdent",
                            "indent"
                        ],
                        shouldNotGroupWhenFull: false
                    },
                }}
                data="<p>Enter your Course Description</p>"
                onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
        </div>
    );
}
