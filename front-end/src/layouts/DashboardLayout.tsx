// src/layouts/DashboardLayout.tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Target, Calendar, 
  Shield, Menu, X, LogOut, Settings, ClipboardList
} from 'lucide-react';
import { useState } from 'react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Alunos', path: '/alunos' },
  { icon: Target, label: 'Turmas', path: '/turmas' },
  { icon: Shield, label: 'Jogos', path: '/jogos' },
  { icon: ClipboardList, label: 'Chamada', path: '/frequencia' },
  { icon: Calendar, label: 'Calendário', path: '/calendario' },
];

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    /* Fundo principal em #171717 e textos adaptados para neutral-100 */
    <div className="min-h-screen bg-[#171717] text-neutral-100 flex font-sans selection:bg-[#29903B]/30">

      {/* 1. Sidebar (Menu Lateral) - Desktop */}
      {/* Ajustado: bg-neutral-900/40 para dar profundidade sem escurecer demais e borda melhor definida */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/10 bg-neutral-900/40">
        
        {/* Header da Sidebar */}
        <div className="h-20 flex items-center px-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#29903B]/10 border border-[#29903B]/20 flex items-center justify-center">
              <Shield className="text-[#29903B]" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">Escolinha</h1>
              <p className="text-[11px] font-semibold text-[#29903B] uppercase tracking-widest mt-0.5">Admin</p>
            </div>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white/10 text-white font-semibold' 
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5 font-medium'
                  }
                `}
              >
                <Icon 
                  size={20} 
                  className={isActive ? 'text-[#29903B]' : 'text-neutral-500 group-hover:text-neutral-400 transition-colors'} 
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer da Sidebar (Usuário) */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer mb-2">
            {/* Ajustado: bg-neutral-800 e borda combinando com o novo tom */}
            <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-300 border border-white/10">
              TR
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-neutral-200">Treinador JEC</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Admin</p>
            </div>
            <Settings size={16} className="text-neutral-500" />
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#F85149] hover:bg-[#F85149]/10 transition-colors">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* 2. Menu Mobile (Header + Overlay) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-[#171717]/80 backdrop-blur-md z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="text-[#29903B]" size={24} />
          <h1 className="font-bold tracking-tight">Escolinha</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 text-neutral-400"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#171717] z-30 flex flex-col border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all
                    ${isActive ? 'bg-white/10 text-white font-semibold' : 'text-neutral-400 font-medium'}
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-[#29903B]' : 'text-neutral-500'} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* 3. Área de Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 max-w-[100vw] lg:max-w-none overflow-x-hidden relative">
        {/* Glow verde com o novo tom */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#29903B]/5 blur-[120px] pointer-events-none -z-10" />
        
        {/* Header Dinâmico */}
        {/* Ajustado: border-white/10 e texto neutral-100 */}
        <header className="h-20 flex items-center px-6 lg:px-10 border-b border-white/10 hidden lg:flex">
          <h2 className="text-xl font-bold tracking-tight text-neutral-100">
            {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'Dashboard'}
          </h2>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}