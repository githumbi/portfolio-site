import Layout from "../src/layout/Layout";

import { useState } from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { NextSeo } from "next-seo";

function renderOptions(links) {
  // create an asset block map
  const assetBlockMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetBlockMap.set(asset.sys.id, asset);
  }

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
      <NextSeo
        title={project.title}
        description={project.subtitle}
        canonical={`https://githumbi.com/${project.slug}`}
        openGraph={{
          type: "article",
          // article: {
          //   publishedTime: "2022-06-21T23:04:13Z",
          //   modifiedTime: "2022-01-21T18:04:43Z",
          //   authors: [
          //     "https://www.example.com/authors/@firstnameA-lastnameA",
          //     "https://www.example.com/authors/@firstnameB-lastnameB",
          //   ],
          //   tags: ["Tag A", "Tag B", "Tag C"],
          // },
          url: `https://githumbi.com/${project.slug}`,
          images: {
            url: `${project.headerimage.url}`,
            width: 850,
            height: 650,
            alt: "Photo of text",
          },
          site_name: "Thumbi Portfolio",
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
