import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: localStorage.getItem('saved-doc') || '<p>新文件</p>', // 讀取存檔
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            localStorage.setItem('saved-doc', html); // 每次打字就自動存入瀏覽器
        },
    });

    if (!editor) return null;

    return (
        <div className='editor-wrapper'>
            <div className='toolbar' style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{ fontWeight: editor.isActive('bold') ? 'bold' : 'normal' }}
                >
                    B
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal' }}
                >
                    I
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
            </div>

            <div className='tiptap-editor' style={{ border: '1px solid #000', minHeight: '300px', padding: '10px' }}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
