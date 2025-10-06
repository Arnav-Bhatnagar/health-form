function PatientCard({ patient, t }) {
  return (
    <div className="patient-card">
      <div className="card-header">
        <h3>{patient.fullName}</h3>
        <span className={`status-badge ${patient.status}`}>
          {patient.status === 'uploaded' ? `✓ ${t.uploaded}` : `⏳ ${t.pending}`}
        </span>
      </div>

      <div className="card-content">
        <div className="info-row">
          <span className="label">{t.patientId}:</span>
          <span className="value">{patient.patientId}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.age}:</span>
          <span className="value">{patient.age}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.gender}:</span>
          <span className="value">{patient.gender}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.mobileNo}:</span>
          <span className="value">{patient.mobileNo}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.ashaWorkerId}:</span>
          <span className="value">{patient.ashaWorkerId}</span>
        </div>

        <div className="info-row">
          <span className="label">{t.medicalHistory}:</span>
          <span className="value">{patient.medicalHistory}</span>
        </div>

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
