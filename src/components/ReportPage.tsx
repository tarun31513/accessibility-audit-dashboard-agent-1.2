import { useState } from 'react';
import { Download, Globe, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import type { AuditData } from '../App';

interface ReportPageProps {
  data: AuditData;
}

type Language = 'en' | 'hi';

const translations = {
  en: {
    title: 'Accessibility Audit Report',
    subtitle: 'Comprehensive compliance analysis',
    executiveSummary: 'Executive Summary',
    auditedUrl: 'Audited URL',
    auditMode: 'Audit Mode',
    scanDate: 'Scan Date',
    complianceStatus: 'Compliance Status',
    overallScore: 'Overall Score',
    keyFindings: 'Key Findings',
    totalElements: 'Total Elements Scanned',
    violations: 'Violations Found',
    criticalIssues: 'Critical Issues',
    bfsiFlags: 'BFSI-specific Flags',
    detailedFindings: 'Detailed Findings',
    wcagPrinciple: 'WCAG Principle',
    element: 'Element',
    issue: 'Issue',
    severity: 'Severity',
    recommendation: 'Recommendation',
    conclusion: 'Conclusion',
    conclusionText: 'This audit identified accessibility issues that should be addressed to ensure WCAG compliance. Priority should be given to high-severity violations.',
    compliant: 'Compliant',
    nonCompliant: 'Non-Compliant',
    downloadPdf: 'Download PDF Report',
    exportHtml: 'Export HTML Report',
  },
  hi: {
    title: 'सुगम्यता ऑडिट रिपोर्ट',
    subtitle: 'व्यापक अनुपालन विश्लेषण',
    executiveSummary: 'कार्यकारी सारांश',
    auditedUrl: 'ऑडिट किया गया URL',
    auditMode: 'ऑडिट मोड',
    scanDate: 'स्कैन तिथि',
    complianceStatus: 'अनुपालन स्थिति',
    overallScore: 'समग्र स्कोर',
    keyFindings: 'मुख्य निष्कर्ष',
    totalElements: 'कुल स्कैन किए गए तत्व',
    violations: 'उल्लंघन पाए गए',
    criticalIssues: 'गंभीर समस्याएं',
    bfsiFlags: 'BFSI-विशिष्ट चेतावनियां',
    detailedFindings: 'विस्तृत निष्कर्ष',
    wcagPrinciple: 'WCAG सिद्धांत',
    element: 'तत्व',
    issue: 'समस्या',
    severity: 'गंभीरता',
    recommendation: 'सिफारिश',
    conclusion: 'निष्कर्ष',
    conclusionText: 'इस ऑडिट ने सुगम्यता समस्याओं की पहचान की है जिन्हें WCAG अनुपालन सुनिश्चित करने के लिए संबोधित किया जाना चाहिए। उच्च-गंभीरता उल्लंघनों को प्राथमिकता दी जानी चाहिए।',
    compliant: 'अनुपालक',
    nonCompliant: 'गैर-अनुपालक',
    downloadPdf: 'PDF रिपोर्ट डाउनलोड करें',
    exportHtml: 'HTML रिपोर्ट निर्यात करें',
  }
};

export function ReportPage({ data }: ReportPageProps) {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const isCompliant = data.complianceScore >= 90;
  const criticalIssues = data.violations.filter(v => v.severity === 'High').length;

  const handleDownloadPDF = () => {
    alert('PDF download would be triggered here');
  };

  const handleExportHTML = () => {
    alert('HTML export would be triggered here');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#0066CC]" />
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t.downloadPdf}
            </Button>
            <Button onClick={handleExportHTML} className="bg-[#0066CC] hover:bg-[#0052A3]">
              <Download className="w-4 h-4 mr-2" />
              {t.exportHtml}
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-[#0066CC] to-blue-600 text-white p-8 rounded-t-xl">
            <h1 className="text-white mb-2">{t.title}</h1>
            <p className="text-blue-100">{t.subtitle}</p>
            
            {isCompliant && (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mt-4">
                <CheckCircle className="w-5 h-5" />
                <span>{t.compliant}</span>
              </div>
            )}
          </div>

          <div className="p-8 space-y-8">
            {/* Executive Summary */}
            <section>
              <h2 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t.executiveSummary}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.auditedUrl}:</span>
                    <span className="text-[#0066CC]">{data.url}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.scanDate}:</span>
                    <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.complianceStatus}:</span>
                    <Badge variant={isCompliant ? "default" : "destructive"} className={isCompliant ? "bg-[#10B981]" : ""}>
                      {isCompliant ? t.compliant : t.nonCompliant}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.overallScore}:</span>
                    <span className={`${data.complianceScore >= 90 ? 'text-[#10B981]' : data.complianceScore >= 70 ? 'text-orange-500' : 'text-[#EF4444]'}`}>
                      {data.complianceScore}%
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Findings */}
            <section>
              <h2 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t.keyFindings}
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-gray-900 mb-1">{data.totalElements}</div>
                      <p className="text-gray-600">{t.totalElements}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-gray-900 mb-1">{data.violations.length}</div>
                      <p className="text-gray-600">{t.violations}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-[#EF4444] mb-1">{criticalIssues}</div>
                      <p className="text-gray-600">{t.criticalIssues}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-gray-900 mb-1">{data.bfsiFlags}</div>
                      <p className="text-gray-600">{t.bfsiFlags}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Detailed Findings */}
            <section>
              <h2 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t.detailedFindings}
              </h2>
              
              <div className="space-y-4">
                {data.violations.map((violation, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          violation.severity === 'High' ? 'destructive' : 
                          violation.severity === 'Medium' ? 'default' : 
                          'secondary'
                        }>
                          {t.severity}: {violation.severity}
                        </Badge>
                        {violation.isBFSI && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            BFSI
                          </Badge>
                        )}
                      </div>
                      <span className="text-gray-600">{violation.wcagRule}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600">{t.element}: </span>
                        <code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          {violation.element}
                        </code>
                      </div>
                      <div>
                        <span className="text-gray-600">{t.issue}: </span>
                        <span className="text-gray-900">{violation.issue}</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-2">
                        <span className="text-blue-900">💡 {t.recommendation}: </span>
                        <span className="text-blue-800">{violation.fix}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {t.conclusion}
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  {t.conclusionText}
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-500">
                Generated by AI Accessibility Audit & Compliance Agent
              </p>
              <p className="text-gray-400 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}