
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Search, MoreVertical, Paperclip, Image as ImageIcon, Send, Mic, Phone, Video, Sun, Shield, Bell, Pin, CheckCheck, ArrowLeft, Smile, Camera, ChevronDown, ChevronUp, Bookmark, User, Users, PhoneCall } from 'lucide-react'
import Starfield from '@/components/Starfield'

type ChatPreview = { id: string; name: string; last: string; time: string; unread?: number; pinned?: boolean }
type Message = { id: number; from: 'me'|'them'|'sys'; text: string; time: string }

const SEED_CHATS: ChatPreview[] = [
  { id: 'archived', name: 'Archived Chats', last: '—', time: '', pinned: false },
  { id: 'global', name: 'CARDIC NEXUS ∞', last: 'You: All official Cardic N…', time: 'Thu', unread: 0, pinned: true },
  { id: 'news', name: 'CARDIC NEWS UP…', last: 'Photo', time: '14:31', unread: 0 },
  { id: 'premium', name: 'CN PREMIUM SIG…', last: 'All official Cardic N…', time: '11:34', unread: 2, pinned: true },
  { id: 'signals', name: 'CN SIGNALS AND…', last: 'All official Cardic N…', time: '11:34', unread: 1 }
]

const SEED_THREAD: Message[] = [
  { id: 1, from: 'sys', text: 'Channel created • English only (test).', time: '18:00' },
  { id: 2, from: 'them', text: 'We build from vision to result. 🛠️🌌', time: '18:01' },
  { id: 3, from: 'them', text: 'Drop your XAUUSD/BTC ideas here.', time: '18:02' }
]

const CNBadge = () => (
  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-700/80 to-amber-400/80 text-sm font-black shadow-gold">CN</div>
)

const Avatar: React.FC<{label:string; small?:boolean}> = ({label, small}) => (
  <div className={`grid ${small? 'h-8 w-8':'h-10 w-10'} place-items-center rounded-full bg-gradient-to-br from-blue-700/80 to-amber-400/80 text-[11px] font-bold ring-1 ring-amber-300/20`}>
    {label.slice(0,2)}
  </div>
)

const Sidebar: React.FC<{open:boolean; onClose:()=>void}> = ({open,onClose}) => {
  const [accOpen, setAccOpen] = useState(true)
  return (
    <AnimatePresence>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="hidden md:block border-t border-white/10 bg-space-panel2/80 py-3 text-center text-[11px] text-white/60">
        © {new Date().getFullYear()} Cardic Nexus • Nex Link — Cosmic Gold
      </footer>
    </div>
  )
}
