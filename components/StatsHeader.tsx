import { Pokemon } from '../types/pokemon';
import { Target } from 'lucide-react';

interface Props {
  pokemons: Pokemon[];
}

export function StatsHeader({ pokemons }: Props) {
  const total = pokemons.length;
  const caught = pokemons.filter(p => p.tenho).length;
  const percentage = total === 0 ? 0 : Math.round((caught / total) * 100);

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="flex items-center gap-4 z-10">
        <div className="p-4 bg-zinc-800 rounded-full text-green-400">
          <Target className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Progresso da Coleção</h2>
          <p className="text-zinc-400 font-medium">Capture todos para completar o álbum</p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-md z-10">
        <div className="flex justify-between mb-2 text-sm font-bold text-zinc-300">
          <span>{caught} Capturados</span>
          <span className="text-green-400">{percentage}% Completo</span>
        </div>
        <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-right mt-1 text-xs text-zinc-500">
          Total de {total} Pokemon
        </div>
      </div>
    </div>
  );
}
