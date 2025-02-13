import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getAllCategories,
} from "@/redux/apiCalls/categoryApiCalls";
import { useNavigate } from "react-router-dom";

function NewCategory() {
  const form = useForm({
    defaultValues: {
      image: null,
    },
  });
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.category);
  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.icon) {
      formData.append("icon", data.icon);
    }

    dispatch(createCategory(formData));
    if (!error) {
      navigate("/dashboard/categories/all");
    }
  };
  const { toast } = useToast();
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
        title: "Category created.",
        description: message,
        className: "custom-toast-success",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  }, [error, message]);
  const icons = [
    {
      title: "Technology",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/tech_srfr8g.webp",
    },
    {
      title: "Travel",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/travel_2x-1_d2mjqv.webp",
    },
    {
      title: "Sport",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/sport_kgpyb2.webp",
    },
    {
      title: "Business",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/bussiness_j9tqxp.webp",
    },
    {
      title: "Management",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/manage_uj3w7m.webp",
    },
    {
      title: "Trends",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/trand_c1q5ya.webp",
    },
    {
      title: "Startups",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/start_2x_kqjtxt.webp",
    },
    {
      title: "News",
      icon: "https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737305327/news_2x-1_swgp8i.webp",
    },
  ];
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Categories</h1>
      <Form {...form}>
        <form className={"space-y-4"} onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "Category title is required !",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"} htmlFor="title">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className={"main-input"}
                    type="text"
                    id="title"
                    placeholder="Category title"
                    {...field}
                  />
                </FormControl>
                {!form.formState.errors.title && (
                  <FormDescription>
                    This is the title of your category.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="image"
              rules={{
                validate: (file) => {
                  if (!file || file.length === 0) {
                    return "Category image is required !";
                  }
                  if (!file.type || !file.type.startsWith("image/")) {
                    return "The selected file must be an image!";
                  }

                  const maxSize = 5 * 1024 * 1024;
                  if (file.size > maxSize) {
                    return "The file size must be less than 5MB!";
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"} htmlFor="image">
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={"main-input"}
                      type="file"
                      id="image"
                      placeholder="Category image"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        form.setValue("image", file, {
                          shouldValidate: true,
                        });
                      }}
                      // {...field}
                    />
                  </FormControl>
                  {!form.formState.errors.image && (
                    <FormDescription>
                      This is the image of your category.
                    </FormDescription>
                  )}
                  <FormMessage>
                    {form.formState.errors.image?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>
                    Icon (Optional)
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className={"main-input"}
                  >
                    <FormControl>
                      <SelectTrigger className="text-space-cadet">
                        <SelectValue placeholder="Select the icon of your category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {icons.map((icon, index) => (
                        <SelectItem key={index} value={icon.icon}>
                          <div className={"flex items-center gap-1"}>
                            <img
                              src={icon.icon}
                              alt={icon.title}
                              className={"w-6 h-6"}
                            />
                            <span>{icon.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose icon for your category.
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            rules={{
              required: "Category description is required !",
              minLength: {
                value: 10,
                message: "Category description must be at least 10 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"} htmlFor="description">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={"main-input"}
                    type="text"
                    id="description"
                    placeholder="Category description"
                    rows="10"
                    {...field}
                  />
                </FormControl>
                {!form.formState.errors.description && (
                  <FormDescription>
                    This is the description of your category.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </section>
  );
}

export default NewCategory;
