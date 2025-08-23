"use client";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useCheckActiveNav from "@/hooks/use-check-active-nav";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";
// import usePermission from "@/hooks/use-permissions";
// import { useAppSelector } from "@/hooks/redux-toolkit";
// import { Permission, PermissionType } from "@/interfaces/auth/logininterfaces";
import { ReactNode } from "react";
import { SideLink } from "@/data/sideTypes";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: SideLink[];
  closeNav: () => void;
}

// Nav
export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  // const user_permissions = useAppSelector(
  //   (state) => state.auth.user.user_permissions
  // ) as Permission;

  // const { hasPermission } = usePermission(user_permissions);
  const renderLink = ({ sub, ...rest }: SideLink) => {
    // const renderLink = ({ sub, permissions = [], ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    // const hasPermissions =
    //   permissions.length === 0 ||
    //   permissions.some((permissions) => hasPermission(permissions));
    // if (!hasPermissions) return null;

    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "border-b py-2 text-white transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none bg-white",
        className
        // `${isCollapsed && 'flex items-center'}`
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid pb-24 gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

// end nav

interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
  lastElement,
}: NavLinkProps) {
  const { t } = useTranslation();
  const { checkActiveNav } = useCheckActiveNav();
  return !lastElement ? (
    <Link
      prefetch
      href={href}
      onClick={closeNav}
      className={cn(
        "rounded-lg text-gray-500 group w-full h-[45px]  flex items-center hover:bg-accent hover:text-primary px-2  cursor-pointer my-2",
        subLink && "h-10 w-full border-l border-l-slate-500 px-2",
        checkActiveNav(href) &&
          "bg-gradient-to-br from-primary via-primary to-accent text-white hover:text-white"
      )}
      aria-current={checkActiveNav(href) ? "page" : undefined}
    >
      <div className="mr-2">{icon}</div>
      {t(title)}
      {label && (
        <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
          {t(label)}
        </div>
      )}
    </Link>
  ) : (
    <div className="absolute bottom-0 left-0 w-full bg-white translate-y-2 pb-1 border-t">
      <Link
        prefetch
        href={href}
        onClick={closeNav}
        className={cn(
          "text-gray-500 group w-full h-[45px]  flex items-center hover:bg-accent  hover:text-primary px-2   cursor-pointer my-2",
          subLink && "h-10 w-full border-l border-l-slate-500 px-2",
          checkActiveNav(href) &&
            "bg-gradient-to-br from-primary via-primary to-accent text-white"
        )}
        aria-current={checkActiveNav(href) ? "page" : undefined}
      >
        <div className="mr-2">{icon}</div>
        {t(title)}
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {t(label)}
          </div>
        )}
      </Link>
    </div>
  );
}

function NavLinkDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));
  const { t } = useTranslation();

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          "group w-full h-[45px]  flex items-center hover:bg-accent px-2 cursor-pointer my-2 group  justify-start rounded-md",
          isChildActive &&
            "bg-gradient-to-br from-primary via-primary to-accent text-white"
        )}
      >
        <div
          className={`mr-2 text-3xl ${
            isChildActive ? "color-white" : "text-gray-500 group-hover:text-primary"
          }
          `}
        >
          {icon}
        </div>
        <p
          className={`max-w-40 break-words ${
            isChildActive ? "color-white" : "text-gray-500 group-hover:text-primary "
          }
          `}
        >
          {t(title)}
        </p>
        {label && (
          <div
            className={`ml-2 rounded-lg  px-1 text-[0.625rem] ${
              isChildActive ? "color-white" : "text-gray-500"
            }
          `}
          >
            {t(label)}
          </div>
        )}
        <span
          className={`ml-auto transition-all group-data-[state="open"]:-rotate-180
            ${isChildActive ? "color-white" : "text-gray-500"}
          `}
        >
          <ChevronDown />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink, index) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavItem
                key={index}
                {...sublink}
                checkActiveNav={checkActiveNav}
                // permissions={sublink.permissions || []}
              />
              {/* <NavLink {...sublink} subLink closeNav={closeNav} /> */}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface SubLink {
  title: string;
  href: string;
  icon: React.ReactNode;
  // permissions: Array<keyof PermissionType>;
  checkActiveNav: (href: string) => boolean; // Fonction pour vérifier si le lien est actif
}

