import { useState, useEffect } from 'react';
import { diffChars } from 'diff';
import './App.css';

const homoglyphMap = {
  'a': 'а', 'e': 'е', 'o': 'о', 'c': 'с', 'p': 'р', 'i': 'і', 's': 'ѕ',
  'A': 'А', 'E': 'Е', 'O': 'О', 'C': 'С', 'P': 'Р',
};

function App() {
  // --- Code Homoglyph ---
  const [originalText, setOriginalText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const convertText = (text) => {
    return text
      .split('')
      .map(char => homoglyphMap[char] || char)
      .join('');
  };

  useEffect(() => {
    setModifiedText(convertText(originalText));
  }, [originalText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(modifiedText);
      setCopyStatus('✅ Copié !');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('❌ Erreur de copie');
    }
  };

  // --- Code Comparaison ---
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const differences = diffChars(text1, text2);
  const hasDifferences = differences.some(part => part.added || part.removed);

  return (
    <div className="App">
      <header>
        <h1>ZeroDetector</h1>
        <p>Remplacez vos caractères par des équivalents visuels</p>
      </header>

      {/* Section Homoglyph */}
      <div className="container">
        <div className="box">
          <h2>Texte Original</h2>
          <textarea
            rows="10"
            placeholder="Collez votre texte ici..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
        </div>

        <div className="box">
          <h2>Texte Modifié (Non détectable)</h2>
          <textarea
            rows="10"
            placeholder="Le résultat apparaîtra ici..."
            value={modifiedText}
            readOnly
          />
          <button onClick={handleCopy} className="copy-btn">
            Copier le texte
          </button>
          {copyStatus && <p className="copy-status">{copyStatus}</p>}
        </div>
      </div>

    </div>
  );
}

export default App;
