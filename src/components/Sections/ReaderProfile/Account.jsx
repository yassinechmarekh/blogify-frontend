import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAccount,
  updateAccountInfo,
} from "@/redux/apiCalls/userApiCalls";
import { logoutUser, updateUserAuth } from "@/redux/apiCalls/authApiCalls";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user } = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: user?.email,
    },
  });
  useEffect(() => {
    form.reset({
      email: user?.email,
    });
  }, [user?.email]);
  const onsubmit = (data) => {
    console.log(data);
    const updatedFields = Object.keys(data).reduce((acc, key) => {
      if (form.formState.dirtyFields[key]) {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    dispatch(updateAccountInfo(updatedFields));
    if (updatedFields.email) {
      dispatch(updateUserAuth(null, updatedFields.email, null));
    }
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const handleDeleteAccount = (id) => {
    navigate("/");
    if (id) {
      console.log(id);
      dispatch(deleteUserAccount(id));
    }
    dispatch(logoutUser());
  };
  return (
    <section>
      <div className={"pb-4 border-b border-gray-300 mb-4"}>
        <h4 className={"title-subpage-profile-reader"}>Account</h4>
        <p className={"text-sm"}>
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Email</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("email", {
                      required: "Your email is required !",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email !",
                      },
                    })}
                    type="email"
                    placeholder="Your email"
                    {...field}
                    className={"main-input"}
                  />
                </FormControl>
                {!form.formState.errors.email && (
                  <FormDescription>
                    This is your email to authentificate.
                  </FormDescription>
                )}
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className={"grid grid-cols-1 sm:grid-cols-2 gap-2"}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>
                    Current Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...form.register("currentPassword", {
                          minLength: {
                            value: 8,
                            message:
                              "The password must be at least 8 characters!",
                          },
                        })}
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Current Password"
                        className={"main-input peer"}
                        {...field}
                      />
                    </FormControl>
                    {showCurrentPassword ? (
                      <FaEyeSlash
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowCurrentPassword(false)}
                      />
                    ) : (
                      <IoEyeSharp
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowCurrentPassword(true)}
                      />
                    )}
                  </div>
                  {!form.formState.errors.currentPassword && (
                    <FormDescription>
                      Enter your current passsword.
                    </FormDescription>
                  )}
                  <FormMessage>
                    {form.formState.errors.currentPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...form.register("newPassword", {
                          minLength: {
                            value: 8,
                            message:
                              "The password must be at least 8 characters!",
                          },
                        })}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New Password"
                        className={"main-input peer"}
                        {...field}
                      />
                    </FormControl>
                    {showNewPassword ? (
                      <FaEyeSlash
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowNewPassword(false)}
                      />
                    ) : (
                      <IoEyeSharp
                        size={16}
                        className={"icon-password"}
                        onClick={() => setShowNewPassword(true)}
                      />
                    )}
                  </div>
                  {!form.formState.errors.newPassword && (
                    <FormDescription>Enter your new passsword.</FormDescription>
                  )}
                  <FormMessage>
                    {form.formState.errors.newPassword?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className={"mr-2"}>
            Update
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Your Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  <span className={"text-red-600 font-semibold uppercase"}>
                    NB:
                  </span>{" "}
                  When deleting your account you will lose all your old actions:
                  likes and comments.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={
                    "bg-iris text-white hover:bg-tropical-indigo hover:text-white"
                  }
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={"bg-red-600 hover:bg-red-700"}
                  onClick={() => handleDeleteAccount(user?.userId)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </section>
  );
}

export default Account;
