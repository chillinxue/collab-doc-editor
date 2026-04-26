import { useState, useEffect, useCallback, useRef } from 'react'; // Added useRef
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import './Editor.css';

const Editor = () => {
    // --- State Management ---
    const [title, setTitle] = useState(localStorage.getItem('saved-title') || 'Untitled Document');
    const [saveStatus, setSaveStatus] = useState('Saved');
    const [lastSaved, setLastSaved] = useState(localStorage.getItem('last-saved-time') || 'Never');

    // --- Refs ---
    const fileInputRef = useRef(null);

    // --- Persistence Logic ---
    const handleSave = useCallback((content, currentTitle) => {
        setSaveStatus('Saving...');
        setTimeout(() => {
            localStorage.setItem('saved-doc', content);
            localStorage.setItem('saved-title', currentTitle);
            const now = new Date().toLocaleTimeString();
            localStorage.setItem('last-saved-time', now);
            setLastSaved(now);
            setSaveStatus('Saved');
        }, 500);
    }, []);

    // Sync title changes
    useEffect(() => {
        setSaveStatus('Unsaved');
        const timeout = setTimeout(() => {
            localStorage.setItem('saved-title', title);
            setSaveStatus('Saved');
        }, 1000);
        return () => clearTimeout(timeout);
    }, [title]);

    // --- File Upload Logic ---
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Restriction check for Task 2
        if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
            alert('Unsupported file type. Please use .txt or .md');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            if (editor) {
                // Update editor content
                editor.commands.setContent(content);
                // Update title based on filename (removing extension)
                const newTitle = file.name.replace(/\.[^/.]+$/, '');
                setTitle(newTitle);
                setSaveStatus('Imported');
            }
        };
        reader.readAsText(file);
    };

    // --- TipTap Initialization ---
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: localStorage.getItem('saved-doc') || '<h1>Welcome to Ajaia Docs</h1><p>Start typing...</p>',
        onUpdate: ({ editor }) => {
            setSaveStatus('Unsaved');
            const html = editor.getHTML();
            handleSave(html, title);
        },
    });

    if (!editor) return null;

    const isBtnActive = (name, attrs = {}) => (editor.isActive(name, attrs) ? 'active-btn' : '');

    return (
        <div className='editor-wrapper'>
            {/* Status Bar */}
            <div className='status-bar'>
                <span className={`status-badge ${saveStatus.toLowerCase().replace('...', '').replace(' ', '-')}`}>
                    {saveStatus}
                </span>
                <span className='last-saved'>Last saved: {lastSaved}</span>
            </div>

            {/* Title & Import Section */}
            <div className='header-main'>
                <div className='title-container' style={{ flex: 1 }}>
                    <input
                        className='title-input'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter document title...'
                    />
                </div>

                {/* Hidden File Input & Custom Button */}
                <div className='import-action'>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept='.txt,.md'
                        style={{ display: 'none' }}
                    />
                    <button className='import-btn' onClick={() => fileInputRef.current.click()}>
                        Import .txt/.md
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className='toolbar'>
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
                <div className='divider' />
                <button className='manual-save-btn' onClick={() => handleSave(editor.getHTML(), title)}>
                    Save Now
                </button>
            </div>

            {/* Editor Area */}
            <div className='tiptap-editor'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
