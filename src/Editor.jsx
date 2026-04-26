import { useState, useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import './Editor.css';

const Editor = () => {
    // --- State Management ---
    const [title, setTitle] = useState(localStorage.getItem('saved-title') || 'Untitled Document');
    const [saveStatus, setSaveStatus] = useState('Saved');
    const [lastSaved, setLastSaved] = useState(localStorage.getItem('last-saved-time') || 'Never');

    // --- Task 3: Sharing States ---
    const [isOwner, setIsOwner] = useState(true);
    const [sharedUsers, setSharedUsers] = useState(['colleague@ajaia.com']);
    const [newEmail, setNewEmail] = useState('');
    const [showShareModal, setShowShareModal] = useState(false);

    const fileInputRef = useRef(null);

    // --- Persistence Logic ---
    const handleSave = useCallback(
        (content, currentTitle) => {
            if (!isOwner) return;

            setSaveStatus('Saving...'); // saveStatus

            setTimeout(() => {
                localStorage.setItem('saved-doc', content);
                localStorage.setItem('saved-title', currentTitle);
                const now = new Date().toLocaleTimeString();
                localStorage.setItem('last-saved-time', now);

                setLastSaved(now);
                setSaveStatus('Saved'); // saveStatus
            }, 500);
        },
        [isOwner]
    );

    // --- File Upload ---
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file || !isOwner) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (editor) {
                editor.commands.setContent(e.target.result);
                const newTitle = file.name.replace(/\.[^/.]+$/, '');
                setTitle(newTitle);
                setSaveStatus('Imported'); // use saveStatus
            }
        };
        reader.readAsText(file);
    };

    // --- TipTap Initialization ---
    const editor = useEditor({
        extensions: [StarterKit, Underline],
        content: localStorage.getItem('saved-doc') || '<h1>Ajaia Assignment</h1><p>Start editing...</p>',
        editable: isOwner,
        onUpdate: ({ editor }) => {
            setSaveStatus('Unsaved'); // saveStatus
            handleSave(editor.getHTML(), title);
        },
    });

    useEffect(() => {
        if (editor) editor.setEditable(isOwner);
    }, [isOwner, editor]);

    // --- Sharing Logic ---
    const handleAddUser = () => {
        if (newEmail && !sharedUsers.includes(newEmail)) {
            setSharedUsers([...sharedUsers, newEmail]); // setSharedUsers
            setNewEmail('');
        }
    };

    if (!editor) return null;

    const isBtnActive = (name, attrs = {}) => (editor.isActive(name, attrs) ? 'active-btn' : '');

    return (
        <div className='editor-wrapper'>
            <div className='status-bar'>
                <div className='status-left'>
                    {/* use saveStatus to change Badge color */}
                    <span className={`status-badge ${saveStatus.toLowerCase().replace('...', '').replace(' ', '-')}`}>
                        {isOwner ? `Status: ${saveStatus}` : 'Read-Only Mode'}
                    </span>
                </div>
                <div className='status-right'>
                    <button className='sim-btn' onClick={() => setIsOwner(!isOwner)}>
                        Switch to {isOwner ? 'Guest View' : 'Owner View'}
                    </button>
                    <span className='last-saved'>Last saved: {lastSaved}</span>
                </div>
            </div>

            <div className='header-main'>
                <input
                    className='title-input'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={!isOwner}
                />

                <div className='action-buttons'>
                    <button className='import-btn' onClick={() => fileInputRef.current.click()} disabled={!isOwner}>
                        Import
                    </button>
                    <button className='share-btn' onClick={() => setShowShareModal(!showShareModal)}>
                        Share
                    </button>
                </div>
                <input type='file' ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
            </div>

            {/* Share Modal*/}
            {showShareModal && (
                <div className='share-modal'>
                    <h4>Share Settings</h4>
                    <div className='share-input-group'>
                        <input
                            type='email'
                            placeholder='Email address'
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <button onClick={handleAddUser}>Add</button>
                    </div>
                    <ul className='user-list'>
                        <li>
                            <strong>You</strong> (Owner)
                        </li>
                        {sharedUsers.map((user) => (
                            <li key={user}>{user} (Viewer)</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={`toolbar ${!isOwner ? 'disabled' : ''}`}>
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
            </div>

            <div className={`tiptap-editor ${!isOwner ? 'readonly' : ''}`}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default Editor;
