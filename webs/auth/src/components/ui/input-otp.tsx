import * as React from "react"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTPContext = React.createContext<{
  slots: Record<number, { char: string | null; hasFakeCaret: boolean; isActive: boolean }>
} | null>(null)

function useInputOTP() {
  const context = React.useContext(InputOTPContext)
  if (!context) {
    throw new Error("InputOTP components must be used within <InputOTP>")
  }
  return { slots: context.slots }
}

const InputOTP = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    maxLength?: number
    value?: string
    onChange?: (value: string) => void
  }
>(({ className, maxLength = 6, value = "", onChange, ...props }, ref) => {
  const [slots, setSlots] = React.useState<Record<number, { char: string | null; hasFakeCaret: boolean; isActive: boolean }>>(
    {}
  )

  React.useEffect(() => {
    const newSlots: Record<number, { char: string | null; hasFakeCaret: boolean; isActive: boolean }> = {}
    for (let i = 0; i < maxLength; i++) {
      newSlots[i] = {
        char: value[i] || null,
        hasFakeCaret: i === value.length,
        isActive: i === value.length,
      }
    }
    setSlots(newSlots)
  }, [value, maxLength])

  return (
    <InputOTPContext.Provider value={{ slots }}>
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
    </InputOTPContext.Provider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const { slots } = useInputOTP()
  const { char, hasFakeCaret, isActive } = slots[index] || { char: null, hasFakeCaret: false, isActive: false }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
