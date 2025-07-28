"use client"

import { useState, useEffect } from "react"
import FroalaEditor from "react-froala-wysiwyg"

// Import Froala Editor CSS
import "froala-editor/css/froala_editor.pkgd.min.css"
import "froala-editor/css/froala_style.min.css"

// Import Froala Editor JS plugins
import "froala-editor/js/plugins/align.min.js"
import "froala-editor/js/plugins/char_counter.min.js"
import "froala-editor/js/plugins/code_beautifier.min.js"
import "froala-editor/js/plugins/code_view.min.js"
import "froala-editor/js/plugins/colors.min.js"
import "froala-editor/js/plugins/emoticons.min.js"
import "froala-editor/js/plugins/file.min.js"
import "froala-editor/js/plugins/font_family.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/fullscreen.min.js"
import "froala-editor/js/plugins/help.min.js"
import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/image_manager.min.js"
import "froala-editor/js/plugins/line_breaker.min.js"
import "froala-editor/js/plugins/link.min.js"
import "froala-editor/js/plugins/lists.min.js"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/paragraph_style.min.js"
import "froala-editor/js/plugins/print.min.js"
import "froala-editor/js/plugins/quick_insert.min.js"
import "froala-editor/js/plugins/quote.min.js"
import "froala-editor/js/plugins/save.min.js"
import "froala-editor/js/plugins/table.min.js"
import "froala-editor/js/plugins/url.min.js"
import "froala-editor/js/plugins/video.min.js"
import "froala-editor/js/plugins/word_paste.min.js"

interface FroalaEditorProps {
  value: string
  onChange: (html: string) => void
}

export default function FroalaEditorComponent({ value, onChange }: FroalaEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Froala Editor configuration with extensive features
  const config = {
    placeholderText: "Start typing your content here...",
    charCounterCount: false, // Set to false to remove the character counter in the footer
    heightMin: 400, // Increased minimum height
    // IMPORTANT: Replace 'YOUR_FROALA_LICENSE_KEY' with your actual license key
    // A valid license key is required to remove the "Powered by Froala" branding.
    licenseKey: "YOUR_FROALA_LICENSE_KEY",
    toolbarButtons: [
      // Flattened all buttons into a single array for direct visibility
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "subscript",
      "superscript",
      "fontFamily",
      "fontSize",
      "textColor",
      "backgroundColor",
      "clearFormatting",
      "alignLeft",
      "alignCenter",
      "alignRight",
      "alignJustify",
      "formatOL",
      "formatUL",
      "paragraphFormat",
      "paragraphStyle",
      "lineHeight",
      "outdent",
      "indent",
      "quote",
      "insertLink",
      "insertImage",
      "insertVideo",
      "insertTable",
      "emoticons",
      "specialCharacters",
      "insertHR",
      "print",
      "help",
      "undo",
      "redo",
      "codeView",
      "fullscreen", // Added fullscreen button
      "save", // Added save button
      "file", // Added file button
    ],
    pluginsEnabled: [
      "align",
      "charCounter",
      "codeBeautifier",
      "codeView",
      "colors",
      "emoticons",
      "file",
      "fontFamily",
      "fontSize",
      "fullscreen", // Ensure fullscreen plugin is enabled
      "help",
      "image",
      "imageManager",
      "lineBreaker",
      "link",
      "lists",
      "paragraphFormat",
      "paragraphStyle",
      "print",
      "quickInsert",
      "quote",
      "save", // Ensure save plugin is enabled
      "table",
      "url",
      "video",
      "wordPaste",
    ],
  }

  if (!isMounted) {
    return null // Render nothing on the server
  }

  return (
    <div className="froala-editor-container">
      <FroalaEditor tag="textarea" model={value} onModelChange={onChange} config={config} />
    </div>
  )
}
