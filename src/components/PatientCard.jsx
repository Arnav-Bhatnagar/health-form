function PatientCard({ patient, t }) {
  return (
    <div className="patient-card">
      <div className="card-header">
          <h3>{patient.fullName || patient.patientId}</h3>
        <span className={`status-badge ${patient.status}`}>
          {patient.status === 'uploaded' ? `✓ ${t.uploaded}` : `⏳ ${t.pending}`}
        </span>
      </div>

      <div className="card-content">
        <div className="info-row">
          <span className="label">{t.patientId}:</span>
          <span className="value">{patient.patientId}</span>
        </div>

        {/* age, gender and mobileNo removed from display per requirements */}

        <div className="info-row">
          <span className="label">{t.ashaWorkerId}:</span>
          <span className="value">{patient.ashaWorkerId}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.medicalHistory}:</span>
          <span className="value">{patient.medicalHistory}</span>
        </div>

        {patient.height && (
          <div className="info-row">
            <span className="label">{t.height}:</span>
            <span className="value">{patient.height} cm</span>
          </div>
        )}

        {patient.weight && (
          <div className="info-row">
            <span className="label">{t.weight}:</span>
            <span className="value">{patient.weight} kg</span>
          </div>
        )}

        {patient.bmi && (
          <div className="info-row">
            <span className="label">{t.bmi}:</span>
            <span className="value">{patient.bmi}</span>
          </div>
        )}

        {patient.bloodPressure && (
          <div className="info-row">
            <span className="label">{t.bloodPressure}:</span>
            <span className="value">{patient.bloodPressure}</span>
          </div>
        )}

        {(patient.previousTestReports && patient.previousTestReports.length > 0) && (
          <div className="info-row">
            <span className="label">{t.previousTestReports}:</span>
            <div className="value report-list">
              {patient.previousTestReports.map((r, i) => (
                <div key={i} className="report-item">
                  {r.dataUrl && typeof r.dataUrl === 'string' && r.dataUrl.startsWith('data:image') ? (
                    <img src={r.dataUrl} alt={r.name} />
                  ) : (
                    <a href={r.dataUrl} download={r.name}>{t.viewReport} — {r.name}</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {patient.previousTestResults && (
          <div className="info-row">
            <span className="label">{t.previousTestResults}:</span>
            <span className="value">{patient.previousTestResults}</span>
          </div>
        )}

        {(patient.symptoms && (patient.symptoms.fever || patient.symptoms.cough || patient.symptoms.fatigue)) && (
          <div className="info-row">
            <span className="label">{t.symptoms}:</span>
            <span className="value">
              {patient.symptoms.fever ? `${t.symptomFever}` : ''}
              {patient.symptoms.cough ? (patient.symptoms.fever ? ', ' : '') + `${t.symptomCough}` : ''}
              {patient.symptoms.fatigue ? ((patient.symptoms.fever || patient.symptoms.cough) ? ', ' : '') + `${t.symptomFatigue}` : ''}
            </span>
          </div>
        )}

        {patient.otherSymptoms && (
          <div className="info-row">
            <span className="label">{t.otherSymptoms}:</span>
            <span className="value">{patient.otherSymptoms}</span>
          </div>
        )}

        {patient.checkupDate && (
          <div className="info-row">
            <span className="label">{t.checkupDate}:</span>
            <span className="value">{new Date(patient.checkupDate).toLocaleDateString()}</span>
          </div>
        )}

        {patient.followUpRequired && (
          <div className="info-row">
            <span className="label">{t.followUpRequired}:</span>
            <span className="value">{patient.followUpRequired ? 'Yes' : 'No'}</span>
          </div>
        )}

        {patient.notes && (
          <div className="info-row">
            <span className="label">{t.notes}:</span>
            <span className="value">{patient.notes}</span>
          </div>
        )}

        {/* Lifestyle display */}
        {(patient.smoking || patient.alcohol || patient.physicalActivity || patient.dietaryHabits || patient.sleepQuality) && (
          <div className="lifestyle-section">
            <h4>{t.lifestyle}:</h4>

            <div className="info-row">
              <span className="label">{t.smoking}:</span>
              <span className="value">{patient.smoking ? `${t.yes}` : `${t.no}`}{patient.smoking && patient.smokingFrequency ? ` — ${patient.smokingFrequency}` : ''}</span>
            </div>

            <div className="info-row">
              <span className="label">{t.alcohol}:</span>
              <span className="value">{patient.alcohol ? `${t.yes}` : `${t.no}`}{patient.alcohol && patient.alcoholFrequency ? ` — ${patient.alcoholFrequency}` : ''}</span>
            </div>

            <div className="info-row">
              <span className="label">{t.physicalActivity}:</span>
              <span className="value">{patient.physicalActivity}</span>
            </div>

            <div className="info-row">
              <span className="label">{t.dietaryHabits}:</span>
              <span className="value">{patient.dietaryHabits}{patient.dailyMealPattern ? ` — ${patient.dailyMealPattern}` : ''}</span>
            </div>

            <div className="info-row">
              <span className="label">{t.sleepQuality}:</span>
              <span className="value">{patient.sleepQuality}</span>
            </div>
          </div>
        )}

        {patient.medicalPhoto && (
          <div className="info-row">
            <span className="label">{t.medicalPhoto}:</span>
            <div className="card-photo">
              <img src={patient.medicalPhoto} alt="Medical record" />
            </div>
          </div>
        )}

        <div className="info-row">
          <span className="label">{t.vaccineStatus}:</span>
          <span className="value">{patient.vaccineStatus}</span>
        </div>

        <div className="info-row timestamp">
          <span className="label">{t.submitted}:</span>
          <span className="value">{new Date(patient.timestamp).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
