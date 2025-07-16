"use client";
import React, { useState } from 'react';
import {
    Crown,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Loader2,
    Github,
    Chrome,
    Facebook,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    Sparkles
} from 'lucide-react';
import { API_ENDPOINTS } from '../../src/config/api';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('請填寫所有必填欄位');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('請輸入有效的電子郵件地址');
            setIsLoading(false);
            return;
        }

        try {
            // 真實 API 呼叫
            const response = await fetch(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('登入失敗');
            }

            const data = await response.json();
            
            // 儲存 token
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }

            setSuccess('登入成功！正在重新導向...');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } catch (err) {
            console.error('Login error:', err);
            setError('登入失敗，請檢查您的帳號密碼');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        setIsLoading(true);
        // Mock social login
        setTimeout(() => {
            setSuccess(`正在使用 ${provider} 登入...`);
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
            </div>

            {/* Login Card */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Crown className="w-8 h-8 text-purple-600" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            AI名片王
                        </h1>
                    </div>
                    <p className="text-gray-600">歡迎回來！登入您的帳戶</p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">{success}</span>
                    </div>
                )}

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={() => handleSocialLogin('Google')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <Chrome className="w-5 h-5" />
                        <span>使用 Google 登入</span>
                    </button>

                    <button
                        onClick={() => handleSocialLogin('Facebook')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white rounded-xl py-3 px-4 hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Facebook className="w-5 h-5" />
                        <span>使用 Facebook 登入</span>
                    </button>

                    <button
                        onClick={() => handleSocialLogin('GitHub')}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white rounded-xl py-3 px-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        <Github className="w-5 h-5" />
                        <span>使用 GitHub 登入</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">或使用電子郵件</span>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            電子郵件
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="請輸入您的電子郵件"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            密碼
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="請輸入您的密碼"
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                disabled={isLoading}
                            />
                            <span className="ml-2 text-sm text-gray-700">記住我</span>
                        </label>
                        <a href="#" className="text-sm text-purple-600 hover:text-purple-700 transition-colors">
                            忘記密碼？
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>登入中...</span>
                            </>
                        ) : (
                            <>
                                <span>登入</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        還沒有帳戶？
                        <button
                            onClick={() => window.location.href = '/register'}
                            className="text-purple-600 hover:text-purple-700 font-semibold ml-1 transition-colors"
                        >
                            立即註冊
                        </button>
                    </p>
                </div>

                {/* Features Preview */}
                <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-gray-800">登入後即可享受</h3>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• AI 智能名片設計</li>
                        <li>• 一鍵掃描實體名片</li>
                        <li>• 智能人脈管理系統</li>
                        <li>• 社交媒體整合</li>
                        <li>• 數據分析報告</li>
                    </ul>
                </div>
            </div>

            {/* Demo Cards Animation */}
            <div className="fixed top-10 right-10 hidden lg:block">
                <div className="relative">
                    <div className="w-24 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg transform rotate-12 animate-pulse"></div>
                    <div className="absolute -top-2 -left-2 w-24 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg transform -rotate-12 animate-pulse delay-1000"></div>
                    <div className="absolute -top-4 -left-4 w-24 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg transform rotate-6 animate-pulse delay-2000"></div>
                </div>
            </div>

            {/* Demo Cards Animation - Bottom Left */}
            <div className="fixed bottom-10 left-10 hidden lg:block">
                <div className="relative">
                    <div className="w-20 h-14 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-lg transform -rotate-6 animate-bounce"></div>
                    <div className="absolute -top-2 -right-2 w-20 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg transform rotate-12 animate-bounce delay-500"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;