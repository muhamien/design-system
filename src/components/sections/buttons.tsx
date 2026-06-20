import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/sections/section"

export function ButtonsSection() {
  return (
    <Section>
      <SectionHeader num="05" title="Buttons" right="6 VARIANTS · 3 SIZES" />
      <div className="flex flex-col gap-[24px] px-[20px] py-[26px]">
        {/* variants */}
        <div className="flex flex-wrap items-center gap-[12px]">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">
            Link <ArrowRightIcon />
          </Button>
        </div>
        {/* sizes */}
        <div className="flex flex-wrap items-center gap-[12px]">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" variant="secondary" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </Section>
  )
}
