import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";

// Icons
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  updateCategoryImage,
} from "@/redux/apiCalls/categoryApiCalls";
import { RiLoader4Fill } from "react-icons/ri";

function EditCategory({ openEdit, setOpenEdit, category }) {
  const { loading, message, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const dataForm = useForm({
    defaultValues: {
      title: category.title,
      description: category.description,
      icon: category.icon,
    },
  });
  const uploadForm = useForm();
  const onsubmit = (data) => {
    console.log(data);
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      if (dataForm.formState.dirtyFields[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    dispatch(updateCategory(category._id, updatedFields));
  };
  const uploadSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);
    dispatch(updateCategoryImage(category._id, formData));
  };
  const { toast } = useToast();
  const [categoryImg, setCategoryImg] = useState(null);
  useEffect(() => {
    if (uploadForm.formState.errors.image) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: uploadForm.formState.errors.image.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              setCategoryImg(null);
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [uploadForm.formState.errors.image]);
  useEffect(() => {
    if (message) {
      toast({
        variant: "succes",
        title: "Image updated.",
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
    <Sheet open={openEdit} onOpenChange={setOpenEdit}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={"text-space-cadet"}>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          className={"mt-3 relative flex justify-center"}
          onSubmit={uploadForm.handleSubmit(uploadSubmit)}
        >
          <Label className={"relative group"} htmlFor="image">
            <img
              src={
                categoryImg && categoryImg.type.startsWith("image/")
                  ? URL.createObjectURL(categoryImg)
                  : category.image
              }
              alt="categoory image"
              className={"w-40 mx-auto"}
            />
            <span
              className={
                "absolute inset-0 bg-black/40 hidden group-hover:flex justify-center items-center text-iris cursor-pointer"
              }
            >
              <FaCamera size={20} />
            </span>
          </Label>
          <Input
            type="file"
            className={"hidden"}
            id="image"
            {...uploadForm.register("image", {
              validate: (file) => {
                if (!file || file.length === 0) {
                  return "Category image is required to updated !";
                }
                if (!file.type.startsWith("image/")) {
                  return "The selected file must be an image!";
                }
                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  return "The file size must be less than 5MB!";
                }
                return true;
              },
            })}
            onChange={(e) => {
              const file = e.target.files[0];
              setCategoryImg(file);
              uploadForm.setValue("image", file, {
                shouldValidate: true,
              });
            }}
          />
          <button
            type="submit"
            className={`bg-iris hover:bg-iris/80 w-16 h-6 flex items-center justify-center text-xs text-white rounded-md my-transition absolute bottom-0 right-4 ${
              loading && "bg-iris/80 pointer-events-none"
            }`}
          >
            {loading ? (
              <RiLoader4Fill size={16} className={"animate-spin"} />
            ) : (
              <span>Upload</span>
            )}
          </button>
        </form>
        <Form {...dataForm}>
          <form
            className="space-y-4 py-4"
            onSubmit={dataForm.handleSubmit(onsubmit)}
          >
            <FormField
              control={dataForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>Title</FormLabel>
                  <FormControl>
                    <Input
                      className={"main-input"}
                      placeholder="Category title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={"main-label"}
                    onClick={() => {
                      console.log(category.icon);
                    }}
                  >
                    Icon
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={category.icon}
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
                      <SelectItem value={null}>
                        <div className={"flex items-center gap-1"}>
                          <img
                            src="https://res.cloudinary.com/dcz9jqkbz/image/upload/v1737330274/Untitled_design_1_srxpud.png"
                            alt={"none"}
                            className={"w-6 h-6"}
                          />
                          <span>None</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={dataForm.control}
              name="description"
              rules={{
                minLength: {
                  value: 10,
                  message:
                    "Category description must be at least 2 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className={"main-input"}
                      placeholder="Category description"
                      rows="7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {dataForm.formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className={"w-full"}>
                  Update
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default EditCategory;
