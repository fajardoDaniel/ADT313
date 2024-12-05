import React, { useState, useEffect } from 'react';
import './Cast.css';

const CastsAndCrew = ({ members }) => {
    return (
    <div className="members-container">
            {members.map((member, index) => (
                <div key={index} className="member-card">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    {member.imageUrl && <img src={member.imageUrl} alt={`${member.name}`} className="member-image" />}
                    {member.description && <p className="member-description">{member.description}</p>} 
                </div>
            ))}
        </div>
    );
};

export default function App() {
    const [membersData, setMembersData] = useState([ ]); 
    const [newMember, setNewMember] = useState({ name: ' ', role: ' ', imageUrl: ' ', description: ' ' }); 
 
    useEffect(() => {
        const savedMembers = localStorage.getItem('membersData');
        if (savedMembers) {
            setMembersData(JSON.parse(savedMembers));
        }
    }, [ ]); 

    useEffect(() => {
        localStorage.setItem('membersData', JSON.stringify(membersData));
    }, [membersData]);
  
    const addMember = ( ) => { 
    if (newMember.name.trim( ) !== ' ' && newMember.role.trim( ) !== ' ' ) { 
            setMembersData([...membersData, newMember]);
            setNewMember({ name: ' ', role: ' ', imageUrl: ' ', description: ' ' }); 
        }
    };
   
    useEffect(( ) => { 
        const interval = setInterval(( ) => { 
            console.log('Auto-saving cast and crew data:', membersData);
        }, 5000);
  
        return ( ) => clearInterval(interval); 
    }, [membersData]);
  
    return (
        <div>
            <h1>Cast and Crew</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} 
                    placeholder="Enter name"
                />
                <input
                    type="text"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="Enter role"
                />
                <input
                    type="text"
                    value={newMember.imageUrl}
                    onChange={(e) =>  setNewMember({ ...newMember, imageUrl: e.target.value })} 
                    placeholder="Enter image URL"
                />
                <input
                    type="text"
                    value={newMember.description}
                    onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                    placeholder="Enter description"
                />
                <button onClick={addMember}>Add Member</button>
            </div>   
            <CastsAndCrew members={membersData} />
        </div>
    );          
}
