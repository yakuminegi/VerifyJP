import React, { useState } from 'react';
import { Shield, User, GraduationCap, FileCheck, Clock, CheckCircle, Upload, Mail, BookOpen } from 'lucide-react';

type VerificationStep = 'select' | 'upload' | 'processing' | 'complete';
type VerificationType = 'university' | 'vocational';

const verificationTypes = [
  {
    id: 'university' as const,
    title: '大学生確認',
    description: '大学・大学院の学生証で確認',
    icon: GraduationCap,
    status: '身分確認対象'
  },
  {
    id: 'vocational' as const,
    title: '専門学生確認',
    description: '専門学校・短期大学の学生証で確認',
    icon: BookOpen,
    status: '身分確認対象'
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>('select');
  const [selectedType, setSelectedType] = useState<VerificationType | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleTypeSelect = (type: VerificationType) => {
    setSelectedType(type);
    setCurrentStep('upload');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setCurrentStep('processing');
        setTimeout(() => {
          setCurrentStep('complete');
        }, 3000);
      }, 1000);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'select', label: '身分選択' },
      { id: 'upload', label: '書類提出' },
      { id: 'processing', label: '確認中' },
      { id: 'complete', label: '完了' }
    ];

    const currentIndex = steps.findIndex(step => step.id === currentStep);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors
              ${index <= currentIndex 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-white border-gray-300 text-gray-400'
              }`}>
              {index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${index <= currentIndex ? 'text-blue-600' : 'text-gray-400'}`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-4 h-0.5 w-12 transition-colors ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSelectStep = () => (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          学生身分確認
          学生区分を選択してください
        </h2>
        <p className="text-gray-600">
          大学生・専門学生の身分確認を行います。
          適切な学生区分を選択してください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verificationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {type.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {type.status}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderUploadStep = () => {
    const selectedTypeData = verificationTypes.find(type => type.id === selectedType);
    
    return (
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            書類をアップロードしてください
          </h2>
          <p className="text-gray-600">
            {selectedTypeData?.title}のため、必要書類をアップロードしてください
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">必要書類について</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {selectedType === 'university' && (
              <>
                <li>• 大学学生証（表面・裏面）</li>
                <li>• 在学証明書（3ヶ月以内発行）</li>
                <li>• 学生証明書または学割証</li>
              </>
            )}
            {selectedType === 'vocational' && (
              <>
                <li>• 専門学校学生証（表面・裏面）</li>
                <li>• 在学証明書（3ヶ月以内発行）</li>
                <li>• 学生証明書または学割証</li>
              </>
            )}
          </ul>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              ファイルをアップロード
            </p>
            <p className="text-sm text-gray-600 mb-4">
              JPG、PNG、PDF形式（最大10MB）
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              ファイルを選択
            </button>
          </label>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          アップロードされたファイルは暗号化されて安全に保管されます。
          確認完了後、30日以内に自動削除されます。
        </div>
      </div>
    );
  };

  const renderProcessingStep = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock className="w-8 h-8 text-yellow-600 animate-spin" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        書類を確認中です
      </h2>
      <p className="text-gray-600 mb-6">
        通常2-3分で完了します。そのままお待ちください。
      </p>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <FileCheck className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-700">
            {uploadedFile?.name} を確認中...
          </span>
        </div>
      </div>
    </div>
  );

  const renderCompleteStep = () => {
    const selectedTypeData = verificationTypes.find(type => type.id === selectedType);
    
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          確認が完了しました！
        </h2>
        <p className="text-gray-600 mb-6">
          {selectedTypeData?.title}の身分が確認されました。
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            確認コード: VERIFIED2024
          </h3>
          <p className="text-blue-800 text-lg font-medium mb-2">
            身分確認完了
          </p>
          <p className="text-sm text-blue-700">
            有効期限: 2024年12月31日まで
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            確認証明書をダウンロード
          </button>
          <button 
            onClick={() => {
              setCurrentStep('select');
              setSelectedType(null);
              setUploadedFile(null);
            }}
            className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            別の学生区分で確認する
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Mail className="w-4 h-4" />
          <span>確認完了メールを送信しました</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">VerifyJP</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">学生の方</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">企業の方</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">サポート</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">ログイン</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                アカウント作成
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            学生身分確認プラットフォーム
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            大学生・専門学生の身分確認を安全かつ迅速に行います。
            簡単な確認手続きで身分証明を取得できます。
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStepIndicator()}
          
          {currentStep === 'select' && renderSelectStep()}
          {currentStep === 'upload' && renderUploadStep()}
          {currentStep === 'processing' && renderProcessingStep()}
          {currentStep === 'complete' && renderCompleteStep()}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">安心・安全の確認システム</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">SSL暗号化通信</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <FileCheck className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">書類自動削除</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <User className="w-6 h-6 text-blue-600" />
              <span className="text-gray-700">個人情報保護</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">VerifyJP</span>
              </div>
              <p className="text-gray-600 text-sm">
                日本最大級の学生身分確認プラットフォーム
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">サービス</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">大学生確認</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">専門学生確認</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">サポート</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">よくある質問</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">利用規約</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">会社情報</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">会社概要</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">採用情報</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 VerifyJP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;