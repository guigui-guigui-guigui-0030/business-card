'use client';

import { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  CreditCard,
  Eye,
  EyeOff,
  Camera,
  Edit3,
  Save,
  RefreshCw,
  LogOut,
  Trash2,
  Download,
  Upload,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Mail,
  MessageSquare,
  Share2,
  Heart,
  Star,
  ChevronRight,
  Info,
  HelpCircle,
  ExternalLink,
  Phone
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDirectMessage: true,
    showOnlineStatus: true
  });
  const [language, setLanguage] = useState('zh-TW');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const settingsTabs = [
    { id: 'profile', label: '個人資料', icon: User, color: 'blue' },
    { id: 'notifications', label: '通知設定', icon: Bell, color: 'yellow' },
    { id: 'privacy', label: '隱私設定', icon: Shield, color: 'green' },
    { id: 'appearance', label: '外觀設定', icon: Palette, color: 'purple' },
    { id: 'language', label: '語言設定', icon: Globe, color: 'indigo' },
    { id: 'data', label: '資料管理', icon: Database, color: 'gray' },
    { id: 'billing', label: '帳單設定', icon: CreditCard, color: 'emerald' },
    { id: 'support', label: '支援協助', icon: HelpCircle, color: 'orange' }
  ];

  const handleSave = () => {
    alert('設定已儲存！');
  };

  const handleLogout = () => {
    if (confirm('確定要登出嗎？')) {
      // 執行登出邏輯
      alert('已登出');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('確定要刪除帳號嗎？此操作無法復原。')) {
      // 執行刪除帳號邏輯
      alert('帳號刪除流程已啟動');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            個人設定
          </h1>
          <p className="text-gray-600">管理您的帳戶和偏好設定</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 側邊欄 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? `bg-${tab.color}-50 text-${tab.color}-600 border-l-4 border-${tab.color}-600`
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 主要內容 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* 個人資料 */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <User className="w-6 h-6 text-blue-600" />
                    <h2 className="text-2xl font-semibold">個人資料</h2>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <img
                        src="/api/placeholder/120/120"
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">張小明</h3>
                      <p className="text-gray-600">軟體工程師</p>
                      <button className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-700">
                        <Edit3 className="w-4 h-4" />
                        編輯頭像
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                      <input
                        type="text"
                        defaultValue="張小明"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">職稱</label>
                      <input
                        type="text"
                        defaultValue="軟體工程師"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">公司</label>
                      <input
                        type="text"
                        defaultValue="TechCorp"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">電話</label>
                      <input
                        type="tel"
                        defaultValue="+886 912 345 678"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">電子郵件</label>
                      <input
                        type="email"
                        defaultValue="zhang.xiaoming@techcorp.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">個人簡介</label>
                      <textarea
                        defaultValue="擁有5年軟體開發經驗，專精於前端技術和使用者體驗設計。"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      儲存變更
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <RefreshCw className="w-4 h-4" />
                      重置
                    </button>
                  </div>
                </div>
              )}

              {/* 通知設定 */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Bell className="w-6 h-6 text-yellow-600" />
                    <h2 className="text-2xl font-semibold">通知設定</h2>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'email', label: '電子郵件通知', icon: Mail, desc: '接收重要更新和活動通知' },
                      { key: 'push', label: '推播通知', icon: Smartphone, desc: '在手機上接收即時通知' },
                      { key: 'sms', label: '簡訊通知', icon: MessageSquare, desc: '接收重要安全提醒' },
                      { key: 'marketing', label: '行銷通知', icon: Share2, desc: '接收產品更新和優惠資訊' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium">{item.label}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-3">通知時間</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">開始時間</label>
                        <input
                          type="time"
                          defaultValue="09:00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">結束時間</label>
                        <input
                          type="time"
                          defaultValue="22:00"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 隱私設定 */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-semibold">隱私設定</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">個人資料可見度</h3>
                      <div className="space-y-2">
                        {[
                          { value: 'public', label: '公開', desc: '所有人都可以查看' },
                          { value: 'contacts', label: '聯絡人', desc: '只有聯絡人可以查看' },
                          { value: 'private', label: '私人', desc: '只有自己可以查看' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option.value}
                              checked={privacy.profileVisibility === option.value}
                              onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                              className="w-4 h-4 text-blue-600"
                            />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">聯絡資訊顯示</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'showEmail', label: '顯示電子郵件', icon: Mail },
                          { key: 'showPhone', label: '顯示電話號碼', icon: Phone },
                          { key: 'allowDirectMessage', label: '允許直接訊息', icon: MessageSquare },
                          { key: 'showOnlineStatus', label: '顯示在線狀態', icon: Eye }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5 text-gray-600" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <button
                              onClick={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                              className={`w-12 h-6 rounded-full transition-colors ${
                                privacy[item.key] ? 'bg-green-600' : 'bg-gray-300'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                privacy[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">隱私提醒</h4>
                      </div>
                      <p className="text-sm text-yellow-700">
                        變更隱私設定可能會影響其他人查看您名片的方式。請確認您的設定符合您的需求。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 外觀設定 */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Palette className="w-6 h-6 text-purple-600" />
                    <h2 className="text-2xl font-semibold">外觀設定</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">主題模式</h3>
                      <div className="flex gap-4">
                        {[
                          { value: 'light', label: '淺色模式', icon: Sun },
                          { value: 'dark', label: '深色模式', icon: Moon },
                          { value: 'auto', label: '自動', icon: Monitor }
                        ].map((theme) => (
                          <button
                            key={theme.value}
                            onClick={() => setIsDarkMode(theme.value === 'dark')}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                              (theme.value === 'dark' && isDarkMode) || (theme.value === 'light' && !isDarkMode)
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <theme.icon className="w-6 h-6" />
                            <span className="text-sm font-medium">{theme.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">字體大小</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">小</span>
                        <input
                          type="range"
                          min="12"
                          max="20"
                          defaultValue="16"
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm">大</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">音效設定</h3>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {soundEnabled ? (
                            <Volume2 className="w-5 h-5 text-gray-600" />
                          ) : (
                            <VolumeX className="w-5 h-5 text-gray-600" />
                          )}
                          <span className="font-medium">啟用音效</span>
                        </div>
                        <button
                          onClick={() => setSoundEnabled(!soundEnabled)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            soundEnabled ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                            soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">動畫效果</h3>
                      <div className="space-y-2">
                        {[
                          { label: '減少動畫', desc: '降低動畫效果以提升性能' },
                          { label: '平滑滾動', desc: '啟用平滑滾動效果' },
                          { label: '視差效果', desc: '啟用背景視差滾動' }
                        ].map((option, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.desc}</div>
                            </div>
                            <button className="w-12 h-6 bg-gray-300 rounded-full">
                              <div className="w-5 h-5 bg-white rounded-full shadow-md translate-x-0.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 語言設定 */}
              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-semibold">語言設定</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-3">介面語言</h3>
                      <div className="space-y-2">
                        {[
                          { value: 'zh-TW', label: '繁體中文', region: '台灣' },
                          { value: 'zh-CN', label: '简体中文', region: '中国' },
                          { value: 'en-US', label: 'English', region: 'United States' },
                          { value: 'ja-JP', label: '日本語', region: '日本' },
                          { value: 'ko-KR', label: '한국어', region: '한국' }
                        ].map((lang) => (
                          <label key={lang.value} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                            <input
                              type="radio"
                              name="language"
                              value={lang.value}
                              checked={language === lang.value}
                              onChange={(e) => setLanguage(e.target.value)}
                              className="w-4 h-4 text-indigo-600"
                            />
                            <div>
                              <div className="font-medium">{lang.label}</div>
                              <div className="text-sm text-gray-600">{lang.region}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">日期格式</h3>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>2024/01/15</option>
                        <option>01/15/2024</option>
                        <option>15/01/2024</option>
                        <option>2024-01-15</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">時間格式</h3>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="timeFormat" value="12" className="w-4 h-4 text-indigo-600" />
                          <span>12小時制</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="timeFormat" value="24" className="w-4 h-4 text-indigo-600" defaultChecked />
                          <span>24小時制</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 資料管理 */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Database className="w-6 h-6 text-gray-600" />
                    <h2 className="text-2xl font-semibold">資料管理</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">資料匯出</h3>
                      <div className="space-y-3">
                        {[
                          { label: '個人資料', desc: '匯出您的個人資料和設定' },
                          { label: '聯絡人資料', desc: '匯出所有聯絡人資訊' },
                          { label: '名片資料', desc: '匯出您建立的所有名片' },
                          { label: '分享記錄', desc: '匯出名片分享和互動記錄' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                              <Download className="w-4 h-4" />
                              匯出
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">資料匯入</h3>
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-600 mb-2">拖放檔案到此處或點擊選擇</p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          選擇檔案
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h3 className="font-medium text-red-800 mb-2">危險區域</h3>
                      <p className="text-sm text-red-700 mb-4">
                        以下操作無法復原，請謹慎使用。
                      </p>
                      <div className="space-y-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          <Trash2 className="w-4 h-4" />
                          清除所有資料
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center gap-2 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          刪除帳號
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 帳單設定 */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <CreditCard className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl font-semibold">帳單設定</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white">
                      <h3 className="text-xl font-semibold mb-2">免費方案</h3>
                      <p className="text-emerald-100">您目前使用的是免費方案</p>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4" />
                          <span>基本名片建立</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4" />
                          <span>最多 100 位聯絡人</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          <span>基本分析功能</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold mb-2">專業方案</h4>
                        <p className="text-2xl font-bold mb-2">
                          $9.99 <span className="text-sm font-normal text-gray-600">/月</span>
                        </p>
                        <ul className="text-sm space-y-1 mb-4">
                          <li>• 無限制名片建立</li>
                          <li>• 無限制聯絡人</li>
                          <li>• 進階分析功能</li>
                          <li>• 自定義範本</li>
                        </ul>
                        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          升級
                        </button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold mb-2">企業方案</h4>
                        <p className="text-2xl font-bold mb-2">
                          $19.99 <span className="text-sm font-normal text-gray-600">/月</span>
                        </p>
                        <ul className="text-sm space-y-1 mb-4">
                          <li>• 專業方案所有功能</li>
                          <li>• 團隊協作功能</li>
                          <li>• 白牌解決方案</li>
                          <li>• 優先客戶支援</li>
                        </ul>
                        <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          升級
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">付款方式</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <div className="flex-1">
                            <div className="font-medium">**** **** **** 1234</div>
                            <div className="text-sm text-gray-600">有效期限：12/2025</div>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            編輯
                          </button>
                        </div>
                        <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          + 新增付款方式
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 支援協助 */}
              {activeTab === 'support' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <HelpCircle className="w-6 h-6 text-orange-600" />
                    <h2 className="text-2xl font-semibold">支援協助</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">常見問題</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          查看常見問題解答
                        </p>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                          <span>查看 FAQ</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">使用教學</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          觀看影片教學和指南
                        </p>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                          <span>觀看教學</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold mb-3">聯絡客服</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span>support@ai-card.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-5 h-5 text-gray-600" />
                          <span>線上客服 (週一至週五 9:00-18:00)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">意見回饋</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        告訴我們您的建議和意見
                      </p>
                      <textarea
                        placeholder="請輸入您的意見..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        提交意見
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 底部操作按鈕 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    儲存所有設定
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    登出
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}