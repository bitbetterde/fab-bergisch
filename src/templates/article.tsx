// CSS from UI Library
import "@fchh/fcos-suite-ui/dist/fcos-suite-ui.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";

import {
  Article,
  Footer,
  Header,
  Image,
  Person,
  YoutubeEmbed,
} from "@fchh/fcos-suite-ui";
import { Home } from "@carbon/icons-react";
import { CarbonIcon } from "../components/CarbonIcon";

// interface ArticleTemplateProps {
//   toolbar: IToolbarItem[];
//   menu: IMenuItem[];
// }

// The article template is for any kind of "article" like content. Could be a blog post, a news post or an event. It is not intended as home page.
export default (props) => {
  console.log("Article Template", props);

  const blocks = props?.page?.content?.text ?? [];

  return (
    <div>
      <Header
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0"
            />
          ),
        }))}
        hideSearchIcon
      />
      <Article
        titleImage={props?.heroimage?.url}
        titleImageAlt={props?.heroimage?.alt}
        imageTag={props?.heroimage?.credits}
        breadcrumbs={props?.breadcrumbs.map((crumb, i) =>
          i == 0 ? { ...crumb, icon: <Home className="size-4" /> } : crumb
        )}
        hideFooterSeparator={true}
        title={props?.page?.content.title}
        subtitle={props?.page?.content.subheading}
        teaser={props?.page.content.teaser}
      >
        {blocks?.map((block) => {
          // TODO: Here we need to conditionally render the right frontend component. Probably need a big switch case or object map here
          if (block.type === "person") {
            return (
              <div className="grid grid-cols-3 py-8">
                {block.content.people.map((person) => (
                  <Person
                    key={person.name}
                    image={person.image}
                    name={person.name}
                    position={person.position}
                    organization={person.organisation}
                  />
                ))}
              </div>
            );
          } else if (block.type === "heading") {
            const HeadlineTag = block.content.level;
            return <HeadlineTag>{block.content.text}</HeadlineTag>;
          } else if (block.type === "image") {
            return (
              <>
                <pre>{JSON.stringify(block, null, 2)}</pre>
                <Image
                  src={block.content.image[0].url}
                  alt={block.content.alt}
                  caption={block.content.caption}
                  subCaption={block.content.subcaption}
                  tag={block.content.tag}
                />
              </>
            );
          } else if (block.type === "code") {
            return (
              <pre>
                <code className={`language-${block.content.language}`}>
                  {block.content.code}
                </code>
              </pre>
            );
          } else if (block.type === "youtube") {
            return <YoutubeEmbed videoId={block.content.videoid} title="Hallo" />;
          }

          return (
            <div
              key={block.id}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            ></div>
          );
        })}
      </Article>
      <Footer menu={props?.menu.children} />
    </div>
  );
};
