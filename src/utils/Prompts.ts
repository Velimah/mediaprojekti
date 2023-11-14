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
    linkCount?: string;
    linkNames?: string;
    tableDetails?: string;
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
 Use shadows and hover effects if appropriate.
 Use flexbox.
 Make the navigation background dark and text light.
 Create a fully functional navigation section <nav></nav> with ${linkCount} links named ${linkNames}. make href for links using <a href="#section">Welcome</a> <a href="#main">Main</a> <a href="#table">Table</a> <a href="#footer">Footer</a>
 Make the navigation responsive with working hamburger menu for mobile and javascript for functionality. 
 No imageplaceholders`,
 createWelcomeSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadows and hover effects if appropriate.
 Use flexbox.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional welcome section <section></section> with id #section and and welcome the user to the site with welcome text and information.
 Create a image tag size 256x256px, image src is /image.webp . 
 Use real information and text, no lorem ipsum.`,
      createFooter: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadows and hover effects if appropriate.
 Use flexbox.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional footer section <footer></footer> with id #footer and with legal information and appropriate links.
 Create only the footer section, no other sections.`,
      createTableSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadows and hover effects if appropriate.
 use maximum of 10rem padding/margin horizontally.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 Create a fully functional table section with id #table and Infromation: ${tableDetails}.`,
      createMainSection: `Topic: ${topic}.
 Use ${cssLibrary} for the UI styling.
 Use shadows and hover effects if appropriate.
 Use flexbox.
 Use color code ${colors} as a primary theme color. Take into account color contrast and white text on dark background, black text on light background.
 create a fully functional main section <main></main> with id #main paragraphs of information about the topic.
 No lorem ipsum, use real information.`,
      CreateHead: `update <head></head> tags with search engine optimization meta tags. 
 Add content delivery network link for ${cssLibrary}. 
 Return only the updated <head></head> tags containing the updated code:`
    };

    return promptTemplates[promptTemplate];
  };