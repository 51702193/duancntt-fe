import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

function CustomHTMLPlugin({ onValuesChange }) {
  const [editor] = useLexicalComposerContext();

  // editor.update(() => {
  //   const editorState = editor.getEditorState();
  //   // const jsonString = JSON.stringify(editorState);
  //   // console.log("jsonString", jsonString);
  //   const htmlString = $generateHtmlFromNodes(editor, null);
  //   console.log("htmlString", htmlString);
  //   // editorState.
  //   // return htmlString;
  // });

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          // console.log("htmlString", htmlString);
          onValuesChange(htmlString);
        });
      }}
    />
  );
}

export default CustomHTMLPlugin;
