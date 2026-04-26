import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>This is my AI collab-doc-editor ✨</p>',
    });

    return (
        <div className='editor-container' style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor;
