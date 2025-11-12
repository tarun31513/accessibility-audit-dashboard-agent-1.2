import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface LogEntry {
  id: number;
  type: 'warning' | 'error' | 'info';
  message: string;
}

const mockLogs: LogEntry[] = [
  { id: 1, type: 'info', message: 'Starting accessibility scan...' },
  { id: 2, type: 'info', message: 'Parsing HTML structure and DOM tree...' },
  { id: 3, type: 'warning', message: 'Missing alt text found on hero-banner image.' },
  { id: 4, type: 'error', message: 'Text contrast ratio 2.8:1 below minimum 4.5:1 requirement.' },
  { id: 5, type: 'warning', message: 'Form input missing label for email field.' },
  { id: 6, type: 'info', message: 'Checking keyboard navigation and focus management...' },
  { id: 7, type: 'error', message: 'Video content missing captions for accessibility.' },
  { id: 8, type: 'warning', message: 'Heading hierarchy skipped from h1 to h3.' },
  { id: 9, type: 'info', message: 'Analyzing ARIA attributes and landmarks...' },
  { id: 10, type: 'error', message: 'Custom dropdown not keyboard accessible.' },
  { id: 11, type: 'warning', message: 'Focus indicator not visible on navigation links.' },
  { id: 12, type: 'info', message: 'Validating BFSI-specific form fields...' },
  { id: 13, type: 'error', message: 'PAN number input missing label and validation.' },
  { id: 14, type: 'warning', message: 'Bank account field missing autocomplete attribute.' },
  { id: 15, type: 'error', message: 'Transaction button lacks confirmation dialog.' },
  { id: 16, type: 'info', message: 'Generating compliance report...' },
];

export function ProgressPage() {
  const [progress, setProgress] = useState(0);
  const [currentNode, setCurrentNode] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const nodes = [
    { id: 1, label: 'URL Scanner Node', icon: '🔍' },
    { id: 2, label: 'Compliance Router', icon: '🔀' },
    { id: 3, label: 'Report Generator', icon: '📊' }
  ];

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Node advancement
    const nodeInterval = setInterval(() => {
      setCurrentNode((prev) => {
        if (prev >= 2) {
          clearInterval(nodeInterval);
          return 2;
        }
        return prev + 1;
      });
    }, 1666);

    // Log streaming
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(nodeInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0066CC] px-4 py-2 rounded-full mb-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Analysis in Progress</span>
          </div>
          <h1 className="text-gray-900 mb-2">
            Running Accessibility Audit
          </h1>
          <p className="text-gray-600">
            Our AI agent is checking your site for accessibility and BFSI compliance issues.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-gray-700">Overall Progress</span>
            <span className="text-[#0066CC]">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Node Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-gray-900 mb-6">Analysis Pipeline</h2>
          
          <div className="flex items-center justify-between relative">
            {/* Connection Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
            <div 
              className="absolute top-6 left-0 h-0.5 bg-[#0066CC] -z-10 transition-all duration-500"
              style={{ width: `${(currentNode / (nodes.length - 1)) * 100}%` }}
            />
            
            {nodes.map((node, index) => {
              const isActive = index <= currentNode;
              const isCurrent = index === currentNode;
              
              return (
                <div key={node.id} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#0066CC] text-white shadow-lg scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCurrent ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : isActive ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="text-xl">{node.icon}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {node.label}
                    </p>
                    {isCurrent && (
                      <p className="text-[#0066CC] mt-1">Processing...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-Time Log Feed */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-gray-900">Real-Time Detection Feed</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span>{logs.length} issues detected</span>
            </div>
          </div>
          
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {logs.map((log) => (
                <div 
                  key={log.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 animate-in slide-in-from-top"
                >
                  {log.type === 'error' && (
                    <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                  )}
                  {log.type === 'warning' && (
                    <span className="text-orange-500 flex-shrink-0">⚠️</span>
                  )}
                  {log.type === 'info' && (
                    <span className="text-blue-500 flex-shrink-0">ℹ️</span>
                  )}
                  <p className="text-gray-700 flex-1">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}