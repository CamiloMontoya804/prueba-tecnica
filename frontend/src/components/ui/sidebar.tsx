'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, UserPlus, Wallet, CreditCard, PieChart, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

const navItems = [
  { href: '/', label: 'Clientes', icon: Users },
  { href: '/register', label: 'Registrar Cliente', icon: UserPlus },
  { href: '/recharge', label: 'Recargar Billetera', icon: Wallet },
  { href: '/pay', label: 'Pagar', icon: CreditCard },
  { href: '/balance', label: 'Consultar Saldo', icon: PieChart },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "flex flex-col h-screen bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {isCollapsed ? (
          <Image src="/logo-small.png" alt="Logo" width={32} height={32} />
        ) : (
          <Image src="/logo-large.png" alt="Logo" width={180} height={40} />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-[#FF6720]/90"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-white",
                  pathname === item.href ? "bg-[#FF6720] hover:bg-[#FF6720]/90" : "hover:bg-zinc-800",
                  isCollapsed ? "px-2" : "px-4"
                )}
              >
                <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}