import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex">

      {/* Sidebar */}

      <aside className="hidden md:flex w-60 bg-white border-r border-gray-200 p-5 flex-col">

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Finwise
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Personal Finance
          </p>
        </div>

        <nav className="mt-10 space-y-1">

          <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 text-sm font-medium">
            Overview
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Transactions
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Budgets
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Goals
          </button>

        </nav>

        <div className="mt-auto text-xs text-gray-400">
          Finance Assistant
        </div>

      </aside>


      {/* Main */}

      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}

        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

          <div>
            <h2 className="font-medium text-sm">
              Finance Assistant
            </h2>

            <p className="text-xs text-gray-400">
              Personal workspace
            </p>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">
            J
          </div>

        </header>


        {/* Chat area */}

        <section className="flex-1 overflow-y-auto px-6 py-10">

          {messages.length === 0 ? (

            <div className="max-w-2xl mx-auto pt-16">

              <h2 className="text-3xl font-semibold tracking-tight">
                Understand your money.
              </h2>

              <p className="text-gray-500 mt-3 leading-6">
                Track expenses, understand your spending and plan your
                finances through a simple conversation.
              </p>


              {/* Quick actions */}

              <div className="grid sm:grid-cols-2 gap-3 mt-8">

                <button
                  onClick={() => setInput("Analyze my finances")}
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition"
                >

                  <p className="text-sm font-medium">
                    Analyze my finances
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Understand your current financial position
                  </p>

                </button>


                <button
                  onClick={() => setInput("How much can I spend?")}
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition"
                >

                  <p className="text-sm font-medium">
                    Check affordability
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    See if a purchase fits your finances
                  </p>

                </button>


                <button
                  onClick={() => setInput("Set a budget of ₹5000 for groceries")}
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition"
                >

                  <p className="text-sm font-medium">
                    Set a budget
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Create a spending limit
                  </p>

                </button>


                <button
                  onClick={() => setInput("I spent ₹500 on groceries")}
                  className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition"
                >

                  <p className="text-sm font-medium">
                    Add an expense
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Record a new transaction
                  </p>

                </button>

              </div>

            </div>

          ) : (

            <div className="max-w-2xl mx-auto space-y-5">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-[#242424] text-white rounded-2xl rounded-br-md"
                        : "bg-white border border-gray-200 rounded-2xl rounded-bl-md"
                    }`}
                  >

                    {message.content}

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Input */}

        <div className="px-6 pb-6">

          <div className="max-w-2xl mx-auto">

            <div className="bg-white border border-gray-300 rounded-2xl flex items-end p-2">

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about your finances..."
                rows="1"
                className="flex-1 resize-none outline-none px-3 py-2 text-sm bg-transparent"
              />

              <button
                onClick={sendMessage}
                className="w-9 h-9 rounded-xl bg-[#242424] text-white text-lg"
              >
                ↑
              </button>

            </div>

            <p className="text-center text-[11px] text-gray-400 mt-2">
              Your financial decisions remain yours.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;