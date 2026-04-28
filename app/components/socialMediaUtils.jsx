import React from "react";
import { SocialIcon } from "./SocialIcons";

export const getPlatformIcon = (platform, size = 18) => {
  return <SocialIcon platform={platform} size={size} />;
};

export const getPlatformColor = (platform) => {
  switch (platform) {
    case 'facebook': return "#1877F2";
    case 'instagram': return "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)";
    case 'twitter': return "#000000";
    case 'youtube': return "#FF0000";
    case 'tiktok': return "#010101";
    case 'linkedin': return "#0077B5";
    case 'pinterest': return "#E60023";
    case 'whatsapp': return "#25D366";
    default: return "#637381";
  }
};
