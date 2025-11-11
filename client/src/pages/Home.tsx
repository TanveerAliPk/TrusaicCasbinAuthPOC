import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

/**
 * Casbin RBAC/ABAC Hybrid Authorization POC - Home Page
 */
export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <h1 className="text-xl font-bold text-white">Casbin POC</h1>
          </div>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-300 text-sm">{user?.name || user?.email || "User"}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href="/casbin">Dashboard</a>
                </Button>
              </div>
            ) : (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Casbin RBAC/ABAC Hybrid Authorization</h2>
          <p className="text-xl text-slate-300 mb-8">Proof of Concept - Interactive Policy Management and Access Control Testing</p>
          {isAuthenticated ? (
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <a href="/casbin">Go to Dashboard</a>
            </Button>
          ) : (
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <a href={getLoginUrl()}>Get Started</a>
            </Button>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">RBAC Policies</h3>
            <p className="text-slate-400">Role-Based Access Control with hierarchical role inheritance and flexible policy definitions.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">ABAC Attributes</h3>
            <p className="text-slate-400">Attribute-Based Access Control enabling fine-grained authorization based on user and resource attributes.</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Hybrid Enforcement</h3>
            <p className="text-slate-400">Combined RBAC and ABAC policies for comprehensive authorization scenarios and real-world use cases.</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Policy Management</h4>
                <p className="text-slate-400 text-sm">Create, read, update, and delete authorization policies with visual feedback</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Resource Management</h4>
                <p className="text-slate-400 text-sm">Define and classify resources with department and security level attributes</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <h4 className="text-white font-semibold mb-1">User Attributes</h4>
                <p className="text-slate-400 text-sm">Assign custom attributes to users for ABAC-based authorization decisions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <h4 className="text-white font-semibold mb-1">Access Testing</h4>
                <p className="text-slate-400 text-sm">Real-time access control verification with immediate allow/deny feedback</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Technical Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Backend</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• Express.js + tRPC for type-safe APIs</li>
                <li>• Casbin for policy enforcement</li>
                <li>• MySQL with Drizzle ORM</li>
                <li>• JWT-based authentication</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Frontend</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>• React 19 with TypeScript</li>
                <li>• Tailwind CSS 4 for styling</li>
                <li>• shadcn/ui components</li>
                <li>• Real-time policy testing interface</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
