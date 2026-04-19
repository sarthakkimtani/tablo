"use client";

import { CircleUserRoundIcon, EllipsisVerticalIcon, LogOutIcon, MoonStarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

import { useSession } from "@/contexts/session-context";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export const NavUser = () => {
  const [signOut, setSignOut] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { isMobile } = useSidebar();
  const { user } = useSession();
  const router = useRouter();

  const isDark = resolvedTheme === "dark";

  const handleSignOut = () => {
    setSignOut(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/auth");
        },
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="cursor-pointer rounded-md transition-colors duration-150 ease-in-out hover:bg-primary/10 data-[state=open]:bg-primary/10"
            asChild
          >
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <CircleUserRoundIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer justify-between"
                onSelect={(event) => event.preventDefault()}
              >
                <div className="flex items-center gap-2">
                  <MoonStarIcon />
                  <span>Dark theme</span>
                </div>
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
                  aria-label="Toggle dark theme"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" disabled={signOut} onClick={handleSignOut}>
              <LogOutIcon />
              {signOut ? "Signing Out..." : "Sign Out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
