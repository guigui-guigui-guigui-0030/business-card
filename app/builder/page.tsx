'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  avatar: string;
  template: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundPattern: string;
}

const templates = [
  { id: 'modern', name: '現代風格', preview: '/api/placeholder/300/200' },
  { id: 'classic', name: '經典風格', preview: '/api/placeholder/300/200' },
  { id: 'minimal', name: '極簡風格', preview: '/api/placeholder/300/200' },
  { id: 'creative', name: '創意風格', preview: '/api/placeholder/300/200' },
  { id: 'professional', name: '專業風格', preview: '/api/placeholder/300/200' },
  { id: 'artistic', name: '藝術風格', preview: '/api/placeholder/300/200' },
];

const colorPalettes = [
  { name: '深藍商務', primary: '#1e40af', secondary: '#3b82f6' },
  { name: '紫色創意', primary: '#7c3aed', secondary: '#a855f7' },
  { name: '綠色清新', primary: '#059669', secondary: '#10b981' },
  { name: '橙色活力', primary: '#ea580c', secondary: '#f97316' },
  { name: '粉色溫暖', primary: '#db2777', secondary: '#ec4899' },
  { name: '黑色經典', primary: '#374151', secondary: '#6b7280' },
];

const backgroundPatterns = [
  { id: 'none', name: '無' },
  { id: 'dots', name: '點點' },
  { id: 'lines', name: '線條' },
  { id: 'grid', name: '格子' },
  { id: 'waves', name: '波浪' },
  { id: 'geometric', name: '幾何' },
];

