import React from 'react';
import Logo from './Logo';

interface NavbarProps {
  onSearch: (city: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const predefinedCities = ['Sydney', 'San Francisco', 'Berlin', 'Athens', 'Tokyo', 'New York', 'Brisbane', 'Melbourne'];

  const handleCityClick = (city: string) => {
    onSearch(city);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const city = (event.currentTarget.elements.namedItem('city') as HTMLInputElement).value;
    if (city) onSearch(city);
  };

  return (
    <nav className="bg-gray-200 shadow p-6">
      
      <Logo/>

      <div className="container mx-auto pt-12">
        
        <div className="flex items-end  gap-4">
          
          <div className="flex gap-2 flex-wrap">
            {predefinedCities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityClick(city)}
                className="px-2 py-1 font-mono bg-red-300 text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              name="city"
              type="text"
              placeholder="Search City"
              className="px-2 py-1 w-half max-w-xs rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-red-300 text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
