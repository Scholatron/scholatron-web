"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/components/images/logo.png";    // import the PNG
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Shield, Lock, Zap } from "lucide-react";
import { signInWithGoogleAction } from "./actions";

export function LoginClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="bg-card border border-border shadow-xl overflow-hidden">
        <CardHeader className="text-center pt-6 space-y-4">
          <motion.div
            className="mx-auto w-20 h-20"
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Image
              src={logo}
              alt="Scholatron Logo"
              width={80}
              height={80}
              priority
            />
          </motion.div>

          <div className="space-y-1">
            <h2 className="text-lg font-sans text-muted-foreground">
              Welcome To,
            </h2>
            <CardTitle className="text-3xl text-gradient-primary">
              <span className="font-semibold uppercase tracking-wide">SCHOLATRON</span>
            </CardTitle>
            
               <span className="font-semibold arial">Campus Connect</span>
          </div>

          <CardDescription className="text-secondary-foreground">
            Securely sign in with Google to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pb-8 px-6">
<form action={signInWithGoogleAction} className="flex justify-center">
  <Button
    type="submit"
    className="w-full max-w-xs justify-center gap-2 bg-primary text-primary-foreground hover:bg-secondary smooth-transition"
  >
    <Chrome className="w-4 h-4" />
    Sign in with Google
  </Button>
</form>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
            <div className="text-center space-y-2">
              <Lock className="w-6 h-6 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">
                End-to-End Encrypted
              </p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="w-6 h-6 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">
                OAuth 2.0 + PKCE
              </p>
            </div>
            <div className="text-center space-y-2">
              <Zap className="w-6 h-6 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">
                JWT Sessions
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-center text-muted-foreground"
          >
            By signing in, you agree to our{" "}
            <a
              href="/terms"
              className="text-primary underline underline-offset-2 hover:opacity-80 smooth-transition"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-primary underline underline-offset-2 hover:opacity-80 smooth-transition"
            >
              Privacy Policy
            </a>
            .
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
