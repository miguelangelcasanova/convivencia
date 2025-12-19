import React from 'react';
import { AlertTriangle, Plus } from 'lucide-react';

interface DashboardProps {
  onNewExpediente: () => void;
  onLoadExpediente: (name: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNewExpediente, onLoadExpediente }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expedientes Abiertos</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">4</h3>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">Curso 24/25</span>
        </div>
        <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plazos Críticos</p>
            <h3 className="text-3xl font-bold text-red-600 mt-2">1</h3>
          </div>
          <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full flex items-center font-medium border border-red-100">
            <AlertTriangle size={12} className="mr-1" /> Urgente
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4">Exp. 2024-003 vence instrucción mañana.</p>
      </div>

      <div 
        className="bg-white p-6 rounded-xl shadow-sm border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition group" 
        onClick={onNewExpediente}
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 group-hover:bg-white group-hover:shadow rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 transition-all">
            <Plus size={24} />
          </div>
          <h3 className="font-bold text-gray-600 group-hover:text-gray-800">Iniciar Procedimiento</h3>
          <p className="text-xs text-gray-400">Sancionador o Mediación</p>
        </div>
      </div>

      {/* Active List */}
      <div className="col-span-1 md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-700">Expedientes en Curso</h3>
          <span className="text-xs text-gray-400">Última actualización: Hace 5 min</span>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3">Alumno</th>
              <th className="px-6 py-3">Fase Actual</th>
              <th className="px-6 py-3">Plazo (Días Lectivos)</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">A. García Pérez (3º ESO A)</td>
              <td className="px-6 py-4">Instrucción (Modelos 6-10)</td>
              <td className="px-6 py-4 text-orange-600 font-bold">2 días restantes</td>
              <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded border border-yellow-200">En Proceso</span></td>
              <td className="px-6 py-4">
                <button onClick={() => onLoadExpediente('A. García Pérez')} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                  Gestionar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;