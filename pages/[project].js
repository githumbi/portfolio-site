import Layout from "../src/layout/Layout";

import { useState } from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { NextSeo } from "next-seo";

function renderOptions(links) {
  const assetBlockMap = new Map();
  for (const asset of links.assets.block) {
    assetBlockMap.set(asset.sys.id, asset);
  }

  const getYoutubeEmbedUrl = (url) => {
    let videoId;

    // Handle YouTube shorts
    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    }
    // Handle regular YouTube URLs
    else {
      const match = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      videoId = match ? match[1] : null;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node, children) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        });
        return <li>{UnTaggedChildren}</li>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        // Check if paragraph contains a YouTube link
        const content = node.content[0]?.value || "";
        if (content.includes("youtube.com")) {
          const embedUrl = getYoutubeEmbedUrl(content);
          if (embedUrl) {
            return (
              <div className="video-container">
                <iframe
                  width="100%"
                  height="500"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }
        }
        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = assetBlockMap.get(node.data.target.sys.id);
        if (asset && asset.url) {
          return (
            <figure>
              <img src={asset.url} alt={asset.description || "Image"} />
              <figcaption className="text-center fst-italic">
                {asset.description}
              </figcaption>
            </figure>
          );
        }
        return null;
      },
    },
  };
}

const WorkSingle = ({ project }) => {
  const [videoToggle, setVideoToggle] = useState(false);
  return (
    <Layout extraWrapClass={"project-single"}>
      <NextSeo
        title={project.title}
        description={project.description}
        canonical={`https://githumbi.com/${project.slug}`}
        openGraph={{
          type: "article",
          url: `https://githumbi.com/${project.slug}`,
          title: project.title,
          description: project.description,
          images: [
            {
              url: project.headerimage.url,
              width: 1200,
              height: 630,
              alt: project.title,
              type: "image/jpeg",
            },
          ],
          site_name: "Thumbi Portfolio",
        }}
        twitter={{
          handle: "@githumbi_jk",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* titles */}
              <div className="h-titles">
                <h1 className="h-title">{project.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Details */}
      <section className="section section-inner details">
        <div className="container">
          <div className="row row-custom">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
              <div className="m-details">
                <div className="details-label">
                  <span>Role</span>
                  <strong>
                    {project.role.split(",").map((substring, idx) => {
                      return (
                        <div key={idx}>
                          <span>{substring}</span>
                          <br />
                        </div>
                      );
                    })}
                  </strong>
                </div>
                <div className="details-label">
                  <span>Year</span>
                  <strong>{project.year}</strong>
                </div>
                <div className="details-label">
                  <span>Technology</span>
                  <strong>
                    {project.technology.split(",").map((substring, idx) => {
                      return (
                        <div key={idx}>
                          <span>{substring}</span>
                          <br />
                        </div>
                      );
                    })}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Image Large */}
      <section className="m-image-large">
        <div className="image">
          <div
            className="img js-parallax"
            style={{ backgroundImage: `url(${project.headerimage.url})` }}
          />
        </div>
      </section>
      {/* Description */}
      <section className="section section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div>
                {documentToReactComponents(
                  project.body.json,
                  renderOptions(project.body.links)
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default WorkSingle;

export async function getStaticProps({ params }) {
  const { project } = params;

  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query GetProject($slug: String!) {
  projectsCollection(where: { slug: $slug }, limit: 1) {
    items {
      title
      description
      role
      year
      technology
      collaborators
      subtitle
      slug
      headerimage {  url }
      body {  
        json 
        links {
          assets {
            block {
              title
              url
              description
              sys {
                id
              }
            }
          }
        }
      }
    }
  }
}
        `,
        variables: {
          slug: project,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();

  const [projectData] = data.projectsCollection.items;

  return {
    props: { project: projectData },
  };
}

export async function getStaticPaths() {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
  projectsCollection {
    items {
      slug
    }
  }
}
        `,
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return { props: {} };
  }
  const { data } = await result.json();
  const projectSlugs = data.projectsCollection.items;

  const paths = projectSlugs.map(({ slug }) => {
    return {
      params: { project: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
