import React from "react";
import { PieChart, Pie, Sector, Label, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./Card.jsx";

const COLORS = ["#81d9b9", "#4d6792", "#d388aa", "#e94949", "#ffc107"];

const GymBox = ({ gymName, photoUrl, taskData }) => {
  const totalTasks = taskData.reduce((sum, task) => sum + task.value, 0);
  const { logoUrl, fetchLogo } = useAuth();
    useEffect(() => {
      fetchLogo();
    }, []);
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

  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <Card className="flex flex-row w-auto h-auto shadow-md items-center p-6">
      {/* Left Section: Title and Logo */}
      <div className="flex flex-col items-center w-1/2">
        <img
          src={logoUrl}
          alt={`${gymName} logo`}
          className="w-40 h-40 rounded-md mb-4"
        />
        <CardTitle className="text-center text-lg font-semibold">
        {gymName.toUpperCase()}
        </CardTitle>
      </div>

      {/* Right Section: Pie Chart with Custom Legend */}
      <div className="flex flex-col justify-center w-1/2">
        <PieChart width={200} height={200}>
          <Pie
            data={taskData}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            label={({ value }) => `${value}`}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
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
              className="fill-black text-sm font-bold"
            />
          </Pie>
        </PieChart>
        {/* Custom Legend */}
        <div className="mt-4 flex flex-wrap justify-start gap-2">
          {taskData.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span>{entry.status}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GymBox;
