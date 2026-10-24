import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import Logo from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // Enforce logged-out state by default when visiting login page
  React.useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Authentication denied. Verify credentials.');
      }
    } catch (err) {
      setError('Connection failure communicating with authentication service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-4 py-12 text-[#252922]">
      <div className="max-w-md w-full space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Logo size="md" className="justify-center" />
          <h1 className="font-serif text-3xl text-[#244638] tracking-tight">
            Administration Portal
          </h1>
          <p className="text-xs text-[#686B61] max-w-xs mx-auto">
            Restricted access console for collective administrators and project managers.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FFFCF7] p-8 rounded-xl border border-[#244638]/15 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#244638]/10 text-mono text-xs text-[#686B61]">
            <div className="flex items-center gap-1.5 text-[#244638] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A15E40]" />
              <span>SECURE DISPATCH NODE</span>
            </div>
            <span className="text-[#A15E40]">AUTH // V1.0</span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-mono text-[10px] text-[#686B61] block">ADMINISTRATOR EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@nexoraa.tech"
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 pl-9 text-xs text-[#252922] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-[#686B61] absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-mono text-[10px] text-[#686B61] block">SECURITY KEY / PASSWORD</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 pl-9 text-xs text-[#252922] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-[#686B61] absolute left-3 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-xs py-2.5"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Authenticate Console</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="text-mono text-[11px] text-[#686B61] hover:text-[#244638] transition-colors"
            >
              ← Return to Public Experience
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLoginPage;
