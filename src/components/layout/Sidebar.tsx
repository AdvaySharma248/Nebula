'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  TrendingUp,
  Users,
  Compass,
  MessageCircle,
  Bookmark,
  User,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useAppStore, type ViewType } from '@/stores/app-store'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface NavItem {
  icon: React.ElementType
  label: string
  view: ViewType
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', view: 'feed' },
  { icon: TrendingUp, label: 'Trending', view: 'explore' },
  { icon: Users, label: 'Communities', view: 'community' },
  { icon: Compass, label: 'Explore', view: 'explore' },
  { icon: MessageCircle, label: 'Messages', view: 'messages' },
  { icon: Bookmark, label: 'Saved', view: 'saved' },
  { icon: User, label: 'Profile', view: 'profile' },
  { icon: Settings, label: 'Settings', view: 'settings' },
]

function NavItemButton({
  item,
  isActive,
  collapsed,
  onClick,
}: {
  item: NavItem
  isActive: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        relative flex items-center w-full rounded-lg transition-all duration-200
        ${collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5'}
      `}
      style={{
        background: isActive
          ? 'rgba(124,77,255,0.15)'
          : 'transparent',
        borderLeft: isActive
          ? '2px solid #7C4DFF'
          : '2px solid transparent',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <item.icon
          className="w-5 h-5 shrink-0"
          style={{
            color: isActive ? '#7C4DFF' : '#94A3B8',
            filter: isActive ? 'drop-shadow(0 0 6px rgba(124,77,255,0.5))' : 'none',
          }}
        />
      </motion.div>

      {/* Label (hidden when collapsed) */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
            style={{ color: isActive ? '#FFFFFF' : '#94A3B8' }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active glow indicator */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            boxShadow: '0 0 12px rgba(124,77,255,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
    </motion.button>
  )

  // When collapsed, wrap in tooltip
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={8}
          className="text-xs font-medium"
          style={{
            background: 'rgba(6,8,22,0.95)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return buttonContent
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const { currentView, setView } = useAppStore()

  return (
    <div className="flex flex-col h-full">
      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavItemButton
            key={item.label}
            item={item}
            isActive={currentView === item.view}
            collapsed={collapsed}
            onClick={() => setView(item.view)}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div
        className="p-3 space-y-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* User Mini-Profile Card */}
        <div
          className={`flex items-center rounded-lg p-2 ${
            collapsed ? 'justify-center' : 'gap-3'
          }`}
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <Avatar className="w-8 h-8 shrink-0">
            <AvatarFallback
              className="text-xs font-semibold"
              style={{
                background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
                color: '#FFFFFF',
              }}
            >
              NT
            </AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                  Nebula User
                </p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>
                  @nebulauser
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, setSidebarCollapsed, isMobile } = useAppStore()

  // Mobile Sidebar — Sheet/Drawer
  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-72 p-0 border-none"
          style={{
            background: 'rgba(6,8,22,0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <SheetHeader className="p-4 pb-0">
            <SheetTitle
              className="text-left text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nebula Threads
            </SheetTitle>
          </SheetHeader>
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop Sidebar
  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-16 bottom-0 z-40 overflow-hidden"
      style={{
        background: 'rgba(6,8,22,0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex flex-col h-full">
        <SidebarContent collapsed={sidebarCollapsed} />

        {/* Collapse Toggle */}
        <div className="px-2 pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              color: '#94A3B8',
            }}
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronsLeft className="w-4 h-4" />
                <span className="text-xs font-medium">Collapse</span>
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  )
}
