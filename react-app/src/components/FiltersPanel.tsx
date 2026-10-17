import React from 'react';

interface FiltersPanelProps {
  query: string;
  setQuery: (q: string) => void;
  onlyAvailable: boolean;
  setOnlyAvailable: (val: boolean) => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ query, setQuery, onlyAvailable, setOnlyAvailable }) => {
  return (
    <section aria-labelledby="filters-heading">
      <h2 id="filters-heading">Поиск и фильтры</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <label htmlFor="search">Поиск по названию</label>
          <input 
            type="search" 
            id="search" 
            className="form-input" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например, Гарри Поттер" 
          />
        </div>
        <div className="form-field">
          <input 
            type="checkbox" 
            id="available" 
            checked={onlyAvailable} 
            onChange={(e) => setOnlyAvailable(e.target.checked)} 
          />
          <label htmlFor="available">Только доступные</label>
        </div>
      </form>
    </section>
  );
};