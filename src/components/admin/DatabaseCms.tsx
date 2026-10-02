import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Database,
  CheckCircle,
  AlertTriangle,
  Download,
  RefreshCw,
  Server,
  Layers,
  HardDrive,
  Cpu,
  Key,
} from 'lucide-react';

interface DatabaseCmsProps {
  showNotification: (msg: string) => void;
}

export const DatabaseCms: React.FC<DatabaseCmsProps> = ({ showNotification }) => {
  const { dbStatus, refreshDbStatus } = useCms();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshDbStatus();
  }, [refreshDbStatus]);

  const handleTestConnection = async () => {
    setLoading(true);
    await refreshDbStatus();
    setLoading(false);
    showNotification('Database status refreshed.');
  };

  const isConnected = dbStatus?.isMysqlConnected;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono rounded-full mb-2">
            <Database className="h-3.5 w-3.5 text-blue-400" />
            <span>ENTERPRISE DATABASE INFRASTRUCTURE</span>
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Production MySQL Database &amp; Storage
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time MySQL telemetry, connection health, table row counts, and 1-click database schema exports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestConnection}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Test Connection</span>
          </button>

          <button
            onClick={async () => {
              const token = sessionStorage.getItem('orbit_auth_token_admin');
              if (!token) {
                showNotification('Admin authentication token required to download SQL schema.');
                return;
              }
              try {
                showNotification('Exporting authenticated SQL schema...');
                const res = await fetch('/api/database/export-sql', {
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Download failed');
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'orbit_i_production_database.sql';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                showNotification('database.sql downloaded securely.');
              } catch {
                showNotification('Failed to download authenticated database export.');
              }
            }}
            className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download database.sql</span>
          </button>
        </div>
      </div>

      {/* Live Status Card */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border-2 shadow-lg ${
          isConnected
            ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
            : 'bg-amber-50/50 border-amber-300 text-amber-950'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isConnected ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider">
                {isConnected ? 'LIVE MYSQL SERVER CONNECTED' : 'PERSISTENT FALLBACK MODE ACTIVE'}
              </div>
              <h3 className="text-xl font-bold">
                {isConnected
                  ? 'MySQL 8.0 InnoDB (Production Cluster)'
                  : 'Local JSON/Memory Cache (Production Standby)'}
              </h3>
            </div>
          </div>

          <div className="shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isConnected
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                  : 'bg-amber-100 text-amber-900 border-amber-400'
              }`}
            >
              {isConnected ? '● Connected' : '○ Standby / Local'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
          <div>
            <span className="text-gray-500 block">Host:</span>
            <span className="font-bold text-black">{dbStatus?.host || 'localhost'}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Port:</span>
            <span className="font-bold text-black">{dbStatus?.port || '3306'}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Database:</span>
            <span className="font-bold text-black">{dbStatus?.database || 'orbit_i_db'}</span>
          </div>
          <div>
            <span className="text-gray-500 block">User:</span>
            <span className="font-bold text-black">{dbStatus?.user || 'root'}</span>
          </div>
        </div>
      </div>

      {/* Table Statistics */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-black" />
          <span>Active Database Tables &amp; Record Counts</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-gray-500 block">team_members</span>
            <span className="text-2xl font-bold text-black mt-1 block">
              {dbStatus?.tableCounts?.team_members || 10}
            </span>
            <span className="text-[11px] text-gray-400">Total staff &amp; leaders</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-gray-500 block">services</span>
            <span className="text-2xl font-bold text-black mt-1 block">
              {dbStatus?.tableCounts?.services || 6}
            </span>
            <span className="text-[11px] text-gray-400">Verified core services</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-gray-500 block">certificates</span>
            <span className="text-2xl font-bold text-black mt-1 block">
              {dbStatus?.tableCounts?.certificates || 3}
            </span>
            <span className="text-[11px] text-gray-400">Verified credentials</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-gray-500 block">inquiries</span>
            <span className="text-2xl font-bold text-black mt-1 block">
              {dbStatus?.tableCounts?.inquiries || 0}
            </span>
            <span className="text-[11px] text-gray-400">Client submissions</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <span className="text-xs font-mono text-gray-500 block">media_assets</span>
            <span className="text-2xl font-bold text-black mt-1 block">
              {dbStatus?.tableCounts?.media_assets || 4}
            </span>
            <span className="text-[11px] text-gray-400">Official photos &amp; logos</span>
          </div>
        </div>
      </div>

      {/* Enterprise Database Setup Guide */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-black flex items-center gap-2">
          <Server className="h-5 w-5 text-blue-600" />
          <span>How to connect this application to your Production MySQL database</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700 leading-relaxed">
          <div className="bg-white border border-gray-200 p-4 rounded-xl">
            <span className="font-mono font-bold text-black block mb-1">Step 1: Provision MySQL Database</span>
            Create a dedicated database (e.g. <code>orbit_production_db</code>) and an authenticated database user with a secure password.
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-xl">
            <span className="font-mono font-bold text-black block mb-1">Step 2: Import database.sql</span>
            Open <strong>phpMyAdmin</strong> or your MySQL client, select your database, click <strong>Import</strong>, choose the included <code>database.sql</code> file, and execute.
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-xl">
            <span className="font-mono font-bold text-black block mb-1">Step 3: Update Environment Config</span>
            In your server root, set <code>DB_HOST=localhost</code>, <code>DB_USER=your_user</code>, <code>DB_PASSWORD=your_pass</code>, <code>DB_NAME=your_db</code> in <code>.env</code> and restart the application.
          </div>
        </div>
      </div>
    </div>
  );
};
