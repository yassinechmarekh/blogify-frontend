import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";

// Icons
import { FaCamera } from "react-icons/fa";

function Profile() {
  const onsubmit = (data) => {
    const result = {
      username: data.username,
      job: data.job,
      bio: data.bio,
      address: data.address,
      socialLinks: {
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        linkedin: data.linkedin,
      },
    };
    console.log(result);
  };
  const form = useForm();
  const uploadImageForm = useForm({
    defaultValues: {
      profileImg: null,
    },
  });
  const [imageProfile, setImageProfile] = useState(
    form.getValues("profileImg")
  );
  const uploadSubmit = (data) => {
    console.log(data);
  };
  const { toast } = useToast();
  useEffect(() => {
    if (uploadImageForm.formState.errors.profileImg) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: uploadImageForm.formState.errors.profileImg.message,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => setImageProfile(null)}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }, [uploadImageForm.formState.errors.profileImg]);
  return (
    <section>
      <div className={"pb-4 border-b border-gray-300 mb-4"}>
        <h4 className={"title-subpage-profile-reader"}>Profile</h4>
        <p className={"text-sm"}>
          This is how others will see you on the site.
        </p>
      </div>
      <form
        className={"mb-4"}
        onSubmit={uploadImageForm.handleSubmit(uploadSubmit)}
      >
        <div className="flex items-end">
          <Label htmlFor="picture" className={"relative cursor-pointer group"}>
            <Avatar className={"w-24 h-24"}>
              <AvatarImage
                src={
                  imageProfile
                    ? URL.createObjectURL(imageProfile)
                    : "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <span
              className={
                "hidden group-hover:flex absolute inset-0 bg-black/20 rounded-full items-center justify-center"
              }
            >
              <FaCamera size={20} className={"text-iris"} />
            </span>
          </Label>
          <Input
            id="picture"
            type="file"
            className={"hidden"}
            {...uploadImageForm.register("profileImg", {
              validate: (file) => {
                if (!file) {
                  return "Image profile is required to updated !";
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
              uploadImageForm.setValue("profileImg", file, {
                shouldValidate: true,
              });
              setImageProfile(file);
            }}
          />
          <button
            className={
              "text-xs text-white font-medium bg-iris py-1 px-2 rounded-md"
            }
            type="submit"
          >
            Upload Photo
          </button>
        </div>
      </form>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            rules={{
              required: "Username is required field !",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your username"
                    className={"main-input"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Job</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Job"
                    className={"main-input"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display job.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            rules={{
              minLength: {
                value: 10,
                message: "Bio must be at least 10 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your bio"
                    className={"main-input"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display bio.
                </FormDescription>
                <FormMessage>{form.formState.errors.bio?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your address"
                    className={"main-input"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display address.
                </FormDescription>
              </FormItem>
            )}
          />
          <div>
            <FormLabel className={"main-label"}>Urls</FormLabel>
            <FormDescription>
              Add your social media profiles to your Blogify profile.
            </FormDescription>

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="facebook"
                rules={{
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/,
                    message: "Enter a valid Facebook profile link!",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://www.facebook.com/@your-profile"
                        className={"main-input"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.facebook?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitter"
                rules={{
                  pattern: {
                    value: /^https?:\/\/(www\.)?x\.com\/[A-Za-z0-9_.-]+\/?$/,
                    message: "Enter a valid X profile link!",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://x.com/@your-profile"
                        className={"main-input"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.twitter?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                rules={{
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/,
                    message: "Enter a valid instagram profile link!",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://www.instagram.com/@your-profile"
                        className={"main-input"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.instagram?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                rules={{
                  pattern: {
                    value:
                      /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
                    message: "Enter a valid linkedin profile link!",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://www.linkedin.com/@your-profile"
                        className={"main-input"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.linkedin?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </section>
  );
}

export default Profile;
