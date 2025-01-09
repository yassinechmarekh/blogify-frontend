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

function EditCategory({ openEdit, setOpenEdit }) {
  const dataForm = useForm();
  const uploadForm = useForm();
  const onsubmit = (data) => {
    console.log(data);
    if (data) {
      toast({
        variant: "succes",
        title: "Category updated.",
        description: `${data.title} is updated successfully !`,
        className: "custom-toast-success",
      });
    }
  };
  const uploadSubmit = (data) => {
    console.log(data);
    if (data) {
      toast({
        variant: "succes",
        title: "Image updated.",
        description: `Your category image is updated successfully !`,
        className: "custom-toast-success",
      });
    }
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
  const icons = [
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
                  : "https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/Travel@2x.webp"
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
            className={
              "bg-iris hover:bg-iris/80 py-1 px-3 text-xs text-white rounded-md my-transition absolute bottom-0 right-4"
            }
          >
            Upload
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
                  <FormLabel className={"main-label"}>Icon</FormLabel>
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
                              src="https://revision.codesupply.co/revision/wp-content/uploads/sites/2/2024/09/tech@2x.webp"
                              alt={icon.title}
                              className={"w-6 h-6"}
                            />
                            <span>{icon.title}</span>
                          </div>
                        </SelectItem>
                      ))}
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
            <Button type="submit" className={"w-full"}>
              Update
            </Button>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default EditCategory;
