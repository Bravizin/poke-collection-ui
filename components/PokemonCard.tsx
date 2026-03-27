import Image from 'next/image';
import { CheckCircle2, Circle } from 'lucide-react';
import { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
  onToggle: (pokemon: Pokemon) => void;
  isLoading: boolean;
}

export function PokemonCard({ pokemon, onToggle, isLoading }: Props) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex}.png`;

  return (
    <div
      onClick={() => !isLoading && onToggle(pokemon)}
      className={`
        relative overflow-hidden cursor-pointer
        rounded-2xl border backdrop-blur-md p-4
        transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
        group flex flex-col items-center gap-3
        ${
          pokemon.tenho
            ? 'bg-gradient-to-br from-green-500/20 to-emerald-900/40 border-green-500/50 shadow-green-900/20'
            : 'bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800/60 grayscale-[0.8] opacity-80'
        }
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <div className="absolute top-3 right-3 text-zinc-400">
        {pokemon.tenho ? (
          <CheckCircle2 className="w-6 h-6 text-green-500 drop-shadow-md" />
        ) : (
          <Circle className="w-6 h-6 group-hover:text-zinc-300 transition-colors" />
        )}
      </div>

      <div className="absolute top-3 left-3 text-xs font-bold text-zinc-500">
        #{String(pokemon.pokedex).padStart(3, '0')}
      </div>

      <div className="relative w-32 h-32 mt-4 drop-shadow-2xl">
        <Image
          src={imageUrl}
          alt={pokemon.nome}
          fill
          className={`object-contain transition-transform duration-300 group-hover:scale-110 ${!pokemon.tenho ? 'brightness-75' : ''}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="text-center mt-2 w-full">
        <h3 className={`text-lg font-bold capitalize truncate ${pokemon.tenho ? 'text-zinc-100' : 'text-zinc-400'}`}>
          {pokemon.nome}
        </h3>
        <p className="text-xs text-zinc-500 font-medium">
          Geração {pokemon.geracao}
        </p>
      </div>
    </div>
  );
}
