import React from 'react';

import Card from '../component/Card';
import AppContext from '../context';

function Favorites({ onAddToFavorite }) {
  const { favorites, onAddToCart } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
          <Card
            key={item.id}
            favorited={true}
            onPlus={onAddToCart}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
