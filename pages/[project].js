import Layout from "../src/layout/Layout";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Asset } from "@contentful/rich-text-react-renderer";

// const WorkSingleIsotope = dynamic(
//   () => import("../src/components/WorkSingleIsotope"),
//   {
//     ssr: false,
//   }
// );

function renderOptions(links) {
  // create an asset block map
  const assetBlockMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetBlockMap.set(asset.sys.id, asset);
  }

  // // create an entry block map
  // const entryBlockMap = new Map();
  // // loop through the entries and add them to the map
  // for (const entry of links.entries.block) {
  //   entryBlockMap.set(entry.sys.id, entry);
  // }

  return {
    // other options...

    renderNode: {
      // other options...

      // [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      //   // find the entry in the entryBlockMap by ID
      //   const entry = entryBlockMap.get(node.data.target.sys.id);

      //   // render the entries as needed by looking at the __typename
      //   // referenced in the GraphQL query

      //   if (entry.__typename === "VideoEmbed") {
      //     return (
      //       <iframe
      //         src={entry.embedUrl}
      //         height="100%"
      //         width="100%"
      //         frameBorder="0"
      //         scrolling="no"
      //         title={entry.title}
      //         allowFullScreen={true}
      //       />
      //     );
      //   }
      // },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => children,
            [BLOCKS.LIST_ITEM]: (node, children) => children,
          },
        });

        return <li>{UnTaggedChildren}</li>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetBlockMap by ID
        const asset = assetBlockMap.get(node.data.target.sys.id);

        // render the asset accordingly
        return (
          <figure>
            <img src={asset.url} alt="My image alt text" />
            <figcaption class="text-center fst-italic">
              {asset.description}
            </figcaption>
          </figure>
        );
      },
    },
  };
}

const WorkSingle = ({ project }) => {
  const [videoToggle, setVideoToggle] = useState(false);
  return (
    <Layout extraWrapClass={"project-single"}>
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
                {/* <div className="details-label">
                  <span>Collaborators</span>
                  <strong>
                    {project.collaborators.split(",").map((substring, idx) => {
                      return (
                        <div key={idx}>
                          <span>{substring}</span>
                          <br />
                        </div>
                      );
                    })}
                  </strong>
                </div> */}
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
      {/* Section Gallery */}
      {/* <section className="section section-inner">
        <div className="container">
          <WorkSingleIsotope />
        </div>
      </section> */}
      {/* Description */}
      {/* <section className="section section-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="p-title">Project Goal</div>
              <div className="text">
                <p>
                  Aliquam a sapien diam. Phasellus pulvinar tellus aliquam
                  eleifend consectetur. Sed bibendum leo quis rutrum
                  aliquetmorbi.
                </p>
                <p>
                  Donec imperdiet risus at tortor consequat maximus et eget
                  magna. Cras ornare sagittis augue, id sollicitudin justo
                  tristique ut. Nullam ex enim, euismod vel bibendum ultrices,
                  fringilla vel eros. Donec euismod leo lectus, et euismod metus
                  euismod sed. Quisque quis suscipit ipsum, at pellentesque
                  velit. Duis a congue sem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Video */}
      {/* <section className="m-video-large">
        <div className={`video ${videoToggle ? "active" : ""}`}>
          <div
            className="img js-parallax"
            style={{ backgroundImage: "url(assets/images/blog9.jpg)" }}
          />
          <iframe
            className="js-video-iframe"
            src="https://www.youtube.com/embed/Gu6z6kIukgg?showinfo=0&rel=0&autoplay=0"
          />
          <div className="play" onClick={() => setVideoToggle(true)} />
        </div>
      </section> */}
      {/* Navigation */}
      {/* <section className="m-page-navigation">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="h-titles h-navs">
                <Link href="/work-single">
                  <a>
                    <span className="nav-arrow">Next Project</span>
                    <span className="h-title">Kana</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
