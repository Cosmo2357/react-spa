import { useEffect, useState } from "react";
import axios from "axios";
import { useMainStore, useUserDataStore } from "../store/main";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export default function Home() {
  const { user } = useUserDataStore();
  const { count, increase, decrease } = useMainStore();
  const [characters, setCharacters] = useState<Character[]>([]);

  // 🎯 Fetch characters from The Rick and Morty API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character",
        );
        setCharacters(response.data.results.slice(0, 24)); // Get only the first 24 characters
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Rick and Morty Characters
      </h1>

      <div className="w-full max-w-screen-xl overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {characters.map((character) => (
            <Card
              key={character.id}
              className="w-full border border-gray-300 shadow-md rounded-lg bg-white hover:scale-105 transition-transform"
            >
              <CardHeader className="p-2 flex justify-center">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full object-cover rounded-md "
                />
              </CardHeader>
              <CardContent className="p-2 text-center">
                <CardTitle className="text-sm font-bold">
                  {character.name}
                </CardTitle>
                <p className="text-xs text-gray-600">
                  {character.species} - {character.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fixed bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg w-72 border border-gray-300 opacity-90">
        <h1 className="text-lg font-bold mb-6 text-red-600">
          Global State!!!!
        </h1>
        <h1 className="text-lg font-semibold">Name: {user?.name}</h1>
        <h2 className="text-sm text-gray-600">Mail: {user?.email}</h2>
        <h2 className="text-sm text-gray-600">ID: {user?.id}</h2>
        <h2 className="text-sm text-gray-600">
          Status:{" "}
          {user?.isAuthenticated ? "Authenticated" : "Not Authenticated"}
        </h2>

        <div className="my-4 flex items-center gap-2 ">
          <Button variant="secondary" onClick={decrease}>-</Button>
          <span className="font-bold text-lg">{count}</span>
          <Button variant="secondary" onClick={increase}>+</Button>
        </div>
        <Button
          onClick={() => useUserDataStore.setState({ user: null })}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
