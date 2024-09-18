import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <a 
        href="https://github.com/webdevbfb?tab=repositories" 
        target="_blank" 
        rel="noopener noreferrer"
        style={styles.link}
      >
        Meine GitHub-Repositories
      </a>
      <p className='made-by'>Erstellt von Bilal</p>
    </footer>
  );
};

const styles = {
  link: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "#9842b3",
  }
};

export default Footer;
