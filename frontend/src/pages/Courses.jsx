import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import { SkillsChart } from "../components/SkillsChart";
import { axiosInstance } from "../lib/axios";

export default function Courses() {
  const [result, setResult] = useState();

  useEffect(() => {
    const getUserSkill = async () => {
      try {
        const res = await axiosInstance.get("/skills/get-skill");
        setResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserSkill();
  }, []);

  const counts = {
    strength: result?.strength.length || 0,
    weakness: result?.weakness.length || 0,
    tackled: result?.tackled.length || 0,
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br">

      {/* Header */}
      <div className="p-6 rounded-xl shadow-lg text-center max-w-4xl mx-autobackdrop-blur">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Your Skill Dashboard
        </h1>
        <p className="mt-1">
          Track your strengths, weaknesses, and improvements.
        </p>
      </div>

      {/* Chart */}
      <SkillsChart counts={counts} />

      {/* Sections */}
      <Section
        title="Strength Topics"
        items={result?.strength}
        color="bg-green-200 text-green-800 border-green-300"
      />

      <Section
        title="Weak Topics"
        items={result?.weakness}
        color="bg-red-200 text-red-900 border-red-300"
      />

      <Section
        title="Tackled Topics"
        items={result?.tackled}
        color="bg-blue-200 text-blue-900 border-blue-300"
      />
    </div>
  );
}
