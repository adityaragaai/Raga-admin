import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const mockCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Premium', status: 'Active', phone: '+1 234 567 890', joinDate: '2024-01-15', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Standard', status: 'Inactive', phone: '+1 345 678 901', joinDate: '2023-11-20', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Premium', status: 'Active', phone: '+1 456 789 012', joinDate: '2024-02-01', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'Active', phone: '+1 567 890 123', joinDate: '2023-09-10', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Standard', status: 'Active', phone: '+1 678 901 234', joinDate: '2024-02-15', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Alice Wilson', email: 'alice@example.com', role: 'Premium', status: 'Active', phone: '+1 789 012 345', joinDate: '2024-01-05', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Standard', status: 'Inactive', phone: '+1 890 123 456', joinDate: '2023-12-12', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Emma Wilson', email: 'emma@example.com', role: 'Standard', status: 'Active', phone: '+1 901 234 567', joinDate: '2024-02-10', avatar: 'https://i.pravatar.cc/150?u=8' },
    { id: 9, name: 'James Taylor', email: 'james@example.com', role: 'Premium', status: 'Active', phone: '+1 012 345 678', joinDate: '2024-01-20', avatar: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: 'Olivia Moore', email: 'olivia@example.com', role: 'Standard', status: 'Inactive', phone: '+1 123 456 789', joinDate: '2023-10-15', avatar: 'https://i.pravatar.cc/150?u=10' },
    { id: 11, name: 'William Anderson', email: 'william@example.com', role: 'Premium', status: 'Active', phone: '+1 234 567 890', joinDate: '2024-03-01', avatar: 'https://i.pravatar.cc/150?u=11' },
    { id: 12, name: 'Sophia Thomas', email: 'sophia@example.com', role: 'Standard', status: 'Active', phone: '+1 345 678 901', joinDate: '2024-01-12', avatar: 'https://i.pravatar.cc/150?u=12' },
    { id: 13, name: 'Alexander White', email: 'alex@example.com', role: 'Premium', status: 'Active', phone: '+1 456 789 012', joinDate: '2023-12-25', avatar: 'https://i.pravatar.cc/150?u=13' },
    { id: 14, name: 'Isabella Harris', email: 'isabella@example.com', role: 'Admin', status: 'Active', phone: '+1 567 890 123', joinDate: '2024-02-28', avatar: 'https://i.pravatar.cc/150?u=14' },
    { id: 15, name: 'Lucas Martin', email: 'lucas@example.com', role: 'Standard', status: 'Inactive', phone: '+1 678 901 234', joinDate: '2023-11-30', avatar: 'https://i.pravatar.cc/150?u=15' },
    { id: 16, name: 'Mia Thompson', email: 'mia@example.com', role: 'Premium', status: 'Active', phone: '+1 789 012 345', joinDate: '2024-01-18', avatar: 'https://i.pravatar.cc/150?u=16' },
    { id: 17, name: 'Benjamin Garcia', email: 'benjamin@example.com', role: 'Standard', status: 'Active', phone: '+1 890 123 456', joinDate: '2024-03-05', avatar: 'https://i.pravatar.cc/150?u=17' },
    { id: 18, name: 'Charlotte Robinson', email: 'charlotte@example.com', role: 'Premium', status: 'Inactive', phone: '+1 901 234 567', joinDate: '2023-12-05', avatar: 'https://i.pravatar.cc/150?u=18' },
    { id: 19, name: 'Daniel Clark', email: 'daniel@example.com', role: 'Standard', status: 'Active', phone: '+1 012 345 678', joinDate: '2024-02-20', avatar: 'https://i.pravatar.cc/150?u=19' },
    { id: 20, name: 'Amelia Lewis', email: 'amelia@example.com', role: 'Admin', status: 'Active', phone: '+1 123 456 789', joinDate: '2024-01-25', avatar: 'https://i.pravatar.cc/150?u=20' },
    { id: 21, name: 'Lucas Wright', email: 'lucas.w@example.com', role: 'Standard', status: 'Active', phone: '+1 234 567 890', joinDate: '2024-02-15', avatar: 'https://i.pravatar.cc/150?u=21' },
    { id: 22, name: 'Emma Scott', email: 'emma.s@example.com', role: 'Premium', status: 'Inactive', phone: '+1 345 678 901', joinDate: '2024-01-10', avatar: 'https://i.pravatar.cc/150?u=22' },
    { id: 23, name: 'Mason Green', email: 'mason.g@example.com', role: 'Standard', status: 'Active', phone: '+1 456 789 012', joinDate: '2024-03-01', avatar: 'https://i.pravatar.cc/150?u=23' },
    { id: 24, name: 'Ava Adams', email: 'ava.a@example.com', role: 'Admin', status: 'Active', phone: '+1 567 890 123', joinDate: '2023-12-20', avatar: 'https://i.pravatar.cc/150?u=24' },
    { id: 25, name: 'Ethan Baker', email: 'ethan.b@example.com', role: 'Premium', status: 'Active', phone: '+1 678 901 234', joinDate: '2024-02-25', avatar: 'https://i.pravatar.cc/150?u=25' },
    { id: 26, name: 'Chloe Hall', email: 'chloe.h@example.com', role: 'Standard', status: 'Inactive', phone: '+1 789 012 345', joinDate: '2024-01-05', avatar: 'https://i.pravatar.cc/150?u=26' },
    { id: 27, name: 'Liam King', email: 'liam.k@example.com', role: 'Premium', status: 'Active', phone: '+1 890 123 456', joinDate: '2023-11-15', avatar: 'https://i.pravatar.cc/150?u=27' },
    { id: 28, name: 'Zoe Young', email: 'zoe.y@example.com', role: 'Standard', status: 'Active', phone: '+1 901 234 567', joinDate: '2024-02-10', avatar: 'https://i.pravatar.cc/150?u=28' },
    { id: 29, name: 'Noah Ward', email: 'noah.w@example.com', role: 'Admin', status: 'Active', phone: '+1 012 345 678', joinDate: '2024-01-20', avatar: 'https://i.pravatar.cc/150?u=29' },
    { id: 30, name: 'Lily Hill', email: 'lily.h@example.com', role: 'Premium', status: 'Inactive', phone: '+1 123 456 789', joinDate: '2023-10-30', avatar: 'https://i.pravatar.cc/150?u=30' },
];


