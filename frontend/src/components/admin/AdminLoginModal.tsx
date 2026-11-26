import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { login, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('admin@techgallery2027.edu');
  const [password, setPassword] = useState('admintech2027');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      showNotification('success', 'Authenticated', 'Welcome to Tech Wizard Admin Control Center.');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials');
      showNotification('error', 'Login Failed', err.message || 'Invalid credentials');
    }
  };

  return (
    <AnimatePresence>
      <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0912]/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-w-md w-full bg-[#1A1626] border-2 border-[#D6B36A] p-6 sm:p-8 shadow-[8px_8px_0px_#0B0912] rounded-sm text-[#F4EBDD]"
        >
          {/* Burgundy Wax Seal Ribbon */}
          <div
            className="absolute -top-3 left-8 px-3.5 py-0.5 bg-gradient-to-r from-[#762E42] to-[#4A1525] border-x border-b border-[#D6B36A] shadow-[0_2px_8px_rgba(0,0,0,0.6)] z-10 flex items-center gap-1.5"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3D58A]" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#F3D58A] font-bold">
              RESTRICTED
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#E7D7B5] hover:text-[#F3D58A] p-1.5 rounded-sm border border-[#D6B36A]/60 bg-[#100D18] shadow-[1.5px_1.5px_0px_#0B0912] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#100D18] border border-[#D6B36A] text-[#F3D58A] rounded-sm shadow-[2px_2px_0px_#0B0912]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#F3D58A] font-bold block">
                ✦ AUTHENTICATED ACCESS
              </span>
              <h3 className="font-display font-black text-xl text-[#F4EBDD] uppercase tracking-tight">
                ADMIN PORTAL LOGIN
              </h3>
            </div>
          </div>

          <p className="text-xs font-mono text-[#C2BDCA] mb-6 leading-relaxed font-medium">
            Restricted to Tech Wizard 2027 faculty committee, technical juries, and festival chairs.
          </p>

          {error && (
            <div className="p-3 mb-4 bg-[#351522] border border-[#D6B36A] text-xs font-mono font-bold text-[#F3D58A] flex items-center gap-2 shadow-[2px_2px_0px_#0B0912]">
              <AlertCircle className="w-4 h-4 text-[#F3D58A] flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#F4EBDD] mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#D6B36A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#120F1A] border border-[#D6B36A]/50 focus:border-[#F3D58A] pl-10 pr-3.5 py-2.5 text-xs text-[#F4EBDD] font-mono focus:outline-none rounded-sm shadow-[2px_2px_0px_#0B0912]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#F4EBDD] mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#D6B36A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#120F1A] border border-[#D6B36A]/50 focus:border-[#F3D58A] pl-10 pr-3.5 py-2.5 text-xs text-[#F4EBDD] font-mono focus:outline-none rounded-sm shadow-[2px_2px_0px_#0B0912]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#120F1A] border border-[#D6B36A]/40 text-[11px] font-mono text-[#C2BDCA] rounded-sm shadow-[2px_2px_0px_#0B0912]">
              <span className="text-[#F3D58A] font-bold block mb-0.5">Quick Demo Credentials:</span>
              Email: <code className="text-[#F4EBDD]">admin@techgallery2027.edu</code> | Pass: <code className="text-[#F4EBDD]">admintech2027</code>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-sm font-mono font-bold text-xs text-[#F4EBDD] bg-[#762E42] hover:bg-[#8D3750] border-2 border-[#D6B36A] shadow-[3.5px_3.5px_0px_#0B0912] hover:shadow-[5px_5px_0px_#0B0912] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isLoading ? 'Verifying Access...' : 'Authenticate & Enter'}</span>
                <ArrowRight className="w-4 h-4 text-[#F3D58A]" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
