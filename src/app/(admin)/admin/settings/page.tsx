import AdministratorSection from "@/components/admin/settings/AdministratorSection";
import ChangePassword from "@/components/admin/settings/ChangePassword";
import UserProfile from "@/components/admin/settings/UserProfile";

export default function SettingsPage() {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <UserProfile />
        <AdministratorSection />
        <ChangePassword />
      </div>
    </div>
  );
}
