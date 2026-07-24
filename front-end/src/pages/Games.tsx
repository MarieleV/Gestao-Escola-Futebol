// src/pages/Games.tsx
import { useState } from 'react';
import { 
  Plus, Calendar as CalendarIcon, MapPin, Clock, 
  Shield, X, CheckCircle2, AlertCircle, CalendarDays, CheckSquare
} from 'lucide-react';
import { GAMES, STUDENTS } from '../lib/mock-data';
import { Game } from '../types';
import { formatDate } from '../utils/formatters';

export function Games() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = GAMES.filter(g => g.status === tab);

  return (
    <div className="max-w-7xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header e Abas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
        <div className="flex items-center bg-zinc-950/50 border border-white/5 rounded-lg p-1">
          <button 
            onClick={() => setTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              tab === 'upcoming' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <CalendarDays size={16} />
            Próximos
          </button>
          <button 
            onClick={() => setTab('completed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
              tab === 'completed' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <CheckSquare size={16} />
            Realizados
          </button>
        </div>

        <button className="flex items-center gap-2 bg-[#29903B] hover:bg-[#237A32] text-zinc-950 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors w-full sm:w-auto justify-center">
          <Plus size={18} />
          <span>Novo Jogo</span>
        </button>
      </div>

      {/* Lista de Jogos */}
      <div className="flex flex-col gap-4">
        {filteredGames.map(game => {
          const won = game.score && game.score.us > game.score.them;
          const drew = game.score && game.score.us === game.score.them;
          const lost = game.score && game.score.us < game.score.them;

          return (
            <div 
              key={game.id} 
              onClick={() => setSelectedGame(game)}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden group flex flex-col md:flex-row"
            >
              {/* Lado Esquerdo: Data e Local */}
              <div className="p-5 md:p-6 md:w-64 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold mb-2">
                  <CalendarIcon size={16} className="text-[#29903B]" />
                  {formatDate(game.date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                  <Clock size={14} className="text-zinc-500" /> {game.time}
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-400">
                  <MapPin size={14} className="text-zinc-500 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2 leading-tight">{game.location}</span>
                </div>
              </div>

              {/* Centro: O Placar / Confronto */}
              <div className="flex-1 p-5 md:p-8 flex items-center justify-center relative">
                <div className="flex items-center justify-center gap-6 md:gap-16 w-full max-w-lg">
                  
                  {/* Nosso Time (LIMPO, SEM CAIXA) */}
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="text-4xl md:text-5xl drop-shadow-md transition-transform group-hover:scale-110 duration-300">
                      ⚽
                    </div>
                    <span className="text-xs font-bold text-zinc-300 tracking-widest uppercase">Nós</span>
                  </div>

                  {/* Placar ou VS */}
                  <div className="flex flex-col items-center justify-center px-4">
                    {game.score ? (
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className={`text-4xl md:text-5xl font-bold ${won ? 'text-[#29903B]' : drew ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {game.score.us}
                        </span>
                        <span className="text-zinc-600 font-bold text-2xl">-</span>
                        <span className={`text-4xl md:text-5xl font-bold ${lost ? 'text-rose-400' : drew ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {game.score.them}
                        </span>
                      </div>
                    ) : (
                      <div className="text-zinc-600 font-bold text-sm italic tracking-widest">
                        VS
                      </div>
                    )}
                  </div>

                  {/* Adversário (LIMPO, SEM CAIXA) */}
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="text-4xl md:text-5xl drop-shadow-md opacity-80 grayscale transition-transform group-hover:scale-110 duration-300">
                      🛡️
                    </div>
                    <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase text-center line-clamp-1">
                      {game.opponent}
                    </span>
                  </div>

                </div>
              </div>

              {/* Lado Direito: Status / Badges */}
              <div className="p-5 md:p-6 md:w-48 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 border-t md:border-t-0 md:border-l border-white/5">
                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-full text-center md:text-right border
                  ${game.home ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-white/5 text-zinc-400 border-white/10'}
                `}>
                  {game.home ? '🏠 Em Casa' : '✈️ Fora'}
                </span>

                {game.score ? (
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-full text-center md:text-right border
                    ${won ? 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20' : drew ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}
                  `}>
                    {won ? 'Vitória' : drew ? 'Empate' : 'Derrota'}
                  </span>
                ) : (
                  <span className={`flex items-center justify-center md:justify-end gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-full border
                    ${game.starters.length > 0 ? 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20' : 'bg-white/5 text-zinc-400 border-white/10'}
                  `}>
                    {game.starters.length > 0 ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                    {game.starters.length > 0 ? 'Escalado' : 'Pendente'}
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {filteredGames.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <Shield size={48} className="text-zinc-700 mb-4 opacity-50" />
            <p className="text-zinc-500 text-sm font-medium">Nenhum jogo {tab === 'upcoming' ? 'agendado' : 'realizado'}.</p>
          </div>
        )}
      </div>

      {/* Modal de Escalação */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}

// --- Componente do Modal ---
function GameModal({ game, onClose }: { game: Game, onClose: () => void }) {
  const [starters, setStarters] = useState<string[]>(game.starters);
  const [reserves, setReserves] = useState<string[]>(game.reserves);
  
  const activeStudents = STUDENTS.filter(s => s.active);

  const togglePlayer = (id: string, role: 'starter' | 'reserve') => {
    if (role === 'starter') {
      if (starters.includes(id)) {
        setStarters(prev => prev.filter(x => x !== id));
      } else {
        setStarters(prev => [...prev, id]);
        setReserves(prev => prev.filter(x => x !== id));
      }
    } else {
      if (reserves.includes(id)) {
        setReserves(prev => prev.filter(x => x !== id));
      } else {
        setReserves(prev => [...prev, id]);
        setStarters(prev => prev.filter(x => x !== id));
      }
    }
  };

  const won = game.score && game.score.us > game.score.them;
  const drew = game.score && game.score.us === game.score.them;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Fixo */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/50 flex-shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-zinc-100">vs {game.opponent}</h2>
              {game.score && (
                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${won ? 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20' : drew ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {game.score.us} - {game.score.them}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <CalendarIcon size={12} /> Data e Hora
              </p>
              <p className="text-sm font-semibold text-zinc-200">{formatDate(game.date)} às {game.time}</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <MapPin size={12} /> Local
              </p>
              <p className="text-sm font-semibold text-zinc-200 line-clamp-1" title={game.location}>{game.location}</p>
            </div>
          </div>

          {/* Gerenciador de Escalação */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Escalação Oficial
            </h3>
            <div className="flex gap-4 text-xs font-bold">
              <span className="text-[#29903B]">{starters.length} Titulares</span>
              <span className="text-amber-400">{reserves.length} Reservas</span>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeStudents.map(student => {
              const isStarter = starters.includes(student.id);
              const isReserve = reserves.includes(student.id);

              return (
                <div 
                  key={student.id} 
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isStarter ? 'bg-[#29903B]/10 border-[#29903B]/20' : 
                    isReserve ? 'bg-amber-500/10 border-amber-500/20' : 
                    'bg-white/[0.02] border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-zinc-400 flex-shrink-0 border border-white/5">
                      {student.number}
                    </div>
                    <div className="truncate">
                      <p className={`text-sm font-semibold truncate ${isStarter ? 'text-[#29903B]' : isReserve ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {student.name.split(' ')[0]} {student.name.split(' ').pop()}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-medium uppercase">{student.position}</p>
                    </div>
                  </div>
                  
                  {/* Botões de Ação da Escalação */}
                  <div className="flex gap-1">
                    <button 
                      onClick={() => togglePlayer(student.id, 'starter')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
                        isStarter ? 'bg-[#29903B] text-zinc-950' : 'bg-white/5 text-zinc-500 hover:bg-[#29903B]/20 hover:text-[#29903B]'
                      }`}
                      title="Marcar como Titular"
                    >
                      TIT
                    </button>
                    <button 
                      onClick={() => togglePlayer(student.id, 'reserve')}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
                        isReserve ? 'bg-amber-500 text-zinc-950' : 'bg-white/5 text-zinc-500 hover:bg-amber-500/20 hover:text-amber-400'
                      }`}
                      title="Marcar como Reserva"
                    >
                      RES
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-zinc-900/50 flex gap-3 flex-shrink-0">
          <button className="flex-1 bg-[#29903B] hover:bg-[#237A32] text-zinc-950 font-bold text-sm py-2.5 rounded-xl transition-colors">
            Salvar Escalação
          </button>
          {game.status === 'upcoming' && (
            <button className="flex-1 bg-zinc-900/50 hover:bg-white/5 text-zinc-300 border border-white/5 hover:border-white/10 font-bold text-sm py-2.5 rounded-xl transition-colors">
              Registrar Resultado Final
            </button>
          )}
        </div>
      </div>
    </div>
  );
}