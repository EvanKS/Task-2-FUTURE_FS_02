import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Send, Clock, User, Mail, Globe } from 'lucide-react';
import './LeadDetails.css';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchLeadDetails();
  }, [id, admin]);

  const fetchLeadDetails = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      const { data } = await axios.get(`http://localhost:5000/api/leads/${id}`, config);
      setLead(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lead details', error);
      // Mock data for demo
      setLead({
        _id: id,
        name: 'Demo Lead',
        email: 'demo@example.com',
        source: 'Website',
        status: 'new',
        createdAt: new Date().toISOString(),
        notes: [
          { _id: 'n1', text: 'Initial inquiry via contact form', date: new Date(Date.now() - 86400000).toISOString() },
          { _id: 'n2', text: 'Sent follow-up email', date: new Date().toISOString() }
        ]
      });
      setLoading(false);
    }
  };

  const statusColors = {
    new: 'blue',
    contacted: 'orange',
    converted: 'green'
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      const { data } = await axios.put(`http://localhost:5000/api/leads/${id}`, { text: newNote }, config);
      setLead(data);
      setNewNote('');
    } catch (error) {
      // Mock update
      setLead({
        ...lead,
        notes: [...lead.notes, { _id: Date.now().toString(), text: newNote, date: new Date().toISOString() }]
      });
      setNewNote('');
    }
  };

  if (loading) return <div className="loading-state">Loading lead details...</div>;
  if (!lead) return <div className="empty-state">Lead not found</div>;

  return (
    <div className="lead-details-content animate-fade-in">
      <button className="btn btn-outline back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="details-grid">
        <div className="card profile-card">
          <div className="profile-header">
            <div className="avatar-lg bg-blue">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <h2>{lead.name}</h2>
            <span className={`badge badge-${lead.status}`}>{lead.status}</span>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <Mail className="info-icon" size={18} />
              <span>{lead.email}</span>
            </div>
            <div className="info-item">
              <Globe className="info-icon" size={18} />
              <span>Source: {lead.source}</span>
            </div>
            <div className="info-item">
              <Clock className="info-icon" size={18} />
              <span>Created: {new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="card notes-card">
          <div className="card-header border-bottom pb-4 mb-4">
            <h2>Notes & Follow-ups</h2>
          </div>

          <div className="timeline">
            {lead.notes && lead.notes.length > 0 ? (
              lead.notes.map((note, index) => (
                <div className="timeline-item" key={note._id || index}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <p className="note-text">{note.text}</p>
                    <span className="note-date">
                      {new Date(note.date).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No notes available for this lead.</p>
            )}
          </div>

          <form className="add-note-form" onSubmit={handleAddNote}>
            <textarea
              className="form-control"
              placeholder="Add a new note or follow-up..."
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-primary" disabled={!newNote.trim()}>
              <Send size={18} /> Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
