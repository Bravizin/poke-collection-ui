import { Pokemon } from '../types/pokemon';

const API_BASE_URL = 'https://poke-collection-production.up.railway.app/api/pokemons';

export const pokemonApi = {
  // Fetch all pokemons
  getAll: async (): Promise<Pokemon[]> => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch from API');
      return await response.json();
    } catch (error) {
      console.error('API Error (getAll):', error);
      throw error;
    }
  },

  // Update ownership status
  updateOwnership: async (pokedex: number, tenho: boolean): Promise<Pokemon> => {
    try {
      const requestUrl = `${API_BASE_URL}/${pokedex}/posse?tenho=${tenho}`;
      
      const response = await fetch(requestUrl, {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error(`Failed to update pokemon ${pokedex}`);
      return await response.json();
    } catch (error) {
      console.error('API Error (updateOwnership):', error);
      throw error;
    }
  }
};
