import { useState, useMemo } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
type Position = 'Goleiro' | 'Zagueiro' | 'Lateral D' | 'Lateral E' | 'Volante' | 'Meia' | 'Meia-atac.' | 'Atacante'
type Category = 'Sub-9' | 'Sub-11' | 'Sub-13' | 'Sub-15' | 'Sub-17' | 'Sub-20'
type Page = 'dashboard' | 'alunos' | 'turmas' | 'jogos' | 'presenca' | 'calendario'

interface Student {
  id: string; name: string; age: number; position: Position; category: Category
  guardian: string; phone: string; medical: string; active: boolean; joinDate: string; number: number
}
interface ClassGroup {
  id: string; name: string; category: Category; coach: string; schedule: string; students: string[]
}
interface Game {
  id: string; opponent: string; date: string; time: string; location: string; home: boolean
  starters: string[]; reserves: string[]; score?: { us: number; them: number }; status: 'upcoming' | 'completed' | 'cancelled'
}
interface CalEvent {
  id: string; title: string; date: string; type: 'game' | 'training' | 'championship' | 'other'; description?: string
}

// ── Seed data ─────────────────────────────────────────────────────────────
const STUDENTS: Student[] = [
  { id: 's1', name: 'Gabriel Silva', age: 12, position: 'Goleiro', category: 'Sub-13', guardian: 'Carlos Silva', phone: '(47) 99876-5432', medical: 'Sem restrições', active: true, joinDate: '2024-02-10', number: 1 },
  { id: 's2', name: 'Lucas Oliveira', age: 13, position: 'Zagueiro', category: 'Sub-13', guardian: 'Maria Oliveira', phone: '(47) 98765-4321', medical: 'Alergia a dipirona', active: true, joinDate: '2024-01-15', number: 4 },
  { id: 's3', name: 'Pedro Santos', age: 12, position: 'Lateral D', category: 'Sub-13', guardian: 'João Santos', phone: '(47) 97654-3210', medical: 'Sem restrições', active: true, joinDate: '2024-03-01', number: 2 },
  { id: 's4', name: 'Matheus Costa', age: 11, position: 'Volante', category: 'Sub-11', guardian: 'Ana Costa', phone: '(47) 96543-2109', medical: 'Asma leve', active: true, joinDate: '2024-01-20', number: 8 },
  { id: 's5', name: 'Rafael Pereira', age: 13, position: 'Meia', category: 'Sub-13', guardian: 'Roberto Pereira', phone: '(47) 95432-1098', medical: 'Sem restrições', active: true, joinDate: '2023-11-05', number: 10 },
  { id: 's6', name: 'Felipe Almeida', age: 14, position: 'Atacante', category: 'Sub-15', guardian: 'Lucia Almeida', phone: '(47) 94321-0987', medical: 'Sem restrições', active: true, joinDate: '2024-02-28', number: 9 },
  { id: 's7', name: 'Gustavo Ferreira', age: 15, position: 'Meia-atac.', category: 'Sub-15', guardian: 'Paulo Ferreira', phone: '(47) 93210-9876', medical: 'Sem restrições', active: true, joinDate: '2023-10-12', number: 11 },
  { id: 's8', name: 'Henrique Lima', age: 9, position: 'Atacante', category: 'Sub-9', guardian: 'Sandra Lima', phone: '(47) 92109-8765', medical: 'Sem restrições', active: true, joinDate: '2024-04-01', number: 7 },
  { id: 's9', name: 'Diego Rocha', age: 16, position: 'Zagueiro', category: 'Sub-17', guardian: 'Marcos Rocha', phone: '(47) 91098-7654', medical: 'Cirurgia no joelho (2023)', active: true, joinDate: '2022-06-15', number: 3 },
  { id: 's10', name: 'Thiago Mendes', age: 17, position: 'Goleiro', category: 'Sub-17', guardian: 'Teresa Mendes', phone: '(47) 90987-6543', medical: 'Sem restrições', active: true, joinDate: '2021-08-20', number: 12 },
  { id: 's11', name: 'Bruno Cardoso', age: 11, position: 'Lateral E', category: 'Sub-11', guardian: 'Fernanda Cardoso', phone: '(47) 99876-1234', medical: 'Sem restrições', active: true, joinDate: '2024-02-05', number: 6 },
  { id: 's12', name: 'Vitor Nascimento', age: 10, position: 'Meia', category: 'Sub-11', guardian: 'Eduardo Nascimento', phone: '(47) 98765-2345', medical: 'Sem restrições', active: false, joinDate: '2023-09-10', number: 5 },
  { id: 's13', name: 'André Moraes', age: 13, position: 'Lateral E', category: 'Sub-13', guardian: 'Patrícia Moraes', phone: '(47) 97651-1111', medical: 'Sem restrições', active: true, joinDate: '2024-03-15', number: 6 },
  { id: 's14', name: 'Carlos Eduardo', age: 15, position: 'Goleiro', category: 'Sub-15', guardian: 'Sonia Eduardo', phone: '(47) 96540-2222', medical: 'Sem restrições', active: true, joinDate: '2023-08-10', number: 1 },
]

