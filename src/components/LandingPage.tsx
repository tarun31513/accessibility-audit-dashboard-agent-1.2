import { useState } from 'react';
import { Sparkles, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onStartAudit: (url: string, file?: File) => void;
}

export function LandingPage({ onStartAudit }: LandingPageProps) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onStartAudit(url, file || undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0066CC] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
            
            <h1 className="text-gray-900 mb-4">
              AI Accessibility Audit & Compliance Agent
            </h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check your website's accessibility compliance instantly with comprehensive WCAG 2.1 and BFSI-specific validation.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Input Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="file">Upload HTML File (Optional)</Label>
                  <div className="relative">
                    <Input
                      id="file"
                      type="file"
                      accept=".html,.htm"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="h-12 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-[#0066CC] hover:file:bg-blue-100"
                    />
                  </div>
                  {file && (
                    <p className="text-green-600 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      <span>{file.name}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#0066CC] hover:bg-[#0052A3]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Run Accessibility Audit
                </Button>

                {/* Info Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    💡 This tool analyzes your website and identifies errors and violations automatically based on WCAG 2.1 Level AA standards and GIGW guidelines.
                  </p>
                </div>
              </form>
            </div>

            {/* Visual Section */}
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762330467475-a565d04e1808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY29kZSUyMGFuYWx5c2lzfGVufDF8fHx8MTc2Mjg2ODI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI code analysis visualization"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-green-600">✓</span>
                  </div>
                  <h3 className="text-gray-900 mb-1">WCAG 2.1 Level AA</h3>
                  <p className="text-gray-600">Full compliance checks</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-[#0066CC]">🏦</span>
                  </div>
                  <h3 className="text-gray-900 mb-1">BFSI Compliant</h3>
                  <p className="text-gray-600">Banking & finance focus</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-purple-600">⚡</span>
                  </div>
                  <h3 className="text-gray-900 mb-1">Real-Time Analysis</h3>
                  <p className="text-gray-600">Instant results</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-orange-600">📊</span>
                  </div>
                  <h3 className="text-gray-900 mb-1">Detailed Reports</h3>
                  <p className="text-gray-600">Actionable insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