const Dashboard = () => {
    const { logout, user: authUser } = useAuth();
    const [activeTab, setActiveTab] = useState('customers');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentUser, setCurrentUser] = useState(authUser || {
        name: 'RagaAI Admin',
        role: 'Super Admin',
        email: 'admin@raga.ai',
        phone: '+91 98765 43210',
        joinDate: '2023-01-01',
        status: 'Active',
        avatar: 'https://i.pravatar.cc/150?u=aditya'
    });

    const [editForm, setEditForm] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const scrollContainerRef = React.useRef(null);

    const filteredCustomers = mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Reset to first page on search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const openProfile = (user) => {
        setSelectedUser(user);
        setEditForm(user);
        setShowDrawer(true);
    };

    const handleSaveProfile = () => {
        if (selectedUser.id === undefined) {
            setCurrentUser(editForm);
        }
        // In a real app, you'd call an API here for other users too
        setShowDrawer(false);
    };

    const themeClasses = {
        bg: isDarkMode ? 'bg-[#0f172a]' : 'bg-slate-50',
        sidebar: isDarkMode ? 'bg-[#11172c] border-slate-800' : 'bg-white border-slate-200',
        text: isDarkMode ? 'text-slate-200' : 'text-slate-800',
        textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
        border: isDarkMode ? 'border-slate-800' : 'border-slate-200',
        card: isDarkMode ? 'bg-[#11172c] border-slate-800' : 'bg-white border-slate-200',
        header: isDarkMode ? 'bg-[#0f172a]/50 border-slate-800' : 'bg-white/50 border-slate-200',
        input: isDarkMode ? 'bg-white/5 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900',
        tableHeader: isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500',
        buttonSecondary: isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-200 text-slate-600 hover:text-slate-900',
    };

    return (
        <div className={`flex h-screen overflow-hidden font-['Inter'] transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
            {/* Sidebar - 25% */}
            <aside className={`w-1/4 min-w-[240px] border-r flex flex-col transition-colors duration-300 ${themeClasses.sidebar}`}>
                <div className={`p-6 border-b ${themeClasses.border}`}>
                    <div className="flex items-center">
                        <img
                            src="/ragalogo.png"
                            alt="RagaAI Logo"
                            className={`h-10 w-auto object-contain transition-all duration-300 ${isDarkMode ? 'invert hue-rotate-180 brightness-125' : ''}`}
                        />
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('customers')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'customers' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : `hover:bg-blue-500/10 ${themeClasses.textMuted}`
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 15.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="font-medium">Customers</span>
                    </button>

                    <div className={`pt-4 pb-2 px-4 text-xs font-semibold uppercase tracking-wider ${themeClasses.textMuted}`}>
                        Future Sections
                    </div>
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-not-allowed italic ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Analytics</span>
                    </button>
                    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-not-allowed italic ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                    </button>

                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-rose-500/10 text-rose-500 mt-4 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign Out</span>
                    </button>
                </nav>

                {/* Powered By Footer */}
                <div className="pb-8 mt-auto flex flex-col items-center gap-1.5">
                    <p className="text-[9px] font-bold text-slate-500/80 uppercase tracking-[0.25em]">Powered By</p>
                    <img
                        src="/ragalogo.png"
                        alt="RagaAI Logo"
                        className={`h-8 w-auto object-contain ${isDarkMode ? 'invert hue-rotate-180 brightness-125' : ''}`}
                    />
                </div>
            </aside>

            {/* Main Content - 75% */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className={`h-20 border-b flex items-center justify-between px-8 backdrop-blur-xl sticky top-0 z-30 transition-all duration-300 ${themeClasses.header}`}>
                    <h2 className={`text-xl font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <svg className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${themeClasses.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search customers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all ${themeClasses.input}`}
                            />
                        </div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-xl transition-all duration-300 active:scale-90 ${themeClasses.buttonSecondary}`}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        {/* User Profile in Header */}
                        <div
                            onClick={() => openProfile(currentUser)}
                            className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ml-2 ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}
                        >
                            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 ${isDarkMode ? 'bg-slate-700 border-blue-500/30' : 'bg-slate-200 border-white shadow-sm'}`}>
                                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <p className={`text-sm font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentUser.name}</p>
                                <p className={`text-[10px] uppercase font-bold tracking-wider leading-tight ${themeClasses.textMuted}`}>{currentUser.role}</p>
                            </div>
                            <svg className={`w-3.5 h-3.5 ml-1 ${themeClasses.textMuted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 min-h-0 overflow-hidden p-8 flex flex-col">
                    <div className={`flex-1 min-h-0 rounded-3xl border flex flex-col shadow-2xl transition-all duration-300 overflow-hidden ${themeClasses.card}`}>
                        <div ref={scrollContainerRef} className="flex-1 overflow-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className={`sticky top-0 z-20 backdrop-blur-md transition-colors duration-300 ${isDarkMode ? 'bg-[#11172c]/90' : 'bg-white/90 shadow-sm'}`}>
                                    <tr className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${themeClasses.tableHeader}`}>
                                        <th className="px-6 py-5 border-b border-transparent">Name</th>
                                        <th className="px-6 py-5 border-b border-transparent">Email</th>
                                        <th className="px-6 py-5 border-b border-transparent text-center">Status</th>
                                        <th className="px-6 py-5 border-b border-transparent text-right pr-12">Profile</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y transition-colors duration-300 ${isDarkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
                                    {currentItems.map((customer) => (
                                        <tr key={customer.id} className={`transition-colors group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full overflow-hidden border flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'}`}>
                                                        <img
                                                            src={customer.avatar}
                                                            alt={customer.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className={`text-sm font-semibold truncate max-w-[150px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{customer.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className={`text-sm truncate max-w-[200px] ${themeClasses.textMuted}`}>{customer.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight inline-block ${customer.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => openProfile(customer)}
                                                    className="px-4 py-2 rounded-lg bg-blue-600/10 text-blue-400 text-sm font-medium hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 mr-8"
                                                >
                                                    View Profile
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer - Sticky at bottom of card */}
                        <div className={`px-6 py-4 border-t flex items-center justify-between transition-colors duration-300 mt-auto ${isDarkMode ? 'bg-[#11172c] border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className={`text-sm ${themeClasses.textMuted}`}>
                                {filteredCustomers.length > 0 ? (
                                    <>
                                        Showing <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{indexOfFirstItem + 1}</span> to <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{Math.min(indexOfLastItem, filteredCustomers.length)}</span> of <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{filteredCustomers.length}</span>
                                    </>
                                ) : (
                                    "No results found"
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent dark:border-white/5">
                                    <button
                                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : `hover:bg-blue-600/10 ${isDarkMode ? 'text-white' : 'text-slate-900'} active:scale-90 hover:text-blue-500`}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[180px] px-1 py-0.5">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => paginate(i + 1)}
                                                className={`w-8 h-8 flex-shrink-0 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' : `${themeClasses.textMuted} hover:bg-white/10 hover:text-blue-400`}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : `hover:bg-blue-600/10 ${isDarkMode ? 'text-white' : 'text-slate-900'} active:scale-90 hover:text-blue-500`}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Pop-right Drawer Overlay */}
            {showDrawer && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setShowDrawer(false)}
                />
            )}

            {/* Pop-right Drawer Content */}
            <div className={`fixed top-0 right-0 h-full w-[380px] border-l z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${showDrawer ? 'translate-x-0' : 'translate-x-full'} ${themeClasses.card}`}>
                {selectedUser && (
                    <div className="h-full flex flex-col p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`text-lg font-bold font-['Outfit'] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>User Profile</h3>
                            <button
                                onClick={() => setShowDrawer(false)}
                                className={`p-1.5 rounded-lg transition-colors ${themeClasses.buttonSecondary}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <div className="relative group/avatar">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-600 shadow-lg shadow-blue-600/20 mb-3 transition-transform group-hover/avatar:scale-105">
                                    <img
                                        src={editForm.avatar}
                                        alt={editForm.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {selectedUser.id === undefined && (
                                    <button className="absolute bottom-4 right-0 p-1 rounded-lg bg-blue-600 text-white shadow-lg border border-white/20 transform translate-x-1/4 translate-y-1/4 opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            {selectedUser.id === undefined ? (
                                <div className="w-full text-center space-y-1 px-4">
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className={`text-lg font-bold bg-transparent border-b-2 border-transparent focus:border-blue-500 outline-none text-center w-full ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                    />
                                    <input
                                        type="text"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className={`text-xs bg-transparent border-b border-transparent focus:border-blue-500 outline-none text-center w-full ${themeClasses.textMuted}`}
                                    />
                                </div>
                            ) : (
                                <>
                                    <h4 className={`text-xl font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedUser.name}</h4>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>{selectedUser.email}</p>
                                </>
                            )}
                        </div>

                        <div className="space-y-4 flex-1">
                            <div className="grid grid-cols-2 gap-3">
                                <div className={`p-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                    <p className={`text-[10px] mb-0.5 uppercase tracking-wider font-bold ${themeClasses.textMuted}`}>Role</p>
                                    {selectedUser.id === undefined ? (
                                        <select
                                            value={editForm.role}
                                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                            className={`text-xs font-semibold bg-transparent outline-none w-full ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                        >
                                            <option value="Super Admin">Super Admin</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    ) : (
                                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedUser.role}</p>
                                    )}
                                </div>
                                <div className={`p-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                    <p className={`text-[10px] mb-0.5 uppercase tracking-wider font-bold ${themeClasses.textMuted}`}>Phone</p>
                                    {selectedUser.id === undefined ? (
                                        <input
                                            type="text"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className={`text-xs font-semibold bg-transparent outline-none w-full ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                        />
                                    ) : (
                                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedUser.phone}</p>
                                    )}
                                </div>
                                <div className={`p-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                    <p className={`text-[10px] mb-0.5 uppercase tracking-wider font-bold ${themeClasses.textMuted}`}>Joined</p>
                                    <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedUser.joinDate}</p>
                                </div>
                                <div className={`p-3 rounded-xl border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                                    <p className={`text-[10px] mb-0.5 uppercase tracking-wider font-bold ${themeClasses.textMuted}`}>Status</p>
                                    <p className={`text-xs font-bold ${selectedUser.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {selectedUser.status}
                                    </p>
                                </div>
                            </div>

                            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-blue-600/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                                <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Access Management</h5>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>System Access</p>
                                        <p className={`text-[9px] uppercase font-medium ${themeClasses.textMuted}`}>Login Permission</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer scale-90">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={selectedUser.status === 'Active'} />
                                        <div className="w-10 h-5.5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600 transition-colors"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={`pt-4 border-t ${themeClasses.border} space-y-2`}>
                            <button
                                onClick={handleSaveProfile}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${isDarkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                            >
                                {selectedUser.id === undefined ? 'Apply Changes' : 'Save Changes'}
                            </button>
                            {selectedUser.id === undefined && (
                                <button
                                    onClick={logout}
                                    className="w-full py-2.5 rounded-xl font-bold text-xs text-rose-500 hover:bg-rose-500/10 transition-colors border border-rose-500/20 active:scale-95"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
