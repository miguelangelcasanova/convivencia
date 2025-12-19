import React from 'react';
import { LayoutDashboard, PlusCircle, Book, FolderOpen, User, Gavel } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onChangeView: (view: string) => void;
  onNewExpediente: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, onNewExpediente }) => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white transition-transform duration-300 transform z-30 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 overflow-hidden">
             <img 
               src="https://www.cifpriotormes.es/wp-content/uploads/2020/09/Logo-CIFP-Rio-Tormes-300x300.png" 
               alt="Logo CIFP Río Tormes" 
               className="w-full h-full object-contain"
               onError={(e) => {
                 const parent = e.currentTarget.parentElement;
                 if (parent) {
                   e.currentTarget.style.display = 'none';
                   parent.innerText = 'CRT';
                   parent.classList.add('text-slate-900', 'font-bold', 'text-xl');
                 }
               }}
             />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight">CIFP Río Tormes</h1>
            <p className="text-[10px] text-slate-400">Gestión de Convivencia</p>
          </div>
        </div>
        
        <nav className="mt-6 px-4 space-y-2">
          <button 
            onClick={() => onChangeView('dashboard')} 
            className={`w-full text-left flex items-center py-2.5 px-4 rounded transition duration-200 ${currentView === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            <LayoutDashboard size={18} className="mr-3" />
            Tablero Principal
          </button>
          <button 
            onClick={onNewExpediente} 
            className="w-full text-left flex items-center py-2.5 px-4 rounded transition duration-200 text-slate-300 hover:bg-slate-800"
          >
            <PlusCircle size={18} className="mr-3" />
            Nuevo Expediente
          </button>
          
          <div className="pt-4 pb-2 text-xs font-bold text-slate-500 uppercase px-4 border-t border-slate-700 mt-4">Normativa</div>
          
          <a 
            href="https://www.educa.jcyl.es/es/normativa/decreto-51-2007-17-mayo-regulan-derechos-deberes-alumnos-pa" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center py-2 px-4 rounded hover:bg-slate-800 text-sm text-slate-300 transition-colors group"
          >
            <Book size={16} className="mr-3 text-slate-400 group-hover:text-white" />
            Decreto 51/2007
          </a>

          <a 
            href="https://bocyl.jcyl.es/boletines/2014/06/13/pdf/BOCYL-D-13062014-2.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center py-2 px-4 rounded hover:bg-slate-800 text-sm text-slate-300 transition-colors group"
          >
            <Gavel size={16} className="mr-3 text-slate-400 group-hover:text-white" />
            Modificación 23/2014
          </a>

           <div className="pt-4 pb-2 text-xs font-bold text-slate-500 uppercase px-4 border-t border-slate-700 mt-2">Gestión</div>
          <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-slate-800 text-sm text-slate-300 transition-colors">
            <FolderOpen size={16} className="mr-3" />
            Archivo Histórico
          </a>
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-700 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <User size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold">Dirección</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
              Sesión Activa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;