const CLASSES: ClassGroup[] = [
  { id: 'c1', name: 'Turma Sub-9', category: 'Sub-9', coach: 'Marcos Andrade', schedule: 'Ter/Qui — 14h às 15h30', students: ['s8'] },
  { id: 'c2', name: 'Turma Sub-11', category: 'Sub-11', coach: 'André Souza', schedule: 'Seg/Qua/Sex — 15h às 16h30', students: ['s4', 's11', 's12'] },
  { id: 'c3', name: 'Turma Sub-13', category: 'Sub-13', coach: 'Carlos Mendonça', schedule: 'Seg/Qua/Sex — 16h30 às 18h', students: ['s1', 's2', 's3', 's5', 's13'] },
  { id: 'c4', name: 'Turma Sub-15', category: 'Sub-15', coach: 'Roberto Dias', schedule: 'Ter/Qui/Sáb — 16h às 17h30', students: ['s6', 's7', 's14'] },
  { id: 'c5', name: 'Turma Sub-17', category: 'Sub-17', coach: 'Paulo Henrique', schedule: 'Seg/Qua/Sex — 17h30 às 19h', students: ['s9', 's10'] },
]

const GAMES: Game[] = [
  { id: 'g1', opponent: 'EC Joinville', date: '2025-07-26', time: '10:00', location: 'Estádio Municipal — Joinville', home: true, starters: ['s1', 's2', 's3', 's13', 's5', 's4', 's11', 's6', 's7', 's8', 's14'], reserves: ['s12', 's9'], status: 'upcoming' },
  { id: 'g2', opponent: 'São Bento FC', date: '2025-07-19', time: '09:00', location: 'Campo do São Bento', home: false, starters: ['s1', 's2', 's3', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's4'], reserves: ['s12', 's13'], score: { us: 3, them: 1 }, status: 'completed' },
  { id: 'g3', opponent: 'Athletico Jr.', date: '2025-08-02', time: '14:00', location: 'Estádio Municipal — Joinville', home: true, starters: [], reserves: [], status: 'upcoming' },
  { id: 'g4', opponent: 'Chapecoense Base', date: '2025-07-12', time: '10:00', location: 'Estádio Índio Condá — Chapecó', home: false, starters: ['s9', 's10', 's6', 's7', 's1', 's2', 's3', 's4', 's5', 's11', 's8'], reserves: ['s12'], score: { us: 2, them: 2 }, status: 'completed' },
]

const EVENTS: CalEvent[] = [
  { id: 'e1', title: 'Jogo vs EC Joinville', date: '2025-07-26', type: 'game', description: 'Campeonato Regional Sub-13 — mando de campo' },
  { id: 'e2', title: 'Treino Sub-15', date: '2025-07-22', type: 'training' },
  { id: 'e3', title: 'Treino Sub-13', date: '2025-07-21', type: 'training' },
  { id: 'e4', title: 'Jogo vs Athletico Jr.', date: '2025-08-02', type: 'game' },
  { id: 'e5', title: 'Camp. Estadual — Início', date: '2025-08-15', type: 'championship', description: 'Início do Campeonato Estadual de Base' },
  { id: 'e6', title: 'Treino Sub-17', date: '2025-07-23', type: 'training' },
  { id: 'e7', title: 'Reunião de Responsáveis', date: '2025-07-28', type: 'other', description: 'Reunião com responsáveis — quadra coberta 19h' },
  { id: 'e8', title: 'Treino Sub-9 / Sub-11', date: '2025-07-24', type: 'training' },
  { id: 'e9', title: 'Treino Geral', date: '2025-07-25', type: 'training' },
]

