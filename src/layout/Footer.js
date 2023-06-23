const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__builder">
        <div className="container">
          <div className="row">
           
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-center">
              <div
                className="copyright-text"
              >
                © {new Date().getFullYear()} Thumbi. All Rights Reserved
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
