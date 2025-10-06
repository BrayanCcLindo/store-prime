import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.action";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function UserBotton() {
  const session = await auth();
  if (!session) {
    return (
      <Button variant="ghost" asChild>
        <Link href="/sign-in">
          <UserIcon className="w-4 h-4" /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInitial = session?.user?.name?.charAt(0).toUpperCase();
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center ">
            <Button
              variant="ghost"
              className="relative w-8 h-8 cursor-pointer rounded-full border "
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">{firstInitial}</span>
              </div>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form
              action={signOutUser}
              className="flex items-center justify-start"
            >
              <button className="flex items-center gap-2">
                <LogOutIcon className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
