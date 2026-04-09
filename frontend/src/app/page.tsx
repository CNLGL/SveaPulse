"use client";
import { useState } from "react";

// --- KATEGORİZE EDİLMİŞ SORULAR (Orijinal yapın ve kategorilerin) ---
const surveyData = [
  {
    category: "Work Environment",
    questions: [
      { id: "q1", text: "I have a safe and healthy work environment." },
      { id: "q2", text: "My workplace is free from distractions when I need to focus." },
      { id: "q3", text: "The physical office conditions are satisfactory." },
    ]
  },
  {
    category: "Management & Leadership",
    questions: [
      { id: "q4", text: "My manager treats me with respect." },
      { id: "q5", text: "I receive clear feedback on my performance." },
      { id: "q6", text: "Management communicates changes effectively." },
    ]
  },
  // Buraya diğer kategorilerini (Engagement, Growth vb.) aynı formatta ekleyebilirsin
];

const departments = ["Engineering", "Social Services", "Marketing", "HR", "Finance", "Legal"];
const roles = ["Intern", "Junior", "Mid-Level", "Senior", "Lead", "Manager"];

export default function SurveyPage() {
  const [step, setStep] = useState(-2); // -2: Bilgilendirme, -1: Dept/Role, 0+: Kategoriler, 99: Teşekkür
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Sayfa geçerlilik kontrolü
  const isStepValid = () => {
    if (step === -1) return department !== "" && role !== "";
    if (step >= 0 && step < surveyData.length) {
      return surveyData[step].questions.every(q => responses[q.id]);
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department, role, answers: responses }),
      });
      if (response.ok) setStep(99);
    } catch (error) {
      alert("Error: Connection failed!");
    } finally {
      setLoading(false);
    }
  };

  // --- 1. EKRAN: BİLGİLENDİRME ---
  if (step === -2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-xl bg-white shadow-2xl rounded-3xl p-10 border-t-8 border-[#005da9]">
          <h1 className="text-3xl font-black text-[#005da9] mb-6 italic">SveaPulse Survey</h1>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="font-bold text-gray-800">Your privacy is our priority.</p>
            <p>This survey is <strong>100% anonymous</strong>. We do not collect names, IP addresses, or any personal identifiers.</p>
            <p>The results will be used solely to improve our workplace environment and employee satisfaction.</p>
            <p className="text-sm italic">Estimated time: 5-7 minutes.</p>
          </div>
          <button onClick={() => setStep(-1)} className="w-full mt-8 py-4 bg-[#005da9] text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg">
            I UNDERSTAND, LET'S START
          </button>
        </div>
      </div>
    );
  }

  // --- 2. EKRAN: DEPARTMAN VE ROL ---
  if (step === -1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10">
          <h2 className="text-xl font-black mb-6 text-gray-800">First, a little bit about you:</h2>
          <div className="space-y-6">
            <select className="w-full p-4 border rounded-xl outline-none focus:border-[#005da9]" value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="w-full p-4 border rounded-xl outline-none focus:border-[#005da9]" value={role} onChange={e => setRole(e.target.value)}>
              <option value="">Select Seniority Level</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <button disabled={!isStepValid()} onClick={() => setStep(0)} className="w-full py-4 bg-[#005da9] text-white font-bold rounded-xl disabled:bg-gray-200 shadow-md">
              CONTINUE TO QUESTIONS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. EKRAN: KATEGORİLER ---
  if (step >= 0 && step < surveyData.length) {
    const currentCategory = surveyData[step];
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-8 border-b-8 border-[#005da9]">
          <span className="text-xs font-black text-[#005da9] uppercase tracking-widest">Category {step + 1} of {surveyData.length}</span>
          <h1 className="text-3xl font-black text-gray-800 mb-10">{currentCategory.category}</h1>
          
          <div className="space-y-12">
            {currentCategory.questions.map((q) => (
              <div key={q.id}>
                <p className="text-lg font-bold text-gray-700 mb-4">{q.text}</p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setResponses(prev => ({ ...prev, [q.id]: opt }))}
                      className={`py-3 text-[10px] font-black rounded-lg border-2 transition-all ${
                        responses[q.id] === opt ? "bg-[#005da9] border-[#005da9] text-white shadow-lg" : "bg-white text-gray-400 hover:border-blue-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-between gap-4">
            {step > 0 && <button onClick={() => setStep(step - 1)} className="px-8 py-4 font-bold text-gray-400">BACK</button>}
            <button 
              disabled={!isStepValid()} 
              onClick={() => step === surveyData.length - 1 ? handleSubmit() : setStep(step + 1)}
              className={`flex-1 py-4 font-bold rounded-xl text-white shadow-lg transition ${
                isStepValid() ? (step === surveyData.length - 1 ? "bg-green-600" : "bg-[#005da9]") : "bg-gray-200"
              }`}
            >
              {loading ? "SENDING..." : (step === surveyData.length - 1 ? "FINISH & SUBMIT" : "NEXT CATEGORY")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. EKRAN: TEŞEKKÜR ---
  return (
    <div className="min-h-screen bg-[#005da9] flex items-center justify-center text-center p-6 text-white">
      <div className="max-w-sm">
        <div className="text-7xl mb-6">💙</div>
        <h1 className="text-4xl font-black mb-4">Tack!</h1>
        <p className="text-blue-100 mb-8">Your honest feedback helps us grow. Thank you for being part of SveaPulse.</p>
        <button onClick={() => window.location.reload()} className="bg-white text-[#005da9] px-8 py-3 rounded-full font-bold shadow-xl">SUBMIT ANOTHER</button>
      </div>
    </div>
  );
}
