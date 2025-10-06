import { useState } from 'react';
import VoiceInputField from './VoiceInputField';

function PatientForm({ onSubmit, language, t }) {
  const [formData, setFormData] = useState({
    patientId: '',
    ashaWorkerId: '',
    medicalHistory: '',
    medicalPhoto: null,
    vaccineStatus: '',
    height: '',
    weight: '',
    bmi: '',
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
    ,
    // Lifestyle fields
    smoking: false,
    smokingFrequency: '',
    alcohol: false,
    alcoholFrequency: '',
    physicalActivity: 'Sedentary',
    dietaryHabits: 'Mixed',
    dailyMealPattern: '',
    sleepQuality: 'Average'
    ,
  // Mental & Emotional Health
  stressLevel: 'Moderate', // Low/Moderate/High
  depressionAnxiety: false,
  depressionAnxietyNotes: '',
  sleepHours: '',
  sleepDisturbances: '',
    // Medical History fields
    pastIllnesses: {
      diabetes: false,
      hypertension: false,
      asthma: false,
      tb: false,
      covid: false,
      other: ''
    },
    pastSurgeries: '',
    allergies: '',
    currentMedications: '',
    immunizationHistory: {
      tetanus: false,
      hepatitis: false,
      covid: false,
      other: ''
    },
    // Diagnostic & Treatment Tracking
    previousTestReports: [], // { dataUrl, name }
    previousTestResults: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [testReportPreviews, setTestReportPreviews] = useState([]);

  const handleChange = (field) => (e) => {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // convert radio string 'true'/'false' to boolean
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    const next = { ...formData, [field]: value };

    // compute BMI when height or weight changes
    if (field === 'height' || field === 'weight') {
      const h = parseFloat(field === 'height' ? value : next.height);
      const w = parseFloat(field === 'weight' ? value : next.weight);
      if (h > 0 && w > 0) {
        const hMeters = h / 100;
        const bmiVal = +(w / (hMeters * hMeters)).toFixed(1);
        next.bmi = isFinite(bmiVal) ? String(bmiVal) : '';
      } else {
        next.bmi = '';
      }
    }

    setFormData(next);
  };

  const handleSymptomToggle = (symptom) => (e) => {
    setFormData({
      ...formData,
      symptoms: { ...formData.symptoms, [symptom]: e.target.checked }
    });
  };

  const handlePastIllnessToggle = (illness) => (e) => {
    setFormData({
      ...formData,
      pastIllnesses: { ...formData.pastIllnesses, [illness]: e.target.checked }
    });
  };

  const handleDepAnxToggle = (e) => {
    setFormData({ ...formData, depressionAnxiety: e.target.checked });
  };

  const handleImmunizationToggle = (vax) => (e) => {
    setFormData({
      ...formData,
      immunizationHistory: { ...formData.immunizationHistory, [vax]: e.target.checked }
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

  const handleTestReportsChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const readers = files.map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ dataUrl: reader.result, name: file.name });
        reader.readAsDataURL(file);
      })
    );
    Promise.all(readers).then((results) => {
      setFormData({ ...formData, previousTestReports: results });
      setTestReportPreviews(results);
    });
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
      height: '',
      weight: '',
      bmi: '',
      bloodPressure: '',
  symptoms: { fever: false, cough: false, fatigue: false },
  otherSymptoms: '',
  checkupDate: '',
  followUpRequired: false,
  notes: ''
  ,
      smoking: false,
      smokingFrequency: '',
      alcohol: false,
      alcoholFrequency: '',
      physicalActivity: 'Sedentary',
      dietaryHabits: 'Mixed',
      dailyMealPattern: '',
      sleepQuality: 'Average'
      ,
      previousTestReports: [],
      previousTestResults: ''
    });
    setPhotoPreview(null);
    setTestReportPreviews([]);
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


      <h3 className="section-heading">General Health Parameters:</h3>

      <VoiceInputField
      
        label={t.height}
        value={formData.height}
        onChange={handleChange('height')}
        type="number"
        placeholder={t.enterHeight}
        language={language}
        listeningText={t.listening}
      />

      <VoiceInputField
        label={t.weight}
        value={formData.weight}
        onChange={handleChange('weight')}
        type="number"
        placeholder={t.enterWeight}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field">
        <label>{t.bmi}</label>
        <div className="input-wrapper">
          <input type="text" value={formData.bmi} readOnly placeholder={t.enterBMI} />
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

      {/* Mental & Emotional Health section */}
      <h3 className="section-heading">{t.mentalHealthSectionTitle || 'Mental & Emotional Health'}:</h3>

      <div className="voice-input-field">
        <label>{t.stressLevel}</label>
        <div className="input-wrapper">
          <select value={formData.stressLevel} onChange={handleChange('stressLevel')}>
            <option value="Low">{t.low}</option>
            <option value="Moderate">{t.moderate}</option>
            <option value="High">{t.high}</option>
          </select>
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.depressionAnxiety}</label>
        <div className="input-wrapper radio-group">
          <label><input type="radio" name="depressionAnxiety" value={true} checked={formData.depressionAnxiety === true} onChange={handleDepAnxToggle} /> {t.yes}</label>
          <label><input type="radio" name="depressionAnxiety" value={false} checked={formData.depressionAnxiety === false} onChange={(e) => setFormData({ ...formData, depressionAnxiety: false })} /> {t.no}</label>
        </div>
        {formData.depressionAnxiety && (
          <VoiceInputField
            label={t.depressionAnxietyNotes}
            value={formData.depressionAnxietyNotes}
            onChange={handleChange('depressionAnxietyNotes')}
            placeholder={t.enterDepressionAnxietyNotes}
            language={language}
            listeningText={t.listening}
          />
        )}
      </div>

      <div className="voice-input-field">
        <label>{t.sleepPattern}</label>
        <div className="input-wrapper">
          <input type="number" value={formData.sleepHours} onChange={handleChange('sleepHours')} placeholder={t.enterSleepHours} />
        </div>
        <VoiceInputField
          label={t.sleepDisturbances}
          value={formData.sleepDisturbances}
          onChange={handleChange('sleepDisturbances')}
          placeholder={t.enterSleepDisturbances}
          language={language}
          listeningText={t.listening}
        />
      </div>

      {/* Medical History section */}
      <h3 className="section-heading">{t.medicalHistorySectionTitle || t.medicalHistory}:</h3>

      <div className="voice-input-field illnesses-group">
        <label>{t.pastIllnesses}</label>
        <div className="input-wrapper checkbox-group">
          <label><input type="checkbox" checked={formData.pastIllnesses.diabetes} onChange={handlePastIllnessToggle('diabetes')} /> {t.diabetes}</label>
          <label><input type="checkbox" checked={formData.pastIllnesses.hypertension} onChange={handlePastIllnessToggle('hypertension')} /> {t.hypertension}</label>
          <label><input type="checkbox" checked={formData.pastIllnesses.asthma} onChange={handlePastIllnessToggle('asthma')} /> {t.asthma}</label>
          <label><input type="checkbox" checked={formData.pastIllnesses.tb} onChange={handlePastIllnessToggle('tb')} /> {t.tb}</label>
          <label><input type="checkbox" checked={formData.pastIllnesses.covid} onChange={handlePastIllnessToggle('covid')} /> {t.covid}</label>
        </div>
        <VoiceInputField
          label={t.pastIllnessesOther}
          value={formData.pastIllnesses.other}
          onChange={(e) => setFormData({ ...formData, pastIllnesses: { ...formData.pastIllnesses, other: e.target.value } })}
          placeholder={t.enterPastIllnessesOther}
          language={language}
          listeningText={t.listening}
        />
      </div>

      <VoiceInputField
        label={t.pastSurgeries}
        value={formData.pastSurgeries}
        onChange={handleChange('pastSurgeries')}
        placeholder={t.enterPastSurgeries}
        language={language}
        listeningText={t.listening}
      />

      <VoiceInputField
        label={t.allergies}
        value={formData.allergies}
        onChange={handleChange('allergies')}
        placeholder={t.enterAllergies}
        language={language}
        listeningText={t.listening}
      />

      <VoiceInputField
        label={t.currentMedications}
        value={formData.currentMedications}
        onChange={handleChange('currentMedications')}
        placeholder={t.enterCurrentMedications}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field immunization-group">
        <label>{t.immunizationHistory}</label>
        <div className="input-wrapper checkbox-group">
          <label><input type="checkbox" checked={formData.immunizationHistory.tetanus} onChange={handleImmunizationToggle('tetanus')} /> {t.tetanus}</label>
          <label><input type="checkbox" checked={formData.immunizationHistory.hepatitis} onChange={handleImmunizationToggle('hepatitis')} /> {t.hepatitis}</label>
          <label><input type="checkbox" checked={formData.immunizationHistory.covid} onChange={handleImmunizationToggle('covid')} /> {t.covid}</label>
        </div>
        <VoiceInputField
          label={t.immunizationOther}
          value={formData.immunizationHistory.other}
          onChange={(e) => setFormData({ ...formData, immunizationHistory: { ...formData.immunizationHistory, other: e.target.value } })}
          placeholder={t.enterImmunizationOther}
          language={language}
          listeningText={t.listening}
        />
      </div>

      {/* Lifestyle section */}
      <h3 className="section-heading">{t.lifestyle}:</h3>

      <div className="voice-input-field">
        <label>{t.smoking}</label>
        <div className="input-wrapper radio-group">
          <label><input type="radio" name="smoking" value={true} checked={formData.smoking === true} onChange={handleChange('smoking')} /> {t.yes}</label>
          <label><input type="radio" name="smoking" value={false} checked={formData.smoking === false} onChange={handleChange('smoking')} /> {t.no}</label>
        </div>
        {formData.smoking && (
          <VoiceInputField
            label={t.smokingFrequency}
            value={formData.smokingFrequency}
            onChange={handleChange('smokingFrequency')}
            placeholder={t.enterSmokingFrequency}
            language={language}
            listeningText={t.listening}
          />
        )}
      </div>

      <div className="voice-input-field">
        <label>{t.alcohol}</label>
        <div className="input-wrapper radio-group">
          <label><input type="radio" name="alcohol" value={true} checked={formData.alcohol === true} onChange={handleChange('alcohol')} /> {t.yes}</label>
          <label><input type="radio" name="alcohol" value={false} checked={formData.alcohol === false} onChange={handleChange('alcohol')} /> {t.no}</label>
        </div>
        {formData.alcohol && (
          <VoiceInputField
            label={t.alcoholFrequency}
            value={formData.alcoholFrequency}
            onChange={handleChange('alcoholFrequency')}
            placeholder={t.enterAlcoholFrequency}
            language={language}
            listeningText={t.listening}
          />
        )}
      </div>

      <div className="voice-input-field">
        <label>{t.physicalActivity}</label>
        <div className="input-wrapper">
          <select value={formData.physicalActivity} onChange={handleChange('physicalActivity')}>
            <option value="Sedentary">{t.sedentary}</option>
            <option value="Moderate">{t.moderate}</option>
            <option value="Active">{t.active}</option>
          </select>
        </div>
      </div>

      <div className="voice-input-field">
        <label>{t.dietaryHabits}</label>
        <div className="input-wrapper">
          <select value={formData.dietaryHabits} onChange={handleChange('dietaryHabits')}>
            <option value="Veg">{t.veg}</option>
            <option value="Non-Veg">{t.nonVeg}</option>
            <option value="Mixed">{t.mixed}</option>
          </select>
        </div>
      </div>

      <VoiceInputField
        label={t.dailyMealPattern}
        value={formData.dailyMealPattern}
        onChange={handleChange('dailyMealPattern')}
        placeholder={t.enterDailyMealPattern}
        language={language}
        listeningText={t.listening}
      />

      <div className="voice-input-field">
        <label>{t.sleepQuality}</label>
        <div className="input-wrapper">
          <select value={formData.sleepQuality} onChange={handleChange('sleepQuality')}>
            <option value="Good">{t.good}</option>
            <option value="Average">{t.average}</option>
            <option value="Poor">{t.poor}</option>
          </select>
        </div>
      </div>

      

      

      

     

     

     

      {/* Diagnostic & Treatment Tracking */}
      <h3 className="section-heading">{t.diagnosticTracking}:</h3>

      <div className="voice-input-field">
        <label>{t.previousTestReports}</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleTestReportsChange}
          className="file-input"
        />
        {testReportPreviews && testReportPreviews.length > 0 && (
          <div className="report-previews">
            {testReportPreviews.map((r, idx) => (
              <div key={idx} className="report-preview">
                {typeof r.dataUrl === 'string' && r.dataUrl.startsWith('data:image') ? (
                  <img src={r.dataUrl} alt={r.name} />
                ) : (
                  <a href={r.dataUrl} download={r.name}>{t.viewReport} — {r.name}</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <VoiceInputField
        label={t.previousTestResults}
        value={formData.previousTestResults}
        onChange={handleChange('previousTestResults')}
        placeholder={t.enterPreviousTestResults}
        language={language}
        listeningText={t.listening}
      />

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
