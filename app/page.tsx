"use client";

import { useEffect, useState, useMemo } from "react";
import { pokemonApi } from "@/lib/api";
import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "@/components/PokemonCard";
import { StatsHeader } from "@/components/StatsHeader";
import { Filters } from "@/components/Filters";
import { Loader2, AlertCircle, Search } from "lucide-react";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'owned' | 'missing'>('all');

  // Loading state for individual toggles
  const [togglingPkmn, setTogglingPkmn] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonApi.getAll();
      setPokemons(data);
    } catch (err) {
      setError("Não foi possível carregar os Pokemon. O servidor backend está rodando?");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOwnership = async (pokemon: Pokemon) => {
    try {
      // Optimistic update
      setPokemons(prev => prev.map(p => 
        p.pokedex === pokemon.pokedex ? { ...p, tenho: !p.tenho } : p
      ));
      
      setTogglingPkmn(prev => new Set(prev).add(pokemon.pokedex));
      
      await pokemonApi.updateOwnership(pokemon.pokedex, !pokemon.tenho);
    } catch (err) {
      // Revert optimistic update on error
      setPokemons(prev => prev.map(p => 
        p.pokedex === pokemon.pokedex ? { ...p, tenho: pokemon.tenho } : p
      ));
      alert(`Erro ao atualizar o Pokemon ${pokemon.nome}`);
    } finally {
      setTogglingPkmn(prev => {
        const next = new Set(prev);
        next.delete(pokemon.pokedex);
        return next;
      });
    }
  };

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(p => {
      const matchesSearch = p.nome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGen = selectedGen === 'all' || p.geracao === selectedGen;
      const matchesStatus = 
        statusFilter === 'all' || 
        (statusFilter === 'owned' && p.tenho) || 
        (statusFilter === 'missing' && !p.tenho);
        
      return matchesSearch && matchesGen && matchesStatus;
    });
  }, [pokemons, searchQuery, selectedGen, statusFilter]);

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-emerald-900/10 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-green-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center pt-8 pb-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold pb-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-sm tracking-tight inline-block">
            Poke Collection
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto mt-4 text-base md:text-lg">
            Monitore seu progresso e marque os Pokemon capturados.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 z-10 relative">
            <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
            <p className="text-zinc-400">Carregando Pokédex...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center flex flex-col items-center shadow-lg shadow-red-500/5 max-w-2xl mx-auto z-10 relative">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4 drop-shadow-lg" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">Erro de Conexão</h2>
            <p className="text-zinc-400 mb-6 text-lg">{error}</p>
            <button 
              onClick={fetchPokemons}
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Tentar Novamente
            </button>
          </div>
        ) : (
          <div className="z-10 relative animate-in fade-in duration-700">
            <StatsHeader pokemons={pokemons} />
            
            <Filters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedGen={selectedGen}
              setSelectedGen={setSelectedGen}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard 
                  key={pokemon.pokedex} 
                  pokemon={pokemon} 
                  onToggle={handleToggleOwnership}
                  isLoading={togglingPkmn.has(pokemon.pokedex)}
                />
              ))}
            </div>

            {filteredPokemons.length === 0 && (
              <div className="text-center py-24 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl mt-8">
                <Search className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300">Nenhum Pokemon encontrado</h3>
                <p className="text-zinc-500 mt-2">Tente ajustar os filtros atuais.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
