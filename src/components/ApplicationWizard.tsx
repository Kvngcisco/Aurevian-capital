'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Kind = 'loan' | 'equity';
type Values = Record<string, string | boolean | FileList | null>;
const steps = ['Business information', 'Funding details', 'Financials', 'Documents', 'Consents'];
const baseFields = [
  { name: 'businessName', label: 'Legal business name', type: 'text', required: true },
  { name: 'tradingName', label: 'Trading name, if different', type: 'text' },
  { name: 'website', label: 'Business website', type: 'url' },
  { name: 'industry', label: 'Industry', type: 'select', required: true, options: ['Agriculture', 'Consumer goods', 'Healthcare', 'Manufacturing', 'Professional services', 'Technology', 'Other'] },
  { name: 'country', label: 'Country of registration', type: 'text', required: true },
  { name: 'yearsOperating', label: 'Years operating', type: 'number', required: true },
  { name: 'contactName', label: 'Your name', type: 'text', required: true },
  { name: 'role', label: 'Your role', type: 'text', required: true },
  { name: 'email', label: 'Work email', type: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel', required: true },
];
const fieldSets: Record<Kind, Array<Array<{ name: string; label: string; type: string; required?: boolean; options?: string[] }>>> = {
  loan: [baseFields, [
    { name: 'amount', label: 'Funding amount requested', type: 'number', required: true },
    { name: 'currency', label: 'Currency', type: 'select', required: true, options: ['USD', 'GBP', 'EUR', 'NGN', 'Other'] },
    { name: 'purpose', label: 'How will the funding be used?', type: 'textarea', required: true },
    { name: 'timeline', label: 'When do you need the funds?', type: 'select', required: true, options: ['Within 30 days', '1 to 3 months', '3 to 6 months', 'Exploring options'] },
    { name: 'existingDebt', label: 'Existing business debt (optional)', type: 'text' },
  ], [
    { name: 'revenue', label: 'Annual revenue', type: 'number', required: true },
    { name: 'revenueCurrency', label: 'Revenue currency', type: 'select', required: true, options: ['USD', 'GBP', 'EUR', 'NGN', 'Other'] },
    { name: 'employees', label: 'Number of employees', type: 'number', required: true },
    { name: 'profitability', label: 'Is the business currently profitable?', type: 'select', required: true, options: ['Yes', 'No', 'Near break-even', 'Prefer to discuss'] },
    { name: 'financialNotes', label: 'Anything else about your financial position?', type: 'textarea' },
  ]],
  equity: [baseFields, [
    { name: 'raiseAmount', label: 'Target raise amount', type: 'number', required: true },
    { name: 'currency', label: 'Currency', type: 'select', required: true, options: ['USD', 'GBP', 'EUR', 'NGN', 'Other'] },
    { name: 'raiseStage', label: 'Fundraising stage', type: 'select', required: true, options: ['Pre-seed', 'Seed', 'Series A', 'Series B or later', 'Growth capital', 'Not sure'] },
    { name: 'useOfFunds', label: 'What will the investment support?', type: 'textarea', required: true },
    { name: 'timeline', label: 'Target close timing', type: 'select', required: true, options: ['Within 3 months', '3 to 6 months', '6 to 12 months', 'Exploring options'] },
  ], [
    { name: 'revenue', label: 'Annual revenue', type: 'number', required: true },
    { name: 'revenueCurrency', label: 'Revenue currency', type: 'select', required: true, options: ['USD', 'GBP', 'EUR', 'NGN', 'Other'] },
    { name: 'employees', label: 'Number of employees', type: 'number', required: true },
    { name: 'growth', label: 'Recent business growth', type: 'select', required: true, options: ['Growing', 'Stable', 'Early stage', 'Prefer to discuss'] },
    { name: 'financialNotes', label: 'Anything else about your financial position?', type: 'textarea' },
  ]],
};
function newReference() { return `AC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; }

export default function ApplicationWizard({ kind }: { kind: Kind }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [attempted, setAttempted] = useState(false);
  const title = kind === 'loan' ? 'Business loan application' : 'Equity opportunity inquiry';
  const fields = fieldSets[kind];
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const update = (key: string, value: string | boolean | FileList | null) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };
  function validate(): boolean {
    const found: Record<string, string> = {};
    if (step < 3) {
      for (const f of fields[step]) {
        const value = values[f.name];
        if (f.required && (typeof value !== 'string' || !value.trim())) found[f.name] = 'This field is required.';
        if (f.type === 'email' && typeof value === 'string' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) found[f.name] = 'Enter a valid email address.';
        if (f.type === 'url' && typeof value === 'string' && value && !/^https?:\/\//i.test(value)) found[f.name] = 'Enter a full URL starting with https://';
        if (f.type === 'number' && typeof value === 'string' && value && Number(value) < 0) found[f.name] = 'Enter a positive number.';
        if (f.name === 'phone' && typeof value === 'string' && value && !/^\+?[\d\s().-]{6,}$/.test(value)) found[f.name] = 'Enter a valid phone number.';
        if (f.name === 'yearsOperating' && typeof value === 'string' && value && (Number(value) < 0 || Number(value) > 150)) found[f.name] = 'Enter a realistic number of years.';
      }
    }
    if (step === 4) {
      if (values.accurate !== true) found.accurate = 'Please confirm the information is accurate to the best of your knowledge.';
      if (values.privacy !== true) found.privacy = 'Please acknowledge the privacy notice to continue.';
    }
    setErrors(found);
    return Object.keys(found).length === 0;
  }
  async function next() {
    setAttempted(true);
    if (!validate()) return;
    if (step === steps.length - 1) {
      setSubmitting(true);
      try {
        const res = await fetch('/api/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind, data: values }) });
        const json = await res.json();
        if (res.ok && json.reference) { setReference(json.reference); }
        else setFormError(json.error || 'Something went wrong. Please try again.');
      } catch { setFormError('Network error. Please try again.'); }
      finally { setSubmitting(false); }
    }
    else setStep((s) => s + 1);
  }
  const allFields = fields.flat();
  const doc = values.document as FileList | null | undefined;
  const reviewRows = allFields.map((f) => {
    const v = values[f.name];
    let shown = '';
    if (f.name === 'marketing' || v === undefined || v === null || v === '') return null;
    if (typeof v === 'boolean') shown = v ? 'Yes' : 'No';
    else if (typeof v === 'string') shown = v;
    return { label: f.label, value: shown };
  }).filter(Boolean) as { label: string; value: string }[];
  if (reference) return <section className="section wrap success-screen" aria-live="polite"><span className="success-mark" aria-hidden="true">✓</span><p className="eyebrow">Inquiry received</p><h1>Thank you for reaching out.</h1><p className="lead">Your reference number is <strong>{reference}</strong>. We have saved your inquiry and a member of our team will review it and contact you at the email you provided. You can track progress any time in the applicant portal.</p><p className="privacy-note">Applying is free. A submission does not guarantee financing or investment.</p><Link href="/apply" className="button">Return to applications</Link></section>;
  return <section className="section wrap wizard-shell">
    <div className="wizard-intro"><p className="eyebrow">Aurevian Capital · {kind === 'loan' ? 'Financing' : 'Investment'}</p><h1>{title}</h1><p className="lead">Share a few details so our team can understand your business and what you are looking for.</p><p className="privacy-note">Applying is free and does not guarantee funding or investment.</p></div>
    <div className="wizard-card card">
      <div className="wizard-progress-head"><span>Step {step + 1} of {steps.length}</span><span>{steps[step]}</span></div><div className="progress-track" role="progressbar" aria-label="Application progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
      <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
        {step < 3 && <fieldset className="field-grid"><legend className="form-legend">{steps[step]}</legend>{fields[step].map((f) => <label className={`field ${f.type === 'textarea' ? 'field-wide' : ''}`} key={f.name}><span>{f.label}{f.required && <span aria-hidden="true"> *</span>}</span>{f.type === 'select' ? <select required={f.required} value={String(values[f.name] || '')} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-error` : undefined} onChange={(e) => update(f.name, e.target.value)}><option value="">Select one</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select> : f.type === 'textarea' ? <textarea rows={4} required={f.required} value={String(values[f.name] || '')} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-error` : undefined} onChange={(e) => update(f.name, e.target.value)} /> : <input type={f.type} required={f.required} min={f.type === 'number' ? '0' : undefined} step={f.type === 'number' ? 'any' : undefined} value={String(values[f.name] || '')} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-error` : undefined} onChange={(e) => update(f.name, e.target.value)} />}{errors[f.name] && <span className="field-error" id={`${f.name}-error`} role="alert">{errors[f.name]}</span>}</label>)}</fieldset>}
        {step === 3 && <fieldset className="field-grid"><legend className="form-legend">Documents</legend><p className="field-wide">If useful, attach a short overview or business plan. A short business plan or overview is ideal. Standard business documents only.</p><label className="field field-wide"><span>Optional business overview (PDF, DOCX, or PPTX)</span><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(e) => update('document', e.target.files)} /><span className="field-hint">Optional. File selection stays in this browser and is not transmitted.</span></label></fieldset>}
        {step === 4 && <><dl className="review-summary review-grid" aria-label="Review of the details you entered"><dt className="span-2" style={{marginTop:0}}>Your details</dt>{reviewRows.map((r) => <div key={r.label} className="span-2" style={{display:'contents'}}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}{doc && doc.length > 0 && <div style={{display:'contents'}}><dt>Attached file</dt><dd>{doc[0].name}</dd></div>}</dl><fieldset className="consent-fields"><legend className="form-legend">Review and consent</legend><p>Before continuing, please review the details you entered. Before continuing, please review the details you entered.</p><label className="checkbox-field"><input type="checkbox" checked={values.accurate === true} onChange={(e) => update('accurate', e.target.checked)} /><span>I confirm that the information I provided is accurate to the best of my knowledge. *</span></label>{errors.accurate && <span className="field-error" role="alert">{errors.accurate}</span>}<label className="checkbox-field"><input type="checkbox" checked={values.privacy === true} onChange={(e) => update('privacy', e.target.checked)} /><span>I have read the <Link href="/privacy" target="_blank" rel="noreferrer">Privacy notice</Link> and understand this inquiry is subject to review. *</span></label>{errors.privacy && <span className="field-error" role="alert">{errors.privacy}</span>}<label className="checkbox-field"><input type="checkbox" checked={values.marketing === true} onChange={(e) => update('marketing', e.target.checked)} /><span>I would like to receive occasional updates from Aurevian Capital. This is optional.</span></label><p className="privacy-note">Applying is free, and sending this inquiry does not guarantee financing or investment.</p></fieldset></>}
        {attempted && Object.keys(errors).length > 0 && <p className="form-error-summary" role="alert">Please review the highlighted fields before continuing.</p>}
        {formError && <p className="field-error" role="alert">{formError}</p>}<div className="wizard-actions">{step > 0 ? <button type="button" className="button button-secondary" onClick={() => { setStep((s) => s - 1); setErrors({}); setAttempted(false); }}>Back</button> : <Link href="/apply" className="button button-secondary">Cancel</Link>}<button type="submit" className="button">{submitting ? 'Submitting…' : step === steps.length - 1 ? 'Submit inquiry' : 'Continue'}</button></div>
      </form>
    </div>
  </section>;
}
