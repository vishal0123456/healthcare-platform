export const dashboardStats = {
  totalPatients: 248,
  activePatients: 186,
  todayAppointments: 24,
  pendingReports: 8,
  completedConsultations: 1842,
  activeDoctors: 18,
  nutritionPlans: 64,
  yogaPrograms: 48,
};

export const appointmentTrend = [
  { month: "May", appointments: 185, consultations: 160 },
  { month: "Jun", appointments: 210, consultations: 188 },
  { month: "Jul", appointments: 198, consultations: 175 },
  { month: "Aug", appointments: 225, consultations: 202 },
  { month: "Sep", appointments: 242, consultations: 218 },
  { month: "Oct", appointments: 268, consultations: 245 },
  { month: "Nov", appointments: 215, consultations: 198 },
];

export const patientsByCondition = [
  { condition: "Hypertension", count: 68, color: "#0ea5e9" },
  { condition: "Diabetes", count: 54, color: "#6366f1" },
  { condition: "Cardiac", count: 32, color: "#ef4444" },
  { condition: "Orthopedic", count: 41, color: "#f59e0b" },
  { condition: "Neurological", count: 28, color: "#8b5cf6" },
  { condition: "Others", count: 25, color: "#10b981" },
];

export const weeklyActivity = [
  { day: "Mon", patients: 42, reports: 18, consultations: 38 },
  { day: "Tue", patients: 38, reports: 22, consultations: 35 },
  { day: "Wed", patients: 45, reports: 15, consultations: 42 },
  { day: "Thu", patients: 50, reports: 28, consultations: 46 },
  { day: "Fri", patients: 36, reports: 20, consultations: 33 },
  { day: "Sat", patients: 28, reports: 12, consultations: 25 },
  { day: "Sun", patients: 15, reports: 5, consultations: 12 },
];

export const recentActivities = [
  { id: 1, type: "appointment", text: "New appointment scheduled for Aarav Sharma", time: "2 min ago", icon: "Calendar", color: "#0ea5e9" },
  { id: 2, type: "report", text: "Lab report uploaded for Riya Patel – CBC Normal", time: "15 min ago", icon: "FileText", color: "#10b981" },
  { id: 3, type: "emergency", text: "EMERGENCY: Vikram Singh admitted to CCU", time: "1 hr ago", icon: "AlertTriangle", color: "#ef4444" },
  { id: 4, type: "nutrition", text: "Nutrition plan updated for Sneha Reddy", time: "2 hr ago", icon: "Apple", color: "#f59e0b" },
  { id: 5, type: "yoga", text: "Yoga session completed – Aarav Sharma (45 min)", time: "3 hr ago", icon: "Activity", color: "#6366f1" },
  { id: 6, type: "user", text: "New patient registered – Pradeep Kumar", time: "4 hr ago", icon: "UserPlus", color: "#8b5cf6" },
  { id: 7, type: "report", text: "Echocardiogram report reviewed – Vikram Singh", time: "5 hr ago", icon: "Heart", color: "#ec4899" },
];
