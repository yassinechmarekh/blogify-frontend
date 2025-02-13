import React, { useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { getStatsPostsChart } from "@/redux/apiCalls/postApiCalls";

function CategoriesChart() {
  const { postsChart } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatsPostsChart());
  }, []);
  useEffect(() => {
    console.log(postsChart?.chartConfig);
  }, [postsChart?.chartConfig]);

  if (!postsChart || !postsChart.stats || !postsChart.chartConfig) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Post Categories Chart</CardTitle>
          <CardDescription>Loading or no data available...</CardDescription>
        </CardHeader>
        <CardContent>
          <p>No chart data to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Categories Chart</CardTitle>
        <CardDescription>
          Displays the number of posts for each category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={postsChart?.chartConfig}>
          <LineChart
            accessibilityLayer
            data={postsChart?.stats}
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
                formatter={(value) =>
                  postsChart?.chartConfig[value.toLowerCase()]?.label ||
                  "Unknown"
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The category that contains more posts is{" "}
          <span className={"capitalize"}>{postsChart?.popular.category}</span>{" "}
          <FaArrowTrendUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default CategoriesChart;
