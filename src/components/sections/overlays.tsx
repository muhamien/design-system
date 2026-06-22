import { ChevronDownIcon, InfoIcon } from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Section, SectionHeader } from "@/components/sections/section"

const menuItems = [
  { label: "Profile", key: "⌘P" },
  { label: "Team settings", key: "⌘T" },
  { label: "Sign out", key: "⌘Q" },
]

export function OverlaysSection() {
  return (
    <Section className="border-b">
      <SectionHeader num="10" title="Overlays" right="DIALOG · MENU · TOOLTIP · TOAST" />

      <div className="flex flex-wrap items-center gap-[14px] px-[20px] py-[26px]">
        {/* dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="font-mono text-[10px] tracking-[.1em] text-primary">
                CONFIRM ACTION
              </div>
              <DialogTitle>Promote build to production?</DialogTitle>
              <DialogDescription>
                This will roll revision <span className="font-mono">a3f9c1d</span>{" "}
                to all 14 edge nodes. The previous build stays available for
                rollback.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Promote</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Dropdown <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {menuItems.map((mi) => (
              <DropdownMenuItem key={mi.label}>
                {mi.label}
                <DropdownMenuShortcut>{mi.key}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover for tooltip</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Tokens resolve at runtime</TooltipContent>
        </Tooltip>

        {/* toast */}
        <Button
          variant="outline"
          onClick={() =>
            toast("Deployment queued", {
              description: "Build a3f9c1d · est. 40s",
            })
          }
        >
          Trigger toast
        </Button>
      </div>

      {/* inline alert */}
      <div className="px-[20px] pb-[28px]">
        <Alert>
          <InfoIcon />
          <AlertTitle>Build deployed to production</AlertTitle>
          <AlertDescription>
            Revision <span className="font-mono">a3f9c1d</span> is live across 14
            nodes.
          </AlertDescription>
        </Alert>
      </div>
    </Section>
  )
}
