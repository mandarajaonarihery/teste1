import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Briefcase,
  FilePlus2,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";

// Nouvelle Card au design moderne avec effet glassmorphism
const Card = ({ children, className }) => (
  <div className={`rounded-2xl bg-white/60 backdrop-blur-lg shadow-2xl ring-1 ring-slate-200 p-5 ${className}`}>
    {children}
  </div>
);

const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
);

const Stat = ({ icon: Icon, label, value, trend }) => (
  <Card className="p-6 relative overflow-hidden">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg">
          <Icon size={24} />
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-3xl font-bold text-gray-800 mt-1">{value}</div>
        </div>
      </div>
      {trend != null && (
        <div className="flex items-center gap-1 text-emerald-600 text-lg font-medium">
          <TrendingUp size={20} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  </Card>
);

const API_EMPLOYES = "http://localhost:5000/employe?page=1&limit=10000";

function useEmployes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployes = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_EMPLOYES);
      if (!res.ok) throw new Error("Impossible de charger les employés");
      const json = await res.json();
      setData(json.data || {});
    } catch (e) {
      setError(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployes();
  }, []);

  return { data, loading, error, refetch: fetchEmployes };
}

function flattenEmployes(grouped) {
  // Transformation de la structure { Poste: { actif: [], inactif: [] } } en un tableau plat
  const res = [];
  Object.entries(grouped || {}).forEach(([posteTitre, statusMap]) => {
    Object.entries(statusMap || {}).forEach(([statusKey, items]) => {
      (items || []).forEach((emp) => res.push({ ...emp, _posteTitre: posteTitre, _statusKey: statusKey }));
    });
  });
  return res;
}

function groupByPoste(employes) {
  const map = new Map();
  employes.forEach((e) => {
    const key = e._posteTitre || e.poste?.titre || "—";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

function hiresByMonth(employes) {
  const map = new Map();
  employes.forEach((e) => {
    if (!e.dateEmbauche) return;
    const d = new Date(e.dateEmbauche);
    if (isNaN(d)) return;
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, hires]) => ({ month, hires }));
}

function statCounts(employes) {
  const total = employes.length;
  const actifs = employes.filter((e) => (e.statusEmploye || e._statusKey) === "actif").length;
  const inactifs = total - actifs;
  const postes = new Set(employes.map((e) => e._posteTitre || e.poste?.titre)).size;
  return { total, actifs, inactifs, postes };
}

export default function DashboardRH({ onAddEmploye, onAddBulletin }) {
  const { data, loading, error, refetch } = useEmployes();
  const [q, setQ] = useState("");

  const employesFlat = useMemo(() => flattenEmployes(data), [data]);
  const counts = useMemo(() => statCounts(employesFlat), [employesFlat]);
  const byPoste = useMemo(() => groupByPoste(employesFlat), [employesFlat]);
  const byMonth = useMemo(() => hiresByMonth(employesFlat), [employesFlat]);

  const filtered = useMemo(() => {
    if (!q.trim()) return employesFlat.slice(0, 6);
    const v = q.toLowerCase();
    return employesFlat.filter((e) =>
      `${e.nom} ${e.prenom}`.toLowerCase().includes(v) ||
      (e._posteTitre || e.poste?.titre || "").toLowerCase().includes(v)
    ).slice(0, 12);
  }, [q, employesFlat]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex flex-col p-6">
      <Card className="flex-1 bg-white shadow-2xl rounded-2xl p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* En-tête moderne */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Tableau de bord RH
            </h1>
            <p className="text-gray-500 mt-2">
              Surveillez vos données en temps réel, avec style !
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher nom/poste..."
                className="pl-10 pr-4 py-2 rounded-xl bg-white/80 ring-1 ring-black/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 rounded-xl bg-white/90 ring-1 ring-black/10 px-4 py-2 hover:bg-white transition shadow-sm"
              title="Rafraîchir"
            >
              <RefreshCw size={18} />
              <span className="hidden md:inline">Rafraîchir</span>
            </button>
            <button
              onClick={onAddEmploye}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2 shadow-md hover:bg-indigo-700 transition"
            >
              <Users size={20} />
              <span>Nouvel employé</span>
            </button>
            <button
              onClick={onAddBulletin}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 shadow-md hover:bg-blue-700 transition"
            >
              <FilePlus2 size={20} />
              <span>Créer bulletin</span>
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {loading ? (
            <>
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </>
          ) : (
            <>
              <Stat icon={Users} label="Total employés" value={counts.total} />
              <Stat icon={UserCheck} label="Actifs" value={counts.actifs} />
              <Stat icon={UserX} label="Inactifs" value={counts.inactifs} />
              <Stat icon={Briefcase} label="Postes" value={counts.postes} />
            </>
          )}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Répartition par poste</h3>
              <span className="text-xs text-gray-500">Top postes</span>
            </div>
            <div className="h-72">
              {loading ? (
                <Skeleton className="h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byPoste}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: "#374151" }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis allowDecimals={false} tick={{ fill: "#374151" }} />
                    <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #E5E7EB", color: "#374151" }} />
                    <Legend wrapperStyle={{ color: "#374151" }} />
                    <Bar dataKey="count" name="Employés" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Embauches par mois</h3>
              <span className="text-xs text-gray-500">12 derniers mois</span>
            </div>
            <div className="h-72">
              {loading ? (
                <Skeleton className="h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={byMonth}>
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#374151" }} />
                    <YAxis allowDecimals={false} tick={{ fill: "#374151" }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="hires" name="Embauches" stroke="#4F46E5" fillOpacity={1} fill="url(#areaGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        {/* Liste des employés récents */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Employés récents</h3>
              {!loading && <span className="text-xs text-gray-500">{filtered.length} affichés</span>}
            </div>
            <div className="divide-y">
              {loading ? (
                <>
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </>
              ) : (
                filtered.map((e) => (
                  <div key={e.id} className="py-4 flex items-center gap-4">
                    <img
                      src={e.profileFile}
                      alt="avatar"
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-black/10"
                      onError={(ev) => { ev.currentTarget.src = "https://dummyimage.com/80x80/edf2f7/9aa4b2&text=👤"; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {e.nom} {e.prenom}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {e._posteTitre || e.poste?.titre || "—"}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${(e.statusEmploye || e._statusKey) === "actif" ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`}>
                      {(e.statusEmploye || e._statusKey) === "actif" ? "Actif" : "Inactif"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Actions rapides</h3>
              <span className="text-xs text-gray-500">Gagnez du temps</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                onClick={onAddEmploye}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md ring-1 ring-black/5 hover:shadow-lg transition"
              >
                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Ajouter un employé</div>
                  <div className="text-xs text-gray-500">Ouvrir le formulaire</div>
                </div>
              </button>

              <button
                onClick={onAddBulletin}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md ring-1 ring-black/5 hover:shadow-lg transition"
              >
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <FilePlus2 size={20} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">Créer un bulletin</div>
                  <div className="text-xs text-gray-500">Sélectionner un employé</div>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Affichage d'erreur éventuel */}
        {error && (
          <div className="mt-8">
            <Card className="p-4 bg-red-50 border border-red-200">
              <div className="text-red-700 text-sm">{error}</div>
            </Card>
          </div>
        )}
      </motion.div>
      </Card>
    </div>
  );
}