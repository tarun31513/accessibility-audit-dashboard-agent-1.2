import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ProgressPage } from './components/ProgressPage';
import { DashboardPage } from './components/DashboardPage';
import { ReportPage } from './components/ReportPage';
import { Sidebar } from './components/Sidebar';

export interface AuditData {
  url: string;
  totalElements: number;
  wcagViolations: number;
  bfsiFlags: number;
  complianceScore: number;
  violations: Violation[];
}

export interface Violation {
  element: string;
  issue: string;
  wcagRule: string;
  severity: 'High' | 'Medium' | 'Low';
  fix: string;
  category: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  isBFSI?: boolean;
}

type Screen = 'landing' | 'progress' | 'dashboard' | 'report';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [auditData, setAuditData] = useState<AuditData | null>(null);

  const handleStartAudit = (url: string, file?: File) => {
    setCurrentScreen('progress');
    
    // Simulate audit with delay
    setTimeout(() => {
      const mockData = generateMockAuditData(url);
      setAuditData(mockData);
      setCurrentScreen('dashboard');
    }, 5000);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const showSidebar = currentScreen !== 'landing';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {showSidebar && (
        <Sidebar 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate}
          hasAuditData={!!auditData}
        />
      )}
      <main className="flex-1">
        {currentScreen === 'landing' && (
          <LandingPage onStartAudit={handleStartAudit} />
        )}
        {currentScreen === 'progress' && (
          <ProgressPage />
        )}
        {currentScreen === 'dashboard' && auditData && (
          <DashboardPage 
            data={auditData} 
            onViewReport={() => setCurrentScreen('report')}
          />
        )}
        {currentScreen === 'report' && auditData && (
          <ReportPage data={auditData} />
        )}
      </main>
    </div>
  );
}

