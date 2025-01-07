import React from "react";
import { PieChart, Pie, Sector, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const GymBox = ({ gymName, photoUrl, taskData }) => {
  const statuses = ["DONE", "IN_PROGRESS", "TO_DO", "CANCELLED", "BACKLOG"];
  const totalTasks = taskData.reduce((sum, task) => sum + task.value, 0);

  return (
    <Card className="flex flex-col w-64 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-lg">{gymName}</CardTitle>
      </CardHeader>
      <img
        src={photoUrl}
        alt={`${gymName} logo`}
        className="w-full h-32 object-cover rounded-md"
      />
      <CardContent>
        <PieChart width={200} height={200}>
          <Pie
            data={taskData}
            dataKey="value"
            nameKey="status"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label
            activeShape={({
              outerRadius = 0,
              ...props
            }) => (
              <g>
                <Sector {...props} outerRadius={outerRadius + 10} />
                <Sector
                  {...props}
                  outerRadius={outerRadius + 25}
                  innerRadius={outerRadius + 12}
                />
              </g>
            )}
          >
            <Label
              value={totalTasks}
              position="center"
              className="text-2xl font-bold"
            />
          </Pie>
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default GymBox;
