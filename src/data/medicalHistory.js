export const medicalHistory = [
  {
    id: "MH001",
    patientId: "P001",
    patientName: "Aarav Sharma",
    conditions: [
      { name: "Hypertension", diagnosedDate: "2022-04-10", status: "Ongoing", severity: "Moderate" },
      { name: "Type 2 Diabetes", diagnosedDate: "2023-01-15", status: "Controlled", severity: "Mild" },
    ],
    surgeries: [
      { procedure: "Appendectomy", date: "2015-08-22", hospital: "City Hospital", surgeon: "Dr. R. Verma" },
    ],
    medications: [
      { name: "Metformin 500mg", frequency: "Twice daily", since: "2023-01-15", prescribedBy: "Dr. Priya Mehta" },
      { name: "Amlodipine 5mg", frequency: "Once daily", since: "2022-04-10", prescribedBy: "Dr. Priya Mehta" },
    ],
    vaccinations: [
      { name: "COVID-19 (Covishield)", date: "2021-03-15", nextDue: null },
      { name: "Influenza", date: "2026-01-10", nextDue: "2027-01-10" },
      { name: "Hepatitis B", date: "2020-06-20", nextDue: null },
    ],
    labResults: [
      { test: "HbA1c", value: "6.8%", date: "2026-10-15", status: "Normal", range: "< 7%" },
      { test: "Blood Pressure", value: "128/82 mmHg", date: "2026-10-28", status: "Elevated", range: "< 120/80" },
      { test: "LDL Cholesterol", value: "112 mg/dL", date: "2026-10-15", status: "Normal", range: "< 130 mg/dL" },
      { test: "Fasting Glucose", value: "105 mg/dL", date: "2026-10-15", status: "Borderline", range: "70-99 mg/dL" },
    ],
  },
  {
    id: "MH002",
    patientId: "P002",
    patientName: "Riya Patel",
    conditions: [
      { name: "PCOS", diagnosedDate: "2021-09-05", status: "Ongoing", severity: "Mild" },
      { name: "Iron Deficiency Anemia", diagnosedDate: "2024-03-18", status: "Resolved", severity: "Mild" },
    ],
    surgeries: [],
    medications: [
      { name: "Metformin 250mg", frequency: "Once daily", since: "2021-09-05", prescribedBy: "Dr. Rahul Gupta" },
      { name: "Iron Supplement", frequency: "Twice daily", since: "2024-03-18", prescribedBy: "Dr. Rahul Gupta" },
    ],
    vaccinations: [
      { name: "COVID-19 (Covaxin)", date: "2021-04-20", nextDue: null },
      { name: "HPV", date: "2019-11-10", nextDue: null },
    ],
    labResults: [
      { test: "Hemoglobin", value: "12.4 g/dL", date: "2026-11-01", status: "Normal", range: "12-16 g/dL" },
      { test: "Ferritin", value: "28 ng/mL", date: "2026-11-01", status: "Normal", range: "12-150 ng/mL" },
      { test: "FSH", value: "7.2 mIU/mL", date: "2026-10-15", status: "Normal", range: "3.5-12.5" },
    ],
  },
  {
    id: "MH003",
    patientId: "P003",
    patientName: "Vikram Singh",
    conditions: [
      { name: "Coronary Artery Disease", diagnosedDate: "2020-07-12", status: "Ongoing", severity: "Severe" },
      { name: "Hypertension", diagnosedDate: "2018-02-25", status: "Ongoing", severity: "High" },
      { name: "Dyslipidemia", diagnosedDate: "2020-07-12", status: "Controlled", severity: "Moderate" },
    ],
    surgeries: [
      { procedure: "Coronary Angioplasty (PTCA)", date: "2020-08-05", hospital: "Fortis Hospital", surgeon: "Dr. A. Kapoor" },
    ],
    medications: [
      { name: "Aspirin 75mg", frequency: "Once daily", since: "2020-08-05", prescribedBy: "Dr. Anjali Rao" },
      { name: "Atorvastatin 40mg", frequency: "Once daily at night", since: "2020-07-12", prescribedBy: "Dr. Anjali Rao" },
      { name: "Carvedilol 6.25mg", frequency: "Twice daily", since: "2020-07-12", prescribedBy: "Dr. Anjali Rao" },
    ],
    vaccinations: [
      { name: "COVID-19 (Covishield)", date: "2021-02-18", nextDue: null },
      { name: "Pneumococcal", date: "2022-05-10", nextDue: "2027-05-10" },
    ],
    labResults: [
      { test: "Troponin I", value: "0.08 ng/mL", date: "2026-11-05", status: "Elevated", range: "< 0.04 ng/mL" },
      { test: "LDL Cholesterol", value: "98 mg/dL", date: "2026-11-01", status: "Normal", range: "< 100 mg/dL" },
      { test: "Blood Pressure", value: "148/92 mmHg", date: "2026-11-05", status: "High", range: "< 130/80" },
      { test: "ECG", value: "ST Depression", date: "2026-11-05", status: "Abnormal", range: "Normal Sinus Rhythm" },
    ],
  },
];
