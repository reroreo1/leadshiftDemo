import React from "react";
import { useNavigate } from "react-router-dom";
import { useTransition } from "react";
import { LeadShiftLogo } from "components/LeadShiftLogo";
import { Button } from "components/Button";
import { FeatureCard } from "components/FeatureCard";
import { Input } from "components/Input";
import { Label } from "components/Label";
import { ThemeToggle } from "components/ThemeToggle";
import { Mail, Lock, BarChart3, Send, Phone, Calendar } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(() => {
      navigate("/dashboard");
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Product information */}
        <div className="space-y-6">
          <LeadShiftLogo className="text-4xl mb-6" />
          
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-[#17206d] dark:text-white">Lead Management </span>
            <span className="text-[#eb6810]">Reimagined</span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Streamline your lead management and outreach automation to close more tech recruiting deals.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <FeatureCard 
              title="Smart Lead Scoring" 
              description="AI-powered lead qualification that prioritizes your outreach efforts."
              icon={<BarChart3 size={24} className="text-[#27b99c]" />}
            />
            
            <FeatureCard 
              title="Automated Outreach" 
              description="Personalized AI email templates based on company data."
              icon={<Send size={24} className="text-[#27b99c]" />}
            />
            
            <FeatureCard 
              title="Call Tracking" 
              description="Record, transcribe and analyze call sentiment automatically."
              icon={<Phone size={24} className="text-[#27b99c]" />}
            />
            
            <FeatureCard 
              title="Meeting Scheduling" 
              description="Seamless calendar integration for follow-ups."
              icon={<Calendar size={24} className="text-[#27b99c]" />}
            />
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border hover:shadow-xl transition-shadow duration-200">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#17206d] dark:text-white">Get Started</h2>
            <p className="text-muted-foreground">Sign in to your account or create a new one</p>
          </div>
          
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#17206d] dark:text-white">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail size={16} />
                </div>
                <Input id="email" type="text" placeholder="you@company.com" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#17206d] dark:text-white">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock size={16} />
                </div>
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
              </div>
            </div>
            
    
            <div className="pt-2">
      <Button 
        className="w-full bg-[#eb6810] hover:bg-[#eb6810]/90 text-white font-semibold" 
        onClick={handleSignIn}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Sign In"}
      </Button>
    </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign in with Google
            </Button>
            
            <div className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <a href="#" className="text-[#17206d] underline hover:text-[#eb6810]">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