function generateMockAuditData(url: string): AuditData {
  const violations: Violation[] = [
    // Perceivable - Images & Media
    {
      element: 'img.hero-banner',
      issue: 'Missing alt attribute on decorative image',
      wcagRule: '1.1.1 Non-text Content',
      severity: 'High',
      fix: 'Add alt="" for decorative images or descriptive alt text for meaningful images',
      category: 'Perceivable'
    },
    {
      element: 'img.product-thumbnail',
      issue: 'Alt text is filename instead of description',
      wcagRule: '1.1.1 Non-text Content',
      severity: 'High',
      fix: 'Replace "img_1234.jpg" with meaningful description like "Blue cotton t-shirt"',
      category: 'Perceivable'
    },
    {
      element: 'video#intro-video',
      issue: 'Video missing captions',
      wcagRule: '1.2.2 Captions (Prerecorded)',
      severity: 'High',
      fix: 'Add WebVTT caption file with accurate transcription',
      category: 'Perceivable'
    },
    {
      element: 'audio.podcast',
      issue: 'Audio content lacks transcript',
      wcagRule: '1.2.1 Audio-only and Video-only',
      severity: 'High',
      fix: 'Provide text transcript of audio content',
      category: 'Perceivable'
    },
    
    // Perceivable - Color & Contrast
    {
      element: 'button.primary-cta',
      issue: 'Text contrast ratio 2.8:1 (minimum 4.5:1 required)',
      wcagRule: '1.4.3 Contrast (Minimum)',
      severity: 'High',
      fix: 'Change text color to #FFFFFF or background to darker shade',
      category: 'Perceivable'
    },
    {
      element: 'a.footer-link',
      issue: 'Link text contrast 3.2:1 against background',
      wcagRule: '1.4.3 Contrast (Minimum)',
      severity: 'Medium',
      fix: 'Increase contrast to at least 4.5:1 for normal text',
      category: 'Perceivable'
    },
    {
      element: 'span.error-message',
      issue: 'Error indicated by color only (red text)',
      wcagRule: '1.4.1 Use of Color',
      severity: 'High',
      fix: 'Add icon or text indicator in addition to color',
      category: 'Perceivable'
    },
    
    // Perceivable - Structure
    {
      element: 'div.main-content',
      issue: 'Heading structure skips from h1 to h3',
      wcagRule: '1.3.1 Info and Relationships',
      severity: 'Medium',
      fix: 'Use h2 before h3 to maintain proper heading hierarchy',
      category: 'Perceivable'
    },
    {
      element: 'table.data-table',
      issue: 'Data table missing <th> header cells',
      wcagRule: '1.3.1 Info and Relationships',
      severity: 'High',
      fix: 'Use <th> elements with scope attribute for headers',
      category: 'Perceivable'
    },
    {
      element: 'div.info-section',
      issue: 'Content lacks proper semantic structure',
      wcagRule: '1.3.1 Info and Relationships',
      severity: 'Low',
      fix: 'Use semantic HTML: <article>, <section>, <nav>, <aside>',
      category: 'Perceivable'
    },
    
    // Operable - Keyboard
    {
      element: 'div.dropdown-menu',
      issue: 'Custom dropdown not keyboard accessible',
      wcagRule: '2.1.1 Keyboard',
      severity: 'High',
      fix: 'Add tabindex, keyboard event handlers, and ARIA attributes',
      category: 'Operable'
    },
    {
      element: 'button.close-modal',
      issue: 'Modal cannot be closed with ESC key',
      wcagRule: '2.1.1 Keyboard',
      severity: 'High',
      fix: 'Add ESC key handler to close modal',
      category: 'Operable'
    },
    {
      element: 'a.nav-link',
      issue: 'Focus indicator not visible (outline: none)',
      wcagRule: '2.4.7 Focus Visible',
      severity: 'High',
      fix: 'Remove outline: none or add custom visible focus style',
      category: 'Operable'
    },
    {
      element: 'input.search-box',
      issue: 'Focus indicator contrast insufficient',
      wcagRule: '2.4.7 Focus Visible',
      severity: 'Medium',
      fix: 'Ensure focus indicator has 3:1 contrast ratio',
      category: 'Operable'
    },
    
    // Operable - Navigation
    {
      element: 'nav',
      issue: 'Skip to main content link missing',
      wcagRule: '2.4.1 Bypass Blocks',
      severity: 'Medium',
      fix: 'Add skip link as first focusable element',
      category: 'Operable'
    },
    {
      element: 'a.read-more',
      issue: 'Link text not descriptive ("Click here")',
      wcagRule: '2.4.4 Link Purpose',
      severity: 'Medium',
      fix: 'Use descriptive text like "Read more about accessibility"',
      category: 'Operable'
    },
    {
      element: 'title',
      issue: 'Page title not descriptive',
      wcagRule: '2.4.2 Page Titled',
      severity: 'Medium',
      fix: 'Update to include page context: "Products - Company Name"',
      category: 'Operable'
    },
    
    // Operable - Timing
    {
      element: 'div.notification',
      issue: 'Auto-dismissing notification after 3 seconds',
      wcagRule: '2.2.1 Timing Adjustable',
      severity: 'Medium',
      fix: 'Allow user to control timing or extend duration',
      category: 'Operable'
    },
    
    // Understandable - Forms
    {
      element: 'input#email',
      issue: 'Form input missing associated label',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'High',
      fix: 'Add <label for="email">Email Address</label>',
      category: 'Understandable'
    },
    {
      element: 'input#phone',
      issue: 'Required field not indicated',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'High',
      fix: 'Add aria-required="true" and visual indicator',
      category: 'Understandable'
    },
    {
      element: 'input#date',
      issue: 'Expected input format not specified',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'Medium',
      fix: 'Add helper text: "Format: MM/DD/YYYY"',
      category: 'Understandable'
    },
    {
      element: 'form#contact',
      issue: 'Form errors not announced to screen readers',
      wcagRule: '3.3.1 Error Identification',
      severity: 'High',
      fix: 'Add aria-live="polite" region for error messages',
      category: 'Understandable'
    },
    {
      element: 'input#password',
      issue: 'Password field lacks error prevention',
      wcagRule: '3.3.4 Error Prevention',
      severity: 'Medium',
      fix: 'Add password confirmation field',
      category: 'Understandable'
    },
    {
      element: 'select#country',
      issue: 'Dropdown missing accessible name',
      wcagRule: '4.1.2 Name, Role, Value',
      severity: 'High',
      fix: 'Associate with label or add aria-label',
      category: 'Understandable'
    },
    
    // Understandable - Language
    {
      element: 'html',
      issue: 'Page language not declared',
      wcagRule: '3.1.1 Language of Page',
      severity: 'High',
      fix: 'Add lang="en" to <html> element',
      category: 'Understandable'
    },
    {
      element: 'span.french-quote',
      issue: 'Foreign language phrase not marked',
      wcagRule: '3.1.2 Language of Parts',
      severity: 'Low',
      fix: 'Add lang="fr" to element with French text',
      category: 'Understandable'
    },
    
    // Robust
    {
      element: 'div.card',
      issue: 'Missing ARIA landmark roles',
      wcagRule: '4.1.2 Name, Role, Value',
      severity: 'Medium',
      fix: 'Add role="region" and aria-label or use semantic HTML',
      category: 'Robust'
    },
    {
      element: 'div[onclick]',
      issue: 'Clickable div without button role',
      wcagRule: '4.1.2 Name, Role, Value',
      severity: 'High',
      fix: 'Use <button> element or add role="button" with tabindex="0"',
      category: 'Robust'
    },
    {
      element: 'meta',
      issue: 'Viewport zoom disabled (user-scalable=no)',
      wcagRule: '1.4.4 Resize Text',
      severity: 'High',
      fix: 'Remove user-scalable=no from viewport meta tag',
      category: 'Robust'
    },
    
    // BFSI Specific Issues
    {
      element: 'input#pan-number',
      issue: 'PAN number input missing label and validation',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'High',
      fix: 'Add label "Permanent Account Number (PAN)" with format example',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'input#account-number',
      issue: 'Bank account field missing input purpose',
      wcagRule: '1.3.5 Identify Input Purpose',
      severity: 'High',
      fix: 'Add autocomplete="off" for security and aria-describedby for format',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'input#ifsc-code',
      issue: 'IFSC code field lacks accessible description',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'Medium',
      fix: 'Add aria-describedby with helper text explaining IFSC code',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'form#kyc-form',
      issue: 'KYC form missing error summary region',
      wcagRule: '3.3.1 Error Identification',
      severity: 'High',
      fix: 'Add aria-live region at form top to announce validation errors',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'button#submit-transaction',
      issue: 'Transaction submission lacks confirmation step',
      wcagRule: '3.3.4 Error Prevention',
      severity: 'High',
      fix: 'Add confirmation dialog before processing financial transaction',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'input#amount',
      issue: 'Currency input missing format and constraints',
      wcagRule: '3.3.2 Labels or Instructions',
      severity: 'High',
      fix: 'Add type="number", min, max attributes and currency symbol in label',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'div.terms-conditions',
      issue: 'Terms checkbox not properly associated',
      wcagRule: '1.3.1 Info and Relationships',
      severity: 'High',
      fix: 'Link checkbox to label with for/id attributes',
      category: 'Understandable',
      isBFSI: true
    },
    {
      element: 'span.account-balance',
      issue: 'Dynamic balance updates not announced',
      wcagRule: '4.1.3 Status Messages',
      severity: 'Medium',
      fix: 'Add role="status" and aria-live="polite" to balance element',
      category: 'Robust',
      isBFSI: true
    }
  ];

  const wcagViolations = violations.filter(v => !v.isBFSI).length;
  const bfsiFlags = violations.filter(v => v.isBFSI).length;
  const totalElements = 342;
  const complianceScore = Math.round(((totalElements - violations.length) / totalElements) * 100);

  return {
    url,
    totalElements,
    wcagViolations,
    bfsiFlags,
    complianceScore,
    violations
  };
}
