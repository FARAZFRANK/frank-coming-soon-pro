import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template2({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const templateTwoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Monoton&family=Montserrat:wght@400;700;800&display=swap');

    .template-two-container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
      color: #fff;
      overflow: hidden;
      font-family: 'Montserrat', sans-serif;
    }
    .home-content {
      position: relative;
      z-index: 2;
      width: 100%; height: 100%;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 40px; text-align: center;
    }
    .home-logo img { height: 90px; width: auto; object-fit: contain; margin-bottom: 2rem; }
    
    .template-two-container h1 { 
      font-family: 'Monoton', cursive;
      font-size: 3.5rem; 
      line-height: 1.1;
      text-transform: uppercase;
      margin: 1.5rem 0;
      color: #fff;
      letter-spacing: 0.3rem;
    }
    
    .home-content__clock { 
      display: flex; 
      gap: 1.5rem; 
      margin: 2rem 0; 
    }
    .time { 
      font-size: 2.5rem; 
      font-weight: 400; 
      line-height: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .time span { 
      font-size: 1rem; 
      color: rgba(255, 255, 255, 0.76);
      margin-top: 0.2rem;
    }

    .cs-description {
      max-width: 750px;
      margin: 1.5rem auto 2.5rem;
      font-size: 1.1rem;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 400;
      letter-spacing: 0.01rem;
    }

    .subscribe-form { 
      max-width: 320px; 
      width: 100%; 
      margin: 2rem auto;
      position: relative;
    }
    .subscribe-form input { 
      width: 100%;
      height: 4rem;
      padding: 1rem 120px 1rem 16px;
      background: rgba(255, 255, 255, 0.05);
      border: none;
      color: #fff;
      font-size: 1.2rem;
    }
    .subscribe-form button { 
      position: absolute;
      top: 0; right: 0;
      height: 100%;
      padding: 0 15px;
      background: #1F0528;
      color: #fff;
      border: none;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .home-social { 
      list-style: none;
      display: flex;
      gap: 2rem;
      padding: 0;
      margin: 4rem 0 0;
    }
    .home-social li a { color: #fff; font-size: 20px; transition: 0.3s; text-decoration: none; display: flex; align-items: center; justify-content: center; }
    .home-social li a:hover { color: #1F0528; }

    .home-content__line {
      display: block;
      width: 1px;
      height: 12rem;
      background-color: #1F0528;
      position: absolute;
      right: 84px;
      bottom: 0;
    }

    @media (max-width: 1200px) {
      .template-two-container h1 { font-size: 5rem; }
      .time { font-size: 4rem; }
    }
    @media (max-width: 800px) {
      .template-two-container h1 { font-size: 4rem; }
      .home-content__clock { gap: 1.5rem; }
      .time { font-size: 3rem; }
      .subscribe-form input { padding-right: 20px; }
      .subscribe-form button { position: static; width: 100%; margin-top: 1rem; }
      .home-content__line { display: none; }
    }
  `;

  return (
    <div className="template-two-container" style={{
      backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <style>{templateTwoStyles}</style>
      <div className="home-content">
        <div className="home-logo">
          <img src={logoUrl && logoUrl !== "" ? logoUrl : "/templates/logo-w.png"} alt="Logo" />
        </div>

        <h1>{title === undefined || title === null ? "Coming Soon" : title}</h1>

        <div className="home-content__counter">
          <div className="home-content__clock">
            <div className="time">{String(timeLeft.days).padStart(2, '0')} <span>D</span></div>
            <div className="time">{String(timeLeft.hours).padStart(2, '0')} <span>H</span></div>
            <div className="time">{String(timeLeft.minutes).padStart(2, '0')} <span>M</span></div>
            <div className="time">{String(timeLeft.seconds).padStart(2, '0')} <span>S</span></div>
          </div>
        </div>

        {/* Description removed as requested */}

        <div className="subscribe-form">
          <input type="email" placeholder="Email Address" readOnly />
          <button>NOTIFY ME</button>
        </div>

        <ul className="home-social">
          <StorefrontSocialLinks links={socialLinks} />
        </ul>

        <div className="home-content__line"></div>
      </div>
    </div>
  );
}
