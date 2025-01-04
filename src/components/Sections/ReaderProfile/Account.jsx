import React from "react";
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

function Account() {
  const form = useForm();
  const onsubmit = (data) => {
    console.log(data);
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
                  <FormControl>
                    <Input
                      {...form.register("currentPassword", {
                        minLength: {
                          value: 8,
                          message:
                            "The password must be at least 8 characters!",
                        },
                      })}
                      placeholder="Your email"
                      {...field}
                      className={"main-input"}
                    />
                  </FormControl>
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
                  <FormControl>
                    <Input
                      {...form.register("newPassword", {
                        minLength: {
                          value: 8,
                          message:
                            "The password must be at least 8 characters!",
                        },
                      })}
                      placeholder="Your email"
                      {...field}
                      className={"main-input"}
                    />
                  </FormControl>
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
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </section>
  );
}

export default Account;
