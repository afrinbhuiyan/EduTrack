import { useState } from "react";

const sampleQuestions = {
  easy: [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What color is the sky?", answer: "Blue" },
  ],
  medium: [
    { question: "Explain photosynthesis.", answer: "Process by which plants make food using sunlight." },
    { question: "What is H2O?", answer: "Water" },
  ],
  hard: [
    { question: "Explain Newton's 2nd Law.", answer: "F = ma, Force equals mass times acceleration." },
    { question: "Integrate x^2 dx.", answer: "x^3/3 + C" },
  ],
};

export default function ExamPlanner() {
  const [exam, setExam] = useState({ subject: "", date: "" });
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => setExam({ ...exam, [e.target.name]: e.target.value });

  const generateQuestions = () => {
    const selected = sampleQuestions[difficulty];
    // Randomize questions
    const shuffled = selected.sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📝 Exam Planner & Q&A Generator</h1>

      {/* Exam Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-4 shadow rounded-xl">
        <input
          type="text"
          name="subject"
          value={exam.subject}
          onChange={handleChange}
          placeholder="Subject (e.g., Math)"
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={exam.date}
          onChange={handleChange}
          className="p-2 border rounded-lg"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Generate Questions Button */}
      <button
        onClick={generateQuestions}
        className="mb-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
      >
        Generate Practice Questions
      </button>

      {/* Questions Display */}
      {questions.length > 0 && (
        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Practice Questions</h2>
          <ul className="list-decimal pl-5 space-y-2">
            {questions.map((q, idx) => (
              <li key={idx}>
                <p className="font-medium">{q.question}</p>
                <p className="text-gray-600">Answer: {q.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
