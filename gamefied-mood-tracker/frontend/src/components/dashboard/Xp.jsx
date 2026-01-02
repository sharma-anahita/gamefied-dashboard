// src/components/dashboard/Xp.jsx

const Xp = ({ xp, level }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
      <div>
        <h3 style={{
          margin: '0 0 4px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#fff'
        }}>
          Experience Points
        </h3>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          Level {level}
        </p>
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#fff'
      }}>
        {xp} XP
      </div>
    </div>
  );
};

export default Xp;