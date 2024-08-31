"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PasswordInput } from "@/components/custom-ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";

function SignupPage() {
  const formSchema = z
    .object({
      email: z
        .string()
        .email("Invalid email format")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
          message: "Email must follow the format: example@domain.com",
        }),
      accountType: z.enum(["person", "company"], {
        required_error: "Select the Account", // Custom error message
      }),
      companyName: z.string().optional(),
      numberOfEmployees: z.coerce.number().optional(),
      dob: z.date().refine((date) => {
        const today = new Date();
        const eighteenYearsAge = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDay()
        );
        return date <= eighteenYearsAge;
      }, "You must be at least 18 years old"),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, {
          message: "Password must be no more than 20 characters long",
        })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number",
        })
        .regex(/[@$!%*?&#]/, {
          message:
            "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
        }),
      passwordConfirm: z.string(),
      acceptTerms: z.boolean({
        required_error: "you must accept the terms and condition",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["passwordConfirm"],
          message: "Password do not match",
        });
      }
      if (data.accountType === "company" && !data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["companyName"],
          message: "Company name is required",
        });
      }
      if (data.accountType === "company" && !data.numberOfEmployees) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfEmployees"],
          message: "Number Of Employees is required",
        });
      }
      if (data.accountType === "company" && data.numberOfEmployees < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["numberOfEmployees"],
          message: "Number Of Employees must be above 1",
        });
      }
    });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const accountType = form.watch("accountType");
  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

  const handleSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <Link href={"/"} className="flex items-center">
        GO Home
        <PersonStandingIcon size={"50"} />
      </Link>
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="person">Person</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>

                        <FormControl>
                          <Input placeholder="company name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number Of Employees</FormLabel>

                        <FormControl>
                          <Input
                            type="number"
                            placeholder="employees"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* calendar */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="normal-case flex justify-between pr-1"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          fixedWeeks
                          weekStartsOn={6}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I accept the terms and conditions</FormLabel>
                    </div>
                    <FormDescription>
                      By signing up you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        terms and conditions
                      </Link>
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default SignupPage;
