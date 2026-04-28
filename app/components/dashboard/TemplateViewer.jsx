import React, { useState, useEffect, useRef } from "react";
import { Box, Text } from "@shopify/polaris";

// Static imports for all templates to prevent "disappearing preview" during re-renders
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import Template6 from "../templates/Template6";
import Template7 from "../templates/Template7";
import Template8 from "../templates/Template8";
import Template9 from "../templates/Template9";
import Template10 from "../templates/Template10";
import Template11 from "../templates/Template11";
import Template12 from "../templates/Template12";
import Template13 from "../templates/Template13";
import Template14 from "../templates/Template14";
import Template15 from "../templates/Template15";
import Template16 from "../templates/Template16";
import Template17 from "../templates/Template17";
import Template18 from "../templates/Template18";
import Template19 from "../templates/Template19";
import Template20 from "../templates/Template20";
import Template21 from "../templates/Template21";
import Template22 from "../templates/Template22";
import Template23 from "../templates/Template23";
import Template24 from "../templates/Template24";
import Template25 from "../templates/Template25";
import Template26 from "../templates/Template26";
import Template27 from "../templates/Template27";
import Template28 from "../templates/Template28";
import Template29 from "../templates/Template29";
import Template30 from "../templates/Template30";
import Template31 from "../templates/Template31";

const templateMap = {
  template_1: Template1,
  template_2: Template2,
  template_3: Template3,
  template_4: Template4,
  template_5: Template5,
  template_6: Template6,
  template_7: Template7,
  template_8: Template8,
  template_9: Template9,
  template_10: Template10,
  template_11: Template11,
  template_12: Template12,
  template_13: Template13,
  template_14: Template14,
  template_15: Template15,
  template_16: Template16,
  template_17: Template17,
  template_18: Template18,
  template_19: Template19,
  template_20: Template20,
  template_21: Template21,
  template_22: Template22,
  template_23: Template23,
  template_24: Template24,
  template_25: Template25,
  template_26: Template26,
  template_27: Template27,
  template_28: Template28,
  template_29: Template29,
  template_30: Template30,
  template_31: Template31,
};

export default function TemplateViewer({ settings }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { templateId, countdownDate } = settings || {};
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!countdownDate) return;
    const calculateTimeLeft = () => {
      const difference = +new Date(countdownDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [countdownDate]);

  const templateIdStr = String(templateId || "template_1");
  const ActiveTemplate = templateMap[templateIdStr] || Template1;
  const baseWidth = 1200; 
  const scale = containerWidth > 0 ? containerWidth / baseWidth : 0.8;

  if (!settings || Object.keys(settings).length === 0) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6f8", border: "2px dashed #d2d7df" }}>
        <Text tone="subdued">Waiting for configuration...</Text>
      </div>
    );
  }

  const customFontLink = settings.customFont && settings.customFont !== 'Inter' 
    ? `https://fonts.googleapis.com/css2?family=${settings.customFont.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap` 
    : null;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", minHeight: "400px" }}>
      {customFontLink && <link href={customFontLink} rel="stylesheet" />}
      {settings.customCss && <style>{settings.customCss}</style>}
      <div style={{
        width: `${baseWidth}px`,
        height: `${Math.round((baseWidth / (16 / 9)))}px`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent"
      }}>
        {settings.customFont && settings.customFont !== 'Inter' && (
          <style>{`
            #csmm-preview-container * {
              font-family: "${settings.customFont}", sans-serif !important;
            }
          `}</style>
        )}
        <div id="csmm-preview-container" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        {settings.showHeader && (
          <div style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #e1e3e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            zIndex: 9999,
            position: "relative",
            flexShrink: 0
          }}>
            <div style={{ display: "flex", gap: "24px", fontSize: "14px", fontWeight: "600", color: "#202223" }}>
              <span>Home</span>
              <span>Catalog</span>
              <span>Contact</span>
            </div>
            <div style={{ fontWeight: "700", fontSize: "20px", color: "#202223", letterSpacing: "1px", textTransform: "uppercase" }}>
              Your Store
            </div>
            <div style={{ display: "flex", gap: "20px", color: "#202223" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            </div>
          </div>
        )}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <ActiveTemplate 
            settings={settings} 
            timeLeft={timeLeft} 
            isAdmin={true}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
