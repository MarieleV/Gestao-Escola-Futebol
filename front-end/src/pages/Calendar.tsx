// src/pages/Calendar.tsx
import { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, MapPin, Clock, X, 
  Calendar as CalendarIcon, Target, Shield, Info
} from 'lucide-react';
import { EVENTS } from '../lib/mock-data';
import { CalEvent } from '../types';
import { formatDate } from '../utils/formatters';

// --- Helpers Visuais (Cores super limpas e sem bordas nas pílulas) ---
const getEventStyles = (type: CalEvent['type']) => {
  const map = {
    game: { 
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      pill: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400',
      icon: Shield,
      label: 'Jogo' 
    },
    training: { 
      bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      pill: 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-400',
      icon: Target,
      label: 'Treino' 
    },
    championship: { 
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      pill: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400',
      icon: Target,
      label: 'Campeonato' 
    },
    other: { 
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      pill: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400',
      icon: Info,
      label: 'Outro' 
    },
  };
  return map[type];
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // Julho 2025 (fake "hoje")
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  // Lógica do Calendário (Dias do mês)
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { day: number; month: 'prev' | 'curr' | 'next'; dateStr: string }[] = [];
  
  // Dias do mês anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const m = month - 1 < 0 ? 11 : month - 1;
    const y = month - 1 < 0 ? year - 1 : year;
    cells.push({ day: d, month: 'prev', dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }
  // Dias do mês atual
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: 'curr', dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }
  // Dias do próximo mês
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const m = month + 1 > 11 ? 0 : month + 1;
    const y = month + 1 > 11 ? year + 1 : year;
    cells.push({ day: nextDay, month: 'next', dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}` });
    nextDay++;
  }

  // Helpers de Filtragem
  const eventsOnDay = (dateStr: string) => EVENTS.filter(e => e.date === dateStr);
  
  const isFakeToday = (dateStr: string) => {
    return dateStr === '2025-07-20'; 
  };

  const upcomingEvents = EVENTS
    .filter(e => e.date >= '2025-07-20')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <div className="max-w-7xl flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      
      {/* 1. Grade do Calendário (Esquerda) */}
      <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-2xl p-5 md:p-6">
        
        {/* Controles de Navegação */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-zinc-400 hidden sm:flex">
              <CalendarIcon size={20} />
            </div>
            <h2 className="text-xl font-semibold text-zinc-100 capitalize">{monthName}</h2>
          </div>
          
          <div className="flex items-center gap-1 bg-zinc-950/50 border border-white/5 rounded-lg p-1">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(2025, 6, 1))}
              className="px-3 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors uppercase tracking-wider"
            >
              Hoje
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Cabeçalho dos Dias da Semana */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-widest py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Grade de Dias */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((cell, i) => {
            const dayEvents = eventsOnDay(cell.dateStr);
            const isTod = isFakeToday(cell.dateStr);
            const isCurrentMonth = cell.month === 'curr';

            return (
              <div 
                key={i} 
                className={`min-h-[100px] p-2 rounded-xl transition-all flex flex-col
                  ${isTod ? 'bg-emerald-500/5 border border-emerald-500/20' : 
                    isCurrentMonth ? 'bg-zinc-900/30 border border-white/5 hover:border-white/10' : 
                    'opacity-30 pointer-events-none'}
                `}
              >
                <div className="flex justify-end mb-2">
                  <span className={`text-xs font-semibold flex items-center justify-center w-6 h-6 rounded-full
                    ${isTod ? 'bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/20' : 'text-zinc-400'}
                  `}>
                    {cell.day}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 mt-auto">
                  {dayEvents.slice(0, 2).map(ev => {
                    const style = getEventStyles(ev.type);
                    return (
                      <div 
                        key={ev.id} 
                        onClick={() => setSelectedEvent(ev)}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-md cursor-pointer truncate transition-colors ${style.pill}`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    )
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-[9px] font-semibold text-zinc-500 pl-1 mt-1 uppercase tracking-wider">
                      +{dayEvents.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Sidebar Direita (Próximos Eventos & Legenda) */}
      <div className="lg:w-80 flex-shrink-0 flex flex-col gap-6">
        
        <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm py-3 px-4 rounded-xl transition-colors w-full shadow-lg shadow-emerald-500/10">
          <Plus size={18} />
          <span>Agendar Evento</span>
        </button>

        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            Próximos Dias
          </h3>
          <div className="flex flex-col gap-2">
            {upcomingEvents.map(ev => {
              const style = getEventStyles(ev.type);
              const EventIcon = style.icon;
              
              return (
                <div 
                  key={ev.id} 
                  onClick={() => setSelectedEvent(ev)}
                  // AQUI: Fundo transparente, borda sutil, hover mais interativo
                  className="flex items-start gap-3 p-3 rounded-xl bg-transparent border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer group"
                >
                  <div className={`mt-0.5 w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${style.bg}`}>
                    <EventIcon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">{ev.title}</p>
                    <p className="text-[10px] text-zinc-500 font-medium mt-1">{formatDate(ev.date)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            Legenda
          </h3>
          <div className="flex flex-col gap-3">
            {(['game', 'training', 'championship', 'other'] as const).map(type => {
              const style = getEventStyles(type);
              return (
                <div key={type} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-sm border ${style.bg}`} />
                  <span className="text-sm text-zinc-400 font-medium">{style.label}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* 3. Modal de Detalhes do Evento */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

// --- Componente do Modal ---
function EventModal({ event, onClose }: { event: CalEvent, onClose: () => void }) {
  const style = getEventStyles(event.type);
  const EventIcon = style.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/50 rounded-t-2xl">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${style.bg}`}>
            <EventIcon size={12} /> {style.label}
          </span>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-zinc-100 mb-5">{event.title}</h2>
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-3 text-zinc-300">
              <Clock size={16} className="text-zinc-500" />
              <span className="text-sm font-medium">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-start gap-3 text-zinc-300">
              <MapPin size={16} className="mt-0.5 text-zinc-500 flex-shrink-0" />
              <span className="text-sm font-medium leading-tight">Local definido pelo treinador ou associação</span>
            </div>
          </div>

          {event.description && (
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Descrição / Notas</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{event.description}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/5">
            <button className="w-full bg-zinc-900/50 hover:bg-white/5 text-zinc-200 border border-white/5 hover:border-white/10 font-semibold text-sm py-2.5 rounded-xl transition-colors">
              Editar Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}