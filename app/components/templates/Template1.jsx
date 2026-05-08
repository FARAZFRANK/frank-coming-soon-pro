import React from "react";
import { StorefrontSocialLinks } from "../SocialIcons";

export default function Template1({ settings }) {
  const { title, description, logoUrl, bgImageUrl, socialLinks } = settings;

  const defaultBg = "https://cdn.shopify.com/s/files/1/0602/6405/4969/files/password-page-background.jpg";
  const mainBg = bgImageUrl && bgImageUrl !== 'null' && bgImageUrl !== '' ? bgImageUrl : defaultBg;

  const templateOneStyles = `
    .template-1-container {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #121212;
      background: #fff;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 500px;
    }
    .t1-header {
      padding: 20px 5%;
      background: #fff;
    }
    .t1-header-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .t1-store-name {
      font-size: 22px;
      font-weight: 400;
      margin: 0;
      color: #121212;
      letter-spacing: 0.05em;
    }
    .t1-logo-img {
      max-height: 60px;
      max-width: 200px;
      object-fit: contain;
    }
    .t1-password-link {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #121212;
      text-decoration: underline;
      text-underline-offset: 4px;
      cursor: pointer;
    }
    .t1-icon-padlock {
      width: 14px;
      height: 14px;
    }
    .t1-main {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #e5e5e5;
    }
    .t1-card {
      background: #ffffff;
      padding: 50px 30px;
      width: 100%;
      max-width: 700px;
      text-align: center;
    }
    .t1-title {
      font-size: 32px;
      font-weight: 400;
      margin-bottom: 20px;
      margin-top: 0;
      color: #121212;
      letter-spacing: 0.04em;
    }
    .t1-desc {
      font-size: 15px;
      color: #121212;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .t1-form-wrapper {
      max-width: 360px;
      margin: 0 auto;
    }
    .t1-input-group {
      display: flex;
      position: relative;
      align-items: center;
      border: 1px solid #121212;
    }
    .t1-input {
      width: 100%;
      padding: 12px 40px 12px 15px;
      border: none;
      font-size: 14px;
      background: transparent;
      color: #121212;
      outline: none;
      font-family: inherit;
    }
    .t1-submit {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #121212;
    }
    .t1-submit svg {
      width: 16px;
      height: 16px;
    }
    .t1-footer {
      padding: 40px 20px;
      text-align: center;
      background: #fff;
      border-top: 1px solid rgba(0,0,0,0.08);
    }
    .t1-footer-inner p {
      font-size: 13px;
      color: rgba(18,18,18,0.75);
      margin: 8px 0;
    }
    .t1-social {
      list-style: none;
      padding: 0;
      margin: 30px 0 0 0;
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    .t1-social a {
      color: #121212;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .t1-social svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;

  return (
    <div className="template-1-container">
      <style>{templateOneStyles}</style>
      <main className="t1-main" style={{ backgroundImage: `url('${mainBg}')` }}>
        <div className="t1-card">
          <h1 className="t1-title">{title === undefined || title === null ? "Opening soon" : title}</h1>
          <div className="t1-desc">
            <p>{description === undefined || description === null ? "Be the first to know when we launch." : description}</p>
          </div>

          <div className="t1-form-wrapper">
            <div className="t1-input-group">
              <input type="email" name="email" className="t1-input" placeholder="Email" readOnly />
              <button type="button" className="t1-submit" aria-label="Subscribe">
                <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" role="presentation" className="icon icon-arrow" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor"></path></svg>
              </button>
            </div>
          </div>

          <ul className="t1-social">
            <StorefrontSocialLinks links={socialLinks} />
          </ul>
        </div>
      </main>

      <footer className="t1-footer">
        <div className="t1-footer-inner">
          <p>This shop will be powered by <strong>Shopify</strong></p>
        </div>
      </footer>
    </div>
  );
}
