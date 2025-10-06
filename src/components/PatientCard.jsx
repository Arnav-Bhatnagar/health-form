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

        {patient.temperature && (
          <div className="info-row">
            <span className="label">{t.temperature}:</span>
            <span className="value">{patient.temperature}</span>
          </div>
        )}

        {patient.bloodPressure && (
          <div className="info-row">
            <span className="label">{t.bloodPressure}:</span>
            <span className="value">{patient.bloodPressure}</span>
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
