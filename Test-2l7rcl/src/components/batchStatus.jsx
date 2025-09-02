import React from 'react';
import './batchStatus.css';
import { CheckmarkCircleIcon } from './checkMarkCircle';
import { AlertCircleIcon } from './alertCircle';

export const BatchStatus = ({ result }) => {
  if (!result) return null;
  const { total = 0, success = 0, failed = 0, status = 'success' } = result || {};

  const isSuccess = status === 'success';
  const isPartial = status === 'partial';

  const icon = isSuccess ? (
    <CheckmarkCircleIcon fillColor="#008729" />
  ) : (
    <AlertCircleIcon fillColor={isPartial ? '#A35F00' : '#A30B00'} />
  );

  const text = `Processed ${total} file${total !== 1 ? 's' : ''}: ${success} succeeded, ${failed} failed.`;

  return (
    <div className="status-container">
      <sp-body>{text}</sp-body>
      <div className="icon-container">{icon}</div>
    </div>
  );
};
