import React, { Children, FC, useState } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <>
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            children={({ isActive }) =>
              isActive ? (
                <>
                  {' '}
                  <BurgerIcon type={'primary'} />
                  <p className='text text_type_main-default ml-2 mr-10'>
                    Конструктор
                  </p>
                </>
              ) : (
                <>
                  <BurgerIcon type={'secondary'} />
                  <p className='text text_type_main-default ml-2 mr-10'>
                    Конструктор
                  </p>
                </>
              )
            }
          />
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            children={({ isActive }) =>
              isActive ? (
                <>
                  {' '}
                  <ListIcon type={'primary'} />
                  <p className='text text_type_main-default ml-2'>
                    Лента заказов
                  </p>
                </>
              ) : (
                <>
                  {' '}
                  <ListIcon type={'secondary'} />
                  <p className='text text_type_main-default ml-2'>
                    Лента заказов
                  </p>
                </>
              )
            }
          />
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
            children={({ isActive }) =>
              isActive ? (
                <>
                  {' '}
                  <ProfileIcon type={'primary'} />
                  <p className='text text_type_main-default ml-2'>
                    {userName || 'Личный кабинет'}
                  </p>
                </>
              ) : (
                <>
                  <ProfileIcon type={'secondary'} />
                  <p className='text text_type_main-default ml-2'>
                    {userName || 'Личный кабинет'}
                  </p>
                </>
              )
            }
          />
        </div>
      </nav>
    </header>
  </>
);
