import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";

const IconOverview = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const IconTransactions = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const IconBudgets = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const IconGoals = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconSend = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const IconMenu = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconClose = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconSparkles = () => (
  <svg className="w-3.5 h-3.5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Sidebar = ({ activeTab, setActiveTab, mobileOpen,  onReset, }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: IconOverview },
    { id: 'transactions', label: 'Transactions', icon: IconTransactions },
    { id: 'budgets', label: 'Budgets', icon: IconBudgets },
    { id: 'goals', label: 'Goals', icon: IconGoals },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#f4f4f2] border-r border-[#e5e5e0] w-56 select-none">
      {/* App Branding Header */}
      <div className="p-4 border-b border-[#e5e5e0]/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-teal-700"></div>
          <div>
            <h1 className="font-semibold text-[#1a1a1e] text-xs tracking-tight leading-none">Finwise</h1>
            <p className="text-[10px] text-[#73737c] mt-0.5 tracking-wide font-normal">Personal Finance</p>
          </div>
        </div>
        {mobileOpen && (
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-[#73737c] hover:text-[#1a1a1e]">
            <IconClose />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#e8e8e3] text-[#1a1a1e]'
                  : 'text-[#73737c] hover:text-[#1a1a1e] hover:bg-[#eaeae5]/60'
              }`}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User / Workspace Footer */}
      <div className="p-3 border-t border-[#e5e5e0]">

  <button
    type="button"
    onClick={onReset}
    className="w-full mb-3 px-3 py-2 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
  >
    Reset Everything
  </button>

  <div className="flex items-center gap-2.5 px-2 py-1.5 rounded bg-[#ebebe6] border border-[#deded8]/80">
    <div className="w-6 h-6 rounded bg-[#1a1a1e] text-[#f9f9f8] flex items-center justify-center text-[10px] font-semibold">
      J
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-[10px] text-[#73737c] truncate leading-tight">
        Personal Workspace
      </p>
    </div>
  </div>

</div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block h-screen sticky top-0 shrink-0">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/15 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};

const Header = ({ onMobileMenuClick }) => {
  return (
    <header className="border-b border-[#e5e5e0] bg-[#f9f9f8] px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2.5">
        <button
          onClick={onMobileMenuClick}
          className="md:hidden p-1 text-[#73737c] hover:text-[#1a1a1e] hover:bg-[#e8e8e3] rounded"
        >
          <IconMenu />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-[#1a1a1e] tracking-tight leading-snug">Good afternoon</h2>
          <p className="text-[11px] text-[#73737c]">Here's your financial overview.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select className="bg-[#f4f4f2] border border-[#e5e5e0] text-[#1a1a1e] text-xs font-medium rounded px-2.5 py-1 focus:outline-none cursor-pointer">
          <option>September 2026</option>
          <option>August 2026</option>
          <option>July 2026</option>
        </select>

        <div className="w-6 h-6 rounded-full bg-[#1a1a1e] text-[#f9f9f8] flex items-center justify-center text-[10px] font-semibold">
          J
        </div>
      </div>
    </header>
  );
};

const FinancialSummary = ({ metrics }) => {
  return (
    <section className="bg-[#f9f9f8] border-b border-[#e5e5e0] px-6 py-3">
      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-2.5 bg-[#f4f4f2]/70 border border-[#e5e5e0] rounded">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#73737c]">Available Balance</p>
          <p className="text-base font-semibold text-[#1a1a1e] mt-0.5 tracking-tight font-mono">₹{metrics.balance.toLocaleString()}</p>
        </div>

        <div className="p-2.5 bg-[#f4f4f2]/70 border border-[#e5e5e0] rounded">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#73737c]">Income</p>
          <p className="text-sm font-medium text-teal-800 mt-0.5 tracking-tight font-mono">₹{metrics.income.toLocaleString()}</p>
        </div>

        <div className="p-2.5 bg-[#f4f4f2]/70 border border-[#e5e5e0] rounded">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#73737c]">Expenses</p>
          <p className="text-sm font-medium text-[#1a1a1e] mt-0.5 tracking-tight font-mono">₹{metrics.expenses.toLocaleString()}</p>
        </div>

        <div className="p-2.5 bg-[#f4f4f2]/70 border border-[#e5e5e0] rounded">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#73737c]">Savings</p>
          <p className="text-sm font-medium text-[#1a1a1e] mt-0.5 tracking-tight font-mono">₹{metrics.savings.toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
};

const FormattedFinancialTable = ({ breakdown }) => {
  if (!breakdown) return null;

  return (
    <div className="mt-2.5 border border-[#e5e5e0] rounded bg-[#f4f4f2]/60 overflow-hidden text-xs max-w-sm">
      <div className="grid grid-cols-2 bg-[#eaeae5]/70 px-3 py-1.5 font-medium text-[#73737c] border-b border-[#e5e5e0] text-[11px]">
        <span>Category</span>
        <span className="text-right">Amount</span>
      </div>
      <div className="grid grid-cols-2 px-3 py-1 border-b border-[#e5e5e0]/50 text-[#1a1a1e]">
        <span className="text-[#73737c]">Income</span>
        <span className="text-right font-mono">₹{breakdown.income?.toLocaleString() || '60,000'}</span>
      </div>
      <div className="grid grid-cols-2 px-3 py-1 border-b border-[#e5e5e0]/50 text-[#1a1a1e]">
        <span className="text-[#73737c]">Expenses</span>
        <span className="text-right font-mono">₹{breakdown.expenses?.toLocaleString() || '8,649'}</span>
      </div>
      <div className="grid grid-cols-2 px-3 py-1 border-b border-[#e5e5e0]/50 text-[#1a1a1e]">
        <span className="text-[#73737c]">Savings</span>
        <span className="text-right font-mono">₹{breakdown.savings?.toLocaleString() || '5,000'}</span>
      </div>
      <div className="grid grid-cols-2 px-3 py-1.5 font-semibold text-[#1a1a1e] bg-[#f9f9f8]">
        <span>Remaining</span>
        <span className="text-right font-mono text-teal-800">₹{breakdown.remaining?.toLocaleString() || '46,351'}</span>
      </div>
    </div>
  );
};

const PromptSuggestions = ({ onSelect }) => {
  const prompts = [
    'Analyze spending',
    'Review budget',
    'Check purchase',
    'Add expense',
  ];

  return (
    <div className="flex flex-wrap gap-1.5 justify-center mt-5">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(prompt)}
          className="text-xs bg-[#f4f4f2] hover:bg-[#eaeae5] border border-[#e5e5e0] text-[#1a1a1e] px-3 py-1 rounded transition-colors"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

const MessageItem = ({ msg }) => {
  const isUser = msg.sender === "user";

  return (
    <div
      className={`flex flex-col mb-3.5 ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] px-3.5 py-2.5 rounded text-xs md:text-sm leading-relaxed ${
          isUser
            ? "bg-[#1a1a1e] text-[#f9f9f8]"
            : "bg-[#f4f4f2] border border-[#e5e5e0] text-[#1a1a1e]"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{msg.text}</p>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-[#1a1a1e]">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1 mb-2">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="leading-relaxed">
                  {children}
                </li>
              ),

              h1: ({ children }) => (
                <h1 className="text-base font-semibold mb-2">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-sm font-semibold mb-2">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-sm font-semibold mb-1">
                  {children}
                </h3>
              ),
            }}
          >
            {msg.text}
          </ReactMarkdown>
        )}

        {msg.breakdown && (
          <FormattedFinancialTable breakdown={msg.breakdown} />
        )}
      </div>

      <span className="text-[10px] text-[#73737c] mt-1 px-0.5">
        {msg.time}
      </span>
    </div>
  );
};

const ChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="p-4 bg-[#f9f9f8] border-t border-[#e5e5e0]">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-center bg-[#f4f4f2] border border-[#e5e5e0] rounded focus-within:border-[#1a1a1e] transition-colors">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your finances..."
            className="w-full bg-transparent px-3.5 py-2.5 text-xs md:text-sm text-[#1a1a1e] placeholder-[#73737c] resize-none focus:outline-none max-h-20"
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className={`mr-2 p-1.5 rounded transition-colors ${
              text.trim() && !loading
                ? 'bg-[#1a1a1e] text-[#f9f9f8] hover:bg-[#2e2e33]'
                : 'bg-[#e5e5e0] text-[#73737c] cursor-not-allowed'
            }`}
          >
            <IconSend />
          </button>
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#73737c] mt-1.5 px-0.5">
          <span>Finwise Intelligence v1.2</span>
          <span>
            <kbd className="bg-[#e5e5e0] px-1 rounded text-[#1a1a1e]">↵</kbd> Send &nbsp;
            <kbd className="bg-[#e5e5e0] px-1 rounded text-[#1a1a1e]">Shift + ↵</kbd> New line
          </span>
        </div>
      </div>
    </div>
  );
};

const TransactionsPage = ({
  transactions,
  refreshDashboard,
  onImportCSV,
}) => {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    frequency: "one_time",
  });

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);

    setForm({
      description: transaction.description || "",
      amount: transaction.amount || "",
      category: transaction.category || "",
      frequency: transaction.frequency || "one_time",
    });
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/transactions/${editingTransaction.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: form.description,
            amount: Number(form.amount),
            category: form.category,
            frequency: form.frequency,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      await refreshDashboard();

      handleCloseModal();

    } catch (error) {
      console.error("Failed to update transaction:", error);
      alert("Could not update transaction.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/transactions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      await refreshDashboard();

    } catch (error) {
      console.error("Failed to delete transaction:", error);
      alert("Could not delete transaction.");
    }
  };

  return (
    <>
      <section className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
  <h2 className="text-lg font-semibold text-[#1a1a1e]">
    Transactions
  </h2>

  <p className="text-xs text-[#73737c] mt-1">
    Your recent financial activity
  </p>
</div>
             <button
              type="button"
    onClick={onImportCSV}
    className="px-3 py-2 text-sm font-medium rounded-lg bg-[#1a1a1e] text-white hover:opacity-90 transition"
  >
    Import CSV
  </button>
          </div>

          {/* Transactions */}
          <div className="bg-[#f4f4f2] border border-[#e5e5e0] rounded overflow-hidden">

            {transactions.length === 0 ? (
              <div className="p-10 text-center text-sm text-[#73737c]">
                No transactions yet.
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between px-4 py-3 border-b border-[#e5e5e0] last:border-b-0"
                >

                  {/* Transaction info */}
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1e]">
                      {transaction.description}
                    </p>

                    <p className="text-[11px] text-[#73737c] mt-0.5">
                      {transaction.category} · {transaction.date}
                    </p>
                  </div>

                  {/* Amount + actions */}
                  <div className="flex items-center gap-4">

                    <div
                      className={`text-sm font-medium ${
                        transaction.type === "income"
                          ? "text-teal-700"
                          : transaction.type === "expense"
                          ? "text-[#1a1a1e]"
                          : "text-[#73737c]"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      ₹{Number(transaction.amount).toLocaleString()}
                    </div>

                    <button
                      onClick={() => handleEditClick(transaction)}
                      className="text-xs text-[#73737c] hover:text-[#1a1a1e]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">

          <div className="w-full max-w-md bg-[#f9f9f8] rounded-xl shadow-xl border border-[#e5e5e0]">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e0]">

              <div>
                <h3 className="text-sm font-semibold text-[#1a1a1e]">
                  Edit Transaction
                </h3>

                <p className="text-[11px] text-[#73737c] mt-1">
                  Update the transaction details
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-lg text-[#73737c] hover:text-[#1a1a1e]"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdate}
              className="p-5 space-y-4"
            >

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#1a1a1e] mb-1.5">
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#deded9] rounded-lg outline-none focus:border-[#1a1a1e]"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium text-[#1a1a1e] mb-1.5">
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#deded9] rounded-lg outline-none focus:border-[#1a1a1e]"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-[#1a1a1e] mb-1.5">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#deded9] rounded-lg outline-none focus:border-[#1a1a1e]"
                  required
                >
                  {editingTransaction.type === "expense" ? (
                    <>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Subscriptions">Subscriptions</option>
                      <option value="Bills & Utilities">Bills & Utilities</option>
                      <option value="Rent">Rent</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="EMI">EMI</option>
                      <option value="Travel">Travel</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Personal">Personal</option>
                      <option value="Other">Other</option>
                    </>
                  ) : (
                    <option value={form.category}>{form.category}</option>
                  )}
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-xs font-medium text-[#1a1a1e] mb-1.5">
                  Frequency
                </label>

                <select
                  name="frequency"
                  value={form.frequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#deded9] rounded-lg outline-none focus:border-[#1a1a1e]"
                >
                  <option value="one_time">One time</option>
                  <option value="recurring">Recurring</option>
                  <option value="variable_recurring">
                    Variable recurring
                  </option>
                  <option value="emi">EMI</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3">

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-xs font-medium text-[#73737c] border border-[#deded9] rounded-lg hover:bg-[#eeeeeb]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1a1a1e] rounded-lg hover:bg-[#2e2e33]"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
};

const BudgetsPage = ({ budgets, transactions }) => {
  return (
    <section className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1a1a1e]">
            Budgets
          </h2>

          <p className="text-xs text-[#73737c] mt-1">
            Track your spending against your limits
          </p>
        </div>

        <div className="space-y-3">

          {budgets.length === 0 ? (
            <div className="bg-[#f4f4f2] border border-[#e5e5e0] rounded p-10 text-center text-sm text-[#73737c]">
              No budgets created yet.
            </div>
          ) : (
            budgets.map((budget) => {

              const spent = transactions
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category?.toLowerCase() ===
                      budget.category?.toLowerCase()
                )
                .reduce(
                  (total, transaction) =>
                    total + Number(transaction.amount),
                  0
                );

              const percentage = budget.amount
                ? (spent / budget.amount) * 100
                : 0;

              const progress = Math.min(percentage, 100);

              let status = "Within budget";

              if (percentage > 100) {
                status = "Over budget";
              } else if (percentage >= 80) {
                status = "Near limit";
              }

              const remaining = budget.amount - spent;

              return (
                <div
                  key={budget.id}
                  className="bg-[#f4f4f2] border border-[#e5e5e0] rounded px-4 py-4"
                >

                  {/* Header */}
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-sm font-medium text-[#1a1a1e]">
                        {budget.category}
                      </p>

                      <p className="text-xs text-[#73737c] mt-1">
                        ₹{Number(spent).toLocaleString()} spent of ₹
                        {Number(budget.amount).toLocaleString()}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-[#1a1a1e]">
                      {percentage.toFixed(0)}%
                    </span>

                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-[#e5e5e0] rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-teal-700 rounded-full transition-all"
                      style={{
                        width: `${progress}%`
                      }}
                    />
                  </div>

                  {/* Bottom information */}
                  <div className="flex justify-between items-center mt-2">

                    <p className="text-[11px] text-[#73737c]">
                      {remaining >= 0
                        ? `₹${remaining.toLocaleString()} remaining`
                        : `₹${Math.abs(remaining).toLocaleString()} over`}
                    </p>

                    <p className="text-[11px] font-medium text-[#73737c]">
                      {status}
                    </p>

                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
};
const GoalsPage = ({ goals, refreshDashboard }) => {
  const handleDeleteGoal = async (goalId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this goal?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/goals/${goalId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete goal");
    }

    await refreshDashboard();
  } catch (error) {
    console.error("Delete goal failed:", error);
    alert("Could not delete the goal.");
  }
};
  return (
    <section className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1a1a1e]">
            Goals
          </h2>

          <p className="text-xs text-[#73737c] mt-1">
            Track your savings goals and progress
          </p>
        </div>

        <div className="space-y-3">

          {goals.length === 0 ? (
            <div className="bg-[#f4f4f2] border border-[#e5e5e0] rounded p-10 text-center text-sm text-[#73737c]">
              No goals created yet.
            </div>
          ) : (
            goals.map((goal) => {

              const progress = goal.target
                ? Math.min((goal.current / goal.target) * 100, 100)
                : 0;

              return (
                <div
                  key={goal.id}
                  className="bg-[#f4f4f2] border border-[#e5e5e0] rounded px-4 py-4"
                >

                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-sm font-medium text-[#1a1a1e]">
                        {goal.name}
                      </p>

                      <p className="text-xs text-[#73737c] mt-1">
                        ₹{Number(goal.current).toLocaleString()} of ₹
                        {Number(goal.target).toLocaleString()}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-[#1a1a1e]">
                      {progress.toFixed(0)}%
                    </span>
                     <button
      type="button"
      onClick={() => handleDeleteGoal(goal.id)}
      className="text-xs text-red-600 hover:text-red-700 font-medium"
    >
      Delete
    </button>
                  </div>

                  <div className="w-full h-2 bg-[#e5e5e0] rounded-full mt-4 overflow-hidden">
                    <div
                      className="h-full bg-teal-700 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {goal.deadline && (
                    <p className="text-[11px] text-[#73737c] mt-2">
                      Deadline: {goal.deadline}
                    </p>
                  )}

                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState(null);
  const [csvLoading, setCsvLoading] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [metrics, setMetrics] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
  });

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const loadSummary = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/summary");
    const data = await res.json();

    setMetrics({
      balance: data.remaining,
      income: data.income,
      expenses: data.expenses,
      savings: data.savings,
    });
  } catch (error) {
    console.error("Failed to load financial summary:", error);
  }
};

const loadTransactions = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/transactions");
    const data = await res.json();

    setTransactions(data);
  } catch (error) {
    console.error("Failed to load transactions:", error);
  }
};

const loadBudgets = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/budgets");
    const data = await res.json();

    setBudgets(data);
  } catch (error) {
    console.error("Failed to load budgets:", error);
  }
};  

const loadGoals = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/goals");
    const data = await res.json();

    setGoals(data);
  } catch (error) {
    console.error("Failed to load goals:", error);
  }
};

const previewCSV = async () => {
  if (!csvFile) return;

  setCsvLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    const res = await fetch(
      "http://127.0.0.1:8000/preview-csv",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("CSV preview failed");
    }

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    setCsvPreview(data);
  } catch (error) {
    console.error("CSV preview failed:", error);
    alert("Could not read the CSV file.");
  } finally {
    setCsvLoading(false);
  }
};
const importCSV = async () => {
  if (!csvFile) return;

  setCsvLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", csvFile);

    const res = await fetch(
      "http://127.0.0.1:8000/import-csv",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("CSV import failed");
    }

    const data = await res.json();

    await refreshDashboard();

    setCsvFile(null);
    setCsvPreview(null);
    setShowCsvModal(false);

    alert(
      `${data.imported} transactions imported successfully.`
    );
  } catch (error) {
    console.error("CSV import failed:", error);
    alert("Could not import the CSV file.");
  } finally {
    setCsvLoading(false);
  }
};

const refreshDashboard = async () => {
  await Promise.all([
    loadSummary(),
    loadTransactions(),
    loadBudgets(),
    loadGoals(),
  ]);
};

const handleResetEverything = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to reset everything?\n\nThis will permanently delete all transactions, budgets, and goals."
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      "http://127.0.0.1:8000/reset",
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error("Reset failed");
    }

    // Immediately clear chat and loading state
    setMessages([]);
    setLoading(false);

    // Refresh dashboard
    await refreshDashboard();

    alert("All financial data has been reset.");
  } catch (error) {
    console.error("Reset failed:", error);
    setLoading(false);
    alert("Could not reset the financial data.");
  }
};


useEffect(() => {
  loadSummary();
  loadTransactions();
  loadBudgets();
  loadGoals();
}, []);

console.log("Transactions:", transactions);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 const handleSendMessage = async (userText) => {
  const text = userText.trim().toLowerCase();

  // Handle greetings without calling the backend
  if (
    ["hello", "hi", "hey", "hii", "hello there"].includes(text)
  ) {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
        time: timestamp,
      },
      {
        sender: "assistant",
        text: "Hello! 👋 I'm your Finance Assistant. You can add transactions, create budgets or savings goals, or ask me questions about your finances.",
        time: timestamp,
      },
    ]);

    return;
  }

  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const userMsg = {
    sender: "user",
    text: userText,
    time: timestamp,
  };

  setMessages((prev) => [...prev, userMsg]);
  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userText,
      }),
    });

    if (!res.ok) {
      throw new Error("Backend error");
    }

    const data = await res.json();

    // Add AI response
    setMessages((prev) => [
      ...prev,
      {
        sender: "assistant",
        text: data.response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    // Refresh dashboard data
    await refreshDashboard();

  } catch (err) {
    console.error("Chat request failed:", err);

    setMessages((prev) => [
      ...prev,
      {
        sender: "assistant",
        text: "I couldn't connect to the finance backend. Please make sure the backend is running.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } finally {
    setLoading(false);
  }
};

const clearChat = () => {
  setMessages([
    {
      sender: "assistant",
      text: "Hello! I'm your finance assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
};


  console.log("showCsvModal:", showCsvModal);
  return (
    <div className="flex h-screen bg-[#f9f9f8] text-[#1a1a1e] font-sans overflow-hidden antialiased">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onReset={handleResetEverything}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f9f9f8]">
        <Header onMobileMenuClick={() => setMobileOpen(true)} />
      {activeTab === "overview" && (
    <>
        <FinancialSummary metrics={metrics} />

        {/* Chat / Assistant Feed */}
        <section className="flex-1 overflow-y-auto px-4 md:px-6 py-5 flex flex-col justify-between">
          <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#e5e5e0]">
              <IconSparkles />
              <span className="text-xs font-semibold text-[#1a1a1e]">Finance Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700 ml-auto" />
                <button
    onClick={clearChat}
    className="text-xs font-medium text-[#73737c] hover:text-[#1a1a1e] px-2 py-1 rounded-md hover:bg-[#f0f0ec] transition"
  >
    Clear chat
  </button>

            </div>

            {messages.length === 0 ? (
  <div className="my-auto text-center py-6 px-4">
    <h3 className="text-xs font-medium uppercase tracking-wider text-[#73737c]">
      Finance Assistant
    </h3>

    <p className="text-sm font-semibold text-[#1a1a1e] mt-1">
      How can I help with your finances?
    </p>

    <p className="text-xs text-[#73737c] mt-1 max-w-xs mx-auto">
      Track spending, review your budget, or explore a purchase.
    </p>

    <PromptSuggestions
      onSelect={(action) => handleSendMessage(action)}
    />
  </div>
) : (
  <div className="flex-1">
    {messages.map((msg, idx) => (
      <MessageItem key={idx} msg={msg} />
    ))}

    <div ref={messagesEndRef} />
  </div>
)}

{loading && (
  <div className="flex items-center gap-2 text-xs text-[#73737c] italic p-2">
    <span>Processing financial context...</span>
  </div>
)}
          </div>
        </section>
            <ChatInput
        onSend={handleSendMessage}
        loading={loading}
      />
    </>
  )}
      {activeTab === "transactions" && (
        <TransactionsPage transactions={transactions} 
        refreshDashboard={refreshDashboard}
onImportCSV={() => {
  setShowCsvModal(true);
}}/>
        
      )}
      {activeTab === "budgets" && (
  <BudgetsPage budgets={budgets}
  transactions={transactions} />
)}
{activeTab === "goals" && (
  <GoalsPage goals={goals}
    refreshDashboard={refreshDashboard}
  />
)}
      </main>
      {showCsvModal && (
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a1e]">
            Import Transactions
          </h2>

          <p className="text-xs text-[#73737c] mt-1">
            Upload a CSV file to automatically detect and import transactions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowCsvModal(false);
            setCsvFile(null);
            setCsvPreview(null);
          }}
          className="text-xl text-[#73737c] hover:text-[#1a1a1e]"
        >
          ×
        </button>
      </div>

      {/* File picker */}
      <label className="block border-2 border-dashed border-[#d9d9d3] rounded-xl p-8 text-center cursor-pointer hover:bg-[#fafaf8] transition">

        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            setCsvFile(e.target.files?.[0] || null);
            setCsvPreview(null);
          }}
        />

        <p className="text-sm font-medium text-[#1a1a1e]">
          {csvFile
            ? csvFile.name
            : "Click to select a CSV file"}
        </p>

        <p className="text-xs text-[#73737c] mt-1">
          CSV files only
        </p>

      </label>

      {/* Preview button */}
      {csvFile && !csvPreview && (
        <button
          type="button"
          onClick={previewCSV}
          disabled={csvLoading}
          className="w-full mt-4 py-2.5 rounded-lg bg-[#1a1a1e] text-white text-sm font-medium disabled:opacity-50"
        >
          {csvLoading
            ? "Analyzing CSV..."
            : "Preview Transactions"}
        </button>
      )}

      {/* Preview */}
      {csvPreview && (
        <div className="mt-5">

          <div className="grid grid-cols-3 gap-3 mb-5">

            <div className="bg-[#f4f4f2] rounded-lg p-3">
              <p className="text-xs text-[#73737c]">
                Detected
              </p>
              <p className="text-lg font-semibold">
                {csvPreview.total}
              </p>
            </div>

            <div className="bg-[#f4f4f2] rounded-lg p-3">
              <p className="text-xs text-[#73737c]">
                New
              </p>
              <p className="text-lg font-semibold">
                {csvPreview.new_transactions}
              </p>
            </div>

            <div className="bg-[#f4f4f2] rounded-lg p-3">
              <p className="text-xs text-[#73737c]">
                Duplicates
              </p>
              <p className="text-lg font-semibold">
                {csvPreview.duplicates}
              </p>
            </div>

          </div>

          <div className="max-h-64 overflow-y-auto border border-[#e5e5e0] rounded-lg">

            {csvPreview.transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-3 border-b border-[#eeeeea] last:border-b-0"
              >

                <div>
                  <p className="text-sm font-medium">
                    {transaction.description}
                  </p>

                  <p className="text-xs text-[#73737c]">
                    {transaction.date} · {transaction.category}
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  ₹{Number(transaction.amount).toLocaleString("en-IN")}
                </span>

              </div>
            ))}

          </div>

          <button
            type="button"
            onClick={importCSV}
            disabled={
              csvLoading ||
              csvPreview.new_transactions === 0
            }
            className="w-full mt-4 py-2.5 rounded-lg bg-[#1a1a1e] text-white text-sm font-medium disabled:opacity-50"
          >
            {csvLoading
              ? "Importing..."
              : `Import ${csvPreview.new_transactions} Transactions`}
          </button>

        </div>
      )}

    </div>
  </div>
)}
    </div>
  );
}