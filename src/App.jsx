import { useState, useEffect } from "react";

const SEED_JOBS = [
  { id: 1, title: "Software Engineer", company: "Google", type: "MNC", city: "Bangalore", area: "Whitefield", category: "IT", jobType: "Apply Online", experience: "0-2 yrs", salary: "18-25 LPA", skills: ["Python", "DSA", "System Design"], careerUrl: "https://careers.google.com", posted: "Today", openings: 12, radius: 8, verified: true },
  { id: 2, title: "Data Analyst", company: "Amazon", type: "MNC", city: "Hyderabad", area: "Gachibowli", category: "IT", jobType: "Apply Online", experience: "0-1 yr", salary: "8-14 LPA", skills: ["SQL", "Excel", "Tableau"], careerUrl: "https://www.amazon.jobs", posted: "Today", openings: 6, radius: 5, verified: true },
  { id: 3, title: "HR Executive", company: "TCS", type: "MNC", city: "Chennai", area: "Sholinganallur", category: "Non-IT", jobType: "Walk-in", experience: "Fresher", salary: "3-5 LPA", skills: ["Communication", "MS Office"], careerUrl: "https://www.tcs.com/careers", posted: "Today", openings: 20, radius: 12, verified: true },
  { id: 4, title: "Frontend Developer", company: "Razorpay", type: "Startup", city: "Bangalore", area: "Koramangala", category: "IT", jobType: "Apply Online", experience: "1-3 yrs", salary: "12-20 LPA", skills: ["React", "TypeScript", "CSS"], careerUrl: "https://razorpay.com/jobs", posted: "Today", openings: 3, radius: 6, verified: true },
  { id: 5, title: "Customer Support", company: "Swiggy", type: "Startup", city: "Bangalore", area: "HSR Layout", category: "Non-IT", jobType: "Walk-in", experience: "Fresher", salary: "2.5-4 LPA", skills: ["Communication", "Problem Solving"], careerUrl: "https://careers.swiggy.com", posted: "Today", openings: 50, radius: 9, verified: true },
  { id: 6, title: "Backend Engineer", company: "Microsoft", type: "MNC", city: "Hyderabad", area: "HITEC City", category: "IT", jobType: "Apply Online", experience: "0-2 yrs", salary: "20-30 LPA", skills: ["C#", ".NET", "Azure"], careerUrl: "https://careers.microsoft.com", posted: "Today", openings: 8, radius: 4, verified: true },
  { id: 7, title: "Business Analyst", company: "Infosys", type: "MNC", city: "Pune", area: "Hinjewadi", category: "IT", jobType: "Apply Online", experience: "0-3 yrs", salary: "6-10 LPA", skills: ["Excel", "Agile", "SQL"], careerUrl: "https://www.infosys.com/careers", posted: "Today", openings: 15, radius: 18, verified: true },
  { id: 8, title: "DevOps Engineer", company: "PhonePe", type: "Startup", city: "Bangalore", area: "Bangalore Central", category: "IT", jobType: "Apply Online", experience: "1-4 yrs", salary: "15-22 LPA", skills: ["Docker", "Kubernetes", "AWS"], careerUrl: "https://www.phonepe.com/careers", posted: "Today", openings: 4, radius: 3, verified: true },
  { id: 9, title: "Sales Executive", company: "HDFC Bank", type: "Large Enterprise", city: "Mumbai", area: "Andheri", category: "Finance", jobType: "Walk-in", experience: "Fresher", salary: "3-6 LPA", skills: ["Sales", "Banking", "CRM"], careerUrl: "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?folderPath=/footer/Careers", posted: "Today", openings: 30, radius: 7, verified: true },
  { id: 10, title: "Machine Learning Engineer", company: "CRED", type: "Startup", city: "Bangalore", area: "Indiranagar", category: "IT", jobType: "Referral", experience: "1-3 yrs", salary: "18-28 LPA", skills: ["Python", "TensorFlow", "NLP"], careerUrl: "https://careers.cred.club", posted: "Today", openings: 2, radius: 5, verified: true },
  { id: 11, title: "Accounts Executive", company: "Wipro", type: "MNC", city: "Delhi", area: "Gurgaon", category: "Finance", jobType: "Apply Online", experience: "0-2 yrs", salary: "4-7 LPA", skills: ["Tally", "GST", "Accounting"], careerUrl: "https://careers.wipro.com", posted: "Today", openings: 10, radius: 15, verified: true },
  { id: 12, title: "UI/UX Designer", company: "Meesho", type: "Startup", city: "Bangalore", area: "MG Road", category: "IT", jobType: "Apply Online", experience: "0-2 yrs", salary: "10-16 LPA", skills: ["Figma", "Prototyping", "User Research"], careerUrl: "https://meesho.io/careers", posted: "Today", openings: 3, radius: 2, verified: true },
];

