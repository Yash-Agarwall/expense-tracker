import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
export default function ExpensePieChart({ transactions }) {
  const dataMap = {};
  transactions.forEach((t) => {
    if (t.amount < 0) {
      if (!dataMap[t.category]) dataMap[t.category] = 0;
      dataMap[t.category] += Math.abs(Number(t.amount));
    }
  });
  //Object.keys(dataMap).map((key)--> this will return an array of all keys
  //here we are converting the map to array coz it will be needed for pie chart
  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  //   const COLORS = ["blue", "green", "red", "yellow", "black", "pink"];
  const COLORS = [
    "#4E79A7",
    "#F28E2B",
    "#E15759",
    "#76B7B2",
    "#59A14F",
    "#EDC948",
    "#B07AA1",
    "#FF9DA7",
  ];
  return (
    <div>
      <h4>Expense Pie Chart</h4>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="black"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
