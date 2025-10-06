import { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientCard from './components/PatientCard';
import { translations, languageCodes, languageNames } from './utils/translations';
import './App.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const t = translations[selectedLanguage];
  const languageCode = languageCodes[selectedLanguage];

  useEffect(() => {
    // Ensure patient records are not persisted across page reloads.
    // Clear any stored patients on mount so cards are removed after a reload.
    try {
      localStorage.removeItem('patients');
    } catch (e) {
      // ignore localStorage access errors
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Note: patients are intentionally kept in-memory only and not saved to localStorage.

  useEffect(() => {
    localStorage.setItem('language', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setPatients(prevPatients =>
        prevPatients.map(patient => ({
          ...patient,
          status: 'uploaded'
        }))
      );
    };

    const handleOffline = () => {
      setIsOnline(false);
      setPatients(prevPatients =>
        prevPatients.map(patient => ({
          ...patient,
          status: 'pending'
        }))
      );
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleFormSubmit = (patientData) => {
    setPatients([patientData, ...patients]);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t.appTitle}</h1>
        <div className="header-controls">
          <div className="language-selector">
            <label htmlFor="language">{t.language}:</label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="language-dropdown"
            >
              {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
          <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? `🟢 ${t.online}` : `🔴 ${t.offline}`}
          </div>
        </div>
      </header>

      <div className="app-container">
        <div className="form-section">
          <PatientForm
            onSubmit={handleFormSubmit}
            language={languageCode}
            t={t}
          />
        </div>

        <div className="cards-section">
          <h2>{t.patientRecords} ({patients.length})</h2>
          <div className="cards-container">
            {patients.length === 0 ? (
              <p className="no-records">{t.noRecords}</p>
            ) : (
              patients.map(patient => (
                <PatientCard key={patient.id} patient={patient} t={t} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
