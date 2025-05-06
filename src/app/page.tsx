"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

interface IData {
  name: string;
  id: string;
  status: string;
  imageUrl: string;
}

const HookPage = () => {
  const [characters, setCharacters] = useState<IData[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("https://api.disneyapi.dev/character");
      const data = await res.json();
      setCharacters(data.data);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">Disneyland Characters</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {characters.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-48 relative mb-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500">ID: {item.id}</p>
            <p className={`text-sm mt-1 ${item.status === "Alive" ? "text-green-600" : "text-red-500"}`}>
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HookPage;