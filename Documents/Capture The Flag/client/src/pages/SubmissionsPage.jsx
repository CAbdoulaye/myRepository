import { useEffect, useState } from "react";
import api from "../services/api";


export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const res = await api.get("/challenges/submissions", {
        credentials: "include"
      });
        const data = await res.data;
        // console.log("data");
        // console.log(data);
        setSubmissions(data);
      }
    fetchData();
  }, []);


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Submissions</h1>

      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>User</th>
            <th>Challenge</th>
            <th>Submitted Flag</th>
            <th>Correct?</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="border">
              <td>{s.first_name} {s.last_name}</td>
              <td>{s.challenge_title}</td>
              <td>{s.submitted_flag}</td>
              <td>{s.is_correct ? "✅" : "❌"}</td>
              <td>{new Date(s.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
