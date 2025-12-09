import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trust Center | Savvify',
};

export default function TrustPage() {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <div className="mb-10 border-b border-slate-100 pb-10">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Trust Center
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          Security and reliability are at the core of Savvify.
        </p>
      </div>
      <h3>Security First</h3>
      <p>We use bank-grade encryption for all data in transit and at rest.</p>
    </article>
  );
}