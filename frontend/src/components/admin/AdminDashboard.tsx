import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, LogOut, Users, Cpu, Code2, CheckCircle2, Clock, XCircle,
  Calendar, Image, HelpCircle, Settings, Download, RefreshCw, X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { DashboardStats, RegistrationRecord, ProjectRecord, EventItem, GalleryItem, FAQItem, FestivalSettings } from '../../types';
import { RegistrationsManager } from './RegistrationsManager';
import { ProjectsManager } from './ProjectsManager';
import { EventsManager } from './EventsManager';
import { GalleryManager } from './GalleryManager';
import { FAQsManager } from './FAQsManager';
import { SettingsManager } from './SettingsManager';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  faqs: FAQItem[];
  galleryItems: GalleryItem[];
  settings: FestivalSettings;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  events,
  faqs,
  galleryItems,
  settings,
  onDataChanged,
}) => {
  const { adminUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'registrations' | 'projects' | 'events' | 'gallery' | 'faqs' | 'settings'
  >('overview');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, regsData, projsData] = await Promise.all([
        api.getStats().catch(() => null),
        api.getAdminRegistrations().catch(() => []),
        api.getAdminProjects().catch(() => []),
      ]);
      setStats(statsData);
      setRegistrations(regsData);
      setProjects(projsData);
      onDataChanged();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-xl flex flex-col overflow-hidden text-neutral-100">
      {/* Top Navigation Bar */}
      <header className="bg-dark-900 border-b border-neutral-800 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-lime flex items-center justify-center font-mono font-black text-dark-950 text-sm">
            TG
          </div>
          <div>
            <h2 className="font-display font-black text-base sm:text-lg text-white uppercase tracking-tight flex items-center gap-2">
              ADMIN CONTROL CENTER
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime">
                {adminUser?.role || 'Administrator'}
              </span>
            </h2>
            <p className="text-[11px] font-mono text-neutral-400 -mt-0.5">
              Logged in as: <strong className="text-neutral-200">{adminUser?.email}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchAdminData}
            disabled={loading}
            className="p-2 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-lime' : ''}`} />
          </button>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs font-mono transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors ml-2"
            title="Exit Dashboard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <aside className="w-56 sm:w-64 bg-dark-900 border-r border-neutral-800 flex flex-col justify-between p-3 flex-shrink-0">
          <nav className="space-y-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'overview'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Overview & Stats</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('registrations')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'registrations'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Registrations</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-dark-800 text-neutral-300">
                {registrations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'projects'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>Tech Showcase</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-dark-800 text-neutral-300">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'events'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Event Schedule</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-dark-800 text-neutral-300">
                {events.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'gallery'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span>Gallery & Media</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-dark-800 text-neutral-300">
                {galleryItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'faqs'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span>FAQs Desk</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-dark-800 text-neutral-300">
                {faqs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2.5 flex items-center justify-between border transition-all ${
                activeTab === 'settings'
                  ? 'border-brand-lime bg-brand-lime/10 text-brand-lime font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Festival Settings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </nav>

          <div className="p-3 bg-dark-950 border border-neutral-800 text-[10px] font-mono text-neutral-400">
            <span className="text-brand-lime block mb-0.5 font-bold">TECH WIZARD 2027</span>
            <span>Database: Supabase Postgres</span>
          </div>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-dark-950">
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Festival Operations & Live Statistics
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Real-time analytics for registration volume, eligibility checks, and jury queues
                </p>
              </div>

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                {/* Total Registrations */}
                <div className="tech-card border border-neutral-800 bg-dark-900 p-5">
                  <div className="flex items-center justify-between mb-2 text-neutral-400">
                    <span className="text-xs uppercase">Registrations</span>
                    <Users className="w-4 h-4 text-brand-lime" />
                  </div>
                  <span className="font-display font-black text-3xl text-white block">
                    {stats?.total_registrations ?? registrations.length}
                  </span>
                  <div className="mt-2 text-[10px] text-neutral-400 flex items-center justify-between">
                    <span>Internal: <strong className="text-amber-400">{stats?.internal_registrations ?? registrations.filter(r => r.is_internal).length}</strong></span>
                    <span>External: <strong className="text-brand-blue">{stats?.external_registrations ?? registrations.filter(r => !r.is_internal).length}</strong></span>
                  </div>
                </div>

                {/* Total Projects */}
                <div className="tech-card border border-neutral-800 bg-dark-900 p-5">
                  <div className="flex items-center justify-between mb-2 text-neutral-400">
                    <span className="text-xs uppercase">Project Submissions</span>
                    <Cpu className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="font-display font-black text-3xl text-white block">
                    {stats?.total_projects ?? projects.length}
                  </span>
                  <div className="mt-2 text-[10px] text-neutral-400 flex items-center justify-between">
                    <span>Hardware: <strong className="text-brand-lime">{stats?.hardware_projects ?? projects.filter(p => p.category === 'Hardware').length}</strong></span>
                    <span>Software: <strong className="text-brand-blue">{stats?.software_projects ?? projects.filter(p => p.category === 'Software').length}</strong></span>
                  </div>
                </div>

                {/* Pending Approvals */}
                <div className="tech-card border border-neutral-800 bg-dark-900 p-5">
                  <div className="flex items-center justify-between mb-2 text-neutral-400">
                    <span className="text-xs uppercase">Pending Review</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="font-display font-black text-3xl text-amber-400 block">
                    {stats?.pending_projects ?? projects.filter(p => p.status === 'pending').length}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-2 block">
                    Awaiting jury evaluation
                  </span>
                </div>

                {/* Approved Projects */}
                <div className="tech-card border border-neutral-800 bg-dark-900 p-5">
                  <div className="flex items-center justify-between mb-2 text-neutral-400">
                    <span className="text-xs uppercase">Showcase Approved</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-display font-black text-3xl text-emerald-400 block">
                    {stats?.approved_projects ?? projects.filter(p => p.status === 'approved').length}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-2 block">
                    Live in exhibition catalog
                  </span>
                </div>
              </div>

              {/* Event-wise breakdown */}
              <div className="tech-card border border-neutral-800 bg-dark-900 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h4 className="font-display font-bold text-lg text-white">
                    Event-Wise Registration Breakdown
                  </h4>
                  <button
                    onClick={() => setActiveTab('registrations')}
                    className="text-xs font-mono text-brand-lime hover:underline"
                  >
                    View All Records →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {events.map((e) => {
                    const count = registrations.filter((r) => r.event_id === e.id).length;
                    return (
                      <div
                        key={e.id}
                        className="p-3.5 bg-dark-850 border border-neutral-800 font-mono text-xs flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            {e.date_display}
                          </span>
                          <span className="font-bold text-white block mt-0.5 truncate" title={e.name}>
                            {e.name}
                          </span>
                        </div>
                        <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center justify-between">
                          <span className="text-neutral-400">Enrolled:</span>
                          <span className="text-base font-black text-brand-lime">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('projects')}
                  className="p-4 bg-dark-900 border border-neutral-800 hover:border-brand-lime text-left group"
                >
                  <span className="text-brand-lime font-mono text-xs uppercase block mb-1">
                    Showcase Pipeline
                  </span>
                  <h5 className="font-display font-bold text-white text-base">
                    Review Pending Projects →
                  </h5>
                </button>

                <button
                  onClick={() => setActiveTab('events')}
                  className="p-4 bg-dark-900 border border-neutral-800 hover:border-brand-lime text-left group"
                >
                  <span className="text-brand-lime font-mono text-xs uppercase block mb-1">
                    Event Gates
                  </span>
                  <h5 className="font-display font-bold text-white text-base">
                    Toggle Registration Status →
                  </h5>
                </button>

                <button
                  onClick={() => {
                    const url = api.exportRegistrationsCsvUrl();
                    window.open(url, '_blank');
                  }}
                  className="p-4 bg-dark-900 border border-neutral-800 hover:border-brand-lime text-left group"
                >
                  <span className="text-brand-lime font-mono text-xs uppercase block mb-1">
                    Data Export
                  </span>
                  <h5 className="font-display font-bold text-white text-base">
                    Download Full CSV Backup →
                  </h5>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <RegistrationsManager
              registrations={registrations}
              events={events}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === 'events' && (
            <EventsManager
              events={events}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryManager
              items={galleryItems}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === 'faqs' && (
            <FAQsManager
              faqs={faqs}
              onRefresh={fetchAdminData}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsManager
              settings={settings}
              onRefresh={fetchAdminData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

