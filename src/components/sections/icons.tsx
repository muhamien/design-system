import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon,
  ClipboardIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  CopyIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  FileIcon,
  FilterIcon,
  FolderIcon,
  GlobeIcon,
  GridIcon,
  HardDriveIcon,
  HashIcon,
  HelpCircleIcon,
  HomeIcon,
  InfoIcon,
  KeyIcon,
  LayersIcon,
  LayoutIcon,
  LinkIcon,
  ListIcon,
  LockIcon,
  LogOutIcon,
  MailIcon,
  MaximizeIcon,
  MenuIcon,
  MessageSquareIcon,
  MinimizeIcon,
  MinusIcon,
  MoonIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SendIcon,
  ServerIcon,
  SettingsIcon,
  ShareIcon,
  ShieldIcon,
  SlidersIcon,
  SquareIcon,
  StarIcon,
  SunIcon,
  TerminalIcon,
  TrashIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UnlockIcon,
  UploadIcon,
  UserIcon,
  UsersIcon,
  WifiIcon,
  XCircleIcon,
  XIcon,
  ZapIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Section, SectionHeader } from "@/components/sections/section"

type IconEntry = { Icon: LucideIcon; name: string }

const groups: { label: string; icons: IconEntry[] }[] = [
  {
    label: "NAVIGATION",
    icons: [
      { Icon: HomeIcon, name: "Home" },
      { Icon: MenuIcon, name: "Menu" },
      { Icon: ChevronLeftIcon, name: "ChevronLeft" },
      { Icon: ChevronRightIcon, name: "ChevronRight" },
      { Icon: ChevronUpIcon, name: "ChevronUp" },
      { Icon: ChevronDownIcon, name: "ChevronDown" },
      { Icon: ArrowLeftIcon, name: "ArrowLeft" },
      { Icon: ArrowRightIcon, name: "ArrowRight" },
      { Icon: ArrowUpIcon, name: "ArrowUp" },
      { Icon: ArrowDownIcon, name: "ArrowDown" },
      { Icon: ExternalLinkIcon, name: "ExternalLink" },
      { Icon: LinkIcon, name: "Link" },
    ],
  },
  {
    label: "ACTIONS",
    icons: [
      { Icon: PlusIcon, name: "Plus" },
      { Icon: MinusIcon, name: "Minus" },
      { Icon: XIcon, name: "X" },
      { Icon: CheckIcon, name: "Check" },
      { Icon: EditIcon, name: "Edit" },
      { Icon: TrashIcon, name: "Trash" },
      { Icon: CopyIcon, name: "Copy" },
      { Icon: ClipboardIcon, name: "Clipboard" },
      { Icon: DownloadIcon, name: "Download" },
      { Icon: UploadIcon, name: "Upload" },
      { Icon: ShareIcon, name: "Share" },
      { Icon: SendIcon, name: "Send" },
      { Icon: RefreshCwIcon, name: "RefreshCw" },
      { Icon: SearchIcon, name: "Search" },
      { Icon: FilterIcon, name: "Filter" },
      { Icon: SlidersIcon, name: "Sliders" },
    ],
  },
  {
    label: "STATUS",
    icons: [
      { Icon: InfoIcon, name: "Info" },
      { Icon: HelpCircleIcon, name: "HelpCircle" },
      { Icon: AlertCircleIcon, name: "AlertCircle" },
      { Icon: AlertTriangleIcon, name: "AlertTriangle" },
      { Icon: CheckCircleIcon, name: "CheckCircle" },
      { Icon: XCircleIcon, name: "XCircle" },
      { Icon: BellIcon, name: "Bell" },
      { Icon: ZapIcon, name: "Zap" },
      { Icon: StarIcon, name: "Star" },
      { Icon: ShieldIcon, name: "Shield" },
      { Icon: LockIcon, name: "Lock" },
      { Icon: UnlockIcon, name: "Unlock" },
    ],
  },
  {
    label: "LAYOUT",
    icons: [
      { Icon: GridIcon, name: "Grid" },
      { Icon: LayoutIcon, name: "Layout" },
      { Icon: LayersIcon, name: "Layers" },
      { Icon: ListIcon, name: "List" },
      { Icon: MaximizeIcon, name: "Maximize" },
      { Icon: MinimizeIcon, name: "Minimize" },
      { Icon: MoreHorizontalIcon, name: "MoreHorizontal" },
      { Icon: MoreVerticalIcon, name: "MoreVertical" },
      { Icon: SquareIcon, name: "Square" },
      { Icon: CircleIcon, name: "Circle" },
      { Icon: SunIcon, name: "Sun" },
      { Icon: MoonIcon, name: "Moon" },
    ],
  },
  {
    label: "SYSTEM",
    icons: [
      { Icon: SettingsIcon, name: "Settings" },
      { Icon: TerminalIcon, name: "Terminal" },
      { Icon: CodeIcon, name: "Code" },
      { Icon: ServerIcon, name: "Server" },
      { Icon: DatabaseIcon, name: "Database" },
      { Icon: CpuIcon, name: "Cpu" },
      { Icon: HardDriveIcon, name: "HardDrive" },
      { Icon: CloudIcon, name: "Cloud" },
      { Icon: WifiIcon, name: "Wifi" },
      { Icon: HashIcon, name: "Hash" },
      { Icon: KeyIcon, name: "Key" },
      { Icon: GlobeIcon, name: "Globe" },
    ],
  },
  {
    label: "CONTENT",
    icons: [
      { Icon: FileIcon, name: "File" },
      { Icon: FolderIcon, name: "Folder" },
      { Icon: BookOpenIcon, name: "BookOpen" },
      { Icon: MailIcon, name: "Mail" },
      { Icon: MessageSquareIcon, name: "MessageSquare" },
      { Icon: CalendarIcon, name: "Calendar" },
      { Icon: ClockIcon, name: "Clock" },
      { Icon: UserIcon, name: "User" },
      { Icon: UsersIcon, name: "Users" },
      { Icon: LogOutIcon, name: "LogOut" },
      { Icon: EyeIcon, name: "Eye" },
      { Icon: EyeOffIcon, name: "EyeOff" },
    ],
  },
  {
    label: "DATA",
    icons: [
      { Icon: TrendingUpIcon, name: "TrendingUp" },
      { Icon: TrendingDownIcon, name: "TrendingDown" },
      { Icon: PlayIcon, name: "Play" },
      { Icon: PauseIcon, name: "Pause" },
    ],
  },
]

export function IconsSection() {
  return (
    <Section>
      <SectionHeader num="11" title="Icon set" right="LUCIDE · STROKE-1.5" />
      <div className="flex flex-col divide-y divide-border">
        {groups.map((group) => (
          <div key={group.label} className="px-[20px] py-[20px]">
            <div className="mb-[14px] font-mono text-[10px] tracking-[.12em] text-muted-foreground">
              {group.label}
            </div>
            <div className="flex flex-wrap gap-[4px]">
              {group.icons.map(({ Icon, name }) => (
                <div
                  key={name}
                  title={name}
                  className="group flex h-[52px] w-[52px] cursor-default flex-col items-center justify-center gap-[5px] rounded-[var(--radius)] border border-transparent transition-colors hover:border-border hover:bg-muted"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="text-foreground transition-colors group-hover:text-primary"
                  />
                  <span className="hidden font-mono text-[8px] tracking-[.04em] text-muted-foreground group-hover:block">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
