import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function AddUser() {
  const form = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const onsubmit = (data) => {
    console.log(data);
    if (data) {
      toast({
        variant: "success",
        title: "Author created.",
        description: `Account created with : ${data.email}`,
        className: "custom-toast-success",
      });
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={"bg-iris text-white hover:bg-iris/80 hover:text-white"}
        >
          New Author
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-space-cadet"}>New Author</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onsubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required to create a new author !",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email !",
                },
              }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="email" className="main-label text-right">
                    Email
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Ex: jake@email.com"
                        className="main-input bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required !",
                minLength: {
                  value: 8,
                  message: "The password must be at least 8 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel
                    htmlFor="password"
                    className="main-label text-right"
                  >
                    Password
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        className="main-input bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;