// ── Helpers ────────────────────────────────────────────────────────────────
const positionColor: Record<Position, string> = {
  'Goleiro': '#f59e0b', 'Zagueiro': '#3b82f6', 'Lateral D': '#8b5cf6',
  'Lateral E': '#8b5cf6', 'Volante': '#06b6d4', 'Meia': '#22c55e',
  'Meia-atac.': '#10b981', 'Atacante': '#ef4444',
}
const positionBadge: Record<Position, string> = {
  'Goleiro': 'badge-amber', 'Zagueiro': 'badge-blue', 'Lateral D': 'badge-purple',
  'Lateral E': 'badge-purple', 'Volante': 'badge-blue', 'Meia': 'badge-green',
  'Meia-atac.': 'badge-green', 'Atacante': 'badge-red',
}
const catColor: Record<Category, string> = {
  'Sub-9': '#e879f9', 'Sub-11': '#60a5fa', 'Sub-13': '#22c55e',
  'Sub-15': '#f59e0b', 'Sub-17': '#f97316', 'Sub-20': '#ef4444',
}
const eventTypeStyle: Record<CalEvent['type'], { bg: string; text: string; label: string }> = {
  game: { bg: 'rgba(34,197,94,0.2)', text: '#22c55e', label: 'Jogo' },
  training: { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa', label: 'Treino' },
  championship: { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', label: 'Camp.' },
  other: { bg: 'rgba(100,116,139,0.15)', text: '#94a3b8', label: 'Outro' },
}

function formatDate(d: string) {
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}
function avatarInitials(name: string) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

// ── Icons ──────────────────────────────────────────────────────────────────
const IconDashboard = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)
const IconUsers = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconClipboard = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
)
const IconShield = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconCheckSquare = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
)
const IconCalendar = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IconSearch = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const IconFilter = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)
const IconX = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconPlus = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const IconChevronLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IconBell = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconTrophy = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="8 22 12 18 16 22" /><line x1="12" y1="18" x2="12" y2="11" />
    <path d="M17 4H7a5 5 0 0 0 5 10 5 5 0 0 0 5-10h0" />
    <path d="M17 4h2a3 3 0 0 1 0 6h-1M7 4H5a3 3 0 0 0 0 6h1" />
  </svg>
)
const IconMapPin = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const IconClock = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconEdit = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)
const IconFileText = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)
const IconActivity = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)
const IconLogOut = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const nav: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Painel', icon: <IconDashboard /> },
    { id: 'alunos', label: 'Alunos', icon: <IconUsers /> },
    { id: 'turmas', label: 'Turmas', icon: <IconClipboard /> },
    { id: 'jogos', label: 'Jogos', icon: <IconShield /> },
    { id: 'presenca', label: 'Frequência', icon: <IconCheckSquare /> },
    { id: 'calendario', label: 'Calendário', icon: <IconCalendar /> },
  ]
  return (
    <aside style={{ width: 220, minHeight: '100vh', background: '#080d1a', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            ⚽
          </div>
          <div>
            <div className="font-display" style={{ fontSize: 16, fontWeight: 800, color: '#e2e8f0', letterSpacing: '0.02em', lineHeight: 1.1 }}>ESCOLA</div>
            <div className="font-display" style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', letterSpacing: '0.08em' }}>DE FUTEBOL</div>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: '#3d5380' }}>Joinville · SC</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#2a3d64', textTransform: 'uppercase', padding: '4px 4px 8px' }}>Gestão</div>
        {nav.map(item => (
          <div key={item.id} className={`sidebar-nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#080d1a' }}>
            AD
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Administrador</div>
            <div style={{ fontSize: 11, color: '#22c55e' }}>Admin</div>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3d5380', padding: 0 }}>
            <IconLogOut />
          </button>
        </div>
      </div>
    </aside>
  )
}

// ── Top bar ────────────────────────────────────────────────────────────────
const pageTitle: Record<Page, string> = {
  dashboard: 'Painel Geral', alunos: 'Gestão de Alunos', turmas: 'Turmas',
  jogos: 'Jogos & Escalações', presenca: 'Controle de Frequência', calendario: 'Calendário',
}
function TopBar({ page }: { page: Page }) {
  const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
  return (
    <header style={{ height: 60, borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
      <div>
        <h1 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', margin: 0, letterSpacing: '0.02em' }}>{pageTitle[page]}</h1>
        <p style={{ fontSize: 11, color: '#3d5380', margin: 0, textTransform: 'capitalize' }}>{today}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="btn-secondary" style={{ padding: '6px 10px', position: 'relative' }}>
          <IconBell />
          <span style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1px solid #080d1a' }} />
        </button>
      </div>
    </header>
  )
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  const activeStudents = STUDENTS.filter(s => s.active).length
  const upcomingGames = GAMES.filter(g => g.status === 'upcoming').length
  const alerts = [
    { text: 'Jogo vs EC Joinville em 3 dias — escalação pendente', type: 'amber' },
    { text: 'Lucas Oliveira: alergia a dipirona registrada — atenção em competições', type: 'red' },
    { text: 'Reunião de responsáveis marcada para 28/07 às 19h', type: 'blue' },
  ]
  const recentGames = GAMES.filter(g => g.status === 'completed').slice(0, 2)
  const nextGames = GAMES.filter(g => g.status === 'upcoming').slice(0, 2)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Alunos Ativos', value: activeStudents, sub: `${STUDENTS.length - activeStudents} inativos`, color: '#22c55e', icon: '👥' },
          { label: 'Turmas', value: CLASSES.length, sub: 'em funcionamento', color: '#60a5fa', icon: '🎯' },
          { label: 'Jogos Agendados', value: upcomingGames, sub: 'próximos 30 dias', color: '#f59e0b', icon: '⚽' },
          { label: 'Taxa de Presença', value: '87%', sub: 'últimas 4 semanas', color: '#e879f9', icon: '📋' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px', fontWeight: 500 }}>{s.label}</p>
                <p className="font-display" style={{ fontSize: 38, fontWeight: 800, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: '#3d5380', margin: '6px 0 0' }}>{s.sub}</p>
              </div>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Alerts */}
        <div className="card" style={{ padding: 20 }}>
          <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: '0 0 14px', letterSpacing: '0.03em' }}>⚠️ ALERTAS & LEMBRETES</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 8,
                background: a.type === 'amber' ? 'rgba(245,158,11,0.08)' : a.type === 'red' ? 'rgba(239,68,68,0.08)' : 'rgba(59,130,246,0.08)',
                borderLeft: `3px solid ${a.type === 'amber' ? '#f59e0b' : a.type === 'red' ? '#ef4444' : '#60a5fa'}`,
              }}>
                <p style={{ fontSize: 13, color: '#e2e8f0', margin: 0, lineHeight: 1.4 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming games */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: 0, letterSpacing: '0.03em' }}>🗓️ PRÓXIMOS JOGOS</h2>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => setPage('jogos')}>Ver todos</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nextGames.map(g => (
              <div key={g.id} style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: '0 0 4px' }}>
                      {g.home ? '🏠' : '✈️'} vs {g.opponent}
                    </p>
                    <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><IconClock /> {formatDate(g.date)} às {g.time}</span>
                    </div>
                  </div>
                  <span className="badge badge-amber">{g.starters.length > 0 ? 'Escalado' : 'Pendente'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent results */}
        <div className="card" style={{ padding: 20 }}>
          <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: '0 0 14px', letterSpacing: '0.03em' }}>🏆 ÚLTIMOS RESULTADOS</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentGames.map(g => {
              const won = g.score && g.score.us > g.score.them
              const drew = g.score && g.score.us === g.score.them
              return (
                <div key={g.id} style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: '0 0 3px' }}>vs {g.opponent}</p>
                    <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{formatDate(g.date)} — {g.home ? 'Casa' : 'Fora'}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-display" style={{ fontSize: 22, fontWeight: 900, color: won ? '#22c55e' : drew ? '#f59e0b' : '#ef4444', margin: 0 }}>
                      {g.score?.us} — {g.score?.them}
                    </p>
                    <span className={`badge ${won ? 'badge-green' : drew ? 'badge-amber' : 'badge-red'}`}>{won ? 'Vitória' : drew ? 'Empate' : 'Derrota'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Classes overview */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: 0, letterSpacing: '0.03em' }}>🎯 TURMAS</h2>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => setPage('turmas')}>Gerenciar</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CLASSES.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor[c.category] }} />
                  <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{c.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{c.students.length} alunos</span>
                  <span className="badge badge-slate" style={{ fontSize: 10 }}>{c.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Students page ──────────────────────────────────────────────────────────
function StudentsPage() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState<Category | 'Todas'>('Todas')
  const [posFilter, setPosFilter] = useState<Position | 'Todas'>('Todas')
  const [selected, setSelected] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const categories: (Category | 'Todas')[] = ['Todas', 'Sub-9', 'Sub-11', 'Sub-13', 'Sub-15', 'Sub-17', 'Sub-20']
  const positions: (Position | 'Todas')[] = ['Todas', 'Goleiro', 'Zagueiro', 'Lateral D', 'Lateral E', 'Volante', 'Meia', 'Meia-atac.', 'Atacante']

  const filtered = useMemo(() => STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'Todas' || s.category === catFilter
    const matchPos = posFilter === 'Todas' || s.position === posFilter
    return matchSearch && matchCat && matchPos
  }), [search, catFilter, posFilter])

  return (
    <div style={{ maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}><IconSearch /></span>
          <input className="input-field" style={{ paddingLeft: 36 }} placeholder="Buscar por nome..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
          <IconFilter />
          <select className="input-field" style={{ width: 'auto' }} value={catFilter} onChange={e => setCatFilter(e.target.value as Category | 'Todas')}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input-field" style={{ width: 'auto' }} value={posFilter} onChange={e => setPosFilter(e.target.value as Position | 'Todas')}>
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['table', 'cards'] as const).map(m => (
            <button key={m} className={`tab ${viewMode === m ? 'active-tab' : ''}`} onClick={() => setViewMode(m)}>
              {m === 'table' ? '☰ Lista' : '⊞ Cards'}
            </button>
          ))}
        </div>
        <button className="btn-primary"><IconPlus /> Novo Aluno</button>
      </div>

      <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{filtered.length} aluno{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>

      {viewMode === 'table' ? (
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px 90px 90px 80px 70px', padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            {['#', 'Nome', 'Idade', 'Categoria', 'Posição', 'Status', 'Ações'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#3d5380', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>
          {filtered.map(s => (
            <div key={s.id} className="table-row" style={{ gridTemplateColumns: '40px 1fr 80px 90px 90px 80px 70px' }} onClick={() => setSelected(s)}>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 800, color: '#3d5380' }}>{s.number}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${positionColor[s.position]}33, ${positionColor[s.position]}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: positionColor[s.position], flexShrink: 0 }}>
                  {avatarInitials(s.name)}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>Resp.: {s.guardian}</p>
                </div>
              </div>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>{s.age} anos</span>
              <span className="badge" style={{ background: `${catColor[s.category]}22`, color: catColor[s.category], fontSize: 10 }}>{s.category}</span>
              <span className={`badge ${positionBadge[s.position]}`} style={{ fontSize: 10 }}>{s.position}</span>
              <span className={`badge ${s.active ? 'badge-green' : 'badge-red'}`}>{s.active ? 'Ativo' : 'Inativo'}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={e => { e.stopPropagation(); setSelected(s) }}><IconEdit /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#3d5380' }}>Nenhum aluno encontrado.</div>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {filtered.map(s => (
            <div key={s.id} className="card" style={{ padding: 16, cursor: 'pointer', transition: 'border-color 0.15s ease' }} onClick={() => setSelected(s)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${positionColor[s.position]}33, ${positionColor[s.position]}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: positionColor[s.position] }}>
                  {avatarInitials(s.name)}
                </div>
                <span className="font-display" style={{ fontSize: 28, fontWeight: 900, color: 'rgba(255,255,255,0.08)' }}>#{s.number}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: '0 0 4px' }}>{s.name}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 10px' }}>{s.age} anos</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span className={`badge ${positionBadge[s.position]}`} style={{ fontSize: 10 }}>{s.position}</span>
                <span className="badge" style={{ background: `${catColor[s.category]}22`, color: catColor[s.category], fontSize: 10 }}>{s.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student modal */}
      {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function StudentModal({ student: s, onClose }: { student: Student; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#e2e8f0' }}>Perfil do Aluno</h2>
          <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={onClose}><IconX /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${positionColor[s.position]}33, ${positionColor[s.position]}77)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: positionColor[s.position] }}>
              {avatarInitials(s.name)}
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0', margin: '0 0 4px' }}>{s.name}</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className={`badge ${positionBadge[s.position]}`}>{s.position}</span>
                <span className="badge" style={{ background: `${catColor[s.category]}22`, color: catColor[s.category] }}>{s.category}</span>
                <span className={`badge ${s.active ? 'badge-green' : 'badge-red'}`}>{s.active ? 'Ativo' : 'Inativo'}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { label: 'Número', value: `#${s.number}` },
              { label: 'Idade', value: `${s.age} anos` },
              { label: 'Responsável', value: s.guardian },
              { label: 'Telefone', value: s.phone },
              { label: 'Membro desde', value: formatDate(s.joinDate) },
            ].map(f => (
              <div key={f.label}>
                <p style={{ fontSize: 11, color: '#3d5380', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</p>
                <p style={{ fontSize: 14, color: '#e2e8f0', margin: 0 }}>{f.value}</p>
              </div>
            ))}
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ fontSize: 11, color: '#3d5380', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Informações Médicas</p>
              <div style={{ background: s.medical !== 'Sem restrições' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.06)', border: `1px solid ${s.medical !== 'Sem restrições' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.15)'}`, borderRadius: 8, padding: '8px 12px' }}>
                <p style={{ fontSize: 13, color: s.medical !== 'Sem restrições' ? '#ef4444' : '#22c55e', margin: 0 }}>{s.medical}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="btn-primary" style={{ flex: 1 }}><IconEdit /> Editar</button>
            <button className="btn-secondary" style={{ flex: 1 }}><IconFileText /> Exportar PDF</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Classes page ───────────────────────────────────────────────────────────
function ClassesPage() {
  const [selected, setSelected] = useState<ClassGroup | null>(null)
  return (
    <div style={{ maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary"><IconPlus /> Nova Turma</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {CLASSES.map(c => {
          const students = STUDENTS.filter(s => c.students.includes(s.id))
          return (
            <div key={c.id} className="card" style={{ padding: 20, cursor: 'pointer', transition: 'border-color 0.15s ease' }} onClick={() => setSelected(c)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${catColor[c.category]}44`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${catColor[c.category]}22`, border: `1px solid ${catColor[c.category]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 18 }}>🎯</span>
                </div>
                <span className="badge" style={{ background: `${catColor[c.category]}22`, color: catColor[c.category] }}>{c.category}</span>
              </div>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 800, color: '#e2e8f0', margin: '0 0 4px', letterSpacing: '0.02em' }}>{c.name}</h3>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>🧑‍🏫 {c.coach}</p>
              <p style={{ fontSize: 12, color: '#3d5380', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <IconClock /> {c.schedule}
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>{students.length} aluno{students.length !== 1 ? 's' : ''}</span>
                <div style={{ display: 'flex', gap: -4 }}>
                  {students.slice(0, 4).map((s, i) => (
                    <div key={s.id} style={{ width: 24, height: 24, borderRadius: '50%', background: `${positionColor[s.position]}44`, border: '2px solid #0f1c36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: positionColor[s.position], marginLeft: i > 0 ? -6 : 0 }}>
                      {s.name[0]}
                    </div>
                  ))}
                  {students.length > 4 && <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '2px solid #0f1c36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#64748b', marginLeft: -6 }}>+{students.length - 4}</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {selected && <ClassModal group={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function ClassModal({ group, onClose }: { group: ClassGroup; onClose: () => void }) {
  const students = STUDENTS.filter(s => group.students.includes(s.id))
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 500 }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#e2e8f0' }}>{group.name}</h2>
            <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>{group.coach}</p>
          </div>
          <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={onClose}><IconX /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <p className="font-display" style={{ fontSize: 28, fontWeight: 800, color: catColor[group.category], margin: 0 }}>{students.length}</p>
              <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>Alunos</p>
            </div>
            <div style={{ flex: 2, padding: '12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 11, color: '#3d5380', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Horário</p>
              <p style={{ fontSize: 13, color: '#e2e8f0', margin: 0 }}>{group.schedule}</p>
            </div>
          </div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: '#64748b', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Alunos na Turma</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {students.map(s => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${positionColor[s.position]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: positionColor[s.position] }}>
                    {avatarInitials(s.name)}
                  </div>
                  <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{s.name}</span>
                </div>
                <span className={`badge ${positionBadge[s.position]}`} style={{ fontSize: 10 }}>{s.position}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Games page ─────────────────────────────────────────────────────────────
function GamesPage() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [selected, setSelected] = useState<Game | null>(null)
  const games = GAMES.filter(g => g.status === tab)

  return (
    <div style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['upcoming', 'completed'] as const).map(t => (
            <button key={t} className={`tab ${tab === t ? 'active-tab' : ''}`} onClick={() => setTab(t)}>
              {t === 'upcoming' ? '🗓️ Próximos' : '🏁 Realizados'}
            </button>
          ))}
        </div>
        <button className="btn-primary"><IconPlus /> Novo Jogo</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {games.map(g => {
          const won = g.score && g.score.us > g.score.them
          const drew = g.score && g.score.us === g.score.them
          return (
            <div key={g.id} className="card" style={{ padding: 20, cursor: 'pointer', transition: 'border-color 0.15s ease' }} onClick={() => setSelected(g)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  {/* vs layout */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 4 }}>⚽</div>
                    <p style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, margin: 0 }}>NOSSA</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {g.score ? (
                      <p className="font-display" style={{ fontSize: 32, fontWeight: 900, color: won ? '#22c55e' : drew ? '#f59e0b' : '#ef4444', margin: 0, lineHeight: 1 }}>
                        {g.score.us} — {g.score.them}
                      </p>
                    ) : (
                      <p className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#3d5380', margin: 0 }}>vs</p>
                    )}
                    <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 0', fontWeight: 600 }}>{g.opponent}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 4 }}>🆚</div>
                    <p style={{ fontSize: 10, color: '#ef4444', fontWeight: 600, margin: 0 }}>ADVERSÁRIO</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginBottom: 8 }}>
                    <span className={`badge ${g.home ? 'badge-green' : 'badge-slate'}`}>{g.home ? 'Casa' : 'Fora'}</span>
                    {g.score && <span className={`badge ${won ? 'badge-green' : drew ? 'badge-amber' : 'badge-red'}`}>{won ? 'Vitória' : drew ? 'Empate' : 'Derrota'}</span>}
                    {!g.score && <span className="badge badge-amber">Escalação {g.starters.length > 0 ? 'pronta' : 'pendente'}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><IconCalendar /> {formatDate(g.date)} às {g.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><IconMapPin /> {g.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {games.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#3d5380' }}>Nenhum jogo nesta categoria.</div>}
      </div>

      {selected && <GameModal game={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function GameModal({ game, onClose }: { game: Game; onClose: () => void }) {
  const [starters, setStarters] = useState<string[]>(game.starters)
  const [reserves, setReserves] = useState<string[]>(game.reserves)
  const allStudents = STUDENTS.filter(s => s.active)

  function togglePlayer(id: string, role: 'starter' | 'reserve') {
    if (role === 'starter') {
      if (starters.includes(id)) setStarters(prev => prev.filter(x => x !== id))
      else { setStarters(prev => [...prev, id]); setReserves(prev => prev.filter(x => x !== id)) }
    } else {
      if (reserves.includes(id)) setReserves(prev => prev.filter(x => x !== id))
      else { setReserves(prev => [...prev, id]); setStarters(prev => prev.filter(x => x !== id)) }
    }
  }

  const won = game.score && game.score.us > game.score.them
  const drew = game.score && game.score.us === game.score.them

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="font-display" style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#e2e8f0' }}>vs {game.opponent}</h2>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <span className={`badge ${game.home ? 'badge-green' : 'badge-slate'}`}>{game.home ? 'Casa' : 'Fora'}</span>
              {game.score && <span className={`badge ${won ? 'badge-green' : drew ? 'badge-amber' : 'badge-red'}`}>{game.score.us} — {game.score.them}</span>}
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={onClose}><IconX /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 11, color: '#3d5380', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Data</p>
              <p style={{ fontSize: 13, color: '#e2e8f0', margin: 0 }}>{formatDate(game.date)} às {game.time}</p>
            </div>
            <div style={{ flex: 2, padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 11, color: '#3d5380', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Local</p>
              <p style={{ fontSize: 13, color: '#e2e8f0', margin: 0 }}>{game.location}</p>
            </div>
          </div>

          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#64748b', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Escalação — {starters.length} titulares · {reserves.length} reservas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
            {allStudents.map(s => {
              const isStarter = starters.includes(s.id)
              const isReserve = reserves.includes(s.id)
              return (
                <div key={s.id} className={`player-chip ${isStarter ? 'selected-starter' : isReserve ? 'selected-reserve' : ''}`}
                  onClick={() => !isStarter && !isReserve ? togglePlayer(s.id, 'starter') : isStarter ? togglePlayer(s.id, 'starter') : togglePlayer(s.id, 'reserve')}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${positionColor[s.position]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: positionColor[s.position] }}>
                    {s.number}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name.split(' ')[0]}</p>
                    <p style={{ fontSize: 10, color: 'inherit', opacity: 0.7, margin: 0 }}>{s.position}</p>
                  </div>
                  {isStarter && <span style={{ fontSize: 10, fontWeight: 700 }}>TIT</span>}
                  {isReserve && <span style={{ fontSize: 10, fontWeight: 700 }}>RES</span>}
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: '#3d5380', margin: '8px 0 16px' }}>Clique para selecionar como titular. Clique novamente para mover para reserva.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-primary" style={{ flex: 1 }}>Salvar Escalação</button>
            {game.status === 'upcoming' && <button className="btn-secondary">Registrar Resultado</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Attendance page ────────────────────────────────────────────────────────
function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[0].id)
  const [date] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState<Record<string, boolean | null>>({})

  const cls = CLASSES.find(c => c.id === selectedClass)!
  const students = STUDENTS.filter(s => cls.students.includes(s.id))

  function mark(id: string, val: boolean) {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === val ? null : val }))
  }

  const present = Object.values(attendance).filter(v => v === true).length
  const absent = Object.values(attendance).filter(v => v === false).length

  return (
    <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <select className="input-field" style={{ width: 'auto', flex: 1 }} value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setAttendance({}) }}>
          {CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input className="input-field" type="date" style={{ width: 'auto' }} defaultValue={date} />
        <button className="btn-primary">Salvar</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { label: 'Total', value: students.length, color: '#94a3b8' },
          { label: 'Presentes', value: present, color: '#22c55e' },
          { label: 'Ausentes', value: absent, color: '#ef4444' },
          { label: 'Não marcados', value: students.length - present - absent, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ flex: 1, padding: 14, textAlign: 'center' }}>
            <p className="font-display" style={{ fontSize: 30, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Attendance list */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>{cls.name}</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => {
              const all: Record<string, boolean> = {}
              students.forEach(s => { all[s.id] = true })
              setAttendance(all)
            }}>✓ Todos presentes</button>
          </div>
        </div>
        {students.map(s => {
          const val = attendance[s.id]
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${positionColor[s.position]}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: positionColor[s.position] }}>
                  {avatarInitials(s.name)}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{s.name}</p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                    <span className={`badge ${positionBadge[s.position]}`} style={{ fontSize: 10 }}>{s.position}</span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>#{s.number}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {val === null || val === undefined ? (
                  <span style={{ fontSize: 12, color: '#3d5380' }}>Não marcado</span>
                ) : val ? (
                  <span className="badge badge-green">Presente</span>
                ) : (
                  <span className="badge badge-red">Ausente</span>
                )}
                <button className={`attendance-btn ${val === true ? 'present' : ''}`} onClick={() => mark(s.id, true)} title="Presente">✓</button>
                <button className={`attendance-btn ${val === false ? 'absent' : ''}`} onClick={() => mark(s.id, false)} title="Ausente">✗</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Calendar page ──────────────────────────────────────────────────────────
function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)) // July 2025
  const today = new Date()
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; month: 'prev' | 'curr' | 'next'; dateStr: string }[] = []
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    const m = month - 1 < 0 ? 11 : month - 1
    const y = month - 1 < 0 ? year - 1 : year
    cells.push({ day: d, month: 'prev', dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: 'curr', dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` })
  }
  let nextDay = 1
  while (cells.length % 7 !== 0) {
    const m = month + 1 > 11 ? 0 : month + 1
    const y = month + 1 > 11 ? year + 1 : year
    cells.push({ day: nextDay, month: 'next', dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}` })
    nextDay++
  }

  function eventsOnDay(dateStr: string) { return EVENTS.filter(e => e.date === dateStr) }
  function isToday(dateStr: string) {
    const t = today
    return dateStr === `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  }

  const upcomingEvents = EVENTS.filter(e => e.date >= '2025-07-21').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5)

  return (
    <div style={{ maxWidth: 1100, display: 'flex', gap: 20 }}>
      {/* Calendar grid */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button className="btn-secondary" style={{ padding: '6px 10px' }} onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><IconChevronLeft /></button>
          <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, color: '#e2e8f0', margin: 0, textTransform: 'capitalize', letterSpacing: '0.03em' }}>{monthName}</h2>
          <button className="btn-secondary" style={{ padding: '6px 10px' }} onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><IconChevronRight /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#3d5380', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {cells.map((cell, i) => {
            const events = eventsOnDay(cell.dateStr)
            const isTod = isToday(cell.dateStr)
            return (
              <div key={i} className={`cal-day ${isTod ? 'today' : ''} ${cell.month !== 'curr' ? 'other-month' : ''}`}>
                <span style={{ fontSize: 12, fontWeight: isTod ? 700 : 400, color: isTod ? '#22c55e' : '#94a3b8', display: 'block', marginBottom: 2 }}>{cell.day}</span>
                {events.slice(0, 2).map(ev => (
                  <div key={ev.id} className="cal-event-pill" style={{ background: eventTypeStyle[ev.type].bg, color: eventTypeStyle[ev.type].text, cursor: 'pointer' }} onClick={() => setSelectedEvent(ev)}>
                    {ev.title}
                  </div>
                ))}
                {events.length > 2 && <div style={{ fontSize: 10, color: '#64748b', paddingLeft: 4 }}>+{events.length - 2}</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sidebar: upcoming events + legend */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', margin: '0 0 12px', letterSpacing: '0.03em' }}>Próximos Eventos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcomingEvents.map(ev => (
              <div key={ev.id} style={{ padding: '8px 10px', borderRadius: 7, background: eventTypeStyle[ev.type].bg, borderLeft: `3px solid ${eventTypeStyle[ev.type].text}`, cursor: 'pointer' }} onClick={() => setSelectedEvent(ev)}>
                <p style={{ fontSize: 12, fontWeight: 600, color: eventTypeStyle[ev.type].text, margin: '0 0 2px' }}>{ev.title}</p>
                <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{formatDate(ev.date)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', margin: '0 0 12px', letterSpacing: '0.03em' }}>Legenda</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(Object.entries(eventTypeStyle) as [CalEvent['type'], typeof eventTypeStyle[CalEvent['type']]][]).map(([type, style]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: style.bg, border: `1px solid ${style.text}55` }} />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{style.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}><IconPlus /> Novo Evento</button>
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge" style={{ background: eventTypeStyle[selectedEvent.type].bg, color: eventTypeStyle[selectedEvent.type].text }}>{eventTypeStyle[selectedEvent.type].label}</span>
              <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={() => setSelectedEvent(null)}><IconX /></button>
            </div>
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0', margin: '0 0 8px' }}>{selectedEvent.title}</h2>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 4 }}><IconCalendar /> {formatDate(selectedEvent.date)}</p>
              {selectedEvent.description && (
                <p style={{ fontSize: 14, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{selectedEvent.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#080d1a' }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <TopBar page={page} />
        <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {page === 'dashboard' && <Dashboard setPage={setPage} />}
          {page === 'alunos' && <StudentsPage />}
          {page === 'turmas' && <ClassesPage />}
          {page === 'jogos' && <GamesPage />}
          {page === 'presenca' && <AttendancePage />}
          {page === 'calendario' && <CalendarPage />}
        </main>
      </div>
    </div>
  )
}
