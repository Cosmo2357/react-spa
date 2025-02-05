import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useUserDataStore } from "@/store/main";

// Zod Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();

  const { login } = useUserDataStore();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  //  React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Login Handler
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setApiError(null);

    try {
      /* const response = await axios.post("/api/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Login successful:", response.data); */
      const userData = {
        id: "1",
        name: "John Doe",
        email: data.email,
      };
      login(userData);

      navigate("/"); // Redirect to home page

      // Redirect to home page
    } catch (error) {
      console.error("Login failed:", error);
      setApiError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-[350px] shadow-lg rounded-xl bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/*  Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="mail"
                autoComplete="off"
                pattern=".*"
                placeholder="example@mail.com"
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? <Loader2 className="animate-spin mr-2" size={20} />
                : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
