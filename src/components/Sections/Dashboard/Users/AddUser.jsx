import React, { useEffect, useState } from "react";
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

// Icons
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor, getAllUser } from "@/redux/apiCalls/userApiCalls";

function AddUser() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const onsubmit = (data) => {
    console.log(data);
    dispatch(createAuthor(data));
    setIsOpen(false);
    form.reset();
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
              name="username"
              rules={{
                required: "Username is required to create a new author !",
              }}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel
                    htmlFor="username"
                    className="main-label text-right"
                  >
                    Username
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Ex: Jake"
                        className="main-input bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.username?.message}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />
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
                    <div className="relative">
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="main-input bg-white peer"
                          {...field}
                        />
                      </FormControl>
                      {showPassword ? (
                        <FaEyeSlash
                          size={16}
                          className={"icon-password"}
                          onClick={() => {
                            setShowPassword(false);
                          }}
                        />
                      ) : (
                        <IoEyeSharp
                          size={16}
                          className={"icon-password"}
                          onClick={() => {
                            setShowPassword(true);
                          }}
                        />
                      )}
                    </div>
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