const CITIES = ["All Cities", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Delhi"];
const COMPANY_TYPES = ["All Types", "MNC", "Large Enterprise", "Startup"];
const CATEGORIES = ["All", "IT", "Non-IT", "Finance", "BPO", "Healthcare"];
const JOB_TYPES = ["All", "Walk-in", "Apply Online", "Referral"];
const EXPERIENCE = ["All", "Fresher", "0-1 yr", "0-2 yrs", "1-3 yrs", "1-4 yrs", "0-3 yrs"];
const RADIUS_KM = [5, 10, 15, 25, 50, 100];
const TYPE_COLORS = { "MNC": "#00c6ff", "Large Enterprise": "#a78bfa", "Startup": "#fb923c" };
const JOBT_COLORS = { "Walk-in": "#4ade80", "Apply Online": "#60a5fa", "Referral": "#f472b6" };

export default function JobPortal() {
  const [view, setView] = useState("jobs");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [jobs, setJobs] = useState(SEED_JOBS);
  const [filters, setFilters] = useState({ city: "All Cities", companyType: "All Types", category: "All", jobType: "All", experience: "All", radius: 25, search: "" });
  const [form, setForm] = useState({ title: "", company: "", type: "MNC", city: "Bangalore", area: "", category: "IT", jobType: "Apply Online", experience: "0-1 yr", salary: "", skills: "", careerUrl: "", openings: 1, radius: 10 });
  const [editId, setEditId] = useState(null);
  const [adminTab, setAdminTab] = useState("list");
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const filtered = jobs.filter(j => {
    if (filters.city !== "All Cities" && j.city !== filters.city) return false;
    if (filters.companyType !== "All Types" && j.type !== filters.companyType) return false;
    if (filters.category !== "All" && j.category !== filters.category) return false;
    if (filters.jobType !== "All" && j.jobType !== filters.jobType) return false;
    if (filters.experience !== "All" && j.experience !== filters.experience) return false;
    if (j.radius > filters.radius) return false;
    if (filters.search && !j.title.toLowerCase().includes(filters.search.toLowerCase()) && !j.company.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  function handleAdminLogin() {
    if (adminPass === "admin123") { setAdminAuthed(true); setAdminError(""); }
    else setAdminError("Wrong password! Try: admin123");
  }

  function handleSave() {
    const skillArr = form.skills.split(",").map(s => s.trim()).filter(Boolean);
    if (editId !== null) {
      setJobs(prev => prev.map(j => j.id === editId ? { ...j, ...form, skills: skillArr, posted: "Today", verified: true } : j));
      setEditId(null);
    } else {
      setJobs(prev => [...prev, { ...form, id: Date.now(), skills: skillArr, posted: "Today", verified: true }]);
    }
    setForm({ title: "", company: "", type: "MNC", city: "Bangalore", area: "", category: "IT", jobType: "Apply Online", experience: "0-1 yr", salary: "", skills: "", careerUrl: "", openings: 1, radius: 10 });
    setAdminTab("list");
  }

  function handleEdit(job) { setForm({ ...job, skills: job.skills.join(", ") }); setEditId(job.id); setAdminTab("add"); }
  function handleDelete(id) { if (window.confirm("Delete this job?")) setJobs(prev => prev.filter(j => j.id !== id)); }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #0a0a0f; color: #e8e8f0; min-height: 100vh; }
    .portal { min-height: 100vh; background: #0a0a0f; }
    .nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 32px; border-bottom: 1px solid #1e1e2e; background: rgba(10,10,15,0.95); position: sticky; top: 0; z-index: 100; backdrop-filter: blur(12px); }
    .nav-brand { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
    .nav-brand span { color: #f97316; }
    .nav-meta { font-size: 0.78rem; color: #6b6b80; margin-top: 2px; }
    .nav-right { display: flex; gap: 12px; align-items: center; }
    .btn-nav { padding: 8px 20px; border-radius: 8px; border: 1px solid #2a2a3e; background: transparent; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; }
    .btn-nav:hover { background: #1e1e2e; border-color: #f97316; color: #f97316; }
    .btn-nav.active { background: #f97316; border-color: #f97316; color: #fff; }
    .hero { padding: 48px 32px 32px; text-align: center; }
    .hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.1; color: #fff; }
    .hero h1 span { color: #f97316; }
    .hero p { color: #6b6b80; margin-top: 12px; font-size: 1rem; }
    .live-badge { display: inline-flex; align-items: center; gap: 6px; background: #1a2a1a; border: 1px solid #2a4a2a; color: #4ade80; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; margin-bottom: 20px; }
    .live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
    .search-bar { max-width: 700px; margin: 0 auto 24px; position: relative; padding: 0 32px; }
    .search-bar input { width: 100%; padding: 14px 20px 14px 48px; border-radius: 12px; border: 1px solid #2a2a3e; background: #12121c; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; }
    .search-bar input:focus { border-color: #f97316; }
    .search-icon { position: absolute; left: 48px; top: 50%; transform: translateY(-50%); color: #6b6b80; }
    .filters { display: flex; flex-wrap: wrap; gap: 10px; padding: 0 32px 24px; justify-content: center; }
    .filter-group { display: flex; flex-direction: column; gap: 4px; }
    .filter-label { font-size: 0.7rem; color: #6b6b80; text-transform: uppercase; letter-spacing: 0.5px; }
    .filter-select { padding: 8px 14px; border-radius: 8px; border: 1px solid #2a2a3e; background: #12121c; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; cursor: pointer; outline: none; }
    .radius-chips { display: flex; gap: 6px; }
    .chip { padding: 7px 13px; border-radius: 8px; border: 1px solid #2a2a3e; background: #12121c; color: #9090a8; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
    .chip.active { border-color: #f97316; background: rgba(249,115,22,0.12); color: #f97316; }
    .stats-bar { display: flex; gap: 24px; padding: 0 32px 20px; justify-content: center; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-num { font-family: 'Syne', sans-serif; font-size: 1.5rem; font-weight: 700; color: #f97316; }
    .stat-label { font-size: 0.72rem; color: #6b6b80; }
    .job-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 18px; padding: 0 32px 48px; }
    .job-card { background: #12121c; border: 1px solid #1e1e2e; border-radius: 16px; padding: 22px; transition: all 0.25s; position: relative; overflow: hidden; }
    .job-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--accent, #f97316); }
    .job-card:hover { border-color: #2e2e4e; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .company-badge { display: flex; align-items: center; gap: 8px; }
    .company-icon { width: 38px; height: 38px; border-radius: 10px; background: #1e1e2e; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: var(--accent, #f97316); font-family: 'Syne', sans-serif; }
    .company-name { font-weight: 600; font-size: 0.9rem; color: #c8c8d8; }
    .company-type-tag { font-size: 0.68rem; color: var(--type-color); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; margin-top: 2px; display: inline-block; }
    .verified-icon { color: #60a5fa; font-size: 0.75rem; }
    .job-title { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .job-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
    .meta-tag { font-size: 0.72rem; padding: 3px 9px; border-radius: 6px; background: #1e1e2e; color: #9090a8; display: flex; align-items: center; gap: 4px; }
    .meta-tag.highlight { background: rgba(249,115,22,0.1); color: #f97316; }
    .skills-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .skill-tag { font-size: 0.7rem; padding: 3px 8px; border-radius: 5px; border: 1px solid #2a2a3e; color: #7070a0; }
    .card-bottom { display: flex; justify-content: space-between; align-items: center; }
    .salary { font-family: 'Syne', sans-serif; font-weight: 700; color: #4ade80; font-size: 0.95rem; }
    .openings { font-size: 0.72rem; color: #6b6b80; }
    .btn-apply { padding: 8px 18px; border-radius: 8px; border: none; background: #f97316; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; }
    .btn-apply:hover { background: #ea6a08; }
    .jobtype-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
    .posted-time { font-size: 0.68rem; color: #4ade80; background: rgba(74,222,128,0.1); padding: 2px 7px; border-radius: 4px; }
    .empty { text-align: center; padding: 80px 32px; color: #3a3a5a; }
    .empty-icon { font-size: 3rem; margin-bottom: 12px; }
    .admin-wrapper { max-width: 1000px; margin: 0 auto; padding: 32px; }
    .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
    .admin-title { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; }
    .admin-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
    .tab-btn { padding: 9px 22px; border-radius: 8px; border: 1px solid #2a2a3e; background: transparent; color: #9090a8; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
    .tab-btn.active { background: #f97316; border-color: #f97316; color: #fff; }
    .admin-table { width: 100%; border-collapse: collapse; }
    .admin-table th { text-align: left; padding: 10px 14px; font-size: 0.75rem; color: #6b6b80; text-transform: uppercase; border-bottom: 1px solid #1e1e2e; }
    .admin-table td { padding: 12px 14px; font-size: 0.85rem; border-bottom: 1px solid #14141e; vertical-align: middle; }
    .admin-table tr:hover td { background: #14141e; }
    .btn-edit { padding: 5px 12px; border-radius: 6px; border: 1px solid #2a2a3e; background: transparent; color: #60a5fa; font-size: 0.78rem; cursor: pointer; }
    .btn-del { padding: 5px 12px; border-radius: 6px; border: 1px solid #3a1a1a; background: transparent; color: #f87171; font-size: 0.78rem; cursor: pointer; margin-left: 6px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-field { display: flex; flex-direction: column; gap: 6px; }
    .form-field.full { grid-column: 1 / -1; }
    .form-label { font-size: 0.78rem; color: #6b6b80; text-transform: uppercase; letter-spacing: 0.4px; }
    .form-input { padding: 10px 14px; border-radius: 8px; border: 1px solid #2a2a3e; background: #0e0e18; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; outline: none; }
    .form-input:focus { border-color: #f97316; }
    .form-select { padding: 10px 14px; border-radius: 8px; border: 1px solid #2a2a3e; background: #0e0e18; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; outline: none; }
    .btn-save { padding: 12px 32px; border-radius: 10px; border: none; background: #f97316; color: #fff; font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; margin-top: 20px; }
    .btn-cancel { padding: 12px 24px; border-radius: 10px; border: 1px solid #2a2a3e; background: transparent; color: #9090a8; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; cursor: pointer; margin-top: 20px; margin-left: 10px; }
    .login-box { max-width: 360px; margin: 80px auto; background: #12121c; border: 1px solid #2a2a3e; border-radius: 20px; padding: 40px 32px; text-align: center; }
    .login-title { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
    .login-sub { font-size: 0.82rem; color: #6b6b80; margin-bottom: 28px; }
    .login-input { width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid #2a2a3e; background: #0e0e18; color: #e8e8f0; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; text-align: center; letter-spacing: 3px; margin-bottom: 14px; }
    .login-btn { width: 100%; padding: 12px; border-radius: 10px; border: none; background: #f97316; color: #fff; font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; }
    .login-err { color: #f87171; font-size: 0.82rem; margin-top: 10px; }
    .login-hint { font-size: 0.73rem; color: #3a3a5a; margin-top: 16px; }
  `;

  const companyInitial = (name) => name.slice(0, 2).toUpperCase();

  function JobCard({ job }) {
    const accentColor = TYPE_COLORS[job.type] || "#f97316";
    const jobtColor = JOBT_COLORS[job.jobType] || "#9090a8";
    return (
      <div className="job-card" style={{ "--accent": accentColor, "--type-color": accentColor }}>
        <div className="card-top">
          <div className="company-badge">
            <div className="company-icon">{companyInitial(job.company)}</div>
            <div>
              <div className="company-name">{job.company} {job.verified && <span className="verified-icon">✓</span>}</div>
              <span className="company-type-tag">{job.type}</span>
            </div>
          </div>
          <span className="posted-time">🟢 {job.posted}</span>
        </div>
        <div className="job-title">{job.title}</div>
        <div className="job-meta">
          <span className="meta-tag">📍 {job.area}, {job.city}</span>
          <span className="meta-tag">📏 {job.radius} km</span>
          <span className="meta-tag">👤 {job.experience}</span>
          <span className="meta-tag highlight"><span className="jobtype-dot" style={{ background: jobtColor }}></span>{job.jobType}</span>
          <span className="meta-tag">🏷️ {job.category}</span>
        </div>
        <div className="skills-row">{job.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
        <div className="card-bottom">
          <div>
            <div className="salary">💰 {job.salary}</div>
            <div className="openings">{job.openings} openings</div>
          </div>
          <a href={job.careerUrl} target="_blank" rel="noopener noreferrer" className="btn-apply" onClick={e => e.stopPropagation()}>Apply →</a>
        </div>
      </div>
    );
  }

  function AdminLogin() {
    return (
      <div className="login-box">
        <div className="login-title">🔐 Admin Panel</div>
        <div className="login-sub">Enter password to manage jobs</div>
        <input className="login-input" type="password" placeholder="••••••••" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdminLogin()} />
        <button className="login-btn" onClick={handleAdminLogin}>Login</button>
        {adminError && <div className="login-err">{adminError}</div>}
        <div className="login-hint">Demo password: admin123</div>
      </div>
    );
  }

  function AdminPanel() {
    return (
      <div className="admin-wrapper">
        <div className="admin-header">
          <div className="admin-title">⚙️ Job Manager</div>
          <div style={{ color: "#6b6b80", fontSize: "0.82rem" }}>Total: {jobs.length} jobs • Updated: {today}</div>
        </div>
        <div className="admin-tabs">
          <button className={`tab-btn ${adminTab === "list" ? "active" : ""}`} onClick={() => { setAdminTab("list"); setEditId(null); }}>📋 All Jobs ({jobs.length})</button>
          <button className={`tab-btn ${adminTab === "add" ? "active" : ""}`} onClick={() => { setAdminTab("add"); setEditId(null); setForm({ title: "", company: "", type: "MNC", city: "Bangalore", area: "", category: "IT", jobType: "Apply Online", experience: "0-1 yr", salary: "", skills: "", careerUrl: "", openings: 1, radius: 10 }); }}>➕ {editId ? "Edit Job" : "Add Job"}</button>
        </div>
        {adminTab === "list" && (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead><tr><th>Job Title</th><th>Company</th><th>City</th><th>Type</th><th>Salary</th><th>Actions</th></tr></thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td style={{ color: "#e8e8f0", fontWeight: 500 }}>{job.title}</td>
                    <td style={{ color: "#9090a8" }}>{job.company}</td>
                    <td><span style={{ color: "#f97316", fontSize: "0.78rem" }}>{job.city}</span></td>
                    <td><span style={{ color: TYPE_COLORS[job.type] || "#f97316", fontSize: "0.75rem" }}>{job.type}</span></td>
                    <td style={{ color: "#4ade80", fontSize: "0.82rem" }}>{job.salary}</td>
                    <td>
                      <button className="btn-edit" onClick={() => { handleEdit(job); setAdminTab("add"); }}>✏️ Edit</button>
                      <button className="btn-del" onClick={() => handleDelete(job.id)}>🗑️ Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {adminTab === "add" && (
          <div>
            <div style={{ color: "#f97316", fontSize: "0.85rem", marginBottom: "16px" }}>{editId ? `✏️ Editing: ${form.title}` : "➕ Add New Job Vacancy"}</div>
            <div className="form-grid">
              <div className="form-field"><label className="form-label">Job Title *</label><input className="form-input" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Software Engineer" /></div>
              <div className="form-field"><label className="form-label">Company Name *</label><input className="form-input" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="e.g. Google" /></div>
              <div className="form-field"><label className="form-label">Company Type</label><select className="form-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>{["MNC", "Large Enterprise", "Startup"].map(t => <option key={t}>{t}</option>)}</select></div>
              <div className="form-field"><label className="form-label">City</label><select className="form-select" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}>{["Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Delhi", "Kolkata"].map(c => <option key={c}>{c}</option>)}</select></div>
              <div className="form-field"><label className="form-label">Area / Locality</label><input className="form-input" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} placeholder="e.g. Koramangala" /></div>
              <div className="form-field"><label className="form-label">Category</label><select className="form-select" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>{["IT", "Non-IT", "Finance", "BPO", "Healthcare", "Manufacturing"].map(c => <option key={c}>{c}</option>)}</select></div>
              <div className="form-field"><label className="form-label">Job Type</label><select className="form-select" value={form.jobType} onChange={e => setForm(p => ({ ...p, jobType: e.target.value }))}>{["Apply Online", "Walk-in", "Referral"].map(t => <option key={t}>{t}</option>)}</select></div>
              <div className="form-field"><label className="form-label">Experience</label><input className="form-input" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} placeholder="e.g. Fresher / 0-2 yrs" /></div>
              <div className="form-field"><label className="form-label">Salary</label><input className="form-input" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} placeholder="e.g. 8-14 LPA" /></div>
              <div className="form-field"><label className="form-label">Openings</label><input className="form-input" type="number" value={form.openings} onChange={e => setForm(p => ({ ...p, openings: parseInt(e.target.value) || 1 }))} /></div>
              <div className="form-field"><label className="form-label">Radius (km)</label><input className="form-input" type="number" value={form.radius} onChange={e => setForm(p => ({ ...p, radius: parseInt(e.target.value) || 10 }))} /></div>
              <div className="form-field"><label className="form-label">Skills (comma separated)</label><input className="form-input" value={form.skills} onChange={e => setForm(p => ({ ...p, skills: e.target.value }))} placeholder="React, Node.js, SQL" /></div>
              <div className="form-field full"><label className="form-label">Career Page URL *</label><input className="form-input" value={form.careerUrl} onChange={e => setForm(p => ({ ...p, careerUrl: e.target.value }))} placeholder="https://careers.company.com" /></div>
            </div>
            <div>
              <button className="btn-save" onClick={handleSave}>{editId ? "💾 Update Job" : "✅ Add Job"}</button>
              <button className="btn-cancel" onClick={() => { setAdminTab("list"); setEditId(null); }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="portal">
        <nav className="nav">
          <div>
            <div className="nav-brand">Job<span>Radar</span> 🇮🇳</div>
            <div className="nav-meta">Daily updated • MNC to Startups • Direct apply</div>
          </div>
          <div className="nav-right">
            <button className={`btn-nav ${view === "jobs" ? "active" : ""}`} onClick={() => setView("jobs")}>🔍 Jobs</button>
            <button className={`btn-nav ${view === "admin" ? "active" : ""}`} onClick={() => setView("admin")}>⚙️ Admin</button>
          </div>
        </nav>
        {view === "jobs" && (
          <>
            <div className="hero">
              <div className="live-badge"><span className="live-dot"></span> Live • Updated {today}</div>
              <h1>Find Jobs Across <span>India</span></h1>
              <p>MNC giants to hot startups • Walk-in, Online & Referral • Freshers welcome</p>
            </div>
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input placeholder="Search by job title or company..." value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))} />
            </div>
            <div className="filters">
              <div className="filter-group"><span className="filter-label">City</span><select className="filter-select" value={filters.city} onChange={e => setFilters(p => ({ ...p, city: e.target.value }))}>{CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div className="filter-group"><span className="filter-label">Company</span><select className="filter-select" value={filters.companyType} onChange={e => setFilters(p => ({ ...p, companyType: e.target.value }))}>{COMPANY_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div className="filter-group"><span className="filter-label">Category</span><select className="filter-select" value={filters.category} onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div className="filter-group"><span className="filter-label">Job Type</span><select className="filter-select" value={filters.jobType} onChange={e => setFilters(p => ({ ...p, jobType: e.target.value }))}>{JOB_TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div className="filter-group"><span className="filter-label">Experience</span><select className="filter-select" value={filters.experience} onChange={e => setFilters(p => ({ ...p, experience: e.target.value }))}>{EXPERIENCE.map(e => <option key={e}>{e}</option>)}</select></div>
              <div className="filter-group"><span className="filter-label">Radius (km)</span><div className="radius-chips">{RADIUS_KM.map(r => <button key={r} className={`chip ${filters.radius === r ? "active" : ""}`} onClick={() => setFilters(p => ({ ...p, radius: r }))}>{r}km</button>)}</div></div>
            </div>
            <div className="stats-bar">
              <div className="stat"><div className="stat-num">{filtered.length}</div><div className="stat-label">Vacancies Found</div></div>
              <div className="stat"><div className="stat-num">{filtered.filter(j => j.type === "MNC").length}</div><div className="stat-label">MNC Jobs</div></div>
              <div className="stat"><div className="stat-num">{filtered.filter(j => j.type === "Startup").length}</div><div className="stat-label">Startup Jobs</div></div>
              <div className="stat"><div className="stat-num">{filtered.filter(j => j.jobType === "Walk-in").length}</div><div className="stat-label">Walk-ins Today</div></div>
              <div className="stat"><div className="stat-num">{filtered.reduce((a, j) => a + (j.openings || 0), 0)}</div><div className="stat-label">Total Openings</div></div>
            </div>
            {filtered.length > 0 ? (
              <div className="job-grid">{filtered.map(job => <JobCard key={job.id} job={job} />)}</div>
            ) : (
              <div className="empty"><div className="empty-icon">🔎</div><p>No jobs found. Try adjusting filters.</p></div>
            )}
          </>
        )}
        {view === "admin" && (adminAuthed ? <AdminPanel /> : <AdminLogin />)}
      </div>
    </>
  );
}