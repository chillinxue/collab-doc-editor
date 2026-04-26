import Editor from './Editor'; // 1. 導入你剛寫好的元件

function App() {
    return (
        <div className='App' style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Cece Doc Editor 📝</h1>
            <p>Candidate: Chelsie Lin</p>

            <div style={{ marginTop: '20px' }}>
                <Editor />
            </div>
        </div>
    );
}

export default App;
