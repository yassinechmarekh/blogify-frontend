import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// Icons
import { FaCamera } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

function Profile() {
  const uploadProfileForm = useForm();
  const dataProfileForm = useForm();
  const [profileImg, setProfileImg] = useState(null);
  const submitUploadImg = (data) => {
    console.log(data);
  };
  const submitDataProfile = (data) => {
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
      }
    }
    console.log(result);
  };
  const { toast } = useToast();
  useEffect(() => {
    if (uploadProfileForm.formState.errors.profileImg) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: uploadProfileForm.formState.errors.profileImg.message,
        action: (
          <ToastAction altText="Try again" onClick={() => setProfileImg(null)}>
            Try again
          </ToastAction>
        ),
      });
    }
  }, [uploadProfileForm.formState.errors.profileImg]);
  return (
    <section>
      <h1 className={"title-dashboard-pages"}>Edit Profile</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <form
          className={"flex flex-col gap-2 items-center"}
          onSubmit={uploadProfileForm.handleSubmit(submitUploadImg)}
        >
          <Label
            htmlFor="profileImg"
            className={"relative cursor-pointer group"}
          >
            <Avatar className={"w-32 h-32"}>
              <AvatarImage
                src={
                  profileImg
                    ? URL.createObjectURL(profileImg)
                    : "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span
              className={
                "absolute inset-0 bg-black/20 hidden justify-center items-center rounded-full group-hover:flex"
              }
            >
              <FaCamera size={24} />
            </span>
          </Label>
          <Input
            type="file"
            id="profileImg"
            className={"hidden"}
            {...uploadProfileForm.register("profileImg", {
              validate: (file) => {
                if (!file || file.length === 0) {
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
              uploadProfileForm.setValue("profileImg", file, {
                shouldValidate: true,
              });
              setProfileImg(file);
              console.log(file);
            }}
          />
          <button
            type="submit"
            className={"bg-iris text-white text-xs py-1 px-3 rounded-md"}
          >
            Upload Profile
          </button>
        </form>
        <Form {...dataProfileForm}>
          <form
            className={"w-full space-y-4"}
            onSubmit={dataProfileForm.handleSubmit(submitDataProfile)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={dataProfileForm.control}
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
                        className={"main-input"}
                        placeholder="Your Username"
                        {...field}
                      />
                    </FormControl>
                    {!dataProfileForm.formState.errors.username && (
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    )}
                    <FormMessage>
                      {dataProfileForm.formState.errors.username?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={dataProfileForm.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={"main-label"}>Job</FormLabel>
                    <FormControl>
                      <Input
                        className={"main-input"}
                        placeholder="Your job"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display job.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={dataProfileForm.control}
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
                      className={"main-input"}
                      placeholder="Your bio"
                      {...field}
                    />
                  </FormControl>
                  {!dataProfileForm.formState.errors.bio && (
                    <FormDescription>
                      This is your public display bio.
                    </FormDescription>
                  )}
                  <FormMessage>
                    {dataProfileForm.formState.errors.bio?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={dataProfileForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>Address</FormLabel>
                  <FormControl>
                    <Input
                      className={"main-input"}
                      placeholder="Your address"
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

              <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <FormField
                  control={dataProfileForm.control}
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
                        <div className="relative">
                          <Input
                            placeholder="https://www.facebook.com/@your-profile"
                            className={"main-input pl-8 peer"}
                            {...field}
                          />
                          <FaFacebook
                            size={18}
                            className={
                              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 peer-focus-visible:text-iris"
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage>
                        {dataProfileForm.formState.errors.facebook?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={dataProfileForm.control}
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
                        <div className="relative">
                          <Input
                            placeholder="https://x.com/@your-profile"
                            className={"main-input pl-8 peer"}
                            {...field}
                          />
                          <FaXTwitter
                            size={17}
                            className={
                              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 peer-focus-visible:text-iris"
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage>
                        {dataProfileForm.formState.errors.twitter?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={dataProfileForm.control}
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
                        <div className="relative">
                          <Input
                            placeholder="https://www.instagram.com/@your-profile"
                            className={"main-input pl-8 peer"}
                            {...field}
                          />
                          <FaInstagram
                            size={18}
                            className={
                              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 peer-focus-visible:text-iris"
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage>
                        {dataProfileForm.formState.errors.instagram?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={dataProfileForm.control}
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
                        <div className="relative">
                          <Input
                            placeholder="https://www.linkedin.com/@your-profile"
                            className={"main-input pl-8 peer"}
                            {...field}
                          />
                          <FaLinkedin
                            size={18}
                            className={
                              "absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 peer-focus-visible:text-iris"
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage>
                        {dataProfileForm.formState.errors.linkedin?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default Profile;
