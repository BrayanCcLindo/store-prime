import React from "react";
import ModeToogle from "./mode-toogle";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingCartIcon, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToogle />
        <Button variant="ghost" asChild>
          <Link href="/cart">
            <ShoppingCartIcon className="w-4 h-4" /> Cart
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/sign-in">
            <UserIcon className="w-4 h-4" /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToogle />
            <Button variant={"ghost"}>
              <Link href="/cart">
                <ShoppingCartIcon />
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
