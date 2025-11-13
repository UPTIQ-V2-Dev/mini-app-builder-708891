import { LoginForm } from '@/components/auth/LoginForm';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
          <p className="text-muted-foreground mt-2">
            A simple React app with authentication
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};