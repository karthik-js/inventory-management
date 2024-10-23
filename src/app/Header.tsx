"use client";

import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsAdmin } from "@/lib/stores/features/settings/settingsSlice";

export default function Header() {
  const isAdmin = useAppSelector((state) => state.settings.isAdmin);
  const dispatch = useAppDispatch();

  const onSwitch = (checked: boolean) => {
    dispatch(setIsAdmin(!checked));
  };

  return (
    <header className="sticky top-0 z-10 shadow">
      <nav className="flex flex-row-reverse p-5">
        <div className="flex gap-2">
          <p className="text-sm text-gray-300">Admin</p>

          <Switch checked={!isAdmin} onCheckedChange={onSwitch} />

          <p className="text-sm text-gray-300">User</p>
        </div>
      </nav>
    </header>
  );
}
