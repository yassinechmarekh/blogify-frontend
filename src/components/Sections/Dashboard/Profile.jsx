import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateDataProfile,
  uploadProfileImage,
} from "@/redux/apiCalls/userApiCalls";

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
import { LuLoaderCircle } from "react-icons/lu";
import { updateUserAuth } from "@/redux/apiCalls/authApiCalls";

function Profile() {
  const userAuth = useSelector((state) => state.auth);
  const { user, message, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(userAuth.user.userId));
  }, [userAuth.user.userId]);
  const uploadProfileForm = useForm();
  const dataProfileForm = useForm({
    defaultValues: {
      username: user?.username,
    },
  });
  useEffect(() => {
    if (user) {
      dataProfileForm.reset({
        username: user.username,
        job: user.job,
        bio: user.bio,
        address: user.address,
        facebook: user.socialLink.facebook,
        twitter: user.socialLink.twitter,
        instagram: user.socialLink.instagram,
        linkedin: user.socialLink.linkedin,
      });
    }
  }, [user, dataProfileForm.reset]);
  const [profileImg, setProfileImg] = useState(null);
  const submitUploadImg = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.profileImg);
    dispatch(uploadProfileImage(formData));
  };
  const submitDataProfile = (data) => {
    const result = {
      username: data.username,
      job: data.job,
      bio: data.bio,
      address: data.address,
      socialLink: {
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
        linkedin: data.linkedin,
      },
    };
    console.log(result);
    dispatch(updateDataProfile(user._id, result));
    dispatch(updateUserAuth(result.username, null, null));
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
  useEffect(() => {
    dispatch(updateUserAuth(null, null, user?.profilePhoto.url));
  },[user?.profilePhoto.url]);
  useEffect(() => {
    if (message) {
      toast({
        variant: "succes",
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
                    : user?.profilePhoto.url
                }
                alt="@shadcn"
              />
              <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span
              className={
                "absolute inset-0 bg-black/50 text-tropical-indigo hidden justify-center items-center rounded-full group-hover:flex"
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
            }}
          />
          <button
            type="submit"
            className={`bg-iris text-white text-xs w-24 h-6 flex items-center justify-center rounded-md ${
              loading && "pointer-events-none"
            }`}
          >
            {loading ? (
              <LuLoaderCircle size={16} className={"animate-spin"} />
            ) : (
              <span>Upload Profile</span>
            )}
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
