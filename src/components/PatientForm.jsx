import { useState } from 'react';
import VoiceInputField from './VoiceInputField';

function PatientForm({ onSubmit, language, t }) {
  const [formData, setFormData] = useState({
    patientId: '',
    fullName: '',
    age: '',
    gender: '',
    mobileNo: '',
    ashaWorkerId: '',
    medicalHistory: '',
    medicalPhoto: null,
    vaccineStatus: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
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
      fullName: '',
      age: '',
      gender: '',
      mobileNo: '',
      ashaWorkerId: '',
      medicalHistory: '',
      medicalPhoto: null,
      vaccineStatus: ''
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
        label={t.fullName}
        value={formData.fullName}
        onChange={handleChange('fullName')}
        placeholder={t.enterFullName}
        language={language}
        listeningText={t.listening}
      />

      <VoiceInputField
        label={t.age}
        value={formData.age}
        onChange={handleChange('age')}
        type="text"
        placeholder={t.enterAge}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field">
        <label>{t.gender}</label>
        <div className="input-wrapper">
          <select
            value={formData.gender}
            onChange={handleChange('gender')}
          >
            <option value="">{t.selectGender}</option>
            <option value="Male">{t.male}</option>
            <option value="Female">{t.female}</option>
            <option value="Other">{t.other}</option>
          </select>
        </div>
      </div>

      <VoiceInputField
        label={t.mobileNo}
        value={formData.mobileNo}
        onChange={handleChange('mobileNo')}
        type="tel"
        placeholder={t.enterMobile}
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
