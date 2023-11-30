export type PromptTemplate =
  | "createNavigation"
  | "createWelcomeSection"
  | "createMainSection"
  | "createTableSection"
  | "createFooter"
  | "createMap"
  | "CreateHead"
  | "sanitizeText";

export interface FormValues {
  cssLibrary: string;
  colors: string;
  mapAddress: string;
  mapCity: string;
  additionalInfo: string;
}

export const getPromptTemplate = (promptTemplate: PromptTemplate, formValues: FormValues): string => {
  const { cssLibrary, colors, mapAddress, mapCity, additionalInfo } = formValues;

  const promptTemplates = {
    createNavigation: [
      "Create Navigation:",
      "Create a fully functional navigation section using HTML <nav></nav> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects for links.",
      "Utilize flexbox for responsiveness.",
      "Avoid implementing a hamburger menu.",
      "Exclude image placeholders.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
    ],
    createWelcomeSection: [
      "Create a HTML section:",
      "Create a fully functional section using HTML <div></div> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects.",
      "Utilize flexbox for responsiveness.",
      "Make the section 1100px max width and margin 1rem.",
      "No lorem ipsum.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
    ],
    createFooter: [
      `Use ${cssLibrary} css for html styling.`,
      "Use shadows and hover effects.",
      "Use flexbox.",
      `Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.`,
      "Create a fully functional footer section <footer></footer> with id #footer, margin top 2rem, and with legal information and appropriate links.",
      "Create only the footer section, no other sections.",
      `Additional information: ${additionalInfo}.`,
      "You must use additional information and generate ALL text with the language used in additional information!",
    ],
    createTableSection: [
      "Create a HTML table section:",
      "Create a fully functional table section using HTML <div></div> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects.",
      "Utilize flexbox for responsiveness.",
      "Make the section 1100px max width and margin 1rem.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
    ],
    createMainSection: [
      "Create a HTML section:",
      "Create a fully functional section using HTML <div></div> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects.",
      "Utilize flexbox for responsiveness.",
      "Make the section 1100px width, margin 1rem.",
      "No lorem ipsum.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
    ],
    createMap: [
      "Create a fully functional section using HTML <div></div> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects for links.",
      "Utilize flexbox for responsiveness.",
      "Place the following <iframe> tag inside the <div></div>, ensuring not to modify content of iframe tag:",
      `<iframe style="width:100%;" src="https://www.google.com/maps/embed/v1/place?q=${mapAddress}, ${mapCity}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15&maptype=satellite"></iframe>`,
      "Make the iframe height is close to 400px.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
    ],
    CreateHead: [
      "Update <head></head> tags with provided meta tag template using fitting information.",
      `Add content delivery network link tag for ${cssLibrary}!`,
      "Return Only the <head></head> tags containing the updated code, no Other HTML ie. <body></body> tags or anthing inside <body></body> tags.",
      "No integrity attributes.",
      "Template:",
      "(",
      "<!-- Basic Meta Tags -->",
      '<meta charset="UTF-8">',
      '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<meta name="description" content="Your website description">',
      "<!-- Title Tag -->",
      "<title>Your Website Title</title>",
      "<!-- Open Graph Meta Tags (Facebook, LinkedIn) -->",
      '<meta property="og:title" content="Your Website Title">',
      '<meta property="og:description" content="Your website description">',
      '<meta property="og:url" content="Your website URL">',
      '<meta property="og:image" content="URL to your website image">',
      '<meta property="og:type" content="website">',
      "<!-- Twitter Meta Tags -->",
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:title" content="Your Website Title">',
      '<meta name="twitter:description" content="Your website description">',
      '<meta name="twitter:image" content="URL to your website image">',
      '<meta name="twitter:site" content="@YourTwitterHandle">',
      "<!-- Canonical Link -->",
      '<link rel="canonical" href="Canonical URL of your webpage">',
      "<!-- Robots Meta Tag -->",
      '<meta name="robots" content="index, follow">',
      "<!-- Author Meta Tag -->",
      '<meta name="author" content="Your Name">',
      "<!-- Keywords Meta Tag (optional, search engines may not consider this) -->",
      '<meta name="keywords" content="keyword1, keyword2, keyword3">',
      "<!-- Favicon -->",
      '<link rel="icon" href="path/to/favicon.ico" type="image/x-icon">',
      ").",
      "Code to analyze:",
    ],
    sanitizeText: [`${additionalInfo}`],
  };

  return promptTemplates[promptTemplate].join(" ");
};
