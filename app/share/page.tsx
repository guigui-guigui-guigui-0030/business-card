'use client';

import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Share2, 
  QrCode, 
  Download, 
  Copy, 
  Send, 
  Users, 
  History, 
  Zap,
  MessageCircle,
  Mail,
  Phone,
  Globe,
  Heart,
  Star,
  Eye,
  ArrowRight,
  Smartphone,
  Radio
} from 'lucide-react';

export default function SharePage() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [shareMethod, setShareMethod] = useState('qr');
  const [showShareHistory, setShowShareHistory] = useState(false);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cards = [
    {
      id: 1,
      name: '張小明',
      title: '軟體工程師',
      company: 'TechCorp',
      avatar: '/api/placeholder/100/100',
      qrUrl: 'https://ai-card.com/u/zhang-xiaoming',
      shareCount: 142,
      viewCount: 1250
    },
    {
      id: 2,
      name: '李美華',
      title: '產品經理',
      company: 'InnovateCorp',
      avatar: '/api/placeholder/100/100',
      qrUrl: 'https://ai-card.com/u/li-meihua',
      shareCount: 89,
      viewCount: 786
    }
  ];

  const shareHistory = [
    { id: 1, method: 'QR Code', recipient: '商務會議', time: '2小時前', status: 'viewed' },
    { id: 2, method: 'NFC', recipient: '王先生', time: '1天前', status: 'saved' },
    { id: 3, method: '連結分享', recipient: 'LinkedIn', time: '2天前', status: 'shared' },
    { id: 4, method: '語音名片', recipient: '陳女士', time: '3天前', status: 'listened' }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cards[selectedCard].qrUrl);
    alert('連結已複製到剪貼簿！');
  };

  const handleDownloadQR = () => {
    const canvas = canvasRef.current;
    const svg = document.querySelector('.qr-code svg') as SVGElement;
    
    if (canvas && svg) {
      const ctx = canvas.getContext('2d');
      const data = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `${cards[selectedCard].name}-qrcode.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(data);
    }
  };

  const handleNFCShare = () => {
    if ('NDEFReader' in window) {
      setNfcEnabled(true);
      // NFC 功能實現
      alert('請將設備靠近 NFC 感應區');
    } else {
      alert('您的設備不支援 NFC 功能');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'viewed': return 'text-blue-600';
      case 'saved': return 'text-green-600';
      case 'shared': return 'text-purple-600';
      case 'listened': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'viewed': return <Eye className="w-4 h-4" />;
      case 'saved': return <Heart className="w-4 h-4" />;
      case 'shared': return <Share2 className="w-4 h-4" />;
      case 'listened': return <MessageCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            分享與交換
          </h1>
          <p className="text-gray-600">透過多種方式分享您的 AI 名片</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 名片選擇 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                選擇名片
              </h3>
              <div className="space-y-4">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCard === index
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCard(index)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={card.avatar}
                        alt={card.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{card.name}</h4>
                        <p className="text-sm text-gray-600">{card.title}</p>
                        <p className="text-xs text-gray-500">{card.company}</p>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {card.shareCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {card.viewCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 分享方法 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-600" />
                分享方式
              </h3>

              {/* 分享方法選擇 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'qr', label: 'QR Code', icon: QrCode },
                  { id: 'nfc', label: 'NFC', icon: Radio },
                  { id: 'link', label: '連結分享', icon: Globe },
                  { id: 'voice', label: '語音名片', icon: MessageCircle }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setShareMethod(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      shareMethod === id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* QR Code 分享 */}
              {shareMethod === 'qr' && (
                <div className="text-center">
                  <div className="inline-block p-6 bg-white rounded-xl shadow-md qr-code">
                    <QRCodeSVG
                      value={cards[selectedCard].qrUrl}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="M"
                    />
                  </div>
                  <p className="mt-4 text-gray-600 mb-4">
                    掃描此 QR Code 查看 {cards[selectedCard].name} 的名片
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleDownloadQR}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      下載 QR Code
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      複製連結
                    </button>
                  </div>
                </div>
              )}

              {/* NFC 分享 */}
              {shareMethod === 'nfc' && (
                <div className="text-center">
                  <div className="inline-block p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                    <Smartphone className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">NFC 近場通訊</h4>
                    <p className="text-blue-100">輕觸即可分享名片</p>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={handleNFCShare}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        nfcEnabled
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={nfcEnabled}
                    >
                      {nfcEnabled ? (
                        <>
                          <Zap className="w-4 h-4 inline mr-2" />
                          NFC 已啟用
                        </>
                      ) : (
                        <>
                          <Radio className="w-4 h-4 inline mr-2" />
                          啟用 NFC 分享
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* 連結分享 */}
              {shareMethod === 'link' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <input
                      type="text"
                      value={cards[selectedCard].qrUrl}
                      readOnly
                      className="flex-1 bg-transparent text-gray-700 focus:outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Email', 'WhatsApp', 'Telegram', 'Line'].map((platform) => (
                      <button
                        key={platform}
                        className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 語音名片 */}
              {shareMethod === 'voice' && (
                <div className="text-center">
                  <div className="inline-block p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2">語音名片</h4>
                    <p className="text-orange-100">錄製語音介紹分享</p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">錄製中...</span>
                      <span className="text-sm text-gray-500">0:23</span>
                    </div>
                    <div className="flex justify-center gap-4">
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        停止錄製
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        播放預覽
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 分享歷史 */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <History className="w-5 h-5 text-green-600" />
              分享歷史
            </h3>
            <button
              onClick={() => setShowShareHistory(!showShareHistory)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {showShareHistory ? '收起' : '展開'}
            </button>
          </div>
          
          {showShareHistory && (
            <div className="space-y-4">
              {shareHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(item.status)} bg-opacity-10`}>
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.method}</h4>
                      <p className="text-sm text-gray-600">分享給：{item.recipient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{item.time}</p>
                    <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'viewed' && '已查看'}
                      {item.status === 'saved' && '已保存'}
                      {item.status === 'shared' && '已分享'}
                      {item.status === 'listened' && '已聆聽'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}