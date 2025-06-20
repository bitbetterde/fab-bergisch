// CSS from UI Library
import "@fchh/fcos-suite-ui/style.css";
// Local fonts
import "@fontsource/karla";
import "@fontsource/inter";
import "@fontsource/ibm-plex-sans";
// Local styles
import "../base.css";
import { CarbonIcon } from "../components/CarbonIcon";
import { InertiaLinkWrapper } from "../components/InertiaLinkWrapper";

import {
  Footer,
  Header,
  HeroSection,
  VerticalNewsCardSlider,
  YoutubeEmbed,
  LogoGrid,
  Image,
} from "@fchh/fcos-suite-ui";

export default (props) => {
  // console.log("Default Template:", props);

  const blocks = props?.page?.content?.text ?? [];

  return (
    <InertiaLinkWrapper>
      <Header
        topBarItems={props?.menu.children}
        toolBarItems={props?.toolbar?.map((item) => ({
          ...item,
          icon: (
            <CarbonIcon
              name={item.icon}
              className="size-6 sm:size-5 sm:mr-2 mb-1 sm:mb-0 shrink-0"
            />
          ),
        }))}
        hideSearchIcon
        organization={props.organization || "frbs"}
      />
      <HeroSection src={props?.heroimage?.url} />
      <main
        className={
          "grid grid-cols-outer [&>*]:col-start-1 [&>*]:col-end-4 [&>*]:w-full overflow-hidden"
        }
      >
        {blocks?.map((block, i) => {
          if (block.type === "fullbleed-text") {
            return (
              <div
                key={"block" + i}
                className="py-16 grid grid-cols-1 md:grid-cols-subgrid md:[&>*]:col-start-2 md:[&>*]:col-end-2"
                style={{ backgroundColor: block?.content?.bgcolor }}
              >
                <div className="grid grid-cols-inner">
                  <div
                    className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 prose prose-p:text-xl prose-h2:text-5xl prose-h2:font-plex prose-h2:font-normal prose-p:font-plex max-w-none"
                    dangerouslySetInnerHTML={{ __html: block?.content?.text }}
                  />
                </div>
              </div>
            );
          } else if (block.type === "verticalnewscardslider") {
            const pages =
              block.content.mode === "manual"
                ? block.content.pages
                : block.content.resolvedChildren;
            return (
              <VerticalNewsCardSlider
                key={"block" + i}
                className="fs-not-prose py-16"
                variant="dark"
                title={block.content.title}
                fullBleed={block.content.fullbleed === "true"}
                items={pages?.map((page) => ({
                  title: page.content.title,
                  category: { id: 1, title: "Seite", href: page.url },
                  description: page.content.teaser,
                  href: page.url,
                  image: {
                    alt: page.content.heroimage?.name,
                    src: page.content.heroimage?.url,
                  },
                }))}
              />
            );
          } else if (block.type === "logogrid") {
            return (
              <div
                key={"block" + i}
                className="py-16 grid grid-cols-1 md:grid-cols-subgrid md:[&>*]:col-start-2 md:[&>*]:col-end-2"
                style={{ backgroundColor: block?.content?.bgcolor }}
              >
                <div className="grid grid-cols-inner">
                  <LogoGrid
                    title={block.content.title}
                    columns={block.content.columns}
                    entries={block.content.logos?.map((img) => ({
                      src: img.url,
                      alt: img.name,
                      href: img.href,
                    }))}
                    className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11"
                  />
                </div>
              </div>
            );
          } else if (block.type === "youtube") {
            return (
              <div className="grid grid-cols-inner" key={"block" + i}>
                <YoutubeEmbed
                  videoId={block.content.videoid}
                  title={block.content.title}
                  thumbnail={block.content.thumbnail}
                  className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 my-8"
                />
              </div>
            );
          } else if (block.type === "image") {
            return (
              <div className="grid grid-cols-inner" key={"block" + i}>
                <Image
                  src={
                    block.content.location === "kirby"
                      ? block.content.image?.url
                      : block.content.src
                  }
                  alt={block.content.alt}
                  captionHtml={block.content.caption}
                  subCaption={
                    block.content.subcaption
                      ? `Quelle: ${block.content.subcaption}`
                      : undefined
                  }
                  tag={block.content.tag}
                  className="col-start-2 col-end-13 lg:col-start-4 lg:col-end-11 my-8"
                />
              </div>
            );
          }
          return null;
        })}
      </main>
      <Footer
        copyright={props.bottomline}
        socialMediaGrow={false}
        menu={props?.footermenu.children}
        supportedBy={props.supportedby}
        socialMedia={props?.socialmedia?.map((media) => ({
          href: media.href,
          type: media.platform,
        }))}
        policyLinks={props?.policylinks}
      />
    </InertiaLinkWrapper>
  );
};
