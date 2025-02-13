import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSpecificPost,
  updatePost,
  updatePostImage,
} from "@/redux/apiCalls/postApiCalls";

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
import { getAllCategories } from "@/redux/apiCalls/categoryApiCalls";
import { useToast } from "@/hooks/use-toast";
import { TbLoader2 } from "react-icons/tb";

function EditPost() {
  const { singlePost, loading, message, error } = useSelector(
    (state) => state.post
  );
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    dispatch(getSpecificPost(slug));
  }, [slug]);
  const form = useForm({
    defaultValues: {
      title: singlePost?.post?.title,
      category: singlePost?.post?.category._id,
      content: singlePost?.post?.content,
    },
  });
  useEffect(() => {
    form.reset({
      title: singlePost?.post?.title,
      category: singlePost?.post?.category?._id,
      content: singlePost?.post?.content,
    });
  }, [singlePost, form.reset]);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  const imageForm = useForm();
  const navigate = useNavigate();
  const onsubmit = (data) => {
    console.log(data);
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      if (form.formState.dirtyFields[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    updatedFields.content = data.content;
    console.log(updatedFields);
    if (singlePost?.post?._id) {
      dispatch(updatePost(singlePost?.post?._id, updatedFields));
      navigate(`/dashboard/${user?.username}/posts`);
    }
  };
  const submitImageForm = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);
    dispatch(updatePostImage(singlePost?.post?._id, formData));
  };
  const [editorContent, setEditorContent] = useState("");
  const [imageToUpdate, setImageToUpdate] = useState(null);

  const handleEditorContentChange = (content) => {
    setEditorContent(content);
    console.log("Contenu de l'éditeur : ", content);
    form.setValue("content", editorContent);
  };

  const { toast } = useToast();
  useEffect(() => {
    if (message) {
      toast({
        variant: "success",
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
  }, [message, error]);
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
                        : singlePost?.post?.image?.url
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
              className={`py-1 px-3 bg-iris hover:bg-iris/90 text-white rounded-md text-sm font-semibold capitalize my-transition mt-1 ${
                loading && "pointer-events-none opacity-90"
              }`}
            >
              {loading ? <TbLoader2 className={"animate-spin"} /> : "Update"}
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
                  value={field.value}
                  className={"main-input"}
                >
                  <FormControl>
                    <SelectTrigger className={"text-space-cadet capitalize"}>
                      <SelectValue placeholder="Select a category of your post" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        value={category._id}
                        key={category._id}
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
                  <TextEditor
                    onContentChange={handleEditorContentChange}
                    oldContent={singlePost?.post?.content}
                  />
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
