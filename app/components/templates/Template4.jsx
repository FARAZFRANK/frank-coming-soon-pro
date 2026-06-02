import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template4({ settings, timeLeft }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks, countdownTitle } = settings;

  const templateFourStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

    .template-four-container {
      position: relative;
      width: 100%; height: 100%;
      background-color: #FFFFFF;
      display: flex; align-items: center; justify-content: flex-start;
      font-family: "Montserrat", sans-serif;
      overflow: hidden;
      padding: 20px 40px;
      background-size: 35%;
      background-position: right center;
      background-repeat: no-repeat;
    }

    .home-content {
      position: relative; z-index: 4;
      width: 100%; max-width: 500px;
      text-align: left;
    }

    .home-logo {
      height: 45px;
      width: auto;
      margin-bottom: 20px;
    }

    .home-logo img {
      height: 100%;
      width: auto;
      object-fit: contain;
    }

    .launching-text {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #999;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .home-content__clock {
      display: flex; gap: 8px; margin-bottom: 20px;
    }

    .home-content__clock .time {
      color: #FFFFFF;
      font-size: 1.8rem;
      font-weight: 800;
      width: 70px; height: 75px;
      background: #13161b;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      line-height: 1;
    }
    .home-content__clock .time.minutes,
    .home-content__clock .time.seconds {
      background: #0B1354;
    }

    .home-content__clock .time span {
      font-size: 8px; opacity: 0.8; font-weight: 700; margin-top: 3px;
      text-transform: uppercase;
    }

    .template-four-container h1 {
      font-weight: 900;
      font-size: 2.2rem;
      line-height: 1.1;
      color: #13161b;
      margin: 0 0 10px;
    }

    .cs-description {
      font-size: 14px;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.6;
      max-width: 450px;
    }

    .cs-description p {
      margin-bottom: 10px;
    }

    .subscribe-form {
      display: flex; max-width: 320px; width: 100%; margin-bottom: 25px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.06);
      border-radius: 4px; overflow: hidden;
      border: 1px solid #eee;
    }
    .subscribe-form input {
      flex: 1; padding: 12px 15px; border: none; background: #fff; color: #13161b; font-size: 12px;
    }
    .subscribe-form button {
      padding: 12px 18px; background: #0B1354; color: #fff; border: none; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer;
    }

    .home-social {
      list-style: none; display: flex; gap: 10px;
      margin: 0; padding: 0; z-index: 5;
    }
    .home-social li a { 
      background: #0B1354; color: #fff; width: 28px; height: 28px; 
      display: flex; align-items: center; justify-content: center; 
      border-radius: 2px; text-decoration: none; font-size: 12px;
      transition: 0.3s;
    }
    .home-social li a:hover { transform: translateY(-2px); }

    @media (max-width: 800px) {
      .template-four-container { padding: 20px; flex-direction: column; align-items: center; text-align: center; justify-content: center; background-size: cover; background-position: center; }
      .home-content { text-align: center; }
      .home-content__clock { justify-content: center; }
      .template-four-container p { margin: 0 auto 15px; }
      .subscribe-form { margin: 0 auto 20px; }
      .home-social { justify-content: center; }
    }
  `;

  return (
    <div className="template-four-container" style={{
      backgroundImage: "url('/templates/temp-4.png')"
    }}>
      <style>{templateFourStyles}</style>

      <div className="home-content">
        {logoUrl && (
          <div className="home-logo">
            <img src={logoUrl} alt="Logo" />
          </div>
        )}
        <div className="launching-text">
          {countdownTitle === undefined || countdownTitle === null || countdownTitle === "" ? "Launching In..." : countdownTitle}
        </div>

        <div className="home-content__counter">
          <div className="home-content__clock">
            <div className="time days">{String(timeLeft.days).padStart(2, '0')} <span>D</span></div>
            <div className="time hours">{String(timeLeft.hours).padStart(2, '0')} <span>H</span></div>
            <div className="time minutes">{String(timeLeft.minutes).padStart(2, '0')} <span>M</span></div>
            <div className="time seconds">{String(timeLeft.seconds).padStart(2, '0')} <span>S</span></div>
          </div>
        </div>

        <h1>{title === undefined || title === null ? "Coming Soon" : title}</h1>
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
  );
}
