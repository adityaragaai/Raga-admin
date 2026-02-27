import React from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setError(null);
        setIsLoading(true);
        try {
            // In a real env, this calls the AuthProvider login -> axiosPublic /auth/login
            await login({ email, password });
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#0A0F1E] overflow-hidden relative">
            {/* Unified Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full animate-pulse delay-700 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-600/10 blur-[130px] rounded-full animate-pulse delay-1000 pointer-events-none" />

            {/* Left Part: Stats Design */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-20 z-10 border-r border-white/5 bg-white/[0.01]">

                <div className="relative z-10">
                    <div className="flex items-center mb-12">
                        <img src="/ragalogo.png" alt="RagaAI Logo" className="h-16 w-auto object-contain drop-shadow-2xl invert hue-rotate-180 brightness-125" />
                    </div>

                    <h2 className="text-6xl font-bold text-white font-['Outfit'] leading-[1.1] mb-8">
                        The Standard for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Identity Control
                        </span>
                    </h2>

                    <p className="text-slate-400 text-xl max-w-lg mb-12 leading-relaxed">
                        Take command of your user ecosystem. Effortlessly manage roles, permissions, and access levels with precision-engineered tools.
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-6 max-w-md">
                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                            <p className="text-blue-400 text-3xl font-bold mb-1 font-['Outfit']">99.9%</p>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Reliability</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                            <p className="text-indigo-400 text-3xl font-bold mb-1 font-['Outfit']">24/7</p>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Expert Support</p>
                        </div>
                    </div>
                </div>

                {/* Branded Footer */}
                <div className="absolute bottom-12 left-20 right-20 flex flex-col gap-6">

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                        <span className="text-slate-500 text-xs font-medium">© 2026 RagaAI Inc.</span>
                        <div className="flex gap-6">
                            <a href="#" className="text-slate-500 hover:text-white text-xs font-medium transition-colors">Terms & Conditions</a>
                            <a href="#" className="text-slate-500 hover:text-white text-xs font-medium transition-colors">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Part: Premium SignIn Form */}
            <div className="w-full lg:w-1/2 flex items-start justify-center p-8 sm:p-12 md:p-16 lg:pt-32 relative z-10 bg-white/[0.02]">

                <div className="w-full max-w-sm space-y-8 relative z-10">
                    <div className="text-center lg:text-left space-y-3">
                        <div className="lg:hidden flex items-center justify-center mb-6">
                            <img src="/ragalogo.png" alt="RagaAI Logo" className="h-10 w-auto object-contain invert hue-rotate-180 brightness-125" />
                        </div>
                        <h1 className="text-3xl font-bold text-white font-['Outfit'] tracking-tight">
                            Identity Access
                        </h1>
                        <p className="text-slate-400 text-base">
                            Securely access your data ecosystem.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 animate-shake">
                            <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-rose-500 font-medium">{error}</p>
                        </div>
                    )}

                    <form className="mt-10 space-y-7" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div className="group">
                                <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-blue-400 transition-colors">
                                    Network Identifier
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none z-20">
                                        <svg className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm relative z-10"
                                        placeholder="admin@raga.ai"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2.5 ml-1 group-focus-within:text-blue-400 transition-colors">
                                    Access Credential
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none z-20">
                                        <svg className="h-4.5 w-4.5 text-slate-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm relative z-10"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center z-20 text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-5 w-5 rounded-lg border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/30 transition-all cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-400 cursor-pointer hover:text-slate-300">
                                    Persistent Session
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition-all hover:underline underline-offset-4">
                                    Recovery Access?
                                </a>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full py-3.5 px-6 rounded-2xl text-white font-bold text-base transition-all duration-300 shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden ${isLoading ? 'bg-indigo-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/30'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4.5 w-4.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="relative z-10 text-sm">Verifying...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="relative z-10">Authenticate Identity</span>
                                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </form>

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-500 text-sm">
                            New to the ecosystem?{' '}
                            <a href="#" className="font-bold text-white hover:text-blue-400 transition-colors decoration-blue-500/50 underline underline-offset-8 decoration-2">
                                Request Access
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
