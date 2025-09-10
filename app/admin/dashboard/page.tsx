// app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Package, 
  Activity, 
  LogOut, 
  RefreshCw,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from "lucide-react";
import { verifyAdminAccess, signOutAdmin } from "@/lib/auth/admin-actions";
import { getVercelDeployments } from "@/lib/vercel/api";

interface DeploymentStatus {
  uid: string;
  name: string;
  url: string | null;
  state: string;
  readyState?: string;
  created: number;
  target: string;
  creator: {
    username: string;
    email: string;
  };
  inspectorUrl?: string;
  source: string;
}

function getStatusColor(state: string) {
  switch (state) {
    case 'READY':
      return 'bg-primary text-primary-foreground';
    case 'BUILDING':
      return 'bg-yellow-500 text-yellow-50';
    case 'ERROR':
    case 'FAILED':
      return 'bg-destructive text-destructive-foreground';
    case 'QUEUED':
      return 'bg-muted text-muted-foreground';
    case 'CANCELED':
      return 'bg-gray-500 text-gray-50';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

function getStatusIcon(state: string) {
  switch (state) {
    case 'READY':
      return <CheckCircle className="w-4 h-4" />;
    case 'BUILDING':
      return <RefreshCw className="w-4 h-4 animate-spin" />;
    case 'ERROR':
    case 'FAILED':
      return <XCircle className="w-4 h-4" />;
    case 'QUEUED':
      return <Clock className="w-4 h-4" />;
    case 'CANCELED':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

function formatTarget(target: string) {
  return target.charAt(0).toUpperCase() + target.slice(1);
}

async function SignO
