import { SignUpForm } from "@/components/SignUpForm";
import { Heart } from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="gradient-background-bg flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary-bg rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EmoGraph</span>
          </div>
          {/* EmoGraph */}
        </Link>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
