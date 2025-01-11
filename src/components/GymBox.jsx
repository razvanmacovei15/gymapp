import React from "react";
import { PieChart, Pie, Sector, Label, Legend, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./Card.jsx";

const COLORS = ["#81d9b9", "#4d6792", "#d388aa", "#e94949", "#ffc107"];

const GymBox = ({ gymName, photoUrl, taskData }) => {
  const totalTasks = taskData.reduce((sum, task) => sum + task.value, 0);

  console.log("sunt aici?????", taskData);
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 20}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.7}
        />
      </g>
    );
  };

  return (
    <Card className="flex flex-col w-64 shadow-md">
      {/* Header */}
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          {gymName}
        </CardTitle>
      </CardHeader>

      {/* Image */}
      <img
        src={photoUrl}
        alt={`${gymName} logo`}
        className="w-full h-18 object-cover rounded-md"
      />

      {/* Pie Chart */}
      <CardContent className="flex flex-col items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={taskData}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            label={({ name, value }) => `${value}`}
            activeIndex={0} // You can dynamically set this based on user interaction
            activeShape={renderActiveShape}
          >
            {taskData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              value={`Total: ${totalTasks}`}
              position="center"
              className="fill-black text-xl font-bold"
            />
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize={10}
          />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default GymBox;
