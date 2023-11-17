export type PromptTemplate =
  | "createNavigation"
  | "createWelcomeSection"
  | "createMainSection"
  | "createTableSection"
  | "createFooter"
  | "createMap"
  | "CreateHead";

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
    createNavigation: `Create a fully functional navigation section <nav></nav>.
Use ${cssLibrary} css for html styling.
Use shadow and hover effects for links.
Use flexbox.
Justify content center and align content center under 600px width.
Do not make hamburger menu.
No imageplaceholders.
Additional information: (${additionalInfo}).
You must use additional information and generate ALL text with the language used in additional information!`,
    createWelcomeSection: `Use ${cssLibrary} css for html styling.
Use shadow and hover effects.
Use flexbox, width around 1100px. Place text on left and image on right.
Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
Create a fully functional welcome section <section></section> with id #section. Welcome the user to the site with welcome text and additional information about the topic.
Create a image tag width 400px, height 100%. 
No lorem ipsum.
Additional information: (${additionalInfo}).
You must use additional information and generate ALL text with the language used in additional information!`,
    createFooter: `Use ${cssLibrary} css for html styling.
Use shadow and hover effects.
Use flexbox.
Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
Create a fully functional footer section <footer></footer> with id #footer and with legal information and appropriate links.
Create only the footer section, no other sections.
Additional information: (${additionalInfo}).
You must use additional information and generate ALL text with the language used in additional information!`,
    createTableSection: `Use ${cssLibrary} css for html styling, width around 1100px.
Use shadow and hover effects.
Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
Create a fully functional table section.
Additional information: (${additionalInfo}).
You must use additional information and generate ALL text with the language used in the additional information!`,
    createMainSection: `
Use ${cssLibrary} css for html styling.
Use shadow and hover effects.
Use flexbox, width around 1100px.
Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
create a fully functional main section <main></main> with id #main.
No lorem ipsum.
Additional information: (${additionalInfo}).
You must use additional information and create ALL text with the language used in additional information!`,
    createMap: `Create an HTML block using a <div></div> element and employ flexbox for the container, setting its margin 2rem, width around 1100px, justify content to center, flex direction row, and align content to center. 
Place the following <iframe> tag inside the <div></div>, ensuring not to modify it:
<div style="display: flex; flex-direction: row;">
  <p></p>
  <iframe src="https://www.google.com/maps/embed/v1/place?q=${mapAddress}, ${mapCity}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=15&maptype=satellite"></iframe>
</div>
make p 50% width, 1rem padding right.
make iframe 100% width, height close to 400px, and black border.
Inside the <p></p>, generate text that offers information provided: ${additionalInfo}. Ensure that all generated text conforms to the language used in the provided information. 
Apply styling to the HTML using the ${cssLibrary} CSS.`,
    CreateHead: `update <head></head> tags with provided meta tags using correct information you get by analyzing the code:
(<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Your website description"> 
<!-- Title Tag -->
<title>Your Website Title</title>
<!-- Open Graph Meta Tags (Facebook, LinkedIn) -->
<meta property="og:title" content="Your Website Title">
<meta property="og:description" content="Your website description">
<meta property="og:url" content="Your website URL">
<meta property="og:image" content="URL to your website image">
<meta property="og:type" content="website">
<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Your Website Title">
<meta name="twitter:description" content="Your website description">
<meta name="twitter:image" content="URL to your website image">
<meta name="twitter:site" content="@YourTwitterHandle">
<!-- Canonical Link -->
<link rel="canonical" href="Canonical URL of your webpage">
<!-- Robots Meta Tag -->
<meta name="robots" content="index, follow"
<!-- Author Meta Tag -->
<meta name="author" content="Your Name">
<!-- Keywords Meta Tag (optional, search engines may not consider this) -->
<meta name="keywords" content="keyword1, keyword2, keyword3">
<!-- Favicon -->
<link rel="icon" href="path/to/favicon.ico" type="image/x-icon">). 
Add content delivery network link/script tag for ${cssLibrary}, check which one is correct!
Return Only the <head></head> tags containing the updated code, no Other HTML ie. <body></body> tags or anthing inside <body></body> tags.
No integrity attributes.
Code to analyze: `,
  };

  return promptTemplates[promptTemplate];
};
