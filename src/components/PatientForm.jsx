import { useState } from 'react';
import VoiceInputField from './VoiceInputField';

function PatientForm({ onSubmit, language, t }) {
  const [formData, setFormData] = useState({
    patientId: '',
    ashaWorkerId: '',
    medicalHistory: '',
    medicalPhoto: null,
    vaccineStatus: '',
    temperature: '',
    bloodPressure: '',
    symptoms: {
      fever: false,
      cough: false,
      fatigue: false
    },
    otherSymptoms: '',
    checkupDate: '',
    followUpRequired: false,
    notes: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSymptomToggle = (symptom) => (e) => {
    setFormData({
      ...formData,
      symptoms: { ...formData.symptoms, [symptom]: e.target.checked }
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, medicalPhoto: reader.result });
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: navigator.onLine ? 'uploaded' : 'pending'
    });

    setFormData({
      patientId: '',
      ashaWorkerId: '',
      medicalHistory: '',
      medicalPhoto: null,
      vaccineStatus: '',
      temperature: '',
      bloodPressure: '',
      symptoms: { fever: false, cough: false, fatigue: false },
      otherSymptoms: '',
      checkupDate: '',
      followUpRequired: false,
      notes: ''
    });
    setPhotoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>{t.formTitle}</h2>
      <p className="voice-instruction">{t.voiceInstruction}</p>

      <VoiceInputField
        label={t.patientId}
        value={formData.patientId}
        onChange={handleChange('patientId')}
        placeholder={t.enterPatientId}
        language={language}
        listeningText={t.listening}
      />



      <VoiceInputField
        label={t.ashaWorkerId}
        value={formData.ashaWorkerId}
        onChange={handleChange('ashaWorkerId')}
        placeholder={t.enterAshaId}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field">
        <label>{t.temperature}</label>
        <div className="input-wrapper">
          <input
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={handleChange('temperature')}
            placeholder={t.enterTemperature}
          />
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.bloodPressure}</label>
        <div className="input-wrapper">
          <input
            type="text"
            value={formData.bloodPressure}
            onChange={handleChange('bloodPressure')}
            placeholder={t.enterBloodPressure}
          />
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.symptoms}</label>
        <div className="input-wrapper checkbox-group">
          <label><input type="checkbox" checked={formData.symptoms.fever} onChange={handleSymptomToggle('fever')} /> {t.symptomFever}</label>
          <label><input type="checkbox" checked={formData.symptoms.cough} onChange={handleSymptomToggle('cough')} /> {t.symptomCough}</label>
          <label><input type="checkbox" checked={formData.symptoms.fatigue} onChange={handleSymptomToggle('fatigue')} /> {t.symptomFatigue}</label>
        </div>
      </div>

      <VoiceInputField
        label={t.otherSymptoms}
        value={formData.otherSymptoms}
        onChange={handleChange('otherSymptoms')}
        placeholder={t.enterOtherSymptoms}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field">
        <label>{t.checkupDate}</label>
        <div className="input-wrapper">
          <input type="date" value={formData.checkupDate} onChange={handleChange('checkupDate')} />
        </div>
      </div>

      <div className="voice-input-field followup">
        <label>
          <input type="checkbox" checked={formData.followUpRequired} onChange={handleChange('followUpRequired')} /> {t.followUpRequired}
        </label>
      </div>

      <div className="voice-input-field">
        <label>{t.notes}</label>
        <div className="input-wrapper">
          <textarea value={formData.notes} onChange={handleChange('notes')} rows="3" />
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.medicalHistory}</label>
        <div className="input-wrapper">
          <textarea
            value={formData.medicalHistory}
            onChange={handleChange('medicalHistory')}
            placeholder={t.enterMedicalHistory}
            rows="4"
          />
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.medicalPhoto}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="file-input"
        />
        {photoPreview && (
          <div className="photo-preview">
            <img src={photoPreview} alt="Medical preview" />
          </div>
        )}
      </div>

      <VoiceInputField
        label={t.vaccineStatus}
        value={formData.vaccineStatus}
        onChange={handleChange('vaccineStatus')}
        placeholder={t.enterVaccineStatus}
        language={language}
        listeningText={t.listening}
      />

      <button type="submit" className="submit-button">
        {t.submit}
      </button>
    </form>
  );
}

export default PatientForm;
