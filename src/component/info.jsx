import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpen } = React.useContext(AppContext);

  return (
    <div className="cartEmpty align-center justify-center flex-colum flex">
      <img className="mb-20" width={120} src={image} alt="empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpen(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
