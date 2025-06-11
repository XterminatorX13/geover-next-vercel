"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Home,
  CreditCard,
  LayoutDashboard,
  Plus,
  Users,
  Briefcase,
  Moon,
  Sun,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

interface CommandMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const commands = [
    {
      group: "Navegação",
      items: [
        {
          icon: Home,
          label: "Ir para Início",
          shortcut: "⌘H",
          action: () => router.push("/"),
        },
        {
          icon: CreditCard,
          label: "Ver Planos",
          shortcut: "⌘P",
          action: () => router.push("/plans"),
        },
        {
          icon: LayoutDashboard,
          label: "Ir para Dashboard",
          shortcut: "⌘D",
          action: () => router.push("/dashboard"),
        },
      ],
    },
    {
      group: "Ações",
      items: [
        {
          icon: Plus,
          label: "Criar Novo Projeto",
          shortcut: "⌘N",
          action: () => console.log("Create project"),
        },
        {
          icon: Users,
          label: "Encontrar Freelancer",
          shortcut: "⌘F",
          action: () => console.log("Find freelancer"),
        },
        {
          icon: Briefcase,
          label: "Publicar Trabalho",
          shortcut: "⌘J",
          action: () => console.log("Post job"),
        },
      ],
    },
    {
      group: "Tema",
      items: [
        {
          icon: theme === "dark" ? Sun : Moon,
          label: `Alternar para ${theme === "dark" ? "Claro" : "Escuro"}`,
          shortcut: "⌘T",
          action: () => setTheme(theme === "dark" ? "light" : "dark"),
        },
      ],
    },
    {
      group: "Ajuda",
      items: [
        {
          icon: Settings,
          label: "Configurações",
          shortcut: "⌘,",
          action: () => console.log("Settings"),
        },
        {
          icon: HelpCircle,
          label: "Central de Ajuda",
          shortcut: "⌘?",
          action: () => console.log("Help"),
        },
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-2xl bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Command className="rounded-lg border-0 shadow-2xl">
                <div className="flex items-center border-b border-border/50 px-4">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <CommandInput
                    placeholder="Digite um comando ou pesquise..."
                    className="border-0 focus:ring-0 text-lg py-6 bg-transparent"
                  />
                  <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                    <span className="text-xs">ESC</span>
                  </kbd>
                </div>
                <CommandList className="max-h-96 p-2">
                  <CommandEmpty className="py-6 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 opacity-50" />
                      <p>Nenhum resultado encontrado.</p>
                    </div>
                  </CommandEmpty>

                  {commands.map((group, groupIndex) => (
                    <CommandGroup key={groupIndex} heading={group.group} className="mb-2">
                      {group.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (groupIndex * group.items.length + itemIndex) * 0.03 }}
                        >
                          <CommandItem
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 rounded-lg mx-1 transition-colors"
                            onSelect={() => runCommand(item.action)}
                          >
                            <item.icon className="w-5 h-5 text-muted-foreground" />
                            <span className="flex-1">{item.label}</span>
                            <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground">
                              {item.shortcut}
                            </kbd>
                          </CommandItem>
                        </motion.div>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
