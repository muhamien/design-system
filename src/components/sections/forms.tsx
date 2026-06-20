import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionHeader } from "@/components/sections/section"

function Caption({ children }: { children: string }) {
  return (
    <span className="font-mono text-[11px] tracking-[.06em] text-muted-foreground">
      {children}
    </span>
  )
}

export function FormsSection() {
  const [checks, setChecks] = useState({ ship: true, notify: false })
  const [switches, setSwitches] = useState({ autoscale: true, canary: false })
  const [radio, setRadio] = useState("rolling")

  return (
    <Section>
      <SectionHeader num="06" title="Form controls" />
      <div className="grid grid-cols-2">
        {/* left — text inputs */}
        <div className="flex flex-col gap-[18px] border-r border-border px-[20px] py-[24px]">
          <label className="flex flex-col gap-[8px]">
            <Caption>EMAIL</Caption>
            <Input type="text" placeholder="ops@grid.systems" />
          </label>

          <div className="flex flex-col gap-[8px]">
            <Caption>DEPLOY TARGET</Caption>
            <Select defaultValue="Production">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Staging">Staging</SelectItem>
                <SelectItem value="Preview">Preview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex flex-col gap-[8px]">
            <Caption>RELEASE NOTES</Caption>
            <Textarea rows={3} placeholder="What changed in this build…" />
          </label>
        </div>

        {/* right — toggles */}
        <div className="flex flex-col gap-[20px] px-[20px] py-[24px]">
          <div className="flex flex-col gap-[14px]">
            <Caption>CHECKBOX</Caption>
            <label className="flex cursor-pointer items-center gap-[11px]">
              <Checkbox
                checked={checks.ship}
                onCheckedChange={(v) =>
                  setChecks((s) => ({ ...s, ship: v === true }))
                }
              />
              <span className="text-[14px] text-foreground">
                Ship on green checks
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-[11px]">
              <Checkbox
                checked={checks.notify}
                onCheckedChange={(v) =>
                  setChecks((s) => ({ ...s, notify: v === true }))
                }
              />
              <span className="text-[14px] text-foreground">
                Notify on rollback
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-[14px]">
            <Caption>SWITCH</Caption>
            <label className="flex cursor-pointer items-center justify-between gap-[11px]">
              <span className="text-[14px] text-foreground">Autoscaling</span>
              <Switch
                checked={switches.autoscale}
                onCheckedChange={(v) =>
                  setSwitches((s) => ({ ...s, autoscale: v }))
                }
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-[11px]">
              <span className="text-[14px] text-foreground">Canary releases</span>
              <Switch
                checked={switches.canary}
                onCheckedChange={(v) =>
                  setSwitches((s) => ({ ...s, canary: v }))
                }
              />
            </label>
          </div>

          <div className="flex flex-col gap-[14px]">
            <Caption>RADIO</Caption>
            <RadioGroup value={radio} onValueChange={setRadio}>
              {[
                { id: "rolling", label: "Rolling update" },
                { id: "blue-green", label: "Blue / green" },
                { id: "recreate", label: "Recreate" },
              ].map((r) => (
                <label
                  key={r.id}
                  className="flex cursor-pointer items-center gap-[11px]"
                >
                  <RadioGroupItem value={r.id} />
                  <span className="text-[14px] text-foreground">{r.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </Section>
  )
}
