import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template5({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const templateFiveStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

    .template-five-container {
      position: relative;
      width: 100%; height: 100%;
      background-color: #111;
      display: flex; align-items: center; justify-content: center;
      font-family: "Montserrat", sans-serif;
      overflow: hidden;
      background-image: url('/templates/temp-5.png');
      background-size: cover;
      background-position: center;
      padding: 30px;
    }

    .frame-ipad {
      border: solid #111;
      border-radius: 40px;
      width: 100%; height: 100%;
      background-image:  url('/templates/temp-5.png');
      background-size: cover;
      background-position: center;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      color: #fff;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      position: relative;
      padding: 40px;
      text-align: center;
    }

    .home-logo img { height: 70px; width: auto; margin-bottom: 20px; object-fit: contain; }

    .template-five-container h1 {
      font-weight: 800;
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
      letter-spacing: 0;
      margin: 10px 0 20px;
      color: transparent;
      -webkit-text-stroke: 1.5px #fff;
      text-transform: uppercase;
    }

    .cs-description {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0 auto 40px;
      line-height: 1.6;
      max-width: 730px;
    }

    .cs-description p {
      margin-bottom: 12px;
    }

    .home-content__clock {
      display: flex; justify-content: center; gap: 15px; margin-bottom: 30px;
    }

    .home-content__clock .time {
      color: #FFFFFF;
      font-size: 2.8rem;
      font-weight: 800;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      line-height: 1;
      -webkit-text-stroke: 1px #fff;
      color: transparent;
    }

    .home-content__clock .time span {
      font-size: 10px; opacity: 0.7; font-weight: 700; margin-top: 5px;
      text-transform: uppercase;
      -webkit-text-stroke: 0px;
      color: #fff;
    }

    .subscribe-form {
      display: flex; max-width: 380px; width: 100%; margin: 0 auto 30px;
      border-radius: 4px; overflow: hidden;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .subscribe-form input {
      flex: 1; padding: 14px 15px; border: none; background: transparent; color: #fff; font-size: 13px;
    }
    .subscribe-form input::placeholder { color: rgba(255, 255, 255, 0.5); }
    .subscribe-form button {
      padding: 14px 22px; background: #d7054c; color: #fff; border: none; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer;
    }

    .home-social {
      list-style: none; display: flex; gap: 20px;
      margin: 0; padding: 0; justify-content: center;
    }
    .home-social li a { 
      color: #fff; font-size: 18px; transition: 0.3s; text-decoration: none; display: flex; align-items: center; justify-content: center;
    }
    .home-social li a:hover { color: #d7054c; }

    @media (max-width: 800px) {
      .frame-ipad { border-width: 10px; padding: 20px; }
      .template-five-container h1 { font-size: 2rem; }
      .home-content__clock { gap: 10px; }
    }
  `;

  return (
    <div className="template-five-container" style={{
      backgroundImage: bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bgImageUrl})` : "url('/templates/temp-5.png')"
    }}>
      <style>{templateFiveStyles}</style>

      <div className="frame-ipad" style={{
        backgroundImage: `${bgImageUrl && bgImageUrl !== "null" && bgImageUrl !== "" ? `url(${bgImageUrl})` : "url('/templates/temp-5.png')"}`
      }}>
        <div className="home-logo">
          <img src={logoUrl && logoUrl !== "" ? logoUrl : "/templates/logo-w.png"} alt="Logo" style={{ height: "35px", width: "auto", objectFit: "contain" }} />
        </div>

        <div className="home-content__text">
          <h1>{title === undefined || title === null ? "Coming Soon" : title}</h1>

          <div className="home-content__counter">
            <div className="home-content__clock">
              <div className="time days">{String(timeLeft.days).padStart(2, '0')} <span>D</span></div>
              <div className="time hours">{String(timeLeft.hours).padStart(2, '0')} <span>H</span></div>
              <div className="time minutes">{String(timeLeft.minutes).padStart(2, '0')} <span>M</span></div>
              <div className="time seconds">{String(timeLeft.seconds).padStart(2, '0')} <span>S</span></div>
            </div>
          </div>

          <div className="cs-description" dangerouslySetInnerHTML={{ __html: description === undefined || description === null ? "We are currently working hard to create a new and exciting experience for you." : description }} />

          <div className="subscribe-form">
            <input type="email" placeholder="Email Address" readOnly />
            <button>NOTIFY ME</button>
          </div>

          <ul className="home-social">
            <StorefrontSocialLinks links={socialLinks} />
          </ul>
        </div>
      </div>
    </div>
  );
}
