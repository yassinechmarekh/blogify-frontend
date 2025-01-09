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
                  <FormControl>
                    <Input
                      className={"main-input"}
                      placeholder="Your current password"
                      {...field}
                    />
                  </FormControl>
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
                      className={"main-input"}
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
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
