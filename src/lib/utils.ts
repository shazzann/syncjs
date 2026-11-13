/* shadcn-style class joiner, so components copied into components/ui work as-is.
   Plain join (no tailwind-merge): our components don't pass conflicting classes. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
