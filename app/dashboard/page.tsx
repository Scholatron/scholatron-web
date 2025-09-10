// app/dashboard/page.tsx
import { redirect } from "next/navigation";import { getTokenFromCookie, getUserFromCookie, requireAuth } from "@/lib/auth/server";
import { displayName } from "@/lib/auth/client";
import { signOut } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Shield, Clock } from "lucide-react";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";

export default async function DashboardPage() {
  await requireAuth();
  const token = await getTokenFromCookie();
  const user = await getUserFromCookie();
  
  if (!token || !user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold font-brand text-primary">SCUD Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.avatar_url || undefined} alt={displayName(user)} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {displayName(user).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{displayName(user)}</span>
            </div>

            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive smooth-transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-card-foreground">Welcome back, {displayName(user)}!</h2>
          <p className="text-muted-foreground">
            You're successfully authenticated with your backend API
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <User className="w-5 h-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar_url || undefined} alt={displayName(user)} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {displayName(user).charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium text-card-foreground">{user.name || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Username:</span>
                  <p className="font-medium text-card-foreground">@{user.username || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium text-card-foreground">{user.email || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Status */}
          <Card className="border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Shield className="w-5 h-5 text-primary" />
                Authentication Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="border-primary text-primary">
                    ✓ Authenticated
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Provider</span>
                  <Badge variant="outline" className="text-card-foreground">
                    GitHub OAuth
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Backend</span>
                  <Badge variant="outline" className="border-primary text-primary">
                    ✓ Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Security</span>
                  <Badge variant="outline" className="text-card-foreground">
                    JWT + Sessions
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="border border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                <Clock className="w-5 h-5 text-primary" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">GitHub ID:</span>
                  <p className="font-mono text-xs bg-muted text-card-foreground px-2 py-1 rounded mt-1">
                    {user.github_id || "Not available"}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">User ID:</span>
                  <p className="font-mono text-xs bg-muted text-card-foreground px-2 py-1 rounded mt-1">
                    {user.id}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Roles:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.roles?.map((role: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {role}
                      </Badge>
                    )) || (
                      <Badge variant="secondary" className="text-xs">
                        user
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
