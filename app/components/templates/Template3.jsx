import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template3({ settings, timeLeft, isAdmin }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const templateThreeStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Nunito+Sans:wght@400;600&display=swap');

    .template-three-container {
      position: relative;
      width: 100%; height: 100%;
      background-color: transparent;
      display: flex; align-items: center; justify-content: center;
      font-family: "Montserrat", sans-serif;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }

    .template-three-container::before {
      display: block; content: "";
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background-color: #111111; opacity: .7; z-index: 2;
    }

    .template-three-container::after {
      display: block; content: "";
      width: 50%; height: 100%;
      background-color: rgba(0, 0, 0, 0.3); opacity: .5;
      z-index: 3; position: absolute;
      top: 0; left: 50%; bottom: 0; right: 0;
    }

    .grid-overlay {
      display: block; position: absolute;
      top: 0; left: 50%; bottom: 0; right: 0;
      max-width: 1200px; width: 89%; height: 100%;
      opacity: .5;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      transform: translate3d(-50%, 0, 0);
      z-index: 3;
    }

    .grid-overlay::before, .grid-overlay::after {
      content: "";
      background-color: rgba(255, 255, 255, 0.1);
      position: absolute; top: 0; bottom: 0; height: 100%; width: 1px;
    }
    .grid-overlay::before { left: 25%; }
    .grid-overlay::after { right: 25%; }

    .home-content {
      position: relative; z-index: 4;
      width: 100%; padding: 40px; text-align: center;
    }

    .template-three-container h1 {
      font-weight: 800;
      font-size: 4rem;
      line-height: 1.1;
      letter-spacing: -.02em;
      color: #FFFFFF;
      margin: 0 0 30px;
      padding: 0 20px;
      text-transform: capitalize;
    }

    .home-content__video {
      display: inline-block;
      margin-bottom: 40px;
    }

    .video-icon {
      display: inline-block;
      height: 70px; width: 70px;
      border-radius: 50%;
      background-color: #793ea5;
      background-image: url('data:image/svg+xml;utf8,<svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>');
      background-repeat: no-repeat; background-position: 55% center;
      background-size: 40px 40px;
      transition: 0.3s;
      cursor: pointer;
    }

    .video-text {
      display: block;
      font-family: "Nunito Sans", sans-serif;
      font-weight: 600; font-size: 11px;
      line-height: 1; color: #9c9c9c;
      text-transform: uppercase; letter-spacing: .4rem;
      margin-top: 12px;
      transition: 0.3s;
    }

    .home-content h3 {
    font-size: 0.80rem;
    line-height: 1.286;
    letter-spacing: .3rem;
    color: white;
    margin-bottom: 3rem;
    position: relative;
    margin-top: 2rem;
  }

    .home-content__clock {
      display: flex; justify-content: center;
      gap: 2px;
      margin-top: 20px;
    }

    .home-content__clock .time {
      color: #FFFFFF;
      font-size: 2.2rem;
      font-weight: 800;
      width: 90px; height: 85px;
      background: #13161b;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      line-height: 1;
    }
    .home-content__clock .time:last-child {
      background: #1F0528;
    }

    .home-content__clock .time span {
      font-size: 0.9rem; 
      opacity: 0.8; 
      font-weight: 700;
      margin-top: 4px;
      display: block;
    }

    .home-social {
      position: absolute; bottom: 40px; left: 50px;
      list-style: none; display: flex; flex-direction: column; gap: 25px;
      margin: 0; padding: 0; z-index: 5;
    }
    .home-social li a { color: #fff; font-size: 22px; opacity: 0.6; transition: 0.3s; text-decoration: none; display: flex; align-items: center; justify-content: center; }
    .home-social li a:hover { opacity: 1; color: #793ea5; }

    @media (max-width: 800px) {
      .template-three-container h1 { font-size: 3rem; }
      .home-content__clock .time { width: 60px; height: 55px; font-size: 1.6rem; }
      .home-social { left: 50%; transform: translateX(-50%); bottom: 10px; }
    }
  `;

  return (
    <div className="template-three-container" style={{
      backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-3.png')"
    }}>
      <style>{templateThreeStyles}</style>
      <div className="grid-overlay"></div>
      <div className="home-content">
        <div className="home-content__main">
          <div className="home-logo">
            <img src={logoUrl && logoUrl !== "" ? logoUrl : "/templates/logo-w.png"} alt="Logo" style={{ height: "45px", width: "auto", objectFit: "contain", marginBottom: "20px" }} />
          </div>
          <h1>{title === undefined || title === null ? "Coming Soon" : title}</h1>

          <div className="home-content__video">
            {settings.watchVideoUrl ? (
              <a href="#" onClick={(e) => {
                e.preventDefault();
                if (isAdmin) return;
                let embedUrl = settings.watchVideoUrl;
                if(embedUrl.includes('youtube.com/watch?v=')) {
                  embedUrl = embedUrl.replace('watch?v=', 'embed/') + '?autoplay=1';
                } else if(embedUrl.includes('youtu.be/')) {
                  embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=1';
                }
                const modal = document.getElementById('admin-t3-video-modal');
                const frame = document.getElementById('admin-t3-video-frame');
                if (modal && frame) {
                  modal.style.display = 'flex';
                  frame.src = embedUrl;
                }
              }} style={{ textDecoration: 'none' }}>
                <div className="video-link">
                  <span className="video-icon"></span>
                  <span className="video-text">Watch Video</span>
                </div>
              </a>
            ) : (
              <div className="video-link">
                <span className="video-icon"></span>
                <span className="video-text">Watch Video</span>
              </div>
            )}
          </div>
          <h3>{(countdownTitle === undefined || countdownTitle === null) ? "Launching In..." : countdownTitle}</h3>

          <div className="home-content__counter">
            <div className="home-content__clock">
              <div className="time">{String(timeLeft.days).padStart(2, '0')} <span>D</span></div>
              <div className="time">{String(timeLeft.hours).padStart(2, '0')} <span>H</span></div>
              <div className="time">{String(timeLeft.minutes).padStart(2, '0')} <span>M</span></div>
              <div className="time">{String(timeLeft.seconds).padStart(2, '0')} <span>S</span></div>
            </div>
          </div>
        </div>
      </div>

      {settings.watchVideoUrl && (
        <div id="admin-t3-video-modal" style={{ display: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(10, 10, 15, 0.7)', backdropFilter: 'blur(8px)', zIndex: 9999, justifyContent: 'center', alignItems: 'center', opacity: 0, transition: 'opacity 0.3s ease' }}>
          <div id="admin-t3-video-content" style={{ position: 'relative', width: '90%', maxWidth: '700px', paddingTop: '393.75px', background: '#000', borderRadius: '12px', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', transform: 'scale(0.95)', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ position: 'absolute', top: '-15px', right: '-15px', zIndex: 10 }}>
              <span 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => {
                  const modal = document.getElementById('admin-t3-video-modal');
                  const content = document.getElementById('admin-t3-video-content');
                  modal.style.opacity = '0';
                  content.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    modal.style.display = 'none';
                    document.getElementById('admin-t3-video-frame').src = '';
                  }, 300);
                }} 
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '36px', height: '36px', background: '#793ea5', color: '#fff', fontSize: '24px', cursor: 'pointer', borderRadius: '50%', transition: 'all 0.2s ease', lineHeight: 1, border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
              >&times;</span>
            </div>
            <iframe id="admin-t3-video-frame" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px' }} src="" frameBorder="0" allow="autoplay; encrypted-media; fullscreen" allowFullScreen></iframe>
          </div>
        </div>
      )}

      <ul className="home-social">
        <StorefrontSocialLinks links={socialLinks} size={22} />
      </ul>
    </div>
  );
}
