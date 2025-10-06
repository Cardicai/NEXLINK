
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
          <motion.div onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-40 bg-black/50" />
          <motion.aside initial={{x:-320}} animate={{x:0}} exit={{x:-320}} transition={{type:'spring',stiffness:260,damping:26}}
            className="fixed left-0 top-0 z-50 h-dvh w-[300px] overflow-y-auto border-r border-white/10 bg-space-panel2 text-white shadow-2xl">
            <div className="flex items-center justify-between px-4 pt-6">
              <div className="flex items-center gap-3">
                <Avatar label="Cardic" />
                <div>
                  <div className="font-semibold">Cardic</div>
                  <div className="text-xs text-white/70">+44 7909 179845</div>
                </div>
              </div>
              <Sun className="h-5 w-5 text-white/70"/>
            </div>

            <button onClick={()=>setAccOpen(v=>!v)} className="mt-4 flex w-full items-center justify-between px-4 py-2 text-sm">
              <div className="flex items-center gap-2">
                <Avatar label="Cardic" small /> <span>Cardic</span> <span className="ml-1 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-black">5</span>
              </div>
              {accOpen ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
            </button>
            {accOpen && (
              <div className="space-y-2 px-4">
                <div className="flex items-center gap-2 opacity-80"><Avatar label="Unknown" small /> <span>Unknown</span></div>
                <button className="flex items-center gap-2 text-amber-300/90"><User className="h-4 w-4"/> Add Account</button>
              </div>
            )}

            <div className="mt-4 space-y-1 px-2">
              {[
                { icon: User, label: 'My Profile' },
                { icon: Bookmark, label: 'Wallet' },
                { icon: Users, label: 'New Group' },
                { icon: Users, label: 'Contacts' },
                { icon: PhoneCall, label: 'Calls' },
                { icon: Bookmark, label: 'Saved Messages' }
              ].map(Item => (
                <button key={Item.label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-white/5">
                  <Item.icon className="h-4 w-4 text-white/70"/> {Item.label}
                </button>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default function NexLinkApp() {
  const [sidebar, setSidebar] = useState(false)
  const [active, setActive] = useState<string>('global')
  const [query, setQuery] = useState('')
  const [msgs, setMsgs] = useState<Message[]>(SEED_THREAD)
  const [draft, setDraft] = useState('')
  const [chatOpen, setChatOpen] = useState(false)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, chatOpen])

  const chats = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SEED_CHATS.filter(c => !q || c.name.toLowerCase().includes(q))
  }, [query])

  const send = () => {
    const t = draft.trim(); if (!t) return
    setMsgs(m => [...m, { id: Date.now(), from: 'me', text: t, time: new Date().toLocaleTimeString() }])
    setDraft('')
  }

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-space-bg1 to-space-bg2 text-white">
      <Starfield />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-space-panel2/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebar(true)} className="rounded-full p-2 hover:bg-white/5"><Menu className="h-5 w-5"/></button>
            <CNBadge />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/60">COSMIC GOLD</div>
              <div className="text-base font-semibold">Nex Link</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search"
                className="w-[260px] rounded-full border border-white/10 bg-space-panel py-2 pl-9 pr-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/40" />
            </div>
            <button className="rounded-full border border-white/10 bg-space-panel p-2 hover:bg-white/10"><Bell className="h-4 w-4"/></button>
            <button className="rounded-full border border-white/10 bg-space-panel p-2 hover:bg-white/10"><Shield className="h-4 w-4"/></button>
            <button onClick={()=>setChatOpen(true)} className="rounded-full border border-amber-400/30 bg-gradient-to-r from-blue-700 to-amber-400 px-3 py-2 text-sm font-medium hover:opacity-90 shadow-gold">Global Chat</button>
            <button className="rounded-full border border-white/10 bg-space-panel p-2 hover:bg-white/10"><MoreVertical className="h-4 w-4"/></button>
          </div>
        </div>
      </header>

      <Sidebar open={sidebar} onClose={()=>setSidebar(false)} />

      <main className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-12">
        <aside className="md:col-span-4 border-r border-white/10">
          <div className="flex items-center gap-2 px-3 py-3 md:hidden">
            <Search className="h-4 w-4 text-white/50" />
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search"
              className="h-9 flex-1 rounded-full border border-white/10 bg-space-panel px-3 text-sm outline-none placeholder:text-white/40" />
          </div>
          <div className="max-h-[calc(100dvh-64px)] overflow-y-auto">
            {chats.map(c => (
              <button key={c.id} onClick={()=>setActive(c.id)}
                className={`flex w-full items-center gap-3 px-3 py-3 text-left transition ${active===c.id ? 'bg-white/5' : 'hover:bg-white/5'}`}>
                <Avatar label={c.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-sm font-medium">{c.name}</div>
                    <div className="text-[10px] text-white/50">{c.time}</div>
                  </div>
                  <div className="flex items-center gap-2 truncate text-xs text-white/60">
                    {c.pinned && <Pin className="h-3 w-3"/>}
                    <span className="truncate">{c.last}</span>
                  </div>
                </div>
                {c.unread ? (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-black">{c.unread}</span>
                ) : null}
              </button>
            ))}
          </div>

          <button className="fixed bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-blue-700 to-amber-400 text-black shadow-gold md:static md:mx-3 md:my-3">
            <Camera className="h-5 w-5"/>
          </button>
        </aside>

        <section className="md:col-span-5 hidden md:flex min-h-[calc(100dvh-64px)] items-center justify-center text-white/50 px-6 text-center">
          Tap <span className="mx-1 rounded-full border border-amber-400/30 bg-gradient-to-r from-blue-700 to-amber-400 px-2 py-0.5 text-xs text-black">Global Chat</span> to open the conversation panel.
        </section>

        <aside className="md:col-span-3 hidden md:block border-l border-white/10 bg-space-panel2/40">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar label={active} />
              <div>
                <div className="text-sm font-semibold">{SEED_CHATS.find(x=>x.id===active)?.name ?? 'Chat'}</div>
                <div className="text-[11px] text-white/60">Channel • Public</div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-space-panel p-3 text-sm">
                <div className="mb-1 text-xs uppercase tracking-wide text-white/60">About</div>
                Welcome to <b>Nex Link</b>. Share analysis, setups, lessons. Be kind. No spam.
              </div>

              <div className="rounded-2xl border border-white/10 bg-space-panel p-3 text-sm">
                <div className="mb-1 text-xs uppercase tracking-wide text-white/60">Links & Media</div>
                <div className="space-y-2 text-xs text-white/70">
                  <div>📎 Pinned message: Community rules</div>
                  <div>🖼 Last media: XAUUSD chart.png</div>
                  <div>🔗 Invite link: nex.link/cn-global</div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {chatOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-40 bg-black/60">
            <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} className="absolute inset-x-0 bottom-0 top-16 mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-space-panel2/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar label={active} />
                  <div>
                    <div className="text-sm font-semibold">Global Chat</div>
                    <div className="text-[11px] text-white/60">2,134 members • 214 online</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>setChatOpen(false)} className="rounded-full border border-white/10 bg-space-panel px-3 py-1 text-xs">Close</button>
                </div>
              </div>

              <div ref={scroller} className="flex-1 space-y-2 overflow-y-auto bg-[linear-gradient(to_bottom,rgba(0,0,0,.25),rgba(0,0,0,.15))] px-3 py-3">
                {msgs.map(m => (
                  m.from === 'sys' ? (
                    <div key={m.id} className="my-3 text-center text-[11px] text-white/50">{m.text}</div>
                  ) : (
                    <div key={m.id} className={`flex ${m.from==='me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-lg ${m.from==='me' ? 'rounded-br-md bg-gradient-to-br from-blue-700/20 to-amber-400/20 ring-1 ring-amber-400/25 backdrop-blur-md' : 'rounded-bl-md bg-space-panel ring-1 ring-amber-300/12'}`}>
                        <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/50">
                          <span>{m.time}</span>
                          {m.from==='me' ? <CheckCheck className="h-3 w-3"/> : null}
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 bg-black/30 px-3 py-3">
                <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-space-panel"><Paperclip className="h-4 w-4"/></button>
                <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-space-panel"><ImageIcon className="h-4 w-4"/></button>
                <div className="relative flex-1">
                  <input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
                    placeholder="Message" className="h-10 w-full rounded-full border border-white/10 bg-space-panel pl-4 pr-10 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/40" />
                  <Smile className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"/>
                </div>
                <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-700 to-amber-400 text-black hover:opacity-90 shadow-gold"><Send className="h-4 w-4"/></button>
                <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-space-panel"><Mic className="h-4 w-4"/></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 bg-space-panel2/80 py-3 text-center text-[11px] text-white/60">
        © {new Date().getFullYear()} Cardic Nexus • Nex Link — Cosmic Gold
      </footer>
    </div>
  )
}
