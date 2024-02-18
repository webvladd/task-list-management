import { Link, useLocation } from 'react-router-dom';

import cn from 'classnames';
import s from './Header.module.scss';

const links = [
  { id: '1', link: '/', label: 'Список задач' },
  { id: '2', link: '/create-task', label: 'Создать задачу' }
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={s.header}>
      <nav className={s.header_nav}>
        {links.map(({ id, link, label }) => (
          <Link
            className={cn(s.header_nav_item, pathname === link && s.active)}
            key={id}
            to={link}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
