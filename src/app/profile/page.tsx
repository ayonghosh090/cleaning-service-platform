import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import ProfileClient from "../../components/profile/ProfileClient";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/profile");
  return <ProfileClient initialUser={user} />;
}
