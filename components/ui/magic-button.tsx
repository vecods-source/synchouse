import { cn } from "@/lib/utils"

type MagicButtonProps = {
  title: string
  icon?: React.ReactNode
  position?: "left" | "right"
  handleClick?: () => void
  otherClasses?: string
  asChild?: boolean
}

export function MagicButton({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
  asChild = false,
}: MagicButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none md:w-60",
        !asChild && "md:mt-10"
      )}
      onClick={handleClick}
      tabIndex={asChild ? -1 : undefined}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#008080_0%,#000080_50%,#008080_100%)]" />
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-card px-7 text-sm font-medium text-foreground backdrop-blur-3xl",
          otherClasses
        )}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  )
}
