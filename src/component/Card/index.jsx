import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

import styles from './Card.module.scss';
import AppContext from '../../context';

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const itemObj = { id, parentId: id, imageUrl, title, price };

  const onClickPlus = () => {
    onPlus(itemObj);
  };

  const onClickFavorite = () => {
    onFavorite(itemObj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={260}
          viewBox="0 0 155 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="0" ry="0" width="155" height="155" />
          <rect x="0" y="164" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="229" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="223" rx="11" ry="11" width="35" height="35" />
        </ContentLoader>
      ) : (
        <Fragment>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
                alt="Unliked"
                onClick={onClickFavorite}
              />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="Sneaker1" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-colum">
              <span>Цена:</span>
              <b>{price} грн</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Card;
