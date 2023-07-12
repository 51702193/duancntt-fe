import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

function CustomHTMLPlugin() {
  const [editor] = useLexicalComposerContext();

  editor.update(() => {
    const editorState = editor.getEditorState();
    const jsonString = JSON.stringify(editorState);
    console.log("jsonString", jsonString);

    const htmlString = $generateHtmlFromNodes(editor, null);
    console.log("htmlString", htmlString);
  });

  useEffect(() => {
    // const htmlString = $generateHtmlFromNodes(editor);
    // console.log("editor", htmlString, editor);
  }, [editor]);
}

export default CustomHTMLPlugin;
