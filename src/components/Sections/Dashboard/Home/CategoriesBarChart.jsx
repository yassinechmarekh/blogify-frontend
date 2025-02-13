import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsStasByCategoryAndAuthor } from "@/redux/apiCalls/postApiCalls";

export function CategoriesBarChart() {
  const { postsChart } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsStasByCategoryAndAuthor());
  }, []);
  const chartData = [
    { category: "Music", posts: 186 },
    { category: "Programming", posts: 305 },
    { category: "Travel", posts: 237 },
    { category: "Sport", posts: 73 },
    { category: "Business", posts: 209 },
    { category: "News", posts: 214 },
  ];

  const chartConfig = {
    posts: {
      label: "Posts",
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
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
          <BarChart
            accessibilityLayer
            data={postsChart?.categoriesStats}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="posts" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="posts" layout="vertical" fill="#514DCC" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="posts"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {postsChart?.topCategory?.posts === 0 ? (
          <div className="flex gap-2 font-medium leading-none">
            You have not yet created posts on any category
          </div>
        ) : (
          <div className="flex gap-2 font-medium leading-none">
            You have created more posts on {postsChart?.topCategory?.category}{" "}
            category <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          You have created 13 posts in total.{" "}
        </div>
      </CardFooter>
    </Card>
  );
}
