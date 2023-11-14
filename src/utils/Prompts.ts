export type PromptTemplate =
  | "createNavigation"
  | "createWelcomeSection"
  | "createMainSection"
  | "createTableSection"
  | "createFooter"
  | "CreateHead";

 export interface FormValues {
    topic: string;
    cssLibrary: string;
    colors: string;
    linkCount: string;
    linkNames: string;
    tableDetails: string;
  }

  export const getPromptTemplate = (promptTemplate: PromptTemplate, formValues: FormValues): string => {
    const {
      topic,
      cssLibrary,
      colors,
      linkCount,
      linkNames,
      tableDetails,
    } = formValues;

    const promptTemplates = {
      createNavigation: `Topic: ${topic}.
 Create a fully functional navigation section <nav></nav> with approriate Site name on left and ${linkCount} links named ${linkNames}.
 Make href for links: Use exactly <a href="#section">Welcome</a>, <a href="#main">Main</a>, <a href="#table">Table</a> and <a href="#footer">Footer</a>.
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects for links.
 Use flexbox and make navigation sticky.
 Make the navigation background dark and text light.
 Change navigation to column in mobile view (under 600px) and justify and align content center.
 No imageplaceholders`,
 createWelcomeSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects.
 Use flexbox. justify content on center. Place text on left and image on right.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional welcome section <section></section> with id #section. Welcome the user to the site with welcome text and additional information about the topic.
 Create a image tag size 300x300px. Use placekitten for image source. 
 Use real information and miminum of 3 paragraphs and 200 words, no lorem ipsum.`,
      createFooter: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects.
 Use flexbox.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional footer section <footer></footer> with id #footer and with legal information and appropriate links.
 Create only the footer section, no other sections.`,
      createTableSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects.
 use maximum of 10rem padding/margin horizontally.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional table section with id #table and Infromation: ${tableDetails}.`,
      createMainSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects.
 Use flexbox.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 create a fully functional main section <main></main> with id #main paragraphs of information about the topic.
 miminum of 4 paragraphs and 300 words.
 No lorem ipsum, use real information.`,
      CreateHead: `update <head></head> tags with meta tags using correct information analyzing the site content:
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
 Return Only the <head></head> tags containing the updated code, no Other HTML ie. <body></body> tags or anthing inside <body></body> tags :`
    };

    return promptTemplates[promptTemplate];
  };