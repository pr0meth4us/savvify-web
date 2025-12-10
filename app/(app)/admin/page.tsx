"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";

interface AdminUserProfile {
  _id: string;
  name_en?: string;
  name_km?: string;
  created_at?: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") {
      router.replace("/dashboard");
      return;
    }
    fetchUsers();
  }, [session, status]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get<AdminUserProfile[]>("/users/admin/list");
      setUsers(res.data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ PERMANENTLY DELETE THIS USER? This cannot be undone.")) return;
    try {
      await api.delete(`/users/admin/user/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete user");
    }
  };

  if (status === "loading" || loading) return <div className="flex justify-center p-20"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Console</h1>
        <p className="text-slate-500">Manage registered users.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-slate-50">
              <tr>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Name (EN)</th>
                <th className="p-3 font-medium">Created</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
              </thead>
              <tbody className="divide-y">
              {users.map(user => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-xs text-slate-500">{user._id}</td>
                  <td className="p-3 font-medium">{user.name_en || "-"}</td>
                  <td className="p-3 text-slate-500">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}