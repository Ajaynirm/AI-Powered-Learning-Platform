import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function SkillsChart({ counts }) {
  const data = [
    { name: "Strength", value: counts.strength },
    { name: "Weakness", value: counts.weakness },
    { name: "Tackled", value: counts.tackled },
  ];
  const COLORS = ["#4ade80", "#f87171", "#60a5fa"];
  return (
    <div className=" p-6 rounded-2xl shadow-xl mt-10 max-w-7xl mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-4">Your Progress Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
