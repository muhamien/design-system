import { useEffect, useRef, useState } from "react"

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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Section, SectionHeader } from "@/components/sections/section"

const menuItems = [
  { label: "Profile", key: "⌘P" },
  { label: "Team settings", key: "⌘T" },
  { label: "Sign out", key: "⌘Q" },
]

export function OverlaysSection() {
  const [toastOpen, setToastOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const fireToast = () => {
    setToastOpen(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastOpen(false), 3200)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <Section className="border-b">
      <SectionHeader num="09" title="Overlays" right="DIALOG · MENU · TOOLTIP · TOAST" />

      <div className="flex flex-wrap items-center gap-[14px] px-[20px] py-[26px]">
        {/* dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="mb-[10px] font-mono text-[10px] tracking-[.1em] text-primary">
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
                <Button variant="ghost" className="h-[36px] border-border px-[16px]">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="h-[36px] px-[16px]">Promote</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Dropdown ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
            {menuItems.map((mi) => (
              <DropdownMenuItem key={mi.label}>
                <span>{mi.label}</span>
                <DropdownMenuShortcut>{mi.key}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* tooltip */}
        <TooltipProvider delayDuration={120}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="cursor-default border-border">
                Hover for tooltip
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Tokens resolve at runtime</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* toast */}
        <Button variant="ghost" className="border-border" onClick={fireToast}>
          Trigger toast
        </Button>
      </div>

      {/* inline alert */}
      <div className="px-[20px] pb-[28px]">
        <div className="flex gap-[13px] rounded-[var(--radius)] border border-l-[3px] border-border border-l-primary bg-card px-[17px] py-[15px]">
          <span className="font-mono text-[14px] leading-[1.3] text-primary">ℹ</span>
          <div>
            <div className="text-[14px] font-semibold">
              Build deployed to production
            </div>
            <div className="mt-[2px] text-[13px] text-muted-foreground">
              Revision <span className="font-mono">a3f9c1d</span> is live across 14
              nodes.
            </div>
          </div>
        </div>
      </div>

      {/* toast (auto-dismiss) */}
      {toastOpen && (
        <div
          className="fixed bottom-[24px] right-[24px] z-[60] w-[320px] rounded-[var(--radius)] border border-l-[3px] border-border border-l-primary bg-popover px-[16px] py-[14px] shadow-[0_20px_40px_-14px_rgba(0,0,0,.4)]"
          style={{ animation: "dsToast .2s ease" }}
        >
          <div className="flex items-start justify-between gap-[10px]">
            <div>
              <div className="text-[14px] font-semibold">Deployment queued</div>
              <div className="mt-[2px] text-[12px] text-muted-foreground">
                Build a3f9c1d · est. 40s
              </div>
            </div>
            <span className="font-mono text-[10px] tracking-[.06em] text-primary">
              NOW
            </span>
          </div>
        </div>
      )}
    </Section>
  )
}
