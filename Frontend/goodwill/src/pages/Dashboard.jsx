import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { policyAPI } from '../services/api';
import Chatbot from '../components/Chatbot';
import { getStoredUser } from '../services/auth';

const initialProfile = {
  age: '',
  income: '',
  occupation: '',
  location: '',
};

const availableStates = ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu', 'Kerala', 'Delhi'];
const occupations = ['Student', 'Farmer', 'Small Business Owner', 'Unemployed', 'Salaried Employee', 'Retired'];

const allSchemes = [
  {
    name: 'PM Awas Yojana',
    description: 'Affordable housing support for eligible families in urban and rural areas.',
    criteria: (profile) => profile.income && Number(profile.income) <= 60000,
  },
  {
    name: 'Skill India Partnership',
    description: 'Subsidized training programs and certification for youth employment.',
    criteria: (profile) => profile.age && Number(profile.age) <= 35,
  },
  {
    name: 'Startup India Support',
    description: 'Mentorship and funding guidance for small business founders.',
    criteria: (profile) => profile.occupation === 'Small Business Owner',
  },
  {
    name: 'Student Scholarship',
    description: 'Financial aid and fee waiver schemes for meritorious students.',
    criteria: (profile) => profile.occupation === 'Student' || Number(profile.age) <= 24,
  },
  {
    name: 'Agriculture Input Assistance',
    description: 'Discounted seeds, fertilizers, and insurance for farmers.',
    criteria: (profile) => profile.occupation === 'Farmer',
  },
  {
    name: 'Senior Citizen Pension',
    description: 'Monthly pension support to retired citizens above 60.',
    criteria: (profile) => profile.age && Number(profile.age) >= 60,
  },
];

const Dashboard = () => {
  const [currentUser] = useState(() => getStoredUser());
  const [profile, setProfile] = useState(initialProfile);
  const [schemes, setSchemes] = useState([]);
  const [apiSchemes, setApiSchemes] = useState([]);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch policies from backend on component mount
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await policyAPI.getAll();
        setApiSchemes(response.data);
      } catch (err) {
        console.error('Failed to fetch policies:', err);
      }
    };
    fetchPolicies();
  }, []);

  const isFormComplete = useMemo(
    () => profile.age && profile.income && profile.occupation && profile.location,
    [profile],
  );

  const filteredRecommendations = (profileData) => {
    return allSchemes.map((scheme) => ({
      ...scheme,
      eligible: scheme.criteria(profileData),
    }));
  };

  const findSchemes = async () => {
    setHasSearched(true);
    setError('');
    setLoading(true);
    setSchemes([]);

    const fallbackSchemes = filteredRecommendations(profile);

    try {
      if (apiSchemes.length) {
        const backendSchemes = apiSchemes.map((scheme) => ({
          name: scheme.title,
          description: scheme.description,
          eligible:
            Number(profile.income) <= Number(scheme.annual_income_limit || Number.MAX_SAFE_INTEGER),
        }));
        setSchemes(backendSchemes);
      } else {
        setSchemes(fallbackSchemes);
      }
    } catch {
      setError('Unable to fetch backend recommendations. Displaying local suggestions.');
      setSchemes(fallbackSchemes);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (schemeName) => {
    setSavedSchemes((current) =>
      current.includes(schemeName)
        ? current.filter((item) => item !== schemeName)
        : [...current, schemeName],
    );
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft shadow-slate-900/5 transition-colors duration-500 dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
              SchemeMatch Dashboard
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {currentUser?.name ? `Welcome, ${currentUser.name}.` : 'Discover government schemes personalized for you.'}
            </h1>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              Complete your profile once to receive verified scheme recommendations, eligibility checks, and alerts in a modern, secure dashboard.
            </p>
          </div>

          <div className="grid w-full max-w-xs gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100">
              <p className="text-sm text-slate-500 dark:text-slate-400">Recommended</p>
              <p className="mt-3 text-2xl font-semibold">{schemes.filter((scheme) => scheme.eligible).length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100">
              <p className="text-sm text-slate-500 dark:text-slate-400">Saved</p>
              <p className="mt-3 text-2xl font-semibold">{savedSchemes.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <motion.div
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Your profile</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Fill in the details to get accurate scheme matches.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-blue-50 px-4 py-2 text-sm text-blue-700 dark:bg-sky-900/20 dark:text-sky-200">
              <span>Fast match</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Age
                <input
                  type="number"
                  min="15"
                  max="120"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-500/20"
                  placeholder="Enter your age"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Monthly Income
                <input
                  type="number"
                  min="0"
                  value={profile.income}
                  onChange={(e) => setProfile({ ...profile, income: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-500/20"
                  placeholder="Your income"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Occupation
                <select
                  value={profile.occupation}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-500/20"
                >
                  <option value="">Choose occupation</option>
                  {occupations.map((current) => (
                    <option key={current} value={current}>{current}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                State
                <select
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-sky-500/20"
                >
                  <option value="">Choose state</option>
                  {availableStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {isFormComplete ? 'Ready to find schemes tailored for you.' : 'Complete all fields to activate recommendations.'}
            </div>
            <button
              type="button"
              onClick={findSchemes}
              disabled={!isFormComplete || loading}
              className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {loading ? 'Finding schemes...' : 'Find Schemes'}
            </button>
          </div>

          {error && (
            <div className="mt-5 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-200">
              {error}
            </div>
          )}
        </motion.div>

        <motion.section
          layout
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recommended schemes</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Review your personalized matches in one place.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-200">
              {savedSchemes.length} saved
            </div>
          </div>

          {!hasSearched ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Start by entering your profile details and clicking <strong>Find Schemes</strong>.
            </div>
          ) : loading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              Loading recommendations...
            </div>
          ) : schemes.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              No schemes found for your profile yet. Try adjusting your information or return later.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {schemes.map((scheme) => (
                <motion.div
                  key={scheme.name}
                  whileHover={{ y: -4 }}
                  className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition duration-200 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{scheme.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{scheme.description}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        scheme.eligible
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'
                      }`}
                    >
                      {scheme.eligible ? 'Eligible' : 'Not eligible'}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleSave(scheme.name)}
                      className={`inline-flex items-center justify-center rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                        savedSchemes.includes(scheme.name)
                          ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200'
                          : 'bg-white text-slate-900 shadow-sm hover:bg-slate-50 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {savedSchemes.includes(scheme.name) ? 'Saved' : 'Save scheme'}
                    </button>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Policy matched</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </section>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
