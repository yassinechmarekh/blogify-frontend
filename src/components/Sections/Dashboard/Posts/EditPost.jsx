import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Componenets
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
import TextEditor from "@/components/Global/TextEditor";

// Icons
import { FaRegImage } from "react-icons/fa6";

function EditPost() {
  const form = useForm();
  const imageForm = useForm();
  const onsubmit = (data) => {
    console.log(data);
  };
  const submitImageForm = (data) => {
    console.log(data);
  };
  const categories = [
    {
      title: "Technology",
      icon: "./icons/tech.webp",
    },
    {
      title: "Travel",
      icon: "./icons/travel.webp",
    },
    {
      title: "Sport",
      icon: "./icons/sport.webp",
    },
    {
      title: "Business",
      icon: "./icons/bussiness.webp",
    },
    {
      title: "Management",
      icon: "./icons/manage.webp",
    },
    {
      title: "Trends",
      icon: "./icons/trend.webp",
    },
    {
      title: "Startups",
      icon: "./icons/startups.webp",
    },
    {
      title: "News",
      icon: "./icons/news.webp",
    },
  ];
  const [editorContent, setEditorContent] = useState("");
  const [imageToUpdate, setImageToUpdate] = useState(null);

  const handleEditorContentChange = (content) => {
    setEditorContent(content);
    console.log("Contenu de l'éditeur : ", content);
    form.setValue("content", editorContent);
  };
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Edit Post</h1>
      <Form {...imageForm}>
        <form
          className={"mb-4"}
          onSubmit={imageForm.handleSubmit(submitImageForm)}
        >
          <FormField
            control={imageForm.control}
            name="image"
            rules={{
              validate: (file) => {
                if (!file || file.length === 0) {
                  return "The image post is required !";
                }

                if (!file.type || !file.type.startsWith("image/")) {
                  return "The selected file must be an image!";
                }

                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  return "The file size must be less than 5MB!";
                }

                setImageToUpdate(file);
                return true;
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    "flex w-fit mx-auto rounded-2xl relative group overflow-hidden"
                  }
                  htmlFor="image"
                >
                  <img
                    src={
                      imageToUpdate
                        ? URL.createObjectURL(imageToUpdate)
                        : "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/demo-image-0042.webp"
                    }
                    alt="post image"
                    className={"w-full max-w-[600px] rounded-2xl"}
                  />
                  <span
                    className={
                      "absolute inset-0 bg-black/40 hidden group-hover:flex justify-center items-center text-white cursor-pointer"
                    }
                  >
                    <FaRegImage size={20} />
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    type="file"
                    className={"hidden"}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      imageForm.setValue("image", file, {
                        shouldValidate: true,
                      });
                    }}
                    // {...field}
                  />
                </FormControl>
                {!imageForm.formState.errors.image && (
                  <FormDescription>
                    This is the image for your post.
                  </FormDescription>
                )}
                <FormMessage>
                  {imageForm.formState.errors.image?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <button
              className={
                "py-1 px-3 bg-iris hover:bg-iris/90 text-white rounded-md text-sm font-semibold capitalize my-transition mt-1"
              }
            >
              update
            </button>
          </div>
        </form>
      </Form>
      <Form {...form}>
        <form className={"space-y-4"} onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "Post title is required !",
              minLength: {
                value: 10,
                message: "Post title must be at least 10 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Post title"
                    className={"main-input"}
                    {...field}
                  />
                </FormControl>
                {!form.formState.errors.title && (
                  <FormDescription>
                    This is the title of your post.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            rules={{
              required: "Category is required !",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className={"text-space-cadet"}>
                      <SelectValue placeholder="Select a category of your post" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem
                        value={category.title}
                        key={index}
                        className={"capitalize"}
                      >
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!form.formState.errors.category && (
                  <FormDescription>
                    You can select the category of your post.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.category?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            rules={{
              required: "Post content is required !",
              minLength: {
                value: 10,
                message: "Post title content be at least 10 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Content</FormLabel>
                <FormControl>
                  <TextEditor onContentChange={handleEditorContentChange} />
                </FormControl>
                {!form.formState.errors.content && (
                  <FormDescription>
                    This is the content of your post.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.content?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit">Update Post</Button>
        </form>
      </Form>
    </section>
  );
}

export default EditPost;
