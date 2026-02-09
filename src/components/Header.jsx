import React, { useEffect, useState } from 'react';
import { IconMoon, IconSun } from './icons';
import { initState } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const initialStateDarkMode = localStorage.getItem('theme') === 'bg-gray-700';

const Header = () => {

  const [darkMode, setDarkMode] = useState(initialStateDarkMode);

  const dispatch = useDispatch()
  const onDisconnect = () => {
    dispatch(initState())
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('bg-gray-700');
      localStorage.setItem('theme', 'bg-gray-700');
    } else {
      document.documentElement.classList.remove('bg-white');
      localStorage.setItem('theme', 'bg-white');
    }
  }, [darkMode]);

  return (
    <header className="container mx-auto px-6 pt-11 md:max-w-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-md" aria-label="Toggle menu" onClick={() => document.body.classList.toggle('drawer-open')}>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
          <h1 className="text-2xl font-bold uppercase tracking-[0.5em] text-white"> Task </h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>
          <button type="button" onClick={onDisconnect} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Deconnection</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
