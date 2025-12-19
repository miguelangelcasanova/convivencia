import React, { useState } from 'react';
import { Bell, CircleHelp } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExpedienteWizard from './components/ExpedienteWizard';
import { ExpedienteData } from './types';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentExpediente, setCurrentExpediente] = useState<ExpedienteData>({
    id: '',
    student: { name: '', course: '', tutor: '', parents: '' },
    dateStarted: new Date().toLocaleDateString('es-ES'),
    facts: '',
    factsProven: '',
    instructor: '',
    secretary: '',
    sanction: '',
    currentPhase: 1,
    status: 'Abierto',
    procedureType: 'Ordinario',
    isAuthorityContext: false
  });

  const handleNewExpediente = () => {
    setCurrentExpediente({
        id: `EXP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        student: { name: '', course: '', tutor: '', parents: '' },
        dateStarted: new Date().toLocaleDateString('es-ES'),
        facts: '',
        factsProven: '',
        instructor: '',
        secretary: '',
        sanction: '',
        currentPhase: 1,
        status: 'Abierto',
        procedureType: 'Ordinario',
        isAuthorityContext: false
    });
    setCurrentView('wizard');
  };

  const handleLoadExpediente = (name: string) => {
    // Simulating loading existing data
    setCurrentExpediente({
        id: 'EXP-2024-001',
        student: { name: name, course: '3º ESO A', tutor: 'M. Carmen', parents: 'José García y María Pérez' },
        dateStarted: '15/05/2025',
        facts: 'Interrupción reiterada de las clases y falta de respeto al profesor de Matemáticas.',
        factsProven: '',
        instructor: 'Pedro Almodóvar',
        secretary: 'Penélope Cruz',
        sanction: '',
        currentPhase: 2,
        status: 'Abierto',
        procedureType: 'Ordinario',
        isAuthorityContext: true
    });
    setCurrentView('wizard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        onNewExpediente={handleNewExpediente}
      />

      <div className="ml-64 w-full p-8 transition-all duration-300">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#A50034]">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {currentView === 'dashboard' ? 'Tablero Principal - Gestión de Convivencia' : `Expediente: ${currentExpediente.id}`}
            </h2>
            <p className="text-sm text-gray-500 mt-1 capitalize">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-500 transition-colors">
              <Bell size={20} />
            </button>
            <a 
              href="#" 
              title="Preguntas Frecuentes"
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 text-gray-500 transition-colors flex items-center justify-center"
            >
              <CircleHelp size={20} />
            </a>
          </div>
        </header>

        {/* Content */}
        <main>
          {currentView === 'dashboard' && (
            <Dashboard 
              onNewExpediente={handleNewExpediente} 
              onLoadExpediente={handleLoadExpediente}
            />
          )}
          
          {currentView === 'wizard' && (
            <ExpedienteWizard 
              expediente={currentExpediente} 
              setExpediente={setCurrentExpediente}
              onClose={() => setCurrentView('dashboard')}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;