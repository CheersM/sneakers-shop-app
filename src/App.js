import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Drawer from './component/Drawer';
import Header from './component/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartResp, favoritesResp, itemsResp] = await Promise.all([
          axios.get('https://612a676522bb490017893936.mockapi.io/cart'),
          axios.get('https://612a676522bb490017893936.mockapi.io/favorites'),
          axios.get('https://612a676522bb490017893936.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResp.data);
        setFavorites(favoritesResp.data);
        setItems(itemsResp.data);
      } catch (error) {
        alert('Ошибка запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        await axios.delete(`https://612a676522bb490017893936.mockapi.io/cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://612a676522bb490017893936.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Не удалось добавить товар в корзину');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://612a676522bb490017893936.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          'https://612a676522bb490017893936.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    if (
      window.confirm(
        'Вы действительно хотите удалось из корзины эти крутые кроссовки да и еще по такой лайтовой цене?',
      )
    ) {
      axios.delete(`https://612a676522bb490017893936.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        setCartOpen,
        setCartItems,
        onAddToCart,
        onAddToFavorite,
      }}>
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpen(false)}
          onRemove={onRemoveItem}
          opened={cartOpen}
        />
        <Header onClickCart={() => setCartOpen(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <div className="footer">
          <p>footer</p>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