export default function BuilderPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [cardData, setCardData] = useState<CardData>({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      linkedin: '',
      twitter: '',
    },
    avatar: '',
    template: 'modern',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    backgroundPattern: 'none',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('socialLinks.')) {
      const socialField = field.split('.')[1];
      setCardData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setCardData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCardData(prev => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIAvatar = async () => {
    setIsGeneratingAI(true);
    try {
      // 模擬 AI 頭像生成
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCardData(prev => ({ ...prev, avatar: '/api/placeholder/150/150' }));
    } catch (error) {
      console.error('AI 頭像生成失敗:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const generateAIColorSuggestion = async () => {
    setIsGeneratingAI(true);
    try {
      // 模擬 AI 配色建議
      await new Promise(resolve => setTimeout(resolve, 2000));
      const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      setCardData(prev => ({
        ...prev,
        primaryColor: randomPalette.primary,
        secondaryColor: randomPalette.secondary
      }));
    } catch (error) {
      console.error('AI 配色建議失敗:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSaveCard = async () => {
    setIsSaving(true);
    try {
      // 模擬保存名片
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/dashboard?cardCreated=true');
    } catch (error) {
      console.error('保存名片失敗:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">基本資訊</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入您的姓名"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  職位 *
                </label>
                <input
                  type="text"
                  value={cardData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入您的職位"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司名稱 *
                </label>
                <input
                  type="text"
                  value={cardData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入公司名稱"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  聯絡電話 *
                </label>
                <input
                  type="tel"
                  value={cardData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入聯絡電話"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電子信箱 *
                </label>
                <input
                  type="email"
                  value={cardData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入電子信箱"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  網站
                </label>
                <input
                  type="url"
                  value={cardData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="請輸入網站網址"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                地址
              </label>
              <textarea
                value={cardData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="請輸入地址"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">頭像設定</h3>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {cardData.avatar ? (
                  <img src={cardData.avatar} alt="頭像" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
              
              <div className="flex space-x-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  上傳頭像
                </button>
                
                <button
                  onClick={generateAIAvatar}
                  disabled={isGeneratingAI}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isGeneratingAI
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white`}
                >
                  {isGeneratingAI ? '生成中...' : 'AI 生成頭像'}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">社交媒體連結</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={cardData.socialLinks.instagram}
                    onChange={(e) => handleInputChange('socialLinks.instagram', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://instagram.com/yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={cardData.socialLinks.facebook}
                    onChange={(e) => handleInputChange('socialLinks.facebook', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://facebook.com/yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={cardData.socialLinks.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={cardData.socialLinks.twitter}
                    onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">選擇模板</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleInputChange('template', template.id)}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    cardData.template === template.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">{template.name}</span>
                  </div>
                  <h4 className="text-center font-medium text-gray-800">{template.name}</h4>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-800">配色方案</h4>
                <button
                  onClick={generateAIColorSuggestion}
                  disabled={isGeneratingAI}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isGeneratingAI
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  } text-white`}
                >
                  {isGeneratingAI ? '生成中...' : 'AI 配色建議'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorPalettes.map((palette, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleInputChange('primaryColor', palette.primary);
                      handleInputChange('secondaryColor', palette.secondary);
                    }}
                    className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                      cardData.primaryColor === palette.primary
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex space-x-2 mb-2">
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: palette.primary }}
                      ></div>
                      <div 
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: palette.secondary }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-gray-800">{palette.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">背景圖案</h4>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {backgroundPatterns.map((pattern) => (
                  <div
                    key={pattern.id}
                    onClick={() => handleInputChange('backgroundPattern', pattern.id)}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      cardData.backgroundPattern === pattern.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-xs text-gray-500">{pattern.name}</span>
                    </div>
                    <p className="text-xs text-center font-medium text-gray-800">{pattern.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">預覽與儲存</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">名片預覽</h4>
              
              {/* 名片預覽區域 */}
              <div className="max-w-md mx-auto">
                <div 
                  className="bg-white rounded-lg shadow-lg p-6 aspect-[1.6/1]"
                  style={{ 
                    background: `linear-gradient(135deg, ${cardData.primaryColor}10, ${cardData.secondaryColor}10)`,
                    border: `2px solid ${cardData.primaryColor}20`
                  }}
                >
                  <div className="flex items-start space-x-4 h-full">
                    <div className="flex-shrink-0">
                      {cardData.avatar ? (
                        <img 
                          src={cardData.avatar} 
                          alt="頭像" 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h5 
                        className="text-lg font-bold truncate"
                        style={{ color: cardData.primaryColor }}
                      >
                        {cardData.name || '您的姓名'}
                      </h5>
                      <p 
                        className="text-sm font-medium truncate"
                        style={{ color: cardData.secondaryColor }}
                      >
                        {cardData.title || '職位'}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {cardData.company || '公司名稱'}
                      </p>
                      
                      <div className="mt-3 space-y-1">
                        {cardData.phone && (
                          <p className="text-xs text-gray-600 truncate">📞 {cardData.phone}</p>
                        )}
                        {cardData.email && (
                          <p className="text-xs text-gray-600 truncate">✉️ {cardData.email}</p>
                        )}
                        {cardData.website && (
                          <p className="text-xs text-gray-600 truncate">🌐 {cardData.website}</p>
                        )}
                      </div>
                      
                      {/* 社交媒體圖標 */}
                      <div className="flex space-x-2 mt-2">
                        {cardData.socialLinks.instagram && (
                          <div className="w-4 h-4 bg-pink-500 rounded"></div>
                        )}
                        {cardData.socialLinks.facebook && (
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        )}
                        {cardData.socialLinks.linkedin && (
                          <div className="w-4 h-4 bg-blue-700 rounded"></div>
                        )}
                        {cardData.socialLinks.twitter && (
                          <div className="w-4 h-4 bg-sky-500 rounded"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">
                  請確認所有資訊正確無誤，儲存後可在個人設定中修改。
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleSaveCard}
                disabled={isSaving}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
                  isSaving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isSaving ? '儲存中...' : '儲存名片'}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-600 hover:text-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">AI 名片建立器</h1>
            </div>
            <div className="text-sm text-gray-600">
              步驟 {currentStep} / 4
            </div>
          </div>
        </div>
      </div>

      {/* 進度條 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-700">
                    {step === 1 && '基本資訊'}
                    {step === 2 && '頭像設定'}
                    {step === 3 && '選擇模板'}
                    {step === 4 && '預覽儲存'}
                  </div>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-0.5 ml-4 ${
                    step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderStepContent()}
        </div>

        {/* 底部按鈕 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            上一步
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              下一步
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}