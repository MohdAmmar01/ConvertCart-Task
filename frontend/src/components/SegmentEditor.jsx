import React, { useState } from 'react';
import '../styles/SegmentEditor.css';
import { FaFilter } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { GrCircleInformation } from "react-icons/gr";
import { toast } from 'react-toastify';

const SegmentEditor = ({ onSubmit }) => {
  const [filters, setFilters] = useState('');

  const handleEvaluate = () => {
  if (!filters.trim()) {
    toast.error('Please enter at least one filter condition.');
    return;
  }

  const rules = filters
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  onSubmit(rules);
};

  const handleReset = () => {
    setFilters('');
    onSubmit('');
  };

  return (
    <div className="segment-editor">
      <h2>Define Filter Conditions</h2>

      <label htmlFor="filter-textarea" className="segment-label">
        Enter filter conditions (one per line):
      </label>

      <textarea
        id="filter-textarea"
        className="segment-textarea"
        placeholder={
`Example:
price > 5000
category = Smartphones
stock_status = instock
brand != Samsung
rating >= 4.0`
        }
        value={filters}
        onChange={(e) => setFilters(e.target.value)}
      />

      <div className="buttons">
        <button className="evaluate-btn" onClick={handleEvaluate}>
          <FaFilter className="icon" /> Evaluate Filter
        </button>
        <button className="reset-btn" onClick={handleReset}>
          <RiResetLeftFill className="icon" /> Reset
        </button>
      </div>

      <div className="operators">
        <GrCircleInformation className="icon info-icon" />
        <div>
          <strong> Supported Operators:</strong>
          <p>=, !=, &gt;, &lt;, &gt;=, &lt;=</p>
        </div>
      </div>
    </div>
  );
};

export default SegmentEditor;
