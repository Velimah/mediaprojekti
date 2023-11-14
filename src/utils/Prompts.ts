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
 Use ${cssLibrary} for the UI styling.
 Use shadow and hover effects.
 Use flexbox and make navigation sticky.
 Make the navigation background dark and text light.
 Create a fully functional navigation section <nav></nav> with ${linkCount} links named ${linkNames}. make href for links using <a href="#section">Welcome</a> <a href="#main">Main</a> <a href="#table">Table</a> <a href="#footer">Footer</a>
 Make the navigation responsive with working hamburger menu for mobile and javascript for functionality.
 Make sure the navigation javascript is working.
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
      CreateHead: `update <head></head> tags with search engine optimization meta tags. 
 Add content delivery network link/script tag for ${cssLibrary}, check which one is correct! 
 Return only the updated <head></head> tags containing the updated code:`
    };

    return promptTemplates[promptTemplate];
  };