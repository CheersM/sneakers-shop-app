import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.blog}>
        <h3>Блог</h3>
        <div>
          <a href="/">Промо акции и скидки для постоянных клиентов</a>
          <span>Май, 2021</span>
        </div>
        <div>
          <a href="/">Условия сотрудничества и оформления франшизы</a>
          <span>Июнь, 2021</span>
        </div>
        <div>
          <a href="/">Ожидания открытия нового магазина на Бульваре Бульварном</a>
          <span>Август, 2021</span>
        </div>
        <div className={styles.last}>
          <span>Все права защищены &copy; 2020 Domain Name</span>
        </div>
      </div>
      <div className={styles.social}>
        <h3>Наши крутые кроссовки в соц сетях</h3>
        <a href="/">
          <img src="/img/facebook_icon.svg" alt="facebook_icon" />
        </a>
        <a href="/">
          <img src="/img/instagram_icon.svg" alt="instagram_icon" />
        </a>
        <a href="/">
          <img src="/img/whatsapp_icon.svg" alt="whatsapp_icon" />
        </a>
        <a href="/">
          <img src="/img/youtube_icon.svg" alt="youtube_icon" />
        </a>
      </div>
      <div className={styles.contact}>
        <h3>Связаться с нами:</h3>
        <p>
          <a href="/">+38099-258-85-25</a>
        </p>
        <p>
          <a href="/">+38093-456-56-85</a>
        </p>
        <p>
          <a href="/">+38097-245-85-96</a>
        </p>
        <p>
          <a href="mailto: sneakers-shop@gmail.com">e-mail: sneakers-shop@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
