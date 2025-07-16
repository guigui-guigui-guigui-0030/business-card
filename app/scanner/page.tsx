'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, RotateCcw, Check, X, Edit3, Scan, FileText, User, Phone, Mail, MapPin, Globe, Building } from 'lucide-react';

interface ContactInfo {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  website: string;
}

export default function ScannerPage() {
  const [step, setStep] = useState<'capture' | 'preview' | 'ocr' | 'edit'>('capture');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<ContactInfo>({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    website: ''
  });
  const [editedResult, setEditedResult] = useState<ContactInfo>({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    address: '',
    website: ''
  });
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setUseCamera(true);
      }
    } catch (error) {
      console.error('無法啟動相機:', error);
      alert('無法啟動相機，請檢查權限設定');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        setStep('preview');
        
        // 停止相機
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setUseCamera(false);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        setStep('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    setIsProcessing(true);
    setStep('ocr');
    
    // 模擬OCR處理
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 模擬OCR結果
    const mockResult: ContactInfo = {
      name: '張小明',
      company: '科技創新有限公司',
      position: '產品經理',
      phone: '+886-2-1234-5678',
      email: 'xiaoming.zhang@tech-innovation.com',
      address: '台北市信義區信義路五段7號',
      website: 'www.tech-innovation.com'
    };
    
    setOcrResult(mockResult);
    setEditedResult(mockResult);
    setIsProcessing(false);
    setStep('edit');
  };

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setEditedResult(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveContact = () => {
    // 這裡會串接後端API保存聯絡人
    console.log('儲存聯絡人:', editedResult);
    alert('聯絡人已成功儲存！');
    resetScanner();
  };

  const resetScanner = () => {
    setStep('capture');
    setCapturedImage(null);
    setOcrResult({
      name: '',
      company: '',
      position: '',
      phone: '',
      email: '',
      address: '',
      website: ''
    });
    setEditedResult({
      name: '',
      company: '',
      position: '',
      phone: '',
      email: '',
      address: '',
      website: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 標題 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <Scan className="inline-block mr-2 text-blue-600" size={32} />
            名片掃描
          </h1>
          <p className="text-gray-600">使用AI技術快速掃描並識別名片資訊</p>
        </div>

        {/* 進度指示器 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step === 'capture' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Camera size={20} />
            </div>
            <div className="w-12 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-blue-600 rounded transition-all duration-300 ${
                ['preview', 'ocr', 'edit'].includes(step) ? 'w-full' : 'w-0'
              }`} />
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              ['preview', 'ocr', 'edit'].includes(step) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <FileText size={20} />
            </div>
            <div className="w-12 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-blue-600 rounded transition-all duration-300 ${
                ['ocr', 'edit'].includes(step) ? 'w-full' : 'w-0'
              }`} />
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              ['ocr', 'edit'].includes(step) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Edit3 size={20} />
            </div>
          </div>
        </div>

        {/* 主要內容 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* 步驟1: 拍攝/上傳 */}
          {step === 'capture' && (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-64 h-40 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {useCamera ? (
                    <div className="relative">
                      <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-lg" />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <Camera size={48} className="mx-auto mb-2" />
                      <p>準備拍攝名片</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center space-x-4">
                  {useCamera ? (
                    <button
                      onClick={capturePhoto}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Camera size={20} />
                      <span>拍攝</span>
                    </button>
                  ) : (
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Camera size={20} />
                      <span>啟動相機</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                  >
                    <Upload size={20} />
                    <span>上傳圖片</span>
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* 步驟2: 預覽 */}
          {step === 'preview' && capturedImage && (
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={capturedImage} 
                  alt="已拍攝的名片" 
                  className="max-w-md mx-auto rounded-lg shadow-md"
                />
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetScanner}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw size={20} />
                  <span>重新拍攝</span>
                </button>
                
                <button
                  onClick={processImage}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Scan size={20} />
                  <span>開始識別</span>
                </button>
              </div>
            </div>
          )}

          {/* 步驟3: OCR處理中 */}
          {step === 'ocr' && (
            <div className="text-center py-12">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI正在識別名片資訊...</h3>
              <p className="text-gray-600">請稍候，這可能需要幾秒鐘</p>
            </div>
          )}

          {/* 步驟4: 編輯結果 */}
          {step === 'edit' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                請檢查並編輯識別結果
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline mr-2" size={16} />
                      姓名
                    </label>
                    <input
                      type="text"
                      value={editedResult.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="inline mr-2" size={16} />
                      公司
                    </label>
                    <input
                      type="text"
                      value={editedResult.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      職位
                    </label>
                    <input
                      type="text"
                      value={editedResult.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline mr-2" size={16} />
                      電話
                    </label>
                    <input
                      type="text"
                      value={editedResult.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline mr-2" size={16} />
                      電子信箱
                    </label>
                    <input
                      type="email"
                      value={editedResult.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline mr-2" size={16} />
                      地址
                    </label>
                    <textarea
                      value={editedResult.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Globe className="inline mr-2" size={16} />
                      網站
                    </label>
                    <input
                      type="url"
                      value={editedResult.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={resetScanner}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <X size={20} />
                  <span>取消</span>
                </button>
                
                <button
                  onClick={saveContact}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Check size={20} />
                  <span>儲存聯絡人</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}