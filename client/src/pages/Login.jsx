"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/ui/AuthButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useAuth } from "../context/auth-context" // Import the context

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [forceTheme, setForceTheme] = useState("");

  // Use login from AuthContext
  const { login } = useAuth()

  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setForceTheme(isSystemDark ? "light" : "dark");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log('Input changed:', name, value)
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!', formData)
  
    if (validateForm()) {
      setLoading(true)
      console.log('Form validation passed, logging in...')
  
      try {
        await login(formData) // The login function handles navigation automatically
        console.log("Login successful - user data stored in localStorage")
      } catch (error) {
        console.error("Login error:", error)
        setErrors({ password: "Invalid email or password" })
      } finally {
        setLoading(false)
      }
    } else {
      console.log('Form validation failed:', errors)
    }
  }
  

  return (
    <div className="auth-container cyber-particles">
      {/* Floating Cyber Orbs */}
      <div className="floating-orbs pointer-events-none"></div>
      
      {/* Floating Cyber Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/15 rounded-full blur-xl animate-float glow-primary pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/15 rounded-full blur-xl animate-float glow-accent pointer-events-none" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-float glow-secondary pointer-events-none" style={{animationDelay: '4s'}}></div>

      <Card className="auth-card">
        <CardHeader className="space-y-1 text-center relative z-50">
          <div className="auth-logo">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <CardTitle className="text-4xl font-bold gradient-text mb-2">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Enter your credentials to access your <span className="text-primary">cyber workspace</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6 relative z-50">
          <CardContent className="space-y-6">
            <div className="auth-input-group">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/80 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className={`auth-input ${
                  errors.email ? "border-destructive focus:border-destructive" : ""
                }`}
              />
              {errors.email && (
                <p className="auth-error">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="auth-input-group">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground/80">
                  Password
                </Label>
                <Link to="/forgot-password" className="auth-link text-sm">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className={`auth-input ${
                  errors.password ? "border-destructive focus:border-destructive" : ""
                }`}
              />
              {errors.password && (
                <p className="auth-error">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 relative z-50">
            <AuthButton
              type="submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? (
                "Accessing Cyber Workspace..."
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Enter Workspace
                </>
              )}
            </AuthButton>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="auth-link"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}