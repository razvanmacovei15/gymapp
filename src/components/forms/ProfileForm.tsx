import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "../types/User";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  // Initialize the form with user's information as default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.name, // Pre-fill with user's username
      email: user.email, // Pre-fill with user's email
    },
  });

  //TODO
  async function updateUserInformation() {}

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Updated user data:", values);
    // You can send `values` to your server or handle them as needed
    // TODO 2 separate functions here one for updating the user information and one for changeing the profil picture independent from one another
    updateUserInformation();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex flex-row justify-end space-x-4 ">
          <Button type="submit" className="bg-green-500">
            Update user information
          </Button>
          <Button
            onClick={() => {
              console.log("Cancel button clicked");
            }}
            className="bg-red-500"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
