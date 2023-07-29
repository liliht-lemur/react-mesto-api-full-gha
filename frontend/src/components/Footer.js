import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer content">
      <p className="footer__copyright">{`@ ${year} Mesto Russia`}</p>
    </footer>
  );
}

export default Footer;

