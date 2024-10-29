import { useState } from "react";
import { Star, Film, ThumbsUp, Clock, Clapperboard } from "lucide-react";
import { TextField as Input, Button, Card, CardContent } from "@mui/material";

// This would typically come from an API call
const mockMovies = [
  {
    id: 1,
    title: "Borderlands",
    rating: 3,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    title: "Inside Out 2",
    rating: 4,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    title: "Rebel Ridge",
    rating: 3.5,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    title: "Despicable Me 4",
    rating: 4,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    title: "The Crow",
    rating: 3,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    title: "Beetlejuice Beetlejuice",
    rating: 3.5,
    image: "/placeholder.svg?height=400&width=300",
  },
];

export default function Filmpire() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">FILMPIRE</h1>
        <nav>
          <h2 className="font-semibold mb-2">Categories</h2>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Film className="mr-2 h-4 w-4" /> Popular
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <ThumbsUp className="mr-2 h-4 w-4" /> Top Rated
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" /> Upcoming
              </Button>
            </li>
          </ul>
          <h2 className="font-semibold mt-6 mb-2">Genres</h2>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Clapperboard className="mr-2 h-4 w-4" /> Action
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Clapperboard className="mr-2 h-4 w-4" /> Adventure
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <Clapperboard className="mr-2 h-4 w-4" /> Animation
              </Button>
            </li>
            {/* Add more genres as needed */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <Input
            type="search"
            placeholder="Search for a Movie..."
            className="w-96"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>LOGIN</Button>
        </header>

        {/* Featured movie */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-6">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Featured movie"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">Deadpool & Wolverine</h2>
            <p className="text-sm">
              A listless Wade Wilson toils away in civilian life with his days
              as the morally flexible mercenary, Deadpool, behind him. But when
              his homeworld faces an existential threat, Wade must reluctantly
              suit up again with an even more reluctant Wolverine.
            </p>
          </div>
        </div>

        {/* Movie grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {mockMovies.map((movie) => (
            <Card key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <CardContent>
                <h3 className="font-semibold mb-2">{movie.title}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < movie.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
