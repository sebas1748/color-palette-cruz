import { useEffect, useState } from 'react';
import './App.css';
import Palettes from './components/Palette/Palettes';
import Tags from './components/Tag/Tags';
import Favorites from './components/Favorite/Favorites';
import { getColorPalettes, getTags } from './service';
import { FavoritesContext } from './context/FavoriteContext';

function App() {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [tags, setTags] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getColorPalettes()
      .then((data) => {
        setColorPalettes(data);
        setFavorites((data) => data.filter((palette) => palette.liked));
      })
      .catch((err) => console.log(err));

    getTags()
      .then((data) => setTags(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <FavoritesContext.Provider value={{favorites, setFavorites}}>
      <div className='App'>
        <header>
          <h1>Color Palette Project</h1>
        </header>
        <div className='main-container'>
          <Tags tags={tags} />
          <Palettes palettes={colorPalettes} />
          <Favorites favorites={favorites} />
        </div>
      </div>
    </FavoritesContext.Provider>
  );
}

export default App;
