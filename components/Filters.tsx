import { Search, Filter, Layers } from 'lucide-react';

interface Props {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGen: number | 'all';
  setSelectedGen: (gen: number | 'all') => void;
  statusFilter: 'all' | 'owned' | 'missing';
  setStatusFilter: (status: 'all' | 'owned' | 'missing') => void;
}

export function Filters({
  searchQuery,
  setSearchQuery,
  selectedGen,
  setSelectedGen,
  statusFilter,
  setStatusFilter,
}: Props) {
  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full mt-8 mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col lg:flex-row gap-4">
      
      {/* Search Bar */}
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          className="w-full bg-zinc-800 border focus:border-green-500 text-zinc-100 placeholder-zinc-500 border-zinc-700/50 rounded-lg pl-10 p-2.5 transition-colors focus:ring-1 focus:ring-green-500 outline-none"
          placeholder="Buscar Pokemon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        {/* Generation Filter */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
            <Layers className="w-5 h-5" />
          </div>
          <select
            className="w-full bg-zinc-800 border border-zinc-700/50 text-zinc-100 rounded-lg pl-10 p-2.5 appearance-none cursor-pointer focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            value={selectedGen}
            onChange={(e) => setSelectedGen(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="all">Todas as Gerações</option>
            {generations.map((gen) => (
              <option key={gen} value={gen}>
                Geração {gen}
              </option>
            ))}
          </select>
        </div>

        {/* Ownership Filter */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
            <Filter className="w-5 h-5" />
          </div>
          <select
            className="w-full bg-zinc-800 border border-zinc-700/50 text-zinc-100 rounded-lg pl-10 p-2.5 appearance-none cursor-pointer focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'owned' | 'missing')}
          >
            <option value="all">Mostrar Todos</option>
            <option value="owned">Apenas Capturados</option>
            <option value="missing">Apenas Faltantes</option>
          </select>
        </div>
      </div>
    </div>
  );
}
