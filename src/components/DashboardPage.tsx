import { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, FileSearch, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AuditData, Violation } from '../App';

interface DashboardPageProps {
  data: AuditData;
  onViewReport: () => void;
}

export function DashboardPage({ data, onViewReport }: DashboardPageProps) {
  const [filter, setFilter] = useState<'all' | 'high' | 'bfsi'>('all');

  // Calculate distribution data
  const categoryData = [
    { name: 'Perceivable', value: data.violations.filter(v => v.category === 'Perceivable').length, color: '#0066CC' },
    { name: 'Operable', value: data.violations.filter(v => v.category === 'Operable').length, color: '#10B981' },
    { name: 'Understandable', value: data.violations.filter(v => v.category === 'Understandable').length, color: '#F59E0B' },
    { name: 'Robust', value: data.violations.filter(v => v.category === 'Robust').length, color: '#EF4444' },
  ].filter(item => item.value > 0);

  const severityData = [
    { name: 'High', value: data.violations.filter(v => v.severity === 'High').length, color: '#EF4444' },
    { name: 'Medium', value: data.violations.filter(v => v.severity === 'Medium').length, color: '#F59E0B' },
    { name: 'Low', value: data.violations.filter(v => v.severity === 'Low').length, color: '#10B981' },
  ].filter(item => item.value > 0);

  // Filter violations
  const filteredViolations = data.violations.filter(violation => {
    if (filter === 'high') return violation.severity === 'High';
    if (filter === 'bfsi') return violation.isBFSI;
    return true;
  });

  const getSeverityBadge = (severity: Violation['severity']) => {
    const variants = {
      High: 'destructive',
      Medium: 'default',
      Low: 'secondary',
    } as const;
    return variants[severity] || 'default';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-gray-900 mb-2">Audit Results Dashboard</h1>
              <p className="text-gray-600">
                Scan completed for: <span className="text-[#0066CC]">{data.url}</span>
              </p>
            </div>
            <Button onClick={onViewReport} className="bg-[#0066CC] hover:bg-[#0052A3]">
              <FileSearch className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-600">Total Elements Scanned</CardTitle>
              <FileSearch className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.totalElements}</div>
              <p className="text-gray-500 mt-1">HTML elements analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-600">WCAG Violations Found</CardTitle>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.wcagViolations}</div>
              <p className="text-gray-500 mt-1">Accessibility issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-600">BFSI Form Flags</CardTitle>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-gray-900">{data.bfsiFlags}</div>
              <p className="text-gray-500 mt-1">Banking-specific issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-gray-600">Compliance Score</CardTitle>
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className={`text-gray-900 ${data.complianceScore >= 90 ? 'text-[#10B981]' : data.complianceScore >= 70 ? 'text-orange-500' : 'text-[#EF4444]'}`}>
                {data.complianceScore}%
              </div>
              <p className="text-gray-500 mt-1">Overall compliance</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Violation Distribution</CardTitle>
              <p className="text-gray-600">By WCAG principle</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Issue Severity</CardTitle>
              <p className="text-gray-600">Breakdown by priority level</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={severityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Error Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900">Detailed Violations</CardTitle>
                <p className="text-gray-600 mt-1">
                  Showing {filteredViolations.length} of {data.violations.length} issues
                </p>
              </div>
              <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Show All</SelectItem>
                  <SelectItem value="high">High Severity</SelectItem>
                  <SelectItem value="bfsi">BFSI-specific</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Element</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>WCAG Rule</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Recommended Fix</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredViolations.map((violation, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <code className="text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          {violation.element}
                        </code>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="flex items-start gap-2">
                          {violation.isBFSI && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              BFSI
                            </Badge>
                          )}
                          <span>{violation.issue}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{violation.wcagRule}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadge(violation.severity)}>
                          {violation.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs text-gray-600">{violation.fix}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}