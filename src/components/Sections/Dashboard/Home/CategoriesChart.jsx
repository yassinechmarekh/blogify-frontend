import React from "react";

// Components
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Icons
import { FaArrowTrendUp } from "react-icons/fa6";

function CategoriesChart() {
  const chartData = [
    { category: "chrome", posts: 275, fill: "var(--color-chrome)" },
    { category: "safari", posts: 200, fill: "var(--color-safari)" },
    { category: "firefox", posts: 187, fill: "var(--color-firefox)" },
    { category: "edge", posts: 173, fill: "var(--color-edge)" },
    { category: "other", posts: 90, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    posts: {
      label: "Posts",
      color: "#514DCC",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Categories Chart</CardTitle>
        <CardDescription>
          Displays the number of posts for each category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="posts"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="posts"
              type="natural"
              stroke="var(--color-posts)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-posts)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="category"
                formatter={(value) => chartConfig[value]?.label}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The category that contains more posts is Programming{" "}
          <FaArrowTrendUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default CategoriesChart;
