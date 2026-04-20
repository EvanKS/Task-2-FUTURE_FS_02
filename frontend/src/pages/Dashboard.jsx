import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, CheckCircle, TrendingUp, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ searchTerm }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, [admin]);

  const fetchLeads = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${admin.token}` }
      };
      const { data } = await axios.get('http://localhost:5000/api/leads', config);
      setLeads(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Fallback mock data for demo purposes if backend isn't up
      setLeads([
        { _id: '1', name: 'Alice Smith', email: 'alice@example.com', source: 'Website', status: 'new', createdAt: new Date().toISOString() },
        { _id: '2', name: 'Bob Johnson', email: 'bob@company.com', source: 'Referral', status: 'contacted', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { _id: '3', name: 'Carol Williams', email: 'carol@startup.io', source: 'Social Media', status: 'converted', createdAt: new Date(Date.now() - 172800000).toISOString() }
      ]);
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${admin.token}` } };
        await axios.delete(`http://localhost:5000/api/leads/${id}`, config);
        setLeads(leads.filter((l) => l._id !== id));
      } catch (error) {
        console.error('Error deleting lead', error);
        // Map local state delete if using mock
        setLeads(leads.filter((l) => l._id !== id));
      }
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.put(`http://localhost:5000/api/leads/${id}`, { status }, config);
      setLeads(leads.map((l) => (l._id === id ? { ...l, status } : l)));
    } catch (error) {
      // Mock update
      setLeads(leads.map((l) => (l._id === id ? { ...l, status } : l)));
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
      l.email.toLowerCase().includes(searchTerm?.toLowerCase() || '');
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    rate: leads.length ? Math.round((leads.filter((l) => l.status === 'converted').length / leads.length) * 100) : 0,
  };

  if (loading) return <div className="loading-state">Loading dashboard...</div>;

  return (
    <div className="dashboard-content animate-fade-in">
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon-wrapper bg-blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Leads</h3>
            <p>{stats.total}</p>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon-wrapper bg-orange">
            <UserPlus size={24} />
          </div>
          <div className="stat-info">
            <h3>New Leads</h3>
            <p>{stats.new}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper bg-green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Converted</h3>
            <p>{stats.converted}</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper bg-purple">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>Conversion Rate</h3>
            <p>{stats.rate}%</p>
          </div>
        </div>
      </div>

      <div className="card mt-8">
        <div className="card-header">
          <h2>Recent Leads</h2>
          <div className="flex-row-gap">
            <select 
              className="status-select" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
            <button className="btn btn-primary" onClick={() => alert('New lead modal would open here!')}>
              <UserPlus size={18} /> Add Lead
            </button>
          </div>
        </div>
        
        {filteredLeads.length === 0 ? (
          <div className="empty-state">
            <Users size={48} className="empty-icon" />
            <p>No leads found.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="font-medium text-main">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td><span className="source-tag">{lead.source}</span></td>
                    <td>
                      <select 
                        className={`status-select badge badge-${lead.status}`}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="text-muted">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn text-muted hover-primary" 
                          onClick={() => navigate(`/lead/${lead._id}`)}
                          title="View details"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          className="action-btn text-muted hover-danger" 
                          onClick={() => deleteLead(lead._id)}
                          title="Delete lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
