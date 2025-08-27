import { useState } from "react";

export default function SearchHeader({ onSearch, filters }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher..."
        className="border rounded-lg px-3 py-2 w-1/3"
      />
      {filters && <div>{filters}</div>}
    </div>
  );
}
