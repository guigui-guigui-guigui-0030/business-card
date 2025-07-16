'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  User, 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Star, 
  Edit3, 
  Trash2, 
  Grid, 
  List, 
  SortAsc, 
  SortDesc,
  Tag,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  UserCheck,
  Calendar,
  Clock,
  X
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  avatar?: string;
  favorite: boolean;
  category: string;
  tags: string[];
  addedDate: string;
  lastContact: string;
  notes: string;
  socialLinks: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactDetail, setShowContactDetail] = useState(false);

  const categories = [
    { id: 'all', name: '全部', count: 0 },
    { id: 'work', name: '工作', count: 0 },
    { id: 'client', name: '客戶', count: 0 },
    { id: 'partner', name: '合作夥伴', count: 0 },
    { id: 'friend', name: '朋友', count: 0 },
    { id: 'family', name: '家人', count: 0 },
    { id: 'other', name: '其他', count: 0 }
  ];

  // 模擬資料
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: '張小明',
        company: '科技創新有限公司',
        position: '產品經理',
        phone: '+886-2-1234-5678',
        email: 'xiaoming.zhang@tech-innovation.com',
        address: '台北市信義區信義路五段7號',
        website: 'www.tech-innovation.com',
        favorite: true,
        category: 'work',
        tags: ['產品', '科技', '創新'],
        addedDate: '2024-01-15',
        lastContact: '2024-01-10',
        notes: '對AI產品很有興趣，可以合作開發新功能',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/xiaoming-zhang',
          facebook: 'https://facebook.com/xiaoming.zhang'
        }
      },
      {
        id: '2',
        name: '李美華',
        company: '數位行銷公司',
        position: '行銷總監',
        phone: '+886-2-2345-6789',
        email: 'meihua.li@digital-marketing.com',
        address: '台北市大安區復興南路一段100號',
        website: 'www.digital-marketing.com',
        favorite: false,
        category: 'client',
        tags: ['行銷', '數位', '社群'],
        addedDate: '2024-01-20',
        lastContact: '2024-01-18',
        notes: '專精於社群媒體行銷，可以協助推廣',
        socialLinks: {
          instagram: 'https://instagram.com/meihua_li',
          twitter: 'https://twitter.com/meihua_li'
        }
      },
      {
        id: '3',
        name: '王大偉',
        company: '創投基金',
        position: '投資經理',
        phone: '+886-2-3456-7890',
        email: 'dawei.wang@venture-capital.com',
        address: '台北市中山區南京東路二段200號',
        website: 'www.venture-capital.com',
        favorite: true,
        category: 'partner',
        tags: ['投資', '創業', '金融'],
        addedDate: '2024-01-25',
        lastContact: '2024-01-22',
        notes: '對新創公司投資有興趣，可以洽談合作',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/dawei-wang'
        }
      },
      {
        id: '4',
        name: '陳雅婷',
        company: '設計工作室',
        position: '創意總監',
        phone: '+886-2-4567-8901',
        email: 'yating.chen@design-studio.com',
        address: '台北市士林區中正路300號',
        website: 'www.design-studio.com',
        favorite: false,
        category: 'work',
        tags: ['設計', '創意', 'UI/UX'],
        addedDate: '2024-02-01',
        lastContact: '2024-01-28',
        notes: '設計能力很強，可以合作UI/UX設計',
        socialLinks: {
          instagram: 'https://instagram.com/yating_design',
          facebook: 'https://facebook.com/yating.chen'
        }
      }
    ];
    
    setContacts(mockContacts);
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'company':
        aValue = a.company;
        bValue = b.company;
        break;
      case 'date':
        aValue = a.addedDate;
        bValue = b.addedDate;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
    ));
  };

  const deleteContact = (id: string) => {
    if (confirm('確定要刪除這個聯絡人嗎？')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const openContactDetail = (contact: Contact) => {
    setSelectedContact(contact);
    setShowContactDetail(true);
  };

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.avatar ? (
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
            ) : (
              contact.name.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.position}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleFavorite(contact.id)}
            className={`p-1 rounded-full hover:bg-gray-100 ${
              contact.favorite ? 'text-yellow-500' : 'text-gray-400'
            }`}
          >
            <Star size={16} fill={contact.favorite ? 'currentColor' : 'none'} />
          </button>
          
          <div className="relative group">
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
              <MoreHorizontal size={16} />
            </button>
            <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg py-2 z-10 hidden group-hover:block">
              <button
                onClick={() => openContactDetail(contact)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Eye size={14} />
                <span>查看詳情</span>
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                <Edit3 size={14} />
                <span>編輯</span>
              </button>
              <button
                onClick={() => deleteContact(contact.id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center space-x-2"
              >
                <Trash2 size={14} />
                <span>刪除</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Building size={14} />
          <span>{contact.company}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone size={14} />
          <span>{contact.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail size={14} />
          <span>{contact.email}</span>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {contact.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>加入: {contact.addedDate}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
            <MessageCircle size={14} />
          </button>
          <button className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200">
            <Phone size={14} />
          </button>
          <button className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const ContactListItem = ({ contact }: { contact: Contact }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.avatar ? (
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
            ) : (
              contact.name.charAt(0)
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-800">{contact.name}</h3>
              {contact.favorite && (
                <Star size={14} className="text-yellow-500" fill="currentColor" />
              )}
            </div>
            <p className="text-sm text-gray-600">{contact.position} • {contact.company}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>{contact.email}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(contact.id)}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                contact.favorite ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              <Star size={16} fill={contact.favorite ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={() => openContactDetail(contact)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <Eye size={16} />
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
              <Edit3 size={16} />
            </button>
            
            <button
              onClick={() => deleteContact(contact.id)}
              className="p-2 rounded-full hover:bg-gray-100 text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <UserCheck className="inline-block mr-2 text-blue-600" size={32} />
            人脈管理
          </h1>
          <p className="text-gray-600">管理您的聯絡人和建立強大的人脈網絡</p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">總聯絡人</p>
                <p className="text-2xl font-bold text-blue-600">{contacts.length}</p>
              </div>
              <User className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">收藏聯絡人</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {contacts.filter(c => c.favorite).length}
                </p>
              </div>
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">工作聯絡人</p>
                <p className="text-2xl font-bold text-green-600">
                  {contacts.filter(c => c.category === 'work').length}
                </p>
              </div>
              <Building className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本月新增</p>
                <p className="text-2xl font-bold text-purple-600">
                  {contacts.filter(c => c.addedDate.includes('2024-01')).length}
                </p>
              </div>
              <Calendar className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        {/* 搜尋和篩選 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="搜尋聯絡人..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Filter size={16} />
                <span>篩選</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus size={16} />
                <span>新增聯絡人</span>
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">分類:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">排序:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'company' | 'date')}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">姓名</option>
                    <option value="company">公司</option>
                    <option value="date">日期</option>
                  </select>
                </div>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 聯絡人列表 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              聯絡人列表 ({sortedContacts.length})
            </h2>
          </div>
          
          {sortedContacts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <User className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">尚無聯絡人</h3>
              <p className="text-gray-600 mb-6">開始掃描名片或手動新增聯絡人吧！</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                新增聯絡人
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {sortedContacts.map(contact => (
                <div key={contact.id}>
                  {viewMode === 'grid' ? (
                    <ContactCard contact={contact} />
                  ) : (
                    <ContactListItem contact={contact} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 聯絡人詳情模態框 */}
        {showContactDetail && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">聯絡人詳情</h3>
                  <button
                    onClick={() => setShowContactDetail(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selectedContact.avatar ? (
                      <img src={selectedContact.avatar} alt={selectedContact.name} className="w-20 h-20 rounded-full" />
                    ) : (
                      selectedContact.name.charAt(0)
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">{selectedContact.name}</h4>
                  <p className="text-gray-600">{selectedContact.position} • {selectedContact.company}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">電話</p>
                        <p className="font-medium">{selectedContact.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">電子信箱</p>
                        <p className="font-medium">{selectedContact.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Globe className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">網站</p>
                        <p className="font-medium">{selectedContact.website}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-blue-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">地址</p>
                        <p className="font-medium">{selectedContact.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Tag className="text-blue-600 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">標籤</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedContact.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedContact.notes && (
                  <div className="mt-6">
                    <h5 className="font-semibold text-gray-800 mb-2">備註</h5>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedContact.notes}</p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end space-x-4">
                  <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    編輯
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    聯絡
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
