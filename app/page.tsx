"use client";
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Scan, 
  Users, 
  BarChart3, 
  Share2, 
  Settings, 
  ArrowRight,
  Play,
  Star,
  Zap,
  Heart,
  Crown,
  Smartphone,
  Camera,
  Palette,
  Globe,
  ChevronRight,
  UserPlus,
  LogIn
} from 'lucide-react';

const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Scan className="w-8 h-8" />,
      title: "AI 名片掃描",
      description: "一鍵掃描實體名片，AI智能識別並轉換為數位名片"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI 名片設計",
      description: "AI自動生成專業名片設計，支援3D動畫效果"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "智能人脈管理",
      description: "AI分析您的人脈網絡，推薦最佳連結機會"
    }
  ];

  const socialPlatforms = [
    { name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Facebook", color: "bg-blue-600" },
    { name: "LinkedIn", color: "bg-blue-700" },
    { name: "Twitter", color: "bg-gray-900" },
    { name: "TikTok", color: "bg-black" },
    { name: "YouTube", color: "bg-red-600" }
  ];

  const testimonials = [
    {
      name: "王小明",
      role: "創業家",
      content: "AI名片王讓我的名片變得超級專業，客戶印象深刻！",
      rating: 5
    },
    {
      name: "李美華",
      role: "業務經理",
      content: "掃描功能太棒了，再也不用手動輸入名片資訊。",
      rating: 5
    },
    {
      name: "張志強",
      role: "設計師",
      content: "AI設計的名片比我自己設計的還要好看！",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI名片王
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">功能</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">價格</a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">評價</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">聯絡</a>
              <a href="/settings" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>設定</span>
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/login'}
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-1"
              >
                <LogIn className="w-4 h-4" />
                <span>登入</span>
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform flex items-center space-x-1"
              >
                <UserPlus className="w-4 h-4" />
                <span>註冊</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI名片王
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                讓 AI 為您打造專業名片，連結無限可能的人脈網絡
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/register'}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>立即免費使用</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/scanner'}
                  className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>掃描名片</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Carousel */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 mb-20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">
                    {features[currentFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {features[currentFeature].title}
                  </h3>
                </div>
                <p className="text-gray-600 text-lg">
                  {features[currentFeature].description}
                </p>
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentFeature ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Smartphone className="w-32 h-32 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">強大功能</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              從掃描到設計，從分享到分析，AI名片王提供完整的數位名片解決方案
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Scan className="w-8 h-8" />, title: "名片掃描", description: "AI智能識別名片資訊", href: "/scanner" },
              { icon: <Sparkles className="w-8 h-8" />, title: "AI名片建立", description: "自動生成專業名片設計", href: "/builder" },
              { icon: <Users className="w-8 h-8" />, title: "人脈管理", description: "智能分類和搜尋聯絡人", href: "/contacts" },
              { icon: <BarChart3 className="w-8 h-8" />, title: "數據分析", description: "深入了解您的人脈網絡", href: "/dashboard" },
              { icon: <Share2 className="w-8 h-8" />, title: "分享交換", description: "QR碼和NFC快速分享", href: "/share" },
              { icon: <Settings className="w-8 h-8" />, title: "個人設定", description: "自訂您的偏好和隱私設定", href: "/settings" }
            ].map((feature, index) => (
              <div 
                key={index}
                onClick={() => window.location.href = feature.href}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                  <span className="text-sm font-semibold">了解更多</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">支援所有主流平台</h2>
            <p className="text-xl text-gray-600">
              一次整合所有社交媒體，讓您的名片成為完整的數位身分
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialPlatforms.map((platform, index) => (
              <div 
                key={index}
                className={`${platform.color} rounded-2xl p-6 text-white text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="font-semibold">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">用戶見證</h2>
            <p className="text-xl text-gray-600">
              看看其他用戶如何透過 AI名片王 提升他們的專業形象
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            準備開始您的 AI 名片之旅了嗎？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            立即免費註冊，體驗 AI 帶來的名片革命
          </p>
          <button 
            onClick={() => window.location.href = '/register'}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center space-x-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            <span>免費開始使用</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-8 h-8 text-purple-400" />
                <span className="text-xl font-bold">AI名片王</span>
              </div>
              <p className="text-gray-400">
                讓 AI 為您打造專業名片，連結無限可能的人脈網絡
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">功能</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/scanner" className="hover:text-white transition-colors">名片掃描</a></li>
                <li><a href="/builder" className="hover:text-white transition-colors">AI名片建立</a></li>
                <li><a href="/contacts" className="hover:text-white transition-colors">人脈管理</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">數據分析</a></li>
                <li><a href="/settings" className="hover:text-white transition-colors">個人設定</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">支援</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">幫助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">聯絡我們</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隱私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服務條款</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">社群</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI名片王. 保留所有權利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;