import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuthStorage, getStoredUser, isAuthenticated as hasAuthSession } from '../services/auth';

const Navbar = ({ theme, onToggleTheme }) => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasAuthSession());
  const [user, setUser] = useState(() => getStoredUser());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(hasAuthSession());
    setUser(getStoredUser());
  }, [location.pathname]);

  const notifications = [];
  const profileItems = [
    { label: 'Profile', action: 'profile' },
    { label: 'Saved Schemes', action: 'saved' },
    { label: 'Settings', action: 'settings' },
    { label: 'Logout', action: 'logout' },
  ];

  const handleProfileAction = (action) => {
    setOpenProfileMenu(false);

    if (action === 'logout') {
      clearAuthStorage();
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
      return;
    }

    if (action === 'settings' || action === 'saved' || action === 'profile') {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl transition-colors duration-500 dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
          className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-semibold text-white shadow-sm shadow-orange-500/20">
            SM
          </span>
          <span>SchemeMatch</span>
        </button>

        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-gradient-to-r from-orange-500 to-orange-600 px-4 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:from-orange-400 hover:to-orange-500"
              >
                Register
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          {isAuthenticated && (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenNotifications((current) => !current)}
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  aria-label="Open notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 1 1-6 0h6z" />
                  </svg>
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[0.65rem] font-semibold text-white">
                    {notifications.length}
                  </span>
                </button>

                <AnimatePresence>
                  {openNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 z-50 mt-3 w-[320px] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Live alerts for your matched schemes</p>
                        </div>
                        <button
                          type="button"
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                          onClick={() => setOpenNotifications(false)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-700">
                        {notifications.length === 0 ? (
                          <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700/80 dark:bg-slate-950 dark:text-slate-400">
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((item) => (
                            <div key={item.title} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-700/80 dark:bg-slate-950">
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.body}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenProfileMenu((current) => !current)}
                  className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-950"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'SchemeMatch User')}&background=2563eb&color=fff&bold=true`}
                    alt="Avatar"
                    className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700"
                  />
                  <span>{user?.name || 'SchemeMatch User'}</span>
                </button>

                <AnimatePresence>
                  {openProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 z-50 mt-3 w-44 rounded-3xl border border-slate-200 bg-white py-2 shadow-2xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
                    >
                      {profileItems.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleProfileAction(item.action)}
                          className="flex w-full items-center px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
