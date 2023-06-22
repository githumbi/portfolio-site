import Layout from "../../src/layout/Layout";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";



function renderOptions(links) {
  // create an asset block map
  const assetBlockMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetBlockMap.set(asset.sys.id, asset);
  }


  return {
    // other options...

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

const MyBlog = ({blog}) => {
  return (
    <Layout extraWrapClass={"single-post"}>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {/* titles */}
              <div className="m-titles">
                <h1 className="m-title">{blog.title}</h1>
                <div className="m-category">
                  <a href="#" rel="category tag">
                    UX Design
                  </a>{" "}
                  {blog.publishedAt}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Single Post */}
      <section className="section section-inner m-archive">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">
              {/* image */}
              {/* <div className="m-image-large">
                <div className="image">
                  <div
                    className="img"
                    style={{ backgroundImage: "url(assets/images/blog5.jpg)" }}
                  />
                </div>
              </div> */}
              {/* content */}
              <div className="description">
                <div className="post-content">
                  {documentToReactComponents(
                    blog.contentForBlog.json,
                    renderOptions(blog.contentForBlog.links)
                  )}
                </div>
              </div>
            </div>
            {/* Comments */}
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default MyBlog;

export async function getStaticProps({ params }) {
  const { blog } = params;

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
      query Getblog($slug: String!) {
 blogCollection(where: { slug: $slug }, limit: 1) {
    items {
      publishedAt
      topic
      title
      slug
      contentForBlog {
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
          slug: blog,
        },
      }),
    }
  );

  if (!result.ok) {
    console.error(result);
    return {};
  }

  const { data } = await result.json();

  const [blogData] = data.blogCollection.items;

  return {
    props: { blog: blogData },
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
  blogCollection {
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
  const blogSlugs = data.blogCollection.items;

  const paths = blogSlugs.map(({ slug }) => {
    return {
      params: { blog: slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
