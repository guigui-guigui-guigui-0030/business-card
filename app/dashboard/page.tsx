'use client';

import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  EyeIcon, 
  ShareIcon,
  ArrowTrendingUpIcon,   // 改成這個
  GlobeAltIcon,
  CalendarIcon,
  BellIcon,
  StarIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon
} from '@heroicons/react/24/outline';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trending: 'up' | 'down';
  icon: any;
  color: string;
}

interface ActivityItem {
  id: string;
  type: 'view' | 'share' | 'connect' | 'save';
  user: string;
  timestamp: string;
  cardName: string;
}

interface NetworkData {
  platform: string;
  connections: number;
  growth: string;
  icon: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'network' | 'activity'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [stats, setStats] = useState<StatCard[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [networkData, setNetworkData] = useState<NetworkData[]>([]);

  // 模擬數據載入
  useEffect(() => {
    const mockStats: StatCard[] = [
      {
        title: '名片瀏覽量',
        value: '2,847',
        change: '+23.5%',
        trending: 'up',
        icon: EyeIcon,
        color: 'text-blue-600'
      },
      {
        title: '新增人脈',
        value: '142',
        change: '+18.2%',
        trending: 'up',
        icon: UsersIcon,
        color: 'text-green-600'
      },
      {
        title: '分享次數',
        value: '89',
        change: '-5.3%',
        trending: 'down',
        icon: ShareIcon,
        color: 'text-purple-600'
      },
      {
        title: '互動率',
        value: '67.8%',
        change: '+12.1%',
        trending: 'up',
        icon: ArrowTrendingUpIcon,
        color: 'text-orange-600'
      }
    ];

    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'view',
        user: 'John Chen',
        timestamp: '2分鐘前',
        cardName: '個人名片'
      },
      {
        id: '2',
        type: 'share',
        user: 'Sarah Wang',
        timestamp: '15分鐘前',
        cardName: '商務名片'
      },
      {
        id: '3',
        type: 'connect',
        user: 'Mike Liu',
        timestamp: '1小時前',
        cardName: '創意名片'
      },
      {
        id: '4',
        type: 'save',
        user: 'Emily Zhang',
        timestamp: '3小時前',
        cardName: '專業名片'
      }
    ];

    const mockNetworkData: NetworkData[] = [
      { platform: 'LinkedIn', connections: 1247, growth: '+8.5%', icon: '💼' },
      { platform: 'Instagram', connections: 892, growth: '+12.3%', icon: '📷' },
      { platform: 'Twitter', connections: 634, growth: '+5.7%', icon: '🐦' },
      { platform: 'Facebook', connections: 456, growth: '+3.2%', icon: '👥' },
      { platform: 'TikTok', connections: 289, growth: '+25.8%', icon: '🎵' }
    ];

    setStats(mockStats);
    setActivities(mockActivities);
    setNetworkData(mockNetworkData);
  }, [timeRange]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'view': return '👁️';
      case 'share': return '📤';
      case 'connect': return '🤝';
      case 'save': return '⭐';
      default: return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'view': return 'bg-blue-100 text-blue-800';
      case 'share': return 'bg-green-100 text-green-800';
      case 'connect': return 'bg-purple-100 text-purple-800';
      case 'save': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 頁面標題 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">數據分析儀表板</h1>
                <p className="text-sm text-gray-600">即時追蹤您的名片表現與人脈成長</p>
              </div>
            </div>
            
            {/* 時間範圍選擇器 */}
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">過去 7 天</option>
                <option value="30d">過去 30 天</option>
                <option value="90d">過去 90 天</option>
                <option value="1y">過去 1 年</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 導航標籤 */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '總覽', icon: ChartBarIcon },
              { id: 'analytics', label: '深度分析', icon: ArrowTrendingUpIcon },
              { id: 'network', label: '人脈網絡', icon: UsersIcon },
              { id: 'activity', label: '活動記錄', icon: BellIcon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 主要內容區域 */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 統計卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-50`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trending === 'up' ? (
                        <ArrowUpRightIcon className="h-4 w-4" />
                      ) : (
                        <ArrowDownRightIcon className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 圖表區域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">瀏覽量趨勢</h3>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">📊 圖表區域 (可整合 Chart.js 或 Recharts)</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">人脈成長</h3>
                <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">📈 圖表區域 (可整合 Chart.js 或 Recharts)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">社交媒體人脈分析</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {networkData.map((network, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{network.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{network.platform}</p>
                        <p className="text-2xl font-bold text-gray-900">{network.connections.toLocaleString()}</p>
                        <p className="text-sm text-green-600">{network.growth}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">最新活動</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      <span className="text-sm">{getActivityIcon(activity.type)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} {activity.type === 'view' ? '查看了' : activity.type === 'share' ? '分享了' : activity.type === 'connect' ? '連接了' : '收藏了'} 您的「{activity.cardName}」
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">深度分析</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">地理分佈</h4>
                  <div className="h-48 bg-white rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">🗺️ 地圖視圖</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">設備分析</h4>
                  <div className="h-48 bg-white rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">📱 設備統計</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}