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
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import {
  deleteUserAccount,
  updateAccountInfo,
} from "@/redux/apiCalls/userApiCalls";
import { useToast } from "@/hooks/use-toast";
import { logoutUser, updateUserAuth } from "@/redux/apiCalls/authApiCalls";
import { useNavigate } from "react-router-dom";

function Account() {
  const userAuth = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: userAuth.user?.email,
    },
  });
  useEffect(() => {
    form.reset({
      email: userAuth.user?.email,
    });
  }, [userAuth]);
  const onsubmit = (data) => {
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
  }, [error, message]);
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
      <h1 className={"title-dashboard-pages"}>Edit Account</h1>
      <Form {...form}>
        <form className={"space-y-4"} onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Your email is required !",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email !",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"main-label"}>Email</FormLabel>
                <FormControl>
                  <Input
                    className={"main-input"}
                    placeholder="Your email"
                    {...field}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Your current password"
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              rules={{
                minLength: {
                  value: 8,
                  message: "Your password must be at least 8 characters !",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={"main-label"}>New Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
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
          {userAuth?.user.status !== "admin" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Your Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
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
                    onClick={() => handleDeleteAccount(userAuth?.user.userId)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </form>
      </Form>
    </section>
  );
}

export default Account;
