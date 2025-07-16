'use client';

import { useState, useEffect } from 'react';
import { 
  ShareIcon, 
  LinkIcon, 
  PlusIcon, 
  CheckIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  StarIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  followers: number;
  engagement: string;
  lastSync: string;
  url?: string;
}

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  timestamp: string;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
}

interface SocialTemplate {
  id: string;
  name: string;
  description: string;
  platforms: string[];
  thumbnail: string;
}

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'platforms' | 'posts' | 'templates' | 'analytics'>('platforms');
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [templates, setTemplates] = useState<SocialTemplate[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  // 模擬數據載入
  useEffect(() => {
    const mockPlatforms: SocialPlatform[] = [
      {
        id: 'instagram',
        name: 'Instagram',
        icon: '📷',
        color: 'bg-gradient-to-r from-purple-500 to-pink-500',
        connected: true,
        followers: 1247,
        engagement: '4.2%',
        lastSync: '5分鐘前',
        url: 'https://instagram.com/yourprofile'
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        color: 'bg-blue-600',
        connected: true,
        followers: 892,
        engagement: '6.8%',
        lastSync: '10分鐘前',
        url: 'https://linkedin.com/in/yourprofile'
      },
      {
        id: 'twitter',
        name: 'Twitter/X',
        icon: '🐦',
        color: 'bg-gray-900',
        connected: false,
        followers: 634,
        engagement: '2.1%',
        lastSync: '1小時前'
      },
      {
        id: 'facebook',
        name: 'Facebook',
        icon: '👥',
        color: 'bg-blue-800',
        connected: true,
        followers: 456,
        engagement: '3.5%',
        lastSync: '30分鐘前'
      },
      {
        id: 'tiktok',
        name: 'TikTok',
        icon: '🎵',
        color: 'bg-gray-900',
        connected: false,
        followers: 289,
        engagement: '8.9%',
        lastSync: '2小時前'
      },
      {
        id: 'youtube',
        name: 'YouTube',
        icon: '🎬',
        color: 'bg-red-600',
        connected: true,
        followers: 178,
        engagement: '5.3%',
        lastSync: '15分鐘前'
      },
      {
        id: 'discord',
        name: 'Discord',
        icon: '💬',
        color: 'bg-indigo-600',
        connected: false,
        followers: 123,
        engagement: '12.4%',
        lastSync: '3小時前'
      },
      {
        id: 'telegram',
        name: 'Telegram',
        icon: '✈️',
        color: 'bg-blue-500',
        connected: false,
        followers: 89,
        engagement: '7.2%',
        lastSync: '1小時前'
      }
    ];

    const mockPosts: SocialPost[] = [
      {
        id: '1',
        platform: 'Instagram',
        content: '剛更新了我的 AI 名片！新增了動態效果和個人品牌色彩 ✨',
        timestamp: '2小時前',
        likes: 24,
        shares: 8,
        comments: 5,
        reach: 312
      },
      {
        id: '2',
        platform: 'LinkedIn',
        content: '透過 AI 名片王建立了專業的數位名片，大幅提升了商務網絡效率！',
        timestamp: '5小時前',
        likes: 18,
        shares: 12,
        comments: 7,
        reach: 245
      },
      {
        id: '3',
        platform: 'Facebook',
        content: '分享我的創意名片設計，支援 NFC 和 QR Code 快速交換聯絡方式！',
        timestamp: '1天前',
        likes: 32,
        shares: 15,
        comments: 9,
        reach: 487
      }
    ];

    const mockTemplates: SocialTemplate[] = [
      {
        id: '1',
        name: '專業商務',
        description: '適合企業主管和商務人士的正式風格',
        platforms: ['LinkedIn', 'Facebook'],
        thumbnail: '💼'
      },
      {
        id: '2',
        name: '創意設計',
        description: '展現個人創意和藝術風格',
        platforms: ['Instagram', 'TikTok'],
        thumbnail: '🎨'
      },
      {
        id: '3',
        name: '科技極客',
        description: '技術專業人士的現代化設計',
        platforms: ['Twitter', 'Discord'],
        thumbnail: '⚡'
      },
      {
        id: '4',
        name: '社交達人',
        description: '適合社交媒體影響者的活潑風格',
        platforms: ['Instagram', 'TikTok', 'YouTube'],
        thumbnail: '🌟'
      }
    ];

    setPlatforms(mockPlatforms);
    setPosts(mockPosts);
    setTemplates(mockTemplates);
  }, []);

  const handleConnectPlatform = (platformId: string) => {
    setSelectedPlatform(platformId);
    setShowConnectModal(true);
  };

  const handleDisconnectPlatform = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, connected: false } : p
    ));
  };

  const handleShareToSocial = () => {
    if (selectedPlatforms.length === 0 || !postContent.trim()) {
      alert('請選擇平台並輸入內容');
      return;
    }

    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform: selectedPlatforms.join(', '),
      content: postContent,
      timestamp: '剛剛',
      likes: 0,
      shares: 0,
      comments: 0,
      reach: 0
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setSelectedPlatforms([]);
    alert('已發布到選定的社交平台！');
  };

  const getPlatformIcon = (platformName: string) => {
    const platform = platforms.find(p => p.name === platformName);
    return platform?.icon || '📱';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* 頁面標題 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ShareIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">社交媒體整合</h1>
                <p className="text-sm text-gray-600">連接您的社交平台，擴大名片影響力</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>新增平台</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 導航標籤 */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'platforms', label: '平台管理', icon: LinkIcon },
              { id: 'posts', label: '發布內容', icon: ChatBubbleLeftIcon },
              { id: 'templates', label: '模板庫', icon: StarIcon },
              { id: 'analytics', label: '社交分析', icon: ChartBarIcon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-purple-100 text-purple-700 border-b-2 border-purple-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 平台管理 */}
        {activeTab === 'platforms' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">已連接的平台</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                          <span className="text-lg">{platform.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{platform.name}</h4>
                          <p className="text-sm text-gray-500">{platform.followers.toLocaleString()} 追蹤者</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        platform.connected 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {platform.connected ? '已連接' : '未連接'}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">互動率</span>
                        <span className="font-medium">{platform.engagement}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">最後同步</span>
                        <span className="font-medium">{platform.lastSync}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {platform.connected ? (
                        <>
                          <button
                            onClick={() => handleDisconnectPlatform(platform.id)}
                            className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            中斷連接
                          </button>
                          <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                            設定
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnectPlatform(platform.id)}
                          className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                          連接
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 發布內容 */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* 發布新內容 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">發布新內容</h3>
              
              <div className="space-y-4">
                {/* 選擇平台 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">選擇發布平台</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {platforms.filter(p => p.connected).map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => {
                          if (selectedPlatforms.includes(platform.id)) {
                            setSelectedPlatforms(selectedPlatforms.filter(id => id !== platform.id));
                          } else {
                            setSelectedPlatforms([...selectedPlatforms, platform.id]);
                          }
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{platform.icon}</span>
                          <span className="text-sm font-medium">{platform.name}</span>
                          {selectedPlatforms.includes(platform.id) && (
                            <CheckIcon className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 內容輸入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">發布內容</label>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="分享您的 AI 名片，讓更多人認識您..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">
                      {postContent.length}/280 字元
                    </span>
                    <span className="text-sm text-gray-500">
                      已選擇 {selectedPlatforms.length} 個平台
                    </span>
                  </div>
                </div>

                {/* 發布選項 */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <span>📷</span>
                      <span>添加圖片</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <span>🔗</span>
                      <span>附加名片</span>
                    </button>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      儲存草稿
                    </button>
                    <button
                      onClick={handleShareToSocial}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      立即發布
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 發布歷史 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">發布歷史</h3>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{getPlatformIcon(post.platform)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{post.platform}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <HeartIcon className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ShareIcon className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ChatBubbleLeftIcon className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <EyeIcon className="h-4 w-4" />
                            <span>{post.reach}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 模板庫 */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">社交模板庫</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="text-center">
                        <div className="text-4xl mb-3">{template.thumbnail}</div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {template.platforms.map((platform) => (
                            <span key={platform} className="px-2 py-1 bg-white text-xs font-medium text-gray-700 rounded-full">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          使用模板
                        </button>
                        <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          預覽
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 社交分析 */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">總追蹤者</p>
                    <p className="text-2xl font-bold text-gray-900">3,456</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <HeartIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">總互動</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShareIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">總分享</p>
                    <p className="text-2xl font-bold text-gray-900">567</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <EyeIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">總觸及</p>
                    <p className="text-2xl font-bold text-gray-900">8,901</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">平台表現分析</h3>
              <div className="h-64 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">📊 社交分析圖表區域 (可整合 Chart.js 或 Recharts)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 連接平台模態框 */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              連接 {platforms.find(p => p.id === selectedPlatform)?.name}
            </h3>
            <p className="text-gray-600 mb-6">
              您將被重新導向到 {platforms.find(p => p.id === selectedPlatform)?.name} 進行授權驗證。
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  // 模擬連接成功
                  setPlatforms(platforms.map(p => 
                    p.id === selectedPlatform ? { ...p, connected: true } : p
                  ));
                  setShowConnectModal(false);
                }}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                連接
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}