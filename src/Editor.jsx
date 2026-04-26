import { useState, useEffect } from 'react'; // add usestate
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import './Editor.css';

const Editor = () => {
    // ---rename ---
    const [title, setTitle] = useState(localStorage.getItem('saved-title') || '未命名文件');

    useEffect(() => {
        localStorage.setItem('saved-title', title);
    }, [title]);

    // --- TipTap ---
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline, // underline
        ],
        content: localStorage.getItem('saved-doc') || '<p>Hello world!</p>',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            localStorage.setItem('saved-doc', html);
        },
    });

    if (!editor) return null;

    const isBtnActive = (name, attrs = {}) => (editor.isActive(name, attrs) ? 'active-btn' : '');

    return (
        <div className='editor-wrapper' style={{ maxWidth: '800px', margin: '20px auto' }}>
            {/*(Rename) */}
            <div className='title-container' style={{ marginBottom: '15px' }}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        padding: '5px 0',
                        borderBottom: '2px solid #eee',
                    }}
                    placeholder='add file name'
                />
            </div>

            {/* Toolbar*/}
            <div
                className='toolbar'
                style={{
                    marginBottom: '10px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    padding: '10px',
                    background: '#f5f5f5',
                    borderRadius: '8px 8px 0 0',
                }}
            >
                {/* Text format */}
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={isBtnActive('bold')}>
                    B
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={isBtnActive('italic')}>
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={isBtnActive('underline')}
                >
                    U
                </button>

                <div className='divider' />

                {/* Headings */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={isBtnActive('heading', { level: 1 })}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={isBtnActive('heading', { level: 2 })}
                >
                    H2
                </button>

                <div className='divider' />

                {/* Lists */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={isBtnActive('bulletList')}
                >
                    •
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={isBtnActive('orderedList')}
                >
                    1.
                </button>
            </div>

            {/* edit */}
            <div className='tiptap-editor'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
