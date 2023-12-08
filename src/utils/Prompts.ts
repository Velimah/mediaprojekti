import { HtmlBlock } from "../contexts/HtmlContext";

export type PromptTemplate =
  | "createNavigation"
  | "createMainSection"
  | "createTableSection"
  | "createFooter"
  | "createMap"
  | "CreateHead"
  | "createImage"
  | "sanitizeText";

export interface FormValues {
  htmlArray?: HtmlBlock[];
  code?: string;
  cssLibrary: string;
  colors: string;
  mapAddress: string;
  mapCity: string;
  additionalInfo: string;
  imageSrc: string;
  _id?: string;
  name: string;
}

export const getPromptTemplate = (promptTemplate: PromptTemplate, formValues: FormValues): string => {
  const { cssLibrary, mapAddress, mapCity, additionalInfo, imageSrc } = formValues;

  const promptTemplates = {
    createNavigation: [
      "Create Navigation:",
      "Create a fully functional navigation section using HTML <nav></nav> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects for links.",
      "Utilize flexbox for responsiveness.",
      "Make the <nav></nav> margin bottom 2rem.",
      "Exclude image placeholders.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
      "Check that HTML is valid and Javascript works.",
    ],
    createMainSection: [
      "Create a HTML section:",
      "Create a fully functional section using HTML <div></div> tags.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects if it is appropriate.",
      "Utilize flexbox for responsiveness.",
      "Make the section 1100px max width, margin 1rem.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
      "No lorem ipsum.",
      "Check that HTML is valid and Javascript works.",
    ],
    createTableSection: [
      "Create a HTML table section:",
      "Create a fully functional table section using HTML.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects.",
      "Utilize flexbox for responsiveness.",
      "Make the table section 1100px max width and margin 1rem.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
      "No lorem ipsum.",
      "Check that HTML is valid and Javascript works.",
    ],
    createMap: [
      "Create a fully functional section using HTML <div></div> tags.",
      "Make the div 1100px max width, margin 1rem.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects if it is appropriate.",
      "Utilize flexbox for responsiveness.",
      "Place the following <iframe> tag inside the <div></div>, ensuring not to modify content of iframe tag:",
      `<iframe style="width:100%;" src="https://www.google.com/maps/embed/v1/place?q=${mapAddress}, ${mapCity}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15&maptype=satellite"></iframe>`,
      "Make the iframe height close to 400px.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
      "No lorem ipsum.",
      "Check that HTML is valid and Javascript works.",
    ],
    createFooter: [
      "Create a fully functional footer section <footer></footer>.",
      `Apply styling to HTML using the ${cssLibrary} CSS library.`,
      "Incorporate shadow and hover effects if it is appropriate.",
      "Utilize flexbox for responsiveness.",
      "Make the <footer></footer> margin top 2rem.",
      `Consider additional information: ${additionalInfo}.`,
      "Generate all text using the language specified in the additional information.",
      "No lorem ipsum.",
      "Check that HTML is valid and Javascript works.",
    ],
    CreateHead: [
      "Update <head></head> tags with provided meta tag template.",
      `Add content delivery network link tag for ${cssLibrary}.`,
      "Make Only the <head></head> tags containing the updated code.",
      "No <html> tags, <body> tags or anthing inside <body></body> tags.",
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
      `Analyze the following HTML and update the meta tag information with appropriate text: ${additionalInfo}`,
    ],
    sanitizeText: [`${additionalInfo}`],
    createImage: [
      `Use ${cssLibrary} css for html styling. Add a image inside <img> tag, with the src being ${imageSrc}.`,
      `Alt must be ${additionalInfo}. Use <figure> tag, make it semantic.`,
      "Wrap it all in a <article>. Make sure image is responsive.",
    ],
  };

  return promptTemplates[promptTemplate].join(" ");
};
