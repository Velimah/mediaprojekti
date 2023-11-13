export type PromptTemplate =
  | "html"
  | "createNavigation"
  | "createHeroSection"
  | "createMainSection"
  | "createTableSection"
  | "createFooter";

 export interface FormValues {
    topic: string;
    cssLibrary: string;
    colors: string;
    linkCount?: string;
    linkNames?: string;
    heroParagraphCount?: string;
    wordCount?: string;
    tableDetails?: string;
    mainParagraphCount?: string;
    mainWordCount?: string;
  }

  export const getPromptTemplate = (promptTemplate: PromptTemplate, formValues: FormValues): string => {
    const {
      topic,
      cssLibrary,
      colors,
      linkCount,
      linkNames,
      heroParagraphCount,
      wordCount,
      tableDetails,
      mainParagraphCount,
      mainWordCount,
    } = formValues;

    const promptTemplates = {
      html: `Background information provided for the HTML:
      Generate HTML. Use Tailwind uiframework framework/library for the UI.
      Import any needed files from a public CDN.
      Do not include 'integrity' attribute for resources.
      Do not include markdown, just HTML.
      Do not provide any explanations, just the code.`,
      createNavigation: `Topic: ${topic}.
                        Use ${cssLibrary} for the UI styling.
                        Use shadows and hover effects if deemed appropriate.
                        Use ${colors} for theme colors. Take into account color contrast and white text on dark background, black text on light background.
                        Create a fully functional navigation section <nav></nav> with ${linkCount} links named ${linkNames}. 
                        Make the navigation responsive with working hamburger menu for mobile and javascript for functionality. 
                        no imageplaceholders`,
      createHeroSection: `Topic: ${topic}.
                          Use ${cssLibrary} for the UI styling.
                          Use shadows and hover effects if deemed appropriate.
                          Use ${colors} for theme colors. Take into account color contrast and white text on dark background, black text on light background.
                          Create a fully functional hero section <section></section> with ${heroParagraphCount} paragraphs to welcome the user to the site. 
                          Minimum of total ${wordCount} words. 
                          Create a image tag size 256x256px, image src is public/image.webp . 
                          Use real information and text, no lorem ipsum.`,
      createFooter: `Topic: ${topic}.
                          Use ${cssLibrary} for the UI styling.
                          Use shadows and hover effects if deemed appropriate.
                          Use ${colors} for theme colors. Take into account color contrast and white text on dark background, black text on light background.
                          Create a fully functional footer section <footer></footer> with legal information and appropriate links.`,
      createTableSection: `Topic: ${topic}.
                          Use ${cssLibrary} for the UI styling.
                          Use shadows and hover effects if deemed appropriate.
                          Use ${colors} for theme colors. Take into account color contrast and white text on dark background, black text on light background.
                          Create a fully functional table section. Infromation: ${tableDetails}.`,
      createMainSection: `Topic: ${topic}.
                          Use ${cssLibrary} for the UI styling.
                          Use shadows and hover effects if deemed appropriate.
                          Use ${colors} for theme colors. Take into account color contrast and white text on dark background, black text on light background.
                          create a fully functional main section <main></main> with ${mainParagraphCount} paragraphs of information about the game. 
                          Minimum of total ${mainWordCount} words. 
                          No lorem ipsum, use real information.`,
    };

    return promptTemplates[promptTemplate];
  };