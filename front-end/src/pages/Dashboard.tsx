// src/pages/Dashboard.tsx
import { Link } from 'react-router-dom';
import { 
  Users, Target, Shield, ClipboardList, AlertCircle, 
  Calendar, Clock, ArrowRight, Home, Plane, Trophy, LayoutGrid
} from 'lucide-react';
import { STUDENTS, CLASSES, GAMES } from '../lib/mock-data';
import { formatDate } from '../utils/formatters';

export function Dashboard() {
  const activeStudents = STUDENTS.filter((s) => s.active).length;
  const upcomingGames = GAMES.filter((g) => g.status === 'upcoming');
  const recentGames = GAMES.filter((g) => g.status === 'completed').slice(0, 2);

  const alerts = [
    { text: 'Jogo vs EC Joinville em 3 dias — escalação pendente', type: 'warning' },
    { text: 'Lucas Oliveira: alergia a dipirona registrada', type: 'danger' },
    { text: 'Reunião de responsáveis marcada para 28/07 às 19h', type: 'info' },
  ];

  return (
    <div className="max-w-7xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* 1. KPIs (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Alunos Ativos" value={activeStudents} subText={`${STUDENTS.length - activeStudents} inativos`} icon={Users} />
        <StatCard title="Turmas" value={CLASSES.length} subText="Em funcionamento" icon={Target} />
        <StatCard title="Jogos Agendados" value={upcomingGames.length} subText="Próximos 30 dias" icon={Shield} />
        <StatCard title="Taxa de Presença" value="87%" subText="Últimas 4 semanas" icon={ClipboardList} />
      </div>

      {/* 2. Grid de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Alertas */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="text-zinc-400" size={18} />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Avisos e Lembretes</h2>
          </div>
          <div className="flex flex-col gap-3">
            {alerts.map((alert, i) => (
              <div 
                key={i} 
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors
                  ${alert.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20 text-amber-200/90' : 
                    alert.type === 'danger' ? 'bg-rose-500/5 border-rose-500/20 text-rose-200/90' : 
                    'bg-sky-500/5 border-sky-500/20 text-sky-200/90'}
                `}
              >
                {alert.text}
              </div>
            ))}
          </div>
        </section>

        {/* Próximos Jogos */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="text-zinc-400" size={18} />
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Próximos Jogos</h2>
            </div>
            <Link to="/jogos" className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingGames.slice(0, 2).map(game => (
              <div key={game.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {game.home ? <Home size={14} className="text-zinc-500" /> : <Plane size={14} className="text-zinc-500" />}
                    <p className="text-sm font-semibold text-zinc-200">vs {game.opponent}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(game.date)} às {game.time}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                  ${game.starters.length > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-zinc-400 border-white/10'}
                `}>
                  {game.starters.length > 0 ? 'Escalado' : 'Pendente'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Últimos Resultados */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="text-zinc-400" size={18} />
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Últimos Resultados</h2>
          </div>
          <div className="flex flex-col gap-3">
            {recentGames.map(game => {
              const won = game.score && game.score.us > game.score.them;
              const drew = game.score && game.score.us === game.score.them;
              
              return (
                <div key={game.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 mb-1">vs {game.opponent}</p>
                    <p className="text-xs text-zinc-400">{formatDate(game.date)} — {game.home ? 'Casa' : 'Fora'}</p>
                  </div>
                  <div className="text-right flex items-center gap-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                      ${won ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : drew ? 'bg-white/5 text-zinc-400 border-white/10' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}
                    `}>
                      {won ? 'Vitória' : drew ? 'Empate' : 'Derrota'}
                    </span>
                    <p className="text-xl font-bold text-zinc-200 w-12 text-center">
                      {game.score?.us} - {game.score?.them}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Visão Geral das Turmas */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <LayoutGrid className="text-zinc-400" size={18} />
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Turmas Ativas</h2>
            </div>
            <Link to="/turmas" className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
              Gerenciar <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col">
            {CLASSES.slice(0,4).map(c => (
              <div key={c.id} className="flex items-center justify-between py-3.5 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                  <span className="text-sm font-medium text-zinc-200">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-400">{c.students.length} alunos</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 text-[10px] font-semibold uppercase tracking-wider">
                    {c.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Componente auxiliar numéricos
function StatCard({ title, value, subText, icon: Icon }: { title: string, value: string | number, subText: string, icon: any }) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex items-start justify-between hover:bg-white/[0.04] transition-colors group">
      <div>
        <p className="text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-semibold text-zinc-100 mb-1">{value}</p>
        <p className="text-xs text-zinc-500">{subText}</p>
      </div>
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 group-hover:text-zinc-200 transition-colors">
        <Icon size={20} />
      </div>
    </div>
  );
}