const NavItem: React.FC<SubLink> = ({
  title,
  href,
  icon,
  checkActiveNav,
  // permissions,
}) => {
  const { t } = useTranslation();
  const isActive = checkActiveNav(href); // Vérifie si le lien est actif
  // const user_permissions = useAppSelector(
  //   (state) => state.auth.user.user_permissions
  // ) as Permission;

  // const { hasPermission } = usePermission(user_permissions);

  // const hasPermissions =
  //   permissions.length === 0 ||
  //   permissions.some((permissions) => hasPermission(permissions));
  // if (!hasPermissions) return null;

  return (
    <div className="my-1">
      <Link
        prefetch
        className={`flex gap-x-3 my-2 cursor-pointer rounded-md ${
          isActive
            ? "text-white bg-gradient-to-br from-primary via-primary to-accent p-1"
            : "text-gray-500 hover:text-primary hover:bg-accent p-2"
        }`}
        href={href}
      >
        {icon}
        {t(title)}
      </Link>
    </div>
  );
};

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const { t } = useTranslation();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger className="flex justify-center items-center" asChild>
        <Link
          prefetch
          href={href}
          className={cn(
            // buttonVariants({
            //   variant: checkActiveNav(href) ? "default" : "ghost",
            //   size: "icon",
            // }),
            `h-12 w-12 cursor-pointer ${
              !checkActiveNav(href)
                ? "text-gray-500 bg-transparent hover:bg-accent hover:rounded-full hover:text-primary hover:font-bold"
                : "bg-gradient-to-br from-primary via-primary to-accent text-white rounded-md font-bold"
            }`
          )}
        >
          <p>{icon}</p>
          <span className="sr-only">{t(title)}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {t(title)}
        {label && <span className="ml-auto  text-white">{t(label)}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"link"}
              size="icon"
              className={`h-12 w-12 cursor-pointer ${
                !isChildActive
                  ? "text-gray-500 bg-transparent hover:bg-accent hover:rounded-full hover:text-primary hover:font-bold"
                  : "bg-gradient-to-br from-primary via-primary to-accent text-white rounded-md font-bold"
              } `}
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {t(title)}{" "}
          {label && (
            <span className="ml-auto text-muted-foreground">{t(label)}</span>
          )}
          <ChevronDown size={18} className="-rotate-90 text-muted-foreground" />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {t(title)} {label ? `(${t(label)})` : ""}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sub!.map((data, index) => (
          <NavDropdownItem
            key={index}
            {...data}
            t={t}
            // permissions={data.permissions || []}
            checkActiveNav={checkActiveNav}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type NavDropdownItemProps = {
  title: string;
  href: string;
  icon?: ReactNode;
  label?: string;
  checkActiveNav: (href: string) => boolean;
  t: (key: string) => string;
  // permissions: Array<keyof PermissionType>;
};

const NavDropdownItem: React.FC<NavDropdownItemProps> = ({
  title,
  href,
  icon,
  label,
  // permissions,

  checkActiveNav,
  t,
}) => {
  // const user_permissions = useAppSelector(
  //   (state) => state.auth.user.user_permissions
  // ) as Permission;

  // const { hasPermission } = usePermission(user_permissions);

  // const hasPermissions =
  //   permissions.length === 0 ||
  //   permissions.some((permissions) => hasPermission(permissions));
  // if (!hasPermissions) return null;

  return (
    <DropdownMenuItem key={`${title}-${href}`} asChild>
      <Link
        prefetch
        href={href}
        className={`cursor-pointer ${checkActiveNav(href) ? "bg-accent" : ""}`}
      >
        {icon} <span className="ml-2 max-w-52 text-wrap">{t(title)}</span>
        {label && <span className="ml-auto text-xs">{t(label)}</span>}
      </Link>
    </DropdownMenuItem>
  );
